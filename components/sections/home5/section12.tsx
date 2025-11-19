'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

type EventItem = {
	id: string
	title: string
	description: string
	location: string
	startDate: string
	endDate: string
}

type DisplayEvent = {
	id?: string
	dateTime: string
	location: string
	title: string
	link: string
}

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	loop: true,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true
	},
	spaceBetween: 24,
	slidesPerView: 1,
	breakpoints: {
		1200: { slidesPerView: 2 },
		1500: { slidesPerView: 3 }
	}
}

const formatDateRange = (startDate: string, endDate: string) => {
	if (!startDate && !endDate) return ""
	if (startDate === endDate || !endDate) return startDate
	return `${startDate} - ${endDate}`
}

const FALLBACK_EVENTS: DisplayEvent[] = [
	{
		dateTime: "21/08/2025 - 22/08/2025",
		location: "HICC, Hyderabad, India",
		title: "AgriBiz Connect 2025 – ASSOCHAM",
		link: "/events"
	},
	{
		dateTime: "28/08/2025 - 30/08/2025",
		location: "Bharat Mandapam, New Delhi",
		title: "11th India International MSME Expo & Summit – 2025",
		link: "/events"
	},
	{
		dateTime: "04/09/2025 - 06/09/2025",
		location: "Bharat Mandapam, New Delhi",
		title: "11th Edition iPHEX-2025: India's Mega Pharma Exhibition & B2B",
		link: "/events"
	},
	{
		dateTime: "11/09/2025",
		location: "Bombay Exhibition Centre, Goregaon, Mumbai",
		title: "15th AIGMF International Conference on 'AI and Digitalisation – the future for sustainable glassmaking",
		link: "/events"
	},
	{
		dateTime: "11/09/2025",
		location: "Bombay Exhibition Centre, Mumbai",
		title: "15th AIGMF International Conference",
		link: "/events"
	},
	{
		dateTime: "04/10/2026",
		location: "Bengaluru, India",
		title: "Tech Partnerships Showcase",
		link: "/events"
	}
]

export default function Section12() {
	const [events, setEvents] = useState<DisplayEvent[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isMounted = true
		async function fetchEvents() {
			try {
				const res = await fetch("/api/events?limit=6", { cache: "no-store" })
				if (!res.ok) throw new Error("Failed to load")
				const data = await res.json()
				if (!isMounted) return
				const mapped: DisplayEvent[] = data?.data?.map((item: EventItem) => ({
					id: item.id,
					dateTime: formatDateRange(item.startDate, item.endDate),
					location: item.location || "To be announced",
					title: item.title,
					link: `/event-details?id=${item.id}`
				}))
				setEvents(mapped.length ? mapped : FALLBACK_EVENTS)
			} catch (error) {
				console.error("Failed to fetch events", error)
				if (isMounted) setEvents(FALLBACK_EVENTS)
			} finally {
				if (isMounted) setLoading(false)
			}
		}
		fetchEvents()
		return () => {
			isMounted = false
		}
	}, [])

	const displayEvents = events.length > 0 ? events : FALLBACK_EVENTS

	return (
		<>
			<section className="testimonial-area-3 overflow-hidden mt-30">
				<div
					className="testimonial-wrap3 pt-120 pb-120 bg-cover gray-bg"
					data-background="assets/img/bg/testimonial-bg-shape3-1.png"
				>
					<div className="container">
						<div className="row align-items-center justify-content-center">
							<div className="col-xl-6 col-lg-10">
								<div className="section__title text-center mb-50">
									<span className="sub-title text-anim text-white">CONNECTING THROUGH BUSINESS AND CULTURE</span>
									<h2 className="title text-white text-anim2">
										Explore Business Events
									</h2>
									<p className="sec-text text-white">
										Stay updated with upcoming and past events—from business forums and trade shows to cultural gatherings. Discover opportunities, insights, and moments that strengthen India–Kuwait relations.
									</p>
									<div className="tg-button-wrap mt-40 justify-content-center">
										<Link
											href="/events"
											className="btn btn-three"
											style={{ border: "1px solid #ffffff" }}
										>
											<span className="btn-text" data-text="Browse All Events" />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="slider-area">
							{loading && (
								<div style={{ textAlign: "center", padding: "40px", color: "#fff", fontSize: "14px" }}>
									Loading events...
								</div>
							)}
							{!loading && displayEvents.length > 0 && (
								<Swiper {...swiperOptions}
									className="tg-swiper__slider swiper-container testi-slider3 overflow-hidden"
									id="testiSlider3"
									data-swiper-options='{}'
								>
									<div className="swiper-wrapper">
										{displayEvents.map((event, index) => (
										<SwiperSlide key={event.id || `event-${index}`}>
											<div
												className="blog__post-item blog__post-item-four"
												style={{
													padding: "20px",
													background: "#fff",
													borderRadius: "10px",
													boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
													height: "200px",
													display: "flex",
													flexDirection: "column",
													gap: "10px",
													overflow: "hidden"
												}}
											>
												<div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
													<div className="blog__post-meta" style={{ flexShrink: 0 }}>
														<ul className="list-wrap" style={{ margin: 0, padding: 0, gap: "4px" }}>
															<li style={{ margin: 0 }}>
																<Link href={event.link} style={{ color: "var(--tg-theme-primary)", padding: 0, gap: "6px", display: "inline-flex", alignItems: "center" }}>
																	<i className="fas fa-calendar" style={{ color: "var(--tg-theme-primary)" }} />
																	{event.dateTime}
																</Link>
															</li>
															<li style={{ margin: 0 }}>
																<Link href={event.link} style={{ color: "var(--tg-theme-primary)", padding: 0, gap: "6px", display: "inline-flex", alignItems: "center" }}>
																	<i className="fas fa-map-marker-alt" style={{ color: "var(--tg-theme-primary)" }} />
																	{event.location}
																</Link>
															</li>
														</ul>
													</div>
													<h3 className="title" style={{
														fontSize: "20px",
														lineHeight: 1.3,
														display: "-webkit-box",
														WebkitLineClamp: 2,
														WebkitBoxOrient: "vertical",
														overflow: "hidden"
													}}>
														<Link href={event.id ? `/event-details?id=${event.id}` : event.link} className="event-title-link">
															{event.title}
														</Link>
													</h3>
												</div>
												<div className="blog__post-bottom" style={{ marginTop: "auto" }}>
													<Link
														href={event.id ? `/event-details?id=${event.id}` : event.link}
														className="link-btn"
														style={{
															color: "var(--tg-theme-primary)",
															padding: "4px 5px",
															display: "inline-flex",
															alignItems: "center",
															gap: "6px"
														}}
													>
														LEARN MORE
														<i className="fas fa-angle-double-right" />
													</Link>
                                                </div>
											</div>
										</SwiperSlide>
										))}
									</div>
								</Swiper>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}