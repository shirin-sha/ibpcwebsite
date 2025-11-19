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
	const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 0, 1), 50) : 50

	const db = await getDb()
	const newsItems = await db
		.collection("news")
		.find(signatureOnly ? { signatureEvent: true } : {})
		.sort({ createdAt: -1 })
		.limit(limit)
		.toArray()

	const data = newsItems.map((item) => ({
		id: item._id?.toString?.() ?? "",
		title: item.title ?? "",
		shortDescription: item.shortDescription ?? "",
		longDescription: item.longDescription ?? "",
		publishedDate: item.publishedDate ?? (item.createdAt instanceof Date ? toDdMmYy(item.createdAt) : ""),
		category: item.category ?? "",
		categoryLabel: CATEGORY_LABELS[item.category as keyof typeof CATEGORY_LABELS] || item.category || "General",
		signatureEvent: Boolean(item.signatureEvent),
		imageUrl: item.featuredImage?.data ? `data:${item.featuredImage.contentType};base64,${item.featuredImage.data}` : null
	}))

	return NextResponse.json({ success: true, data })
}


