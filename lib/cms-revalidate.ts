import { revalidatePath, revalidateTag } from "next/cache"

/** Next.js fetch / unstable_cache tags — invalidated only from admin routes */
export const CMS_NEWS_TAG = "cms-news"
export const CMS_EVENTS_TAG = "cms-events"
export const CMS_PHOTO_GALLERY_TAG = "cms-photo-gallery"
export const CMS_VIDEO_GALLERY_TAG = "cms-video-gallery"

function safeRevalidate(fn: () => void, label: string) {
	try {
		fn()
	} catch (e) {
		console.error(`[cms-revalidate] ${label}`, e)
	}
}

export function revalidateNewsContent() {
	safeRevalidate(() => {
		revalidateTag(CMS_NEWS_TAG)
		revalidatePath("/")
		revalidatePath("/news-events")
		revalidatePath("/blog-details")
	}, "news")
}

export function revalidateEventsContent() {
	safeRevalidate(() => {
		revalidateTag(CMS_EVENTS_TAG)
		revalidatePath("/")
		revalidatePath("/events")
		revalidatePath("/event-details")
	}, "events")
}

export function revalidateHeroContent() {
	safeRevalidate(() => {
		revalidatePath("/")
	}, "hero")
}

export function revalidatePhotoGalleryContent() {
	safeRevalidate(() => {
		revalidateTag(CMS_PHOTO_GALLERY_TAG)
		revalidatePath("/photo-gallery", "layout")
	}, "photo-gallery")
}

export function revalidateVideoGalleryContent() {
	safeRevalidate(() => {
		revalidateTag(CMS_VIDEO_GALLERY_TAG)
		revalidatePath("/video-gallery")
	}, "video-gallery")
}
