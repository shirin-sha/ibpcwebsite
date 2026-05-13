import { unstable_cache } from "next/cache"
import { CMS_VIDEO_GALLERY_TAG } from "@/lib/cms-revalidate"
import { getDb } from "@/lib/mongodb"

export type VideoGalleryIndexItem = {
	id: string
	title: string
	description: string
	videoUrl: string
	embedUrl: string
	publishedDate: string
}

function getYouTubeEmbedUrl(url: string) {
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
		/youtube\.com\/watch\?.*v=([^&\s]+)/
	]

	for (const pattern of patterns) {
		const match = url.match(pattern)
		if (match && match[1]) {
			return `https://www.youtube.com/embed/${match[1]}`
		}
	}

	return url
}

export async function loadVideoGalleryIndex(): Promise<VideoGalleryIndexItem[]> {
	return unstable_cache(
		async () => {
			const db = await getDb()
			const docs = await db
				.collection("videoGallery")
				.find({})
				.sort({ createdAt: -1 })
				.limit(100)
				.toArray()

			return docs.map((doc) => ({
				id: doc._id?.toString?.() ?? "",
				title: doc.title || "Untitled video",
				description: doc.description || "",
				videoUrl: doc.videoUrl || "",
				embedUrl: getYouTubeEmbedUrl(doc.videoUrl || ""),
				publishedDate: doc.publishedDate || ""
			}))
		},
		["video-gallery-index"],
		{ tags: [CMS_VIDEO_GALLERY_TAG] }
	)()
}
