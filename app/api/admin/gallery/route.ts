import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

const redirectWithStatus = (request: Request, params: Record<string, string>, pathname = "/admin/gallery/list") => {
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
	const galleryId = formData.get("galleryId")?.toString().trim()
	const title = formData.get("title")?.toString().trim()

	if (!title) {
		return redirectWithStatus(request, { error: "missing_title" })
	}

	// Process cover image
	let coverImage: { data: string; contentType: string; fileName: string; size: number } | undefined
	const coverFile = formData.get("coverImage")

	if (coverFile && coverFile instanceof File && coverFile.size > 0) {
		const arrayBuffer = await coverFile.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		coverImage = {
			data: buffer.toString("base64"),
			contentType: coverFile.type || "application/octet-stream",
			fileName: coverFile.name || `cover-${Date.now()}`,
			size: buffer.length
		}
	}

	if (!galleryId && !coverImage) {
		return redirectWithStatus(request, { error: "missing_image" }, "/admin/gallery")
	}

	// Process multiple gallery images
	const galleryImages: Array<{ data: string; contentType: string; fileName: string; size: number }> = []
	const imageFiles = formData.getAll("galleryImages")

	for (const file of imageFiles) {
		if (file && file instanceof File && file.size > 0) {
			const arrayBuffer = await file.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)
			galleryImages.push({
				data: buffer.toString("base64"),
				contentType: file.type || "application/octet-stream",
				fileName: file.name || `image-${Date.now()}`,
				size: buffer.length
			})
		}
	}

	const payload: Record<string, any> = {
		title
	}

	if (coverImage) {
		payload.coverImage = coverImage
	}

	if (galleryId) {
		try {
			const objectId = new ObjectId(galleryId)
			payload.updatedAt = new Date()
			
			// Handle gallery image updates
			const existingDoc = await db.collection("photoGallery").findOne({ _id: objectId })
			let currentImages = existingDoc?.galleryImages || []
			
			// Process image deletions
			const deleteIndicesRaw = formData.get("deleteImageIndices")?.toString()
			if (deleteIndicesRaw) {
				try {
					const deleteIndices: number[] = JSON.parse(deleteIndicesRaw)
					currentImages = currentImages.filter((_: any, index: number) => !deleteIndices.includes(index))
				} catch (e) {
					console.error("Failed to parse delete indices", e)
				}
			}
			
			// Append new images if uploaded
			if (galleryImages.length > 0) {
				payload.galleryImages = [...currentImages, ...galleryImages]
			} else if (deleteIndicesRaw) {
				// Only set if we deleted images but didn't add new ones
				payload.galleryImages = currentImages
			}
			
			await db.collection("photoGallery").updateOne({ _id: objectId }, { $set: payload })
		} catch (error) {
			console.error("Failed to update gallery item", error)
			return redirectWithStatus(request, { error: "update_failed" })
		}
		return redirectWithStatus(request, { status: "updated" })
	}

	await db.collection("photoGallery").insertOne({
		...payload,
		coverImage,
		galleryImages,
		createdAt: new Date(),
		createdBy: session.email || "admin"
	})

	return redirectWithStatus(request, { status: "success" })
}


