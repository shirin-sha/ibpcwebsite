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
			dateTime: " August 21, 2025 To August 22, 2025",
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
			dateTime: "10/04/26, 11:00 AM",
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
									<span className="sub-title text-anim">CONNECTING THROUGH BUSINESS AND CULTURE</span>
									<h2 className="title text-white text-anim2">
										Explore Business Events
									</h2>
									<p className="sec-text text-white">
										Stay updated with upcoming and past events—from business forums and trade shows to cultural gatherings. Discover opportunities, insights, and moments that strengthen India–Kuwait relations.
									</p>
									<div className="tg-button-wrap mt-40 justify-content-center">
										<Link href="/contact" className="btn btn-three">
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
											<div className="testimonial-card3">
											
											<div className="testimonial-author-card3">
                                                   
                                                    <div className="media-body">
                                                        <h4 className="testimonial-card-title" style={{ fontSize: '14px' }}>
															<i className="fas fa-calendar-alt" />
															<span style={{ marginLeft: 8 }}>{event.dateTime}</span>
														</h4>
                                                        <p className="testimonial-card-desig">
															<i className="fas fa-map-marker-alt" />
															<span style={{ marginLeft: 8 }}>{event.location}</span>
														</p>
                                                    </div>
                                                 
                                                </div>
                                                <p className="testi-text" style={{ fontSize: '20px' }}>{event.title}</p>
												<div className="tg-button-wrap mt-20">
													<Link href={event.link} className="link-btn">
														Learn More
														<i className="fas fa-arrow-right" />
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