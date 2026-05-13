import { unstable_cache } from "next/cache"
import { CMS_NEWS_TAG } from "@/lib/cms-revalidate"
import { getDb } from "@/lib/mongodb"

export const NEWS_EVENTS_ITEMS_PER_PAGE = 9

export type NewsEventsListItem = {
	id: string
	title: string
	shortDescription: string
	longDescription: string
	publishedDate: string
	category: string
	categoryLabel: string
	signatureEvent: boolean
	imageUrl: string | null
}

const CATEGORY_LABELS: Record<string, string> = {
	"business-trade": "Business & Trade",
	"innovation-technology": "Innovation & Technology",
	"events-activities": "Events & Activities",
	"ibpc-community": "IBPC Community"
}

const toDdMmYy = (date: Date) => {
	const dd = String(date.getDate()).padStart(2, "0")
	const mm = String(date.getMonth() + 1).padStart(2, "0")
	const yy = String(date.getFullYear()).slice(-2)
	return `${dd}/${mm}/${yy}`
}

export async function loadNewsEventsPage(options: {
	page: number
	category: string
	itemsPerPage?: number
}): Promise<{ items: NewsEventsListItem[]; totalCount: number; page: number }> {
	const itemsPerPage = options.itemsPerPage ?? NEWS_EVENTS_ITEMS_PER_PAGE
	const category = options.category.trim().slice(0, 120)
	const requestedPage = Number.isFinite(options.page) && options.page >= 1 ? Math.floor(options.page) : 1

	return unstable_cache(
		async () => {
			const filter: Record<string, string> = {}
			if (category) {
				filter.category = category
			}

			const db = await getDb()
			const totalCount = await db.collection("news").countDocuments(filter)
			const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage))
			let page = requestedPage
			if (page > totalPages) {
				page = totalPages
			}

			const skip = (page - 1) * itemsPerPage

			const newsItems = await db
				.collection("news")
				.find(filter)
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(itemsPerPage)
				.project({ longDescription: 0, "featuredImage.data": 0 })
				.toArray()

			const items: NewsEventsListItem[] = newsItems.map((item) => {
				const id = item._id?.toString?.() ?? ""
				const hasImage = Boolean((item as { featuredImage?: { data?: string } }).featuredImage)
				return {
					id,
					title: item.title ?? "",
					shortDescription: item.shortDescription ?? "",
					longDescription: "",
					publishedDate: item.publishedDate ?? (item.createdAt instanceof Date ? toDdMmYy(item.createdAt) : ""),
					category: item.category ?? "",
					categoryLabel: CATEGORY_LABELS[item.category as keyof typeof CATEGORY_LABELS] || item.category || "General",
					signatureEvent: Boolean(item.signatureEvent),
					imageUrl: hasImage ? `/api/news/${id}/featured-image` : null
				}
			})

			return { items, totalCount, page }
		},
		["news-events-list", category, String(itemsPerPage), String(requestedPage)],
		{ tags: [CMS_NEWS_TAG] }
	)()
}
