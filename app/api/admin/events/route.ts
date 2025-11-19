import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

const redirectWithStatus = (request: Request, params: Record<string, string>) => {
	const url = new URL(request.url)
	url.pathname = "/admin/events"
	url.search = new URLSearchParams(params).toString()
	return NextResponse.redirect(url)
}

const toDdMmYy = (value?: string | null) => {
	if (!value) {
		const now = new Date()
		const dd = String(now.getDate()).padStart(2, "0")
		const mm = String(now.getMonth() + 1).padStart(2, "0")
		const yy = String(now.getFullYear()).slice(-2)
		return `${dd}/${mm}/${yy}`
	}

	const date = new Date(value)
	if (Number.isNaN(date.getTime())) {
		const now = new Date()
		const dd = String(now.getDate()).padStart(2, "0")
		const mm = String(now.getMonth() + 1).padStart(2, "0")
		const yy = String(now.getFullYear()).slice(-2)
		return `${dd}/${mm}/${yy}`
	}

	const dd = String(date.getDate()).padStart(2, "0")
	const mm = String(date.getMonth() + 1).padStart(2, "0")
	const yy = String(date.getFullYear()).slice(-2)
	return `${dd}/${mm}/${yy}`
}

export async function POST(request: Request) {
	const sessionToken = cookies().get("ibpc_admin_session")?.value

	if (!sessionToken) {
		return redirectWithStatus(request, { error: "unauthorized" })
	}

	const db = await getDb()
	const session = await db.collection("adminSessions").findOne({
		sessionId: sessionToken,
		expiresAt: { $gt: new Date() }
	} as any)

	if (!session) {
		return redirectWithStatus(request, { error: "unauthorized" })
	}

	const formData = await request.formData()
	const eventId = formData.get("eventId")?.toString().trim()
	const title = formData.get("title")?.toString().trim()
	const description = formData.get("description")?.toString().trim() || ""
	const longDescription = formData.get("longDescription")?.toString() || ""
	const location = formData.get("location")?.toString().trim() || ""
	const startDateValue = formData.get("startDate")?.toString()
	const endDateValue = formData.get("endDate")?.toString()

	if (!title) {
		return redirectWithStatus(request, { error: "missing_title" })
	}

	const startDate = toDdMmYy(startDateValue)
	const endDate = toDdMmYy(endDateValue || startDateValue)

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
		description,
		longDescription,
		location,
		startDate,
		endDate
	}

	if (featuredImage) {
		payload.featuredImage = featuredImage
	}

	if (eventId) {
		try {
			const objectId = new ObjectId(eventId)
			payload.updatedAt = new Date()
			await db.collection("events").updateOne({ _id: objectId }, { $set: payload })
		} catch (error) {
			console.error("Failed to update event", error)
			return redirectWithStatus(request, { error: "update_failed" }, "/admin/events/list")
		}
		return redirectWithStatus(request, { status: "updated" }, "/admin/events/list")
	}

	await db.collection("events").insertOne({
		...payload,
		featuredImage,
		createdAt: new Date(),
		createdBy: session.email || "admin"
	})

	return redirectWithStatus(request, { status: "success" })
}


