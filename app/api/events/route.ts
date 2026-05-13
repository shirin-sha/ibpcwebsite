import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

const normalizeDisplayDate = (value?: string) => value || ""

export async function GET(request: Request) {
	const url = new URL(request.url)
	const limitParam = url.searchParams.get("limit")
	const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 0, 1), 100) : 100

	const db = await getDb()
	const events = await db
		.collection("events")
		.find({})
		.project({ longDescription: 0, "featuredImage.data": 0 })
		.sort({ createdAt: -1 })
		.limit(limit)
		.toArray()

	const data = events.map((event) => {
		const id = event._id?.toString?.() ?? ""
		const hasImage = Boolean((event as { featuredImage?: unknown }).featuredImage)
		return {
			id,
			title: event.title || "",
			description: event.description || "",
			longDescription: "",
			location: event.location || "",
			startDate: normalizeDisplayDate(event.startDate),
			endDate: normalizeDisplayDate(event.endDate),
			imageUrl: hasImage ? `/api/events/${id}/featured-image` : null
		}
	})

	const response = NextResponse.json({ success: true, data })
	response.headers.set("Cache-Control", "private, no-store")
	return response
}



