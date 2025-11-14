'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
	spaceBetween: 30,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	loop: true,
	speed: 900,
	pagination: {
		el: ".slider-pagination2",
		clickable: true,
	},
}
export default function Section1() {
	return (
		<>

			<section className="hero-wrapper hero-1">
				<div className="hero-slider1 overflow-hidden">
					<Swiper {...swiperOptions} className="tg-swiper__slider swiper-container" id="heroSlider1" >
						<div className="swiper-wrapper">
							<SwiperSlide data-background="assets/img/hero/hero-bg1-1.png">
								<div className="hero-bg-shape1-1" />
								<div className="hero-bg-shape1-2" />
								<div className="container">
									<div className="row">
										<div className="col-lg-6">
											<div className="hero-style1">
												<div className="sub-title" data-ani="slideinup" data-ani-delay="0.1s">
													Where opportunities meets growth.</div>
												<h1 className="hero-title">
													<div className="title1" data-ani="slideinup" data-ani-delay="0.2s">Empowering India-Kuwait Business Connections</div>
													{/* <div className="title2" data-ani="slideinup" data-ani-delay="0.3s"> </div> */}
													{/* <div className="title3" data-ani="slideinup" data-ani-delay="0.4s">Connections</div> */}
												</h1>
												<div className="tg-button-wrap" data-ani="slideinup" data-ani-delay="0.5s">
													<Link href="/events" className="btn btn-three">
														<span className="btn-text" data-text="General Events" />
													</Link>
													<Link href="/about" className="btn btn-four">
														<span className="btn-text" data-text="Lern More" />
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide data-background="assets/img/hero/hero-bg1-2.png">
								<div className="hero-bg-shape1-1" />
								<div className="hero-bg-shape1-2" />
								<div className="container">
									<div className="row">
										<div className="col-lg-6">
											<div className="hero-style1">
												<div className="sub-title" data-ani="slideinup" data-ani-delay="0.1s">
												Creating a thriving platform for mutual success.</div>
												<h1 className="hero-title">
													<div className="title1" data-ani="slideinup" data-ani-delay="0.2s">Building Bridges</div>
													<div className="title2" data-ani="slideinup" data-ani-delay="0.3s">Between Nations</div>
													<div className="title3" data-ani="slideinup" data-ani-delay="0.4s">And Businesses</div>
												</h1>
												<div className="tg-button-wrap" data-ani="slideinup" data-ani-delay="0.5s">
													<Link href="/committee" className="btn btn-three">
														<span className="btn-text" data-text="Our Committee" />
													</Link>
													<Link href="https://mms.ibpckuwait.org/register" className="btn btn-four" target="_blank">
														<span className="btn-text" data-text="Join Now" />
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide data-background="assets/img/hero/hero-bg1-3.png">
								<div className="hero-bg-shape1-1" />
								<div className="hero-bg-shape1-2" />
								<div className="container">
									<div className="row">
										<div className="col-lg-6">
											<div className="hero-style1">
												<div className="sub-title" data-ani="slideinup" data-ani-delay="0.1s">
													Uniting business leaders across India and Kuwait.</div>
												<h1 className="hero-title">
													<div className="title1" data-ani="slideinup" data-ani-delay="0.2s">Connect.</div>
													<div className="title2" data-ani="slideinup" data-ani-delay="0.3s">Collaborate.</div>
													<div className="title3" data-ani="slideinup" data-ani-delay="0.4s">Succeed.</div>
												</h1>
												<div className="tg-button-wrap" data-ani="slideinup" data-ani-delay="0.5s">
													<Link href="/news-events" className="btn btn-three">
														<span className="btn-text" data-text="IBPC News" />
													</Link>
													<Link href="/contact" className="btn btn-four">
														<span className="btn-text" data-text="Contact Us" />
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</SwiperSlide>
						</div>
						<div className="slider-pagination2" />
					</Swiper>
				</div>
			</section>

		</>
	)
}
