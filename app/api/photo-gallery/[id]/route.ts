import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export const dynamic = 'force-dynamic'

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const db = await getDb()
		const doc = await db.collection("photoGallery").findOne({ _id: new ObjectId(params.id) })
		
		if (!doc) {
			return NextResponse.json({ error: "Album not found" }, { status: 404 })
		}
		
		const images = []
		
		// Add cover image first
		if (doc.coverImage?.data) {
			images.push({
				url: `data:${doc.coverImage.contentType || "image/jpeg"};base64,${doc.coverImage.data}`,
				alt: `${doc.title || "Album"} - Cover`
			})
		}
		
		// Add all gallery images
		if (Array.isArray(doc.galleryImages)) {
			doc.galleryImages.forEach((img: any, index: number) => {
				if (img.data) {
					images.push({
						url: `data:${img.contentType || "image/jpeg"};base64,${img.data}`,
						alt: `${doc.title || "Album"} - Photo ${index + 1}`
					})
				}
			})
		}
		
		return NextResponse.json({
			title: doc.title || "Untitled Album",
			images
		})
	} catch (error) {
		console.error("Failed to fetch album", error)
		return NextResponse.json({ error: "Failed to fetch album" }, { status: 500 })
	}
}




