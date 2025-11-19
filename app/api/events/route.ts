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
		.sort({ createdAt: -1 })
		.limit(limit)
		.toArray()

	const data = events.map((event) => ({
		id: event._id?.toString?.() ?? "",
		title: event.title || "",
		description: event.description || "",
		longDescription: event.longDescription || "",
		location: event.location || "",
		startDate: normalizeDisplayDate(event.startDate),
		endDate: normalizeDisplayDate(event.endDate),
		imageUrl: event.featuredImage?.data ? `data:${event.featuredImage.contentType};base64,${event.featuredImage.data}` : null
	}))

	return NextResponse.json({ success: true, data })
}



