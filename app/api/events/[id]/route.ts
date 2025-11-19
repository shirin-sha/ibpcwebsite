import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

const normalizeDisplayDate = (value?: string) => value || ""

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const db = await getDb()
		const objectId = new ObjectId(params.id)
		const event = await db.collection("events").findOne({ _id: objectId })

		if (!event) {
			return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
		}

		const data = {
			id: event._id?.toString?.() ?? "",
			title: event.title || "",
			description: event.description || "",
			longDescription: event.longDescription || "",
			location: event.location || "",
			startDate: normalizeDisplayDate(event.startDate),
			endDate: normalizeDisplayDate(event.endDate),
			imageUrl: event.featuredImage?.data ? `data:${event.featuredImage.contentType};base64,${event.featuredImage.data}` : null
		}

		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error("Failed to fetch event", error)
		return NextResponse.json({ success: false, error: "Invalid event ID" }, { status: 400 })
	}
}


