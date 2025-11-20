import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

const CATEGORY_LABELS: Record<string, string> = {
	"business-trade": "Business & Trade",
	"innovation-technology": "Innovation & Technology",
	"events-activities": "Events & Activities",
	"ibpc-community": "IBPC Community",
	"partnerships-relations": "Partnerships & Relations"
}

const toDdMmYy = (date: Date) => {
	const dd = String(date.getDate()).padStart(2, "0")
	const mm = String(date.getMonth() + 1).padStart(2, "0")
	const yy = String(date.getFullYear()).slice(-2)
	return `${dd}/${mm}/${yy}`
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const db = await getDb()
		const objectId = new ObjectId(params.id)
		const item = await db.collection("news").findOne({ _id: objectId })

		if (!item) {
			return NextResponse.json({ success: false, error: "News item not found" }, { status: 404 })
		}

		const data = {
			id: item._id?.toString?.() ?? "",
			title: item.title ?? "",
			shortDescription: item.shortDescription ?? "",
			longDescription: item.longDescription ?? "",
			publishedDate: item.publishedDate ?? (item.createdAt instanceof Date ? toDdMmYy(item.createdAt) : ""),
			category: item.category ?? "",
			categoryLabel: CATEGORY_LABELS[item.category as keyof typeof CATEGORY_LABELS] || item.category || "General",
			signatureEvent: Boolean(item.signatureEvent),
			imageUrl: item.featuredImage?.data ? `data:${item.featuredImage.contentType};base64,${item.featuredImage.data}` : null
		}

		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error("Failed to fetch news item", error)
		return NextResponse.json({ success: false, error: "Invalid news ID" }, { status: 400 })
	}
}




