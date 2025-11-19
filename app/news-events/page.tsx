
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getBaseUrl } from "@/lib/getBaseUrl"
import type { NewsCard } from "@/components/sections/home1/section9"

type NewsListItem = NewsCard & {
	longDescription: string
	signatureEvent: boolean
}

const parseDate = (date: string) => {
	const [dd, mm, yy] = date.split("/")
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	const monthIndex = parseInt(mm || "1", 10) - 1
	return {
		day: dd || "--",
		month: months[monthIndex] || "MN",
		year: yy || ""
	}
}

async function loadNews(): Promise<NewsListItem[]> {
	try {
		const baseUrl = getBaseUrl()
		const res = await fetch(`${baseUrl}/api/news?limit=12`, { cache: "no-store" })
		if (!res.ok) return []
		const json = await res.json()
		return json?.data ?? []
	} catch (error) {
		console.error("Failed to fetch news list", error)
		return []
	}
}

export default async function Blog2() {
	const newsItems = await loadNews()

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
					<section className="blog-area-1 pt-120 pb-120">
						<div className="container">
							<div className="section__title mb-50 text-center">
								<span className="sub-title text-anim">COMPLETE UPDATES ABOUT IBPC</span>
								<h2 className="title text-anim2">Recent News & Updates</h2>
							</div>
							{newsItems.length === 0 ? (
								<div className="text-center" style={{ color: "#666" }}>
									No news has been published yet. Please check back soon.
								</div>
							) : (
								<div className="row gy-40 justify-content-center">
									{newsItems.map((item) => {
										const { day, month } = parseDate(item.publishedDate || "")
										return (
											<div className="col-xl-4 col-md-6" key={item.id || item.title}>
													<Link href={`/blog-details?id=${item.id}`} style={{ textDecoration: "none" }}>
													<div className="blog__post-item blog__post-item-two blog__post-item-three" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
														<div className="blog__post-thumb image-anim" style={{ backgroundColor: "#f8f9ff", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "220px" }}>
															{item.imageUrl ? (
																<img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
															) : (
																<div style={{ padding: "40px 20px", textAlign: "center", color: "#9ca3af", fontWeight: 600 }}>
																	<span style={{ display: "block" }}>IBPC NEWS</span>
																	<small style={{ display: "block", marginTop: "8px" }}>{item.categoryLabel}</small>
																</div>
															)}
															<div className="blog__post-date">
																{day} <span>{month}</span>
															</div>
														</div>
														<div className="blog__post-content" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
															<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", gap: "10px" }}>
																<p style={{ fontSize: "13px", color: "#7c8498", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 0 }}>{item.categoryLabel}</p>
																{item.signatureEvent && (
																	<span style={{ fontSize: "12px", fontWeight: 600, color: "var(--tg-theme-primary)" }}>
																		<i className="fas fa-star" style={{ marginRight: "4px" }} />
																		Signature
																	</span>
																)}
															</div>
															<h3 className="title" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
																{item.title}
															</h3>
															<p className="text" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "auto" }}>
																{item.shortDescription || "Explore insights and updates from the IBPC community."}
															</p>
															<div className="blog__post-bottom">
																<span className="link-btn" style={{ cursor: "pointer" }}>
																	READ MORE
																	<i className="fas fa-arrow-right" />
																</span>
															</div>
														</div>
													</div>
													</Link>
												</div>
										)
									})}
								</div>
							)}
						</div>
					</section>
				</main>
			</Layout>
		</>
	)
}