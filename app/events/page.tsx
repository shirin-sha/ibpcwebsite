import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getBaseUrl } from "@/lib/getBaseUrl"
import EventsFilter from "@/components/events/EventsFilter"

type EventItem = {
	id: string
	title: string
	description: string
	longDescription?: string
	location: string
	startDate: string
	endDate: string
	imageUrl?: string | null
}

const formatRange = (startDate: string, endDate: string) => {
	if (!startDate && !endDate) return ""
	if (startDate === endDate || !endDate) return startDate
	return `${startDate} to ${endDate}`
}

const parseDate = (dateStr: string): Date | null => {
	if (!dateStr) return null
	const parts = dateStr.split("/")
	if (parts.length !== 3) return null
	
	const [dd, mm, yy] = parts
	const day = parseInt(dd, 10)
	const month = parseInt(mm, 10) - 1
	const year = yy.length === 2 ? 2000 + parseInt(yy, 10) : parseInt(yy, 10)
	
	if (isNaN(day) || isNaN(month) || isNaN(year)) return null
	return new Date(year, month, day)
}

const isEventUpcoming = (event: EventItem): boolean => {
	const endDate = parseDate(event.endDate || event.startDate)
	if (!endDate) return true // If no date, consider it upcoming
	const today = new Date()
	today.setHours(0, 0, 0, 0)
	return endDate >= today
}

async function fetchEvents(): Promise<EventItem[]> {
	try {
		const res = await fetch(`${getBaseUrl()}/api/events`, { cache: "no-store" })
		if (!res.ok) return []
		const json = await res.json()
		return json?.data ?? []
	} catch (error) {
		console.error("Failed to fetch events", error)
		return []
	}
}

type EventsPageProps = {
	searchParams?: {
		filter?: "upcoming" | "past" | "all"
	}
}

export default async function Events({ searchParams }: EventsPageProps) {
	const events = await fetchEvents()
	const filter = searchParams?.filter || "all"

	const filteredEvents = events.filter((event) => {
		if (filter === "all") return true
		if (filter === "upcoming") return isEventUpcoming(event)
		if (filter === "past") return !isEventUpcoming(event)
		return true
	})

	const sortedEvents = filteredEvents.sort((a, b) => {
		const dateA = parseDate(a.startDate) || parseDate(a.endDate) || new Date(0)
		const dateB = parseDate(b.startDate) || parseDate(b.endDate) || new Date(0)
		return dateB.getTime() - dateA.getTime()
	})

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
										<h3 className="title">General Events</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">General Events</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="blog-area-2 pt-120 pb-120">
						<style dangerouslySetInnerHTML={{ __html: `
							.event-card-link:hover .blog__post-item-four {
								transform: translateY(-4px);
								box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important;
							}
						` }} />
						<div className="container">
							<div className="section__title mb-50 text-center">
								<span className="sub-title text-anim">CONNECTING COMMUNITIES THROUGH EVENTS</span>
								<h2 className="title text-anim2">
									{filter === "upcoming" ? "Upcoming General Events" : filter === "past" ? "Past General Events" : "All General Events"}
								</h2>
							</div>
							<div className="mb-40 text-center">
								<EventsFilter currentFilter={filter} />
							</div>
							{sortedEvents.length === 0 ? (
								<div className="text-center" style={{ color: "#666" }}>
									{filter === "upcoming" 
										? "No upcoming events scheduled. Stay tuned for announcements."
										: filter === "past"
											? "No past events found."
											: "No events have been added yet. Stay tuned for announcements."
									}
								</div>
							) : (
								<div className="row gy-40 justify-content-center">
									{sortedEvents.map((event) => (
										<div className="col-lg-6" key={event.id}>
											<Link href={`/event-details?id=${event.id}`} className="event-card-link" style={{ textDecoration: "none", display: "block" }}>
												<div
													className="blog__post-item blog__post-item-four"
													style={{ padding: "30px", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
												>
													<div className="blog__post-meta">
														<ul className="list-wrap">
															<li style={{ color: "var(--tg-theme-primary)" }}>
																<i className="fas fa-calendar" style={{ color: "var(--tg-theme-primary)", marginRight: "6px" }} />
																{formatRange(event.startDate, event.endDate)}
															</li>
															<li style={{ color: "var(--tg-theme-primary)" }}>
																<i className="fas fa-map-marker-alt" style={{ color: "var(--tg-theme-primary)", marginRight: "6px" }} />
																{event.location || "To be announced"}
															</li>
														</ul>
													</div>
													<h3 className="title">
														<span className="event-title-link">
															{event.title}
														</span>
													</h3>
													<p className="mb-20">{event.description}</p>
													<div className="blog__post-bottom">
														<span className="link-btn" style={{ color: "var(--tg-theme-primary)" }}>
														LEARN MORE
															<i className="fas fa-angle-double-right" />
														</span>
													</div>
												</div>
											</Link>
										</div>
									))}
								</div>
							)}
						</div>
					</section>
				</>
			</Layout>
		</>
	)
}

