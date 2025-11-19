import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

const redirectWithStatus = (request: Request, params: Record<string, string>, pathname = "/admin/news") => {
	const url = new URL(request.url)
	url.pathname = pathname
	url.search = new URLSearchParams(params).toString()
	return NextResponse.redirect(url)
}

const toDdMmYy = (date: Date) => {
	const dd = String(date.getDate()).padStart(2, "0")
	const mm = String(date.getMonth() + 1).padStart(2, "0")
	const yy = String(date.getFullYear()).slice(-2)
	return `${dd}/${mm}/${yy}`
}

const formatDate = (value?: string | null) => {
	if (!value) {
		return toDdMmYy(new Date())
	}
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) {
		return toDdMmYy(new Date())
	}
	return toDdMmYy(date)
}

export async function POST(request: Request) {
	const sessionToken = cookies().get("ibpc_admin_session")?.value

	if (!sessionToken) {
		return redirectWithStatus(request, { error: "unauthorized" })
	}

	const db = await getDb()
	const session = await db.collection("adminSessions").findOne<{ sessionId: string; expiresAt?: Date; email?: string }>({
		sessionId: sessionToken,
		expiresAt: { $gt: new Date() }
	} as any)

	if (!session) {
		return redirectWithStatus(request, { error: "unauthorized" })
	}

	const formData = await request.formData()
	const newsId = formData.get("newsId")?.toString().trim()
	const title = formData.get("title")?.toString().trim()
	const shortDescription = formData.get("shortDescription")?.toString().trim() || ""
	const longDescription = formData.get("longDescription")?.toString() || ""
	const dateValue = formData.get("date")?.toString()
	const category = formData.get("category")?.toString() || ""
	const signatureEvent = formData.get("signatureEvent") === "on"
	const showOnHomepage = formData.get("showOnHomepage") === "on"

	if (!title) {
		return redirectWithStatus(request, { error: "missing_title" })
	}

	const publishedDate = formatDate(dateValue)

	let featuredImage: { data: string; contentType: string; fileName: string; size: number } | undefined
	const file = formData.get("image")

	if (file && file instanceof File && file.size > 0) {
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		featuredImage = {
			data: buffer.toString("base64"),
			contentType: file.type || "application/octet-stream",
			fileName: file.name || `upload-${Date.now()}`,
			size: buffer.length
		}
	}

	const payload: Record<string, any> = {
		title,
		shortDescription,
		longDescription,
		publishedDate,
		category,
		signatureEvent,
		showOnHomepage
	}

	if (featuredImage) {
		payload.featuredImage = featuredImage
	}

	if (newsId) {
		try {
			const objectId = new ObjectId(newsId)
			payload.updatedAt = new Date()
			await db.collection("news").updateOne({ _id: objectId }, { $set: payload })
		} catch (error) {
			console.error("Failed to update news", error)
			return redirectWithStatus(request, { error: "update_failed" }, "/admin/news/list")
		}
		return redirectWithStatus(request, { status: "updated" }, "/admin/news/list")
	}

	await db.collection("news").insertOne({
		...payload,
		featuredImage,
		createdAt: new Date(),
		createdBy: "admin"
	})

	return redirectWithStatus(request, { status: "success" })
}


