'use client'

import Link from "next/link"
import { useState, useMemo, useEffect } from "react"

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

type Props = {
	newsItems: NewsListItem[]
}

const ITEMS_PER_PAGE = 6

export default function NewsListClient({ newsItems: allNewsItems }: Props) {
	const [selectedCategory, setSelectedCategory] = useState("")
	const [currentPage, setCurrentPage] = useState(1)

	// Debug: Log total items received
	useEffect(() => {
		console.log(`[NewsListClient] Received ${allNewsItems.length} total news items`)
	}, [allNewsItems.length])

	// Client-side filtering - instant!
	const newsItems = useMemo(() => {
		if (!selectedCategory) return allNewsItems
		const filtered = allNewsItems.filter(item => item.category === selectedCategory)
		console.log(`[NewsListClient] Filtered to ${filtered.length} items for category: ${selectedCategory}`)
		return filtered
	}, [allNewsItems, selectedCategory])

	// Reset to page 1 when category changes
	useEffect(() => {
		setCurrentPage(1)
	}, [selectedCategory])

	// Pagination calculations
	const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE)
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const paginatedItems = newsItems.slice(startIndex, endIndex)

	const categoryLabel = CATEGORIES.find(c => c.value === selectedCategory)?.label || "All Categories"

	// Pagination handlers
	const goToPage = (page: number) => {
		setCurrentPage(page)
	}

	const goToPrevious = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const goToNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	return (
		<section className="blog-area-1 pt-120 pb-120">
			<div className="container">
				<div className="section__title mb-30 text-center">
					<span className="sub-title text-anim">COMPLETE UPDATES ABOUT IBPC</span>
					<h2 className="title text-anim2">
						{selectedCategory ? categoryLabel : "Recent News & Updates"}
					</h2>
				
				</div>
				
				{/* Category Filter - Client-side instant switching */}
				<div className="mb-50" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
					{CATEGORIES.map((cat) => (
						<button
							key={cat.value}
							onClick={() => setSelectedCategory(cat.value)}
							className={selectedCategory === cat.value ? "btn" : ""}
							style={{
								padding: "10px 20px",
								borderRadius: "8px",
								fontSize: "14px",
								fontWeight: 500,
								cursor: "pointer",
								transition: "all 0.3s ease",
								border: selectedCategory === cat.value ? "none" : "2px solid #e5e7eb",
								background: selectedCategory === cat.value ? "var(--tg-theme-primary)" : "#fff",
								color: selectedCategory === cat.value ? "#fff" : "#4b5563"
							}}
						>
							{selectedCategory === cat.value ? (
								<span className="btn-text" data-text={cat.label} />
							) : (
								cat.label
							)}
						</button>
					))}
				</div>

				{newsItems.length === 0 ? (
					<div className="text-center" style={{ color: "#666", padding: "60px 20px" }}>
						<i className="fas fa-newspaper" style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.3 }} />
						<p style={{ marginBottom: 0 }}>
							{selectedCategory 
								? `No news found in "${categoryLabel}" category.` 
								: "No news has been published yet. Please check back soon."}
						</p>
						{selectedCategory && (
							<button 
								onClick={() => setSelectedCategory("")}
								className="btn" 
								style={{ marginTop: "20px" }}
							>
								<span className="btn-text" data-text="View All News" />
							</button>
						)}
					</div>
				) : (
					<>
						<div className="row gy-40 justify-content-center">
							{paginatedItems.map((item) => {
							const { day, month } = parseDate(item.publishedDate || "")
							return (
								<div className="col-xl-4 col-md-6" key={item.id || item.title}>
									<Link href={`/blog-details?id=${item.id}`} style={{ textDecoration: "none" }}>
										<div className="blog__post-item blog__post-item-two blog__post-item-three" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
											<div
												className="blog__post-thumb image-anim"
												style={{
													backgroundColor: "#f8f9ff",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													height: "240px",
													overflow: "hidden",
													borderRadius: "12px"
												}}
											>
												{item.imageUrl ? (
													<img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

						{/* Pagination Controls */}
						{totalPages > 1 && (
							<div className="mt-60" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
								<button
									onClick={goToPrevious}
									disabled={currentPage === 1}
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
										justifyContent: "center"
									}}
									aria-label="Previous page"
								>
									<i className="fas fa-chevron-left" />
								</button>

								{/* Page Numbers */}
								<div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
									{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
										// Show first page, last page, current page, and pages around current
										const showPage = 
											page === 1 || 
											page === totalPages || 
											(page >= currentPage - 1 && page <= currentPage + 1)

										if (!showPage) {
											// Show ellipsis
											if (page === currentPage - 2 || page === currentPage + 2) {
												return (
													<span key={page} style={{ padding: "0 4px", color: "#6b7280" }}>
														...
													</span>
												)
											}
											return null
										}

										return (
											<button
												key={page}
												onClick={() => goToPage(page)}
												className={currentPage === page ? "btn" : ""}
												style={{
													minWidth: "40px",
													height: "40px",
													padding: "0 12px",
													borderRadius: "8px",
													fontSize: "14px",
													fontWeight: currentPage === page ? 600 : 400,
													cursor: "pointer",
													transition: "all 0.3s ease",
													border: currentPage === page ? "none" : "2px solid #e5e7eb",
													background: currentPage === page ? "var(--tg-theme-primary)" : "#fff",
													color: currentPage === page ? "#fff" : "#4b5563"
												}}
											>
												{currentPage === page ? (
													<span className="btn-text" data-text={String(page)} />
												) : (
													page
												)}
											</button>
										)
									})}
								</div>

								<button
									onClick={goToNext}
									disabled={currentPage === totalPages}
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
										justifyContent: "center"
									}}
									aria-label="Next page"
								>
									<i className="fas fa-chevron-right" />
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</section>
	)
}


