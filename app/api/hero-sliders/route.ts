import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

// Cache for 5 minutes, revalidate on demand
export const revalidate = 300

export async function GET() {
	try {
		const db = await getDb()
		const sliders = await db
			.collection("heroSliders")
			.find({})
			.sort({ order: 1, createdAt: -1 })
			.limit(10) // Limit to 10 sliders max for performance
			.toArray()

		const data = sliders.map((slider) => ({
			id: slider._id?.toString?.() ?? "",
			eyebrow: slider.eyebrow ?? "",
			mainTitle: slider.mainTitle ?? "",
			button1Text: slider.button1Text ?? "",
			button1Link: slider.button1Link ?? "",
			button2Text: slider.button2Text ?? "",
			button2Link: slider.button2Link ?? "",
			imageUrl: slider.backgroundImage?.data
				? `data:${slider.backgroundImage.contentType};base64,${slider.backgroundImage.data}`
				: null
		}))

		const response = NextResponse.json({ success: true, data })
		
		// Add caching headers
		response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
		
		return response
	} catch (error) {
		console.error("Failed to fetch hero sliders", error)
		return NextResponse.json({ success: false, data: [], error: "Failed to fetch sliders" }, { status: 500 })
	}
}

