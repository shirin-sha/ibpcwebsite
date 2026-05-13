'use client'

import Link from "next/link"
import type { NewsEventsListItem } from "@/lib/news-events-list"
import CmsImage from "@/components/CmsImage"

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

const CATEGORIES = [
	{ value: "", label: "All Categories" },
	{ value: "business-trade", label: "Business & Trade" },
	{ value: "ibpc-community", label: "IBPC Community" },
	{ value: "innovation-technology", label: "Innovation & Technology" },
	{ value: "events-activities", label: "Events & Activities" }
]

function newsEventsHref(category: string, page: number): string {
	const params = new URLSearchParams()
	if (category) {
		params.set("category", category)
	}
	if (page > 1) {
		params.set("page", String(page))
	}
	const q = params.toString()
	return q ? `/news-events?${q}` : "/news-events"
}

type Props = {
	newsItems: NewsEventsListItem[]
	totalCount: number
	currentPage: number
	currentCategory: string
	itemsPerPage: number
}

export default function NewsListClient({
	newsItems,
	totalCount,
	currentPage,
	currentCategory,
	itemsPerPage
}: Props) {
	const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage))
	const categoryLabel = CATEGORIES.find((c) => c.value === currentCategory)?.label || "All Categories"

	return (
		<section className="blog-area-1 pt-120 pb-120">
			<div className="container">
				<div className="section__title mb-30 text-center">
					<span className="sub-title text-anim">COMPLETE UPDATES ABOUT IBPC</span>
					<h2 className="title text-anim2">
						{currentCategory ? categoryLabel : "Recent News & Updates"}
					</h2>
				</div>

				<div className="mb-50" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
					{CATEGORIES.map((cat) => {
						const active = currentCategory === cat.value
						return (
							<Link
								key={cat.value || "all"}
								href={newsEventsHref(cat.value, 1)}
								scroll
								className={active ? "btn" : ""}
								style={{
									padding: "10px 20px",
									borderRadius: "8px",
									fontSize: "14px",
									fontWeight: 500,
									cursor: "pointer",
									transition: "all 0.3s ease",
									border: active ? "none" : "2px solid #e5e7eb",
									background: active ? "var(--tg-theme-primary)" : "#fff",
									color: active ? "#fff" : "#4b5563",
									textDecoration: "none"
								}}
							>
								{active ? <span className="btn-text" data-text={cat.label} /> : cat.label}
							</Link>
						)
					})}
				</div>

				{newsItems.length === 0 ? (
					<div className="text-center" style={{ color: "#666", padding: "60px 20px" }}>
						<i className="fas fa-newspaper" style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.3 }} />
						<p style={{ marginBottom: 0 }}>
							{currentCategory
								? `No news found in "${categoryLabel}" category.`
								: "No news has been published yet. Please check back soon."}
						</p>
						{currentCategory && (
							<Link href="/news-events" className="btn" style={{ marginTop: "20px", display: "inline-block" }}>
								<span className="btn-text" data-text="View All News" />
							</Link>
						)}
					</div>
				) : (
					<>
						<div className="row gy-40 justify-content-center">
							{newsItems.map((item) => {
								const { day, month } = parseDate(item.publishedDate || "")
								return (
									<div className="col-xl-4 col-md-6" key={item.id || item.title}>
										<Link href={`/blog-details?id=${item.id}`} style={{ textDecoration: "none" }}>
											<div className="blog__post-item blog__post-item-two blog__post-item-three" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
												<div
													className="blog__post-thumb image-anim"
													style={{
														backgroundColor: "#f8f9ff",
														position: "relative",
														height: "240px",
														overflow: "hidden",
														borderRadius: "12px"
													}}
												>
													{item.imageUrl ? (
														<CmsImage
															src={item.imageUrl}
															alt={item.title}
															fill
															sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
															className="object-cover"
															style={{ objectFit: "cover" }}
														/>
													) : (
														<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontWeight: 600 }}>
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

						{totalPages > 1 && (
							<div className="mt-60" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
								<Link
									href={newsEventsHref(currentCategory, Math.max(1, currentPage - 1))}
									aria-label="Previous page"
									scroll
									className="btn"
									style={{
										width: "40px",
										height: "40px",
										padding: "0",
										borderRadius: "8px",
										fontSize: "18px",
										cursor: currentPage === 1 ? "not-allowed" : "pointer",
										opacity: currentPage === 1 ? 0.5 : 1,
										border: "none",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										pointerEvents: currentPage === 1 ? "none" : "auto",
										textDecoration: "none"
									}}
								>
									<i className="fas fa-chevron-left" />
								</Link>

								<div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
									{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
										const showPage =
											pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)

										if (!showPage) {
											if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
												return (
													<span key={`ellipsis-${pageNum}`} style={{ padding: "0 4px", color: "#6b7280" }}>
														...
													</span>
												)
											}
											return null
										}

										const active = currentPage === pageNum
										return (
											<Link
												key={pageNum}
												href={newsEventsHref(currentCategory, pageNum)}
												scroll
												className={active ? "btn" : ""}
												style={{
													minWidth: "40px",
													height: "40px",
													padding: "0 12px",
													borderRadius: "8px",
													fontSize: "14px",
													fontWeight: active ? 600 : 400,
													cursor: "pointer",
													transition: "all 0.3s ease",
													border: active ? "none" : "2px solid #e5e7eb",
													background: active ? "var(--tg-theme-primary)" : "#fff",
													color: active ? "#fff" : "#4b5563",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													textDecoration: "none"
												}}
											>
												{active ? <span className="btn-text" data-text={String(pageNum)} /> : pageNum}
											</Link>
										)
									})}
								</div>

								<Link
									href={newsEventsHref(currentCategory, Math.min(totalPages, currentPage + 1))}
									aria-label="Next page"
									scroll
									className="btn"
									style={{
										width: "40px",
										height: "40px",
										padding: "0",
										borderRadius: "8px",
										fontSize: "18px",
										cursor: currentPage === totalPages ? "not-allowed" : "pointer",
										opacity: currentPage === totalPages ? 0.5 : 1,
										border: "none",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										pointerEvents: currentPage === totalPages ? "none" : "auto",
										textDecoration: "none"
									}}
								>
									<i className="fas fa-chevron-right" />
								</Link>
							</div>
						)}
					</>
				)}
			</div>
		</section>
	)
}
