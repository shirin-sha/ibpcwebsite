import { unstable_cache } from "next/cache"
import { CMS_PHOTO_GALLERY_TAG } from "@/lib/cms-revalidate"
import { getDb } from "@/lib/mongodb"

export type PhotoGalleryIndexItem = {
	id: string
	title: string
	coverImageUrl: string
	imageCount: number
}

const PLACEHOLDER_IMAGE = "/assets/img/project/project3-1.jpg"

export async function loadPhotoGalleryIndex(): Promise<PhotoGalleryIndexItem[]> {
	return unstable_cache(
		async () => {
			const db = await getDb()
			const docs = await db
				.collection("photoGallery")
				.find({})
				.sort({ createdAt: -1 })
				.limit(100)
				.toArray()

			return docs.map((doc) => ({
				id: doc._id?.toString?.() ?? "",
				title: doc.title || "Untitled album",
				coverImageUrl: doc.coverImage?.data
					? `data:${doc.coverImage.contentType || "image/jpeg"};base64,${doc.coverImage.data}`
					: PLACEHOLDER_IMAGE,
				imageCount: Array.isArray(doc.galleryImages) ? doc.galleryImages.length : 0
			}))
		},
		["photo-gallery-index"],
		{ tags: [CMS_PHOTO_GALLERY_TAG] }
	)()
}

export { PLACEHOLDER_IMAGE }
