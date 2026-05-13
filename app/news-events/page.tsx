import Layout from "@/components/layout/Layout"
import Link from "next/link"
import NewsListClient from "@/components/NewsListClient"
import { loadNewsEventsPage, NEWS_EVENTS_ITEMS_PER_PAGE } from "@/lib/news-events-list"

type PageProps = {
	searchParams: Record<string, string | string[] | undefined>
}

function firstParam(value: string | string[] | undefined): string {
	if (Array.isArray(value)) {
		return typeof value[0] === "string" ? value[0] : ""
	}
	return typeof value === "string" ? value : ""
}

export default async function Blog2({ searchParams }: PageProps) {
	const rawPage = parseInt(firstParam(searchParams.page), 10)
	const page = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1
	const category = firstParam(searchParams.category).trim().slice(0, 120)

	const { items, totalCount, page: resolvedPage } = await loadNewsEventsPage({
		page,
		category,
		itemsPerPage: NEWS_EVENTS_ITEMS_PER_PAGE
	})

	return (
		<>
			<Layout>
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
					<NewsListClient
						newsItems={items}
						totalCount={totalCount}
						currentPage={resolvedPage}
						currentCategory={category}
						itemsPerPage={NEWS_EVENTS_ITEMS_PER_PAGE}
					/>
				</main>
			</Layout>
		</>
	)
}
