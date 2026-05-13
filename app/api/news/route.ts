import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

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

export async function GET(request: Request) {
	const url = new URL(request.url)
	const limitParam = url.searchParams.get("limit")
	const signatureOnly = url.searchParams.get("signature") === "true"
	const categoryParam = url.searchParams.get("category")
	const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 0, 1), 100) : 50

	// Build query filter
	const query: Record<string, any> = {}
	if (signatureOnly) {
		query.signatureEvent = true
	}
	if (categoryParam) {
		query.category = categoryParam
	}

	const db = await getDb()
	const newsItems = await db
		.collection("news")
		.find(query)
		.project({ longDescription: 0, "featuredImage.data": 0 })
		.sort({ createdAt: -1 })
		.limit(limit)
		.toArray()

	const data = newsItems.map((item) => {
		const id = item._id?.toString?.() ?? ""
		const hasImage = Boolean((item as { featuredImage?: unknown }).featuredImage)
		return {
			id,
			title: item.title ?? "",
			shortDescription: item.shortDescription ?? "",
			longDescription: "",
			publishedDate: item.publishedDate ?? (item.createdAt instanceof Date ? toDdMmYy(item.createdAt) : ""),
			category: item.category ?? "",
			categoryLabel: CATEGORY_LABELS[item.category as keyof typeof CATEGORY_LABELS] || item.category || "General",
			signatureEvent: Boolean(item.signatureEvent),
			showOnHomepage: Boolean(item.showOnHomepage),
			imageUrl: hasImage ? `/api/news/${id}/featured-image` : null
		}
	})

	const response = NextResponse.json({ success: true, data })
	response.headers.set("Cache-Control", "private, no-store")
	return response
}


