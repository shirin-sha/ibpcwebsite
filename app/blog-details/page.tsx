
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getBaseUrl } from "@/lib/getBaseUrl"
import { redirect } from "next/navigation"
import ShareButtons from "@/components/shared/ShareButtons"

type NewsItem = {
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

async function loadNewsItem(id: string): Promise<NewsItem | null> {
	try {
		const baseUrl = getBaseUrl()
		const res = await fetch(`${baseUrl}/api/news/${id}`, { cache: "no-store" })
		if (!res.ok) return null
		const json = await res.json()
		return json?.data ?? null
	} catch (error) {
		console.error("Failed to fetch news item", error)
		return null
	}
}

async function loadRecentNews(excludeId: string, limit: number = 3): Promise<NewsItem[]> {
	try {
		const baseUrl = getBaseUrl()
		const res = await fetch(`${baseUrl}/api/news?limit=${limit + 5}`, { cache: "no-store" })
		if (!res.ok) return []
		const json = await res.json()
		const allNews = json?.data ?? []
		// Filter out current news item and limit to requested number
		return allNews.filter((item: NewsItem) => item.id !== excludeId).slice(0, limit)
	} catch (error) {
		console.error("Failed to fetch recent news", error)
		return []
	}
}

const formatDateForRecentPost = (date: string) => {
	if (!date) return ""
	const [dd, mm, yy] = date.split("/")
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	const monthIndex = parseInt(mm || "1", 10) - 1
	const monthName = months[monthIndex] || "Jan"
	// Convert yy to full year (assume 20xx)
	const fullYear = yy?.length === 2 ? `20${yy}` : yy || new Date().getFullYear().toString()
	return `${dd || "01"} ${monthName}, ${fullYear}`
}

type BlogDetailsProps = {
	searchParams: { id?: string }
}

export default async function BlogDetails({ searchParams }: BlogDetailsProps) {
	const newsId = searchParams?.id

	if (!newsId) {
		redirect("/news-events")
	}

	const newsItem = await loadNewsItem(newsId)

	if (!newsItem) {
		redirect("/news-events")
	}

	const recentPosts = await loadRecentNews(newsId, 3)
	const { day, month, year } = parseDate(newsItem.publishedDate || "")

	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<>
					<section className="breadcrumb__area fix" data-background="assets/img/bg/breadcrumb-bg.png">
						<div className="breadcrumb__bg-shape" />
						<div className="container">
							<div className="row align-items-center">
								<div className="col-xl-6">
									<div className="breadcrumb__content">
										<h3 className="title">{newsItem.title}</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">
												<Link href="/news-events">News &amp; Events</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">Blog Details</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* breadcrumb-area-end */}
					{/*==============================
						Blog Details Area
					==============================*/}
					<section className="blog__details-area pt-120 pb-120">
						<div className="container">
							<div className="row gy-60">
								<div className="col-lg-8">
									<div className="blog__details-wrap">
										<div className="blog__details-thumb">
											<div className="thumb" style={{ backgroundColor: "#f8f9ff", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
												{newsItem.imageUrl ? (
													<img src={newsItem.imageUrl} alt={newsItem.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
												) : (
													<div style={{ padding: "60px 30px", textAlign: "center", color: "#9ca3af", fontWeight: 600 }}>
														<span style={{ display: "block", fontSize: "20px" }}>IBPC NEWS</span>
														<small style={{ display: "block", marginTop: "12px", fontSize: "14px" }}>{newsItem.categoryLabel}</small>
													</div>
												)}
											</div>
											<div className="blog__post-date">{day} <span>{month}</span></div>
										</div>
										<div className="blog__post-meta">
											<ul className="list-wrap">
												<li><Link href="/news-events">
													<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M8 0C3.5625 0 0 3.59375 0 8C0 12.4375 3.5625 16 8 16C12.4062 16 16 12.4375 16 8C16 3.59375 12.4062 0 8 0ZM8 15C6.5 15 5.125 14.5625 4 13.7812C4.125 12.2188 5.40625 11 7 11H9C10.5625 11 11.8438 12.2188 11.9688 13.7812C10.8438 14.5625 9.46875 15 8 15ZM12.8438 13.0312C12.4062 11.3125 10.8438 10 9 10H7C5.125 10 3.5625 11.3125 3.125 13.0312C1.8125 11.75 1 9.96875 1 8C1 4.15625 4.125 1 8 1C11.8438 1 15 4.15625 15 8C15 9.96875 14.1562 11.75 12.8438 13.0312ZM8 4C6.59375 4 5.5 5.125 5.5 6.5C5.5 7.90625 6.59375 9 8 9C9.375 9 10.5 7.90625 10.5 6.5C10.5 5.125 9.375 4 8 4ZM8 8C7.15625 8 6.5 7.34375 6.5 6.5C6.5 5.6875 7.15625 5 8 5C8.8125 5 9.5 5.6875 9.5 6.5C9.5 7.34375 8.8125 8 8 8Z" fill="currentColor" />
													</svg>
													by Admin</Link></li>
												<li><Link href="/news-events">
													<svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M2.5 4.25C2.5 3.84375 2.8125 3.5 3.25 3.5C3.65625 3.5 4 3.84375 4 4.25C4 4.6875 3.65625 5 3.25 5C2.8125 5 2.5 4.6875 2.5 4.25ZM6.375 1C6.75 1 7.15625 1.1875 7.4375 1.46875L12.8125 6.84375C13.5938 7.625 13.5938 8.90625 12.8125 9.6875L8.65625 13.8438C7.875 14.625 6.59375 14.625 5.8125 13.8438L0.4375 8.46875C0.15625 8.1875 0 7.78125 0 7.40625V2.5C0 1.6875 0.65625 1 1.5 1H6.375ZM1.125 7.75L6.53125 13.1562C6.90625 13.5312 7.5625 13.5312 7.9375 13.1562L12.125 8.96875C12.5 8.59375 12.5 7.9375 12.125 7.5625L6.71875 2.15625C6.625 2.0625 6.5 2 6.375 2H1.5C1.21875 2 1 2.25 1 2.5V7.40625C1 7.53125 1.03125 7.65625 1.125 7.75ZM9.625 1.15625C9.8125 0.96875 10.125 0.96875 10.3438 1.15625L14.75 5.375C16.4062 6.9375 16.4062 9.59375 14.75 11.1562L10.8438 14.875C10.6562 15.0625 10.3438 15.0625 10.1562 14.875C9.96875 14.6562 9.96875 14.3438 10.1562 14.1562L14.0625 10.4375C15.2812 9.25 15.2812 7.28125 14.0625 6.09375L9.625 1.875C9.4375 1.6875 9.4375 1.375 9.625 1.15625Z" fill="currentColor" />
													</svg>
													{newsItem.categoryLabel}</Link></li>
											</ul>
										</div>
										<div className="blog__details-content">
											<h3 className="title mb-3">{newsItem.title}</h3>
											<div 
												className="mb-20" 
												dangerouslySetInnerHTML={{ __html: newsItem.longDescription || "" }}
												style={{ 
													lineHeight: "1.8",
													color: "#4b5563"
												}}
											/>
											<div className="blog__details-content-bottom">
												<div className="row align-items-center">
													<div className="col-md-7">
														<div className="post-tags">
															<h5 className="title">Tags:</h5>
															<ul className="list-wrap">
																<li><Link href={`/news-events?category=${newsItem.category}`}>{newsItem.categoryLabel}</Link></li>
																{newsItem.signatureEvent && (
																	<li><Link href="/news-events">Signature Event</Link></li>
																)}
															</ul>
														</div>
													</div>
													<div className="col-md-5">
														<div className="blog-post-share">
															<h5 className="title">Share:</h5>
															<ShareButtons 
																url={`${getBaseUrl()}/blog-details?id=${newsItem.id}`}
																title={newsItem.title}
															/>
														</div>
													</div>
												</div>
											</div>
										
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<aside className="blog-sidebar">
									
										<div className="blog-widget">
											<h4 className="widget-title">Categories</h4>
											<div className="sidebar-cat-list">
												<ul className="list-wrap">
													<li><Link href="#">Business Solution <span><i className="fas fa-arrow-right" /></span></Link></li>
													<li><Link href="#">Strategy Growth <span><i className="fas fa-arrow-right" /></span></Link></li>
													<li><Link href="#">Finance Solution <span><i className="fas fa-arrow-right" /></span></Link></li>
													<li><Link href="#">Investment Policy <span><i className="fas fa-arrow-right" /></span></Link></li>
													<li><Link href="#">Tax Managment <span><i className="fas fa-arrow-right" /></span></Link></li>
												</ul>
											</div>
										</div>
										<div className="blog-widget widget-rc-post">
											<h4 className="widget-title">Recent Posts</h4>
											<div className="rc-post-wrap">
												{recentPosts.length === 0 ? (
													<div style={{ padding: "20px", textAlign: "center", color: "#7c8498", fontSize: "14px" }}>
														No recent posts available.
													</div>
												) : (
													recentPosts.map((post) => {
														const formattedDate = formatDateForRecentPost(post.publishedDate || "")
														return (
															<div className="rc-post-item" key={post.id}>
																<div className="thumb" style={{ backgroundColor: "#f8f9ff", minWidth: "80px", minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "8px" }}>
																	{post.imageUrl ? (
																		<Link href={`/blog-details?id=${post.id}`}>
																			<img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
																		</Link>
																	) : (
																		<Link href={`/blog-details?id=${post.id}`} style={{ padding: "12px", textAlign: "center", color: "#9ca3af", fontSize: "12px", fontWeight: 600 }}>
																			IBPC
																		</Link>
																	)}
																</div>
																<div className="content">
																	{formattedDate && (
																		<span className="date"><i className="far fa-clock" />{formattedDate}</span>
																	)}
																	<h4 className="title">
																		<Link href={`/blog-details?id=${post.id}`} style={{ fontSize: "14px", lineHeight: "1.4" }}>
																			{post.title}
																		</Link>
																	</h4>
																</div>
															</div>
														)
													})
												)}
											</div>
										</div>
									
										<div className="blog-widget">
											<h3 className="widget-title">Popular Tags</h3>
											<div className="sidebar-tag-list">
												<ul className="list-wrap">
													<li>
														<Link href="/blog">Services</Link>
													</li>
													<li>
														<Link href="/blog">Business</Link>
													</li>
													<li>
														<Link href="/blog">Consultancy</Link>
													</li>
													<li>
														<Link href="/blog">Finance</Link>
													</li>
													<li>
														<Link href="/blog">UI/UX Design</Link>
													</li>
													<li>
														<Link href="/blog">Financial</Link>
													</li>
													<li>
														<Link href="/blog">Speed</Link>
													</li>
													<li>
														<Link href="/blog">Digital</Link>
													</li>
													<li>
														<Link href="/blog">Market Analysis</Link>
													</li>
												</ul>
											</div>
										</div>
										<div className="blog-widget sidebar-banner">
											<h4 className="widget-title">Have Any Questions? Connect With Us Today!</h4>
											<p className="banner-text">Our team is here to assist you with membership, events, or partnership inquiries.</p>
											<Link className="banner-link" href="/tel:96599586968">+965 9958 6968</Link>
											<Link href="/contact" className="btn btn-two w-100"><span className="btn-text" data-text="Contact Now" /> <i className="fas fa-arrow-right" /></Link>
										</div>
									</aside>
								</div>
							</div>
						</div>
					</section>
					{/* blog-details-area-end */}
				</>

			</Layout>
		</>
	)
}