
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getBaseUrl } from "@/lib/getBaseUrl"
import { redirect } from "next/navigation"
import ShareButtons from "@/components/shared/ShareButtons"

type EventItem = {
	id: string
	title: string
	description: string
	longDescription: string
	location: string
	startDate: string
	endDate: string
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

async function loadEvent(id: string): Promise<EventItem | null> {
	try {
		const baseUrl = getBaseUrl()
		const res = await fetch(`${baseUrl}/api/events/${id}`, { cache: "no-store" })
		if (!res.ok) return null
		const json = await res.json()
		return json?.data ?? null
	} catch (error) {
		console.error("Failed to fetch event", error)
		return null
	}
}

async function loadRecentEvents(excludeId: string, limit: number = 3): Promise<EventItem[]> {
	try {
		const baseUrl = getBaseUrl()
		const res = await fetch(`${baseUrl}/api/events?limit=${limit + 5}`, { cache: "no-store" })
		if (!res.ok) return []
		const json = await res.json()
		const allEvents = json?.data ?? []
		// Filter out current event and limit to requested number
		return allEvents.filter((item: EventItem) => item.id !== excludeId).slice(0, limit)
	} catch (error) {
		console.error("Failed to fetch recent events", error)
		return []
	}
}

const formatDateForRecentPost = (date: string) => {
	if (!date) return ""
	const [dd, mm, yy] = date.split("/")
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	const monthIndex = parseInt(mm || "1", 10) - 1
	const monthName = months[monthIndex] || "Jan"
	const fullYear = yy?.length === 2 ? `20${yy}` : yy || new Date().getFullYear().toString()
	return `${dd || "01"} ${monthName}, ${fullYear}`
}

const formatRange = (startDate: string, endDate: string) => {
	if (!startDate && !endDate) return ""
	if (startDate === endDate || !endDate) return startDate
	return `${startDate} to ${endDate}`
}

type EventDetailsProps = {
	searchParams: { id?: string }
}

export default async function EventDetails({ searchParams }: EventDetailsProps) {
	const eventId = searchParams?.id

	if (!eventId) {
		redirect("/events")
	}

	const event = await loadEvent(eventId)

	if (!event) {
		redirect("/events")
	}

	const recentEvents = await loadRecentEvents(eventId, 3)
	const { day, month, year } = parseDate(event.startDate || "")

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
										<h3 className="title">{event.title}</h3>
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
												<Link href="/events">General Events</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">Event Details</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* breadcrumb-area-end */}
					{/*==============================
						Event Details Area
					==============================*/}
					<section className="blog__details-area pt-120 pb-120">
						<div className="container">
							<div className="row gy-60">
								<div className="col-lg-8">
									<div className="blog__details-wrap">
										<div className="blog__details-thumb">
											<div className="thumb" style={{ backgroundColor: "#f8f9ff", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
												{event.imageUrl ? (
													<img src={event.imageUrl} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
												) : (
													<div style={{ padding: "60px 30px", textAlign: "center", color: "#9ca3af", fontWeight: 600 }}>
														<span style={{ display: "block", fontSize: "20px" }}>{formatRange(event.startDate, event.endDate) || "To be announced"}</span>
														<small style={{ display: "block", marginTop: "12px", fontSize: "14px" }}>{event.location || "Event"}</small>
													</div>
												)}
											</div>
											<div className="blog__post-date">{day} <span>{month}</span></div>
										</div>
										<div className="blog__post-meta">
										
										</div>
										<div className="blog__details-content">
											<h3 className="title mb-3">{event.title}</h3>
											<div 
												className="mb-20" 
												dangerouslySetInnerHTML={{ __html: event.longDescription || "" }}
												style={{ 
													lineHeight: "1.8",
													color: "#4b5563"
												}}
											/>
											<div className="blog__details-content-bottom">
												<div className="row align-items-center">
												
												
														<div className="blog-post-share">
															<h5 className="title">Share:</h5>
															<ShareButtons 
																url={`${getBaseUrl()}/event-details?id=${event.id}`}
																title={event.title}
															/>
														</div>
												
												</div>
											</div>
										
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<aside className="blog-sidebar">
									
										<div className="blog-widget">
											<h4 className="widget-title">Event Information</h4>
											<div className="sidebar-cat-list">
												<ul className="list-wrap">
													<li style={{ padding: "12px 0", borderBottom: "1px solid #e5e7f0" }}>
														<span style={{ fontSize: "13px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Date</span>
														<span style={{ fontWeight: 600, color: "#1f2937" }}>{formatRange(event.startDate, event.endDate) || "To be announced"}</span>
													</li>
													{event.location && (
														<li style={{ padding: "12px 0", borderBottom: "1px solid #e5e7f0" }}>
															<span style={{ fontSize: "13px", color: "#6b7280", display: "block", marginBottom: "4px" }}>Location</span>
															<span style={{ fontWeight: 600, color: "#1f2937" }}>{event.location}</span>
														</li>
													)}
												</ul>
											</div>
										</div>
										<div className="blog-widget widget-rc-post">
											<h4 className="widget-title">Recent Events</h4>
											<div className="rc-post-wrap">
												{recentEvents.length === 0 ? (
													<div style={{ padding: "20px", textAlign: "center", color: "#7c8498", fontSize: "14px" }}>
														No recent events available.
													</div>
												) : (
													recentEvents.map((eventItem) => {
														const formattedDate = formatDateForRecentPost(eventItem.startDate || "")
														return (
															<div className="rc-post-item" key={eventItem.id}>
																<div className="thumb" style={{ backgroundColor: "#f8f9ff", minWidth: "80px", minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "8px" }}>
																	{eventItem.imageUrl ? (
																		<Link href={`/event-details?id=${eventItem.id}`}>
																			<img src={eventItem.imageUrl} alt={eventItem.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
																		</Link>
																	) : (
																		<Link href={`/event-details?id=${eventItem.id}`} style={{ padding: "12px", textAlign: "center", color: "#9ca3af", fontSize: "12px", fontWeight: 600 }}>
																			{formatRange(eventItem.startDate, eventItem.endDate) || "To be announced"}
																		</Link>
																	)}
																</div>
																<div className="content">
																	{formattedDate && (
																		<span className="date"><i className="far fa-clock" />{formattedDate}</span>
																	)}
																	<h4 className="title">
																		<Link href={`/event-details?id=${eventItem.id}`} style={{ fontSize: "14px", lineHeight: "1.4" }}>
																			{eventItem.title}
																		</Link>
																	</h4>
																</div>
															</div>
														)
													})
												)}
											</div>
										</div>
									
									
									</aside>
								</div>
							</div>
						</div>
					</section>
					{/* event-details-area-end */}
				</>
			</Layout>
		</>
	)
}

