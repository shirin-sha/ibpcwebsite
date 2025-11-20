import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

const redirectWithStatus = (request: Request, params: Record<string, string>, pathname = "/admin/video-gallery/list") => {
	const url = new URL(request.url)
	url.pathname = pathname
	url.search = new URLSearchParams(params).toString()
	return NextResponse.redirect(url)
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
	const videoId = formData.get("videoId")?.toString().trim()
	const title = formData.get("title")?.toString().trim()
	const description = formData.get("description")?.toString().trim() || ""
	const videoUrl = formData.get("videoUrl")?.toString().trim()
	const publishedDate = formData.get("publishedDate")?.toString().trim()

	if (!title) {
		return redirectWithStatus(request, { error: "missing_title" })
	}

	if (!videoUrl) {
		return redirectWithStatus(request, { error: "missing_url" })
	}

	// Format current date as dd/mm/yy if no date provided
	const getDefaultDate = () => {
		const now = new Date()
		const day = String(now.getDate()).padStart(2, '0')
		const month = String(now.getMonth() + 1).padStart(2, '0')
		const year = String(now.getFullYear()).slice(-2)
		return `${day}/${month}/${year}`
	}

	const payload: Record<string, any> = {
		title,
		description,
		videoUrl,
		publishedDate: publishedDate || getDefaultDate()
	}

	if (videoId) {
		try {
			const objectId = new ObjectId(videoId)
			payload.updatedAt = new Date()
			await db.collection("videoGallery").updateOne({ _id: objectId }, { $set: payload })
		} catch (error) {
			console.error("Failed to update video", error)
			return redirectWithStatus(request, { error: "update_failed" })
		}
		return redirectWithStatus(request, { status: "updated" })
	}

	await db.collection("videoGallery").insertOne({
		...payload,
		createdAt: new Date(),
		createdBy: session.email || "admin"
	})

	return redirectWithStatus(request, { status: "success" })
}

