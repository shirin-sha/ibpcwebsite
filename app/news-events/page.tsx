import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getDb } from "@/lib/mongodb"
import NewsListClient from "@/components/NewsListClient"

type NewsListItem = {
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

// Static generation with ISR revalidation every 60 seconds
export const revalidate = 60

async function loadNews(): Promise<NewsListItem[]> {
	try {
		const db = await getDb()
		const newsItems = await db
			.collection("news")
			.find({})
			.sort({ createdAt: -1 })
			.toArray() // Removed limit to get ALL news items

		console.log(`[News-Events] Loaded ${newsItems.length} news items from database`)

		const mapped = newsItems.map((item) => ({
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

		console.log(`[News-Events] Mapped ${mapped.length} news items`)
		return mapped
	} catch (error) {
		console.error("Failed to fetch news list", error)
		return []
	}
}

export default async function Blog2() {
	const allNewsItems = await loadNews()

	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<main>
					<section className="breadcrumb__area fix" data-background="assets/img/bg/breadcrumb-bg.png">
						<div className="breadcrumb__bg-shape" />
						<div className="container">
							<div className="row align-items-center">
								<div className="col-xl-6">
									<div className="breadcrumb__content">
										<h3 className="title">News And Events</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">News &amp; Events</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>
					<NewsListClient newsItems={allNewsItems} />
				</main>
			</Layout>
		</>
	)
}