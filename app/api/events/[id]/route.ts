import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

const normalizeDisplayDate = (value?: string) => value || ""

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const db = await getDb()
		const objectId = new ObjectId(params.id)
		const event = await db.collection("events").findOne(
			{ _id: objectId },
			{ projection: { "featuredImage.data": 0 } }
		)

		if (!event) {
			return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
		}

		const id = event._id?.toString?.() ?? ""
		const hasImage = Boolean((event as { featuredImage?: unknown }).featuredImage)

		const data = {
			id,
			title: event.title || "",
			description: event.description || "",
			longDescription: event.longDescription || "",
			location: event.location || "",
			startDate: normalizeDisplayDate(event.startDate),
			endDate: normalizeDisplayDate(event.endDate),
			imageUrl: hasImage ? `/api/events/${id}/featured-image` : null
		}

		const response = NextResponse.json({ success: true, data })
		response.headers.set("Cache-Control", "private, no-store")
		return response
	} catch (error) {
		console.error("Failed to fetch event", error)
		return NextResponse.json({ success: false, error: "Invalid event ID" }, { status: 400 })
	}
}







