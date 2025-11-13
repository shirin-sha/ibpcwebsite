'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	loop: true,
	autoplay: { delay: 1000 },
	spaceBetween: 24,
	slidesPerView: 1,
	breakpoints: {
		1200: { slidesPerView: 2 },
		1500: { slidesPerView: 3 }
	}
}


export default function Section12() {
	// Define events data array
	const events = [
		{
			dateTime: "August 21, 2025 To August 22, 2025",
			location: "HICC, Novotel, Hyderabad, India",
			title: "AgriBiz Connect 2025 – ASSOCHAM",
			link: "/events/business-innovation-forum"
		},
		{
			dateTime: "August 28, 2025 To August 30, 2025",
			location: "Bharat Mandapam, New Delhi",
			title: "11th India International MSME Expo & Summit – 2025",
			link: "/events/cultural-exchange-networking"
		},
		{
			dateTime: "September 4, 2025 To September 6, 2025",
			location: "Bharat Mandapam, New Delhi",
			title: "11th Edition iPHEX-2025: India’s Mega Pharma Exhibition & B2B",
			link: "/events/trade-opportunities-roundtable"
		},
		{
			dateTime: "September 11, 2025",
			location: "Bombay Exhibition Centre, Goregaon, Mumbai",
			title: "15th AIGMF International Conference on ‘AI and Digitalisation – the future for sustainable glassmaking",
			link: "/events/investment-summit"
		},
		{
			dateTime: "September 11, 2025",
			location: "Bombay Exhibition Centre, Mumbai",
			title: "15th AIGMF International Conference",
			link: "/events/women-in-business-mixer"
		},
		{
			dateTime: "October 4, 2026, 11:00 AM",
			location: "Bengaluru, India",
			title: "Tech Partnerships Showcase",
			link: "/events/tech-partnerships-showcase"
		}
	]

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
											href="/contact"
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
							<Swiper {...swiperOptions}
								className="tg-swiper__slider swiper-container testi-slider3 overflow-hidden"
								id="testiSlider3"
								data-swiper-options='{}'
							>
								<div className="swiper-wrapper">
									{events.map((event, index) => (
										<SwiperSlide key={index}>
											<div
												className="blog__post-item blog__post-item-four"
												style={{
													padding: "30px",
													background: "#fff",
													borderRadius: "10px",
													boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
													minHeight: "320px",
													display: "flex",
													flexDirection: "column",
													justifyContent: "space-between"
												}}
											>
												<div className="blog__post-meta">
													<ul className="list-wrap">
														<li>
															<Link href={event.link} style={{ color: "var(--tg-theme-primary)" }}>
																<i className="fas fa-calendar" style={{ color: "var(--tg-theme-primary)" }} />
																{event.dateTime}
															</Link>
														</li>
														<li>
															<Link href={event.link} style={{ color: "var(--tg-theme-primary)" }}>
																<i className="fas fa-map-marker-alt" style={{ color: "var(--tg-theme-primary)" }} />
																{event.location}
															</Link>
														</li>
													</ul>
												</div>
												<h3 className="title">
													<Link href={event.link} className="event-title-link">
														{event.title}
													</Link>
												</h3>
												<div className="blog__post-bottom">
													<Link href={event.link} className="link-btn" style={{ color: "var(--tg-theme-primary)" }}>
														LEARN MORE
														<i className="fas fa-angle-double-right" />
													</Link>
												</div>
											</div>
										</SwiperSlide>
									))}
								</div>
							</Swiper>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}