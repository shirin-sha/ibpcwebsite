'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
	spaceBetween: 30,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	loop: true,
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
													<span>Welcome!</span> Where opportunities meets growth.</div>
												<h1 className="hero-title">
													<div className="title1" data-ani="slideinup" data-ani-delay="0.2s">Empowering India-Kuwait Business Connections</div>
													{/* <div className="title2" data-ani="slideinup" data-ani-delay="0.3s"> </div> */}
													{/* <div className="title3" data-ani="slideinup" data-ani-delay="0.4s">Connections</div> */}
												</h1>
												<div className="tg-button-wrap" data-ani="slideinup" data-ani-delay="0.5s">
													<Link href="/contact" className="btn btn-three">
														<span className="btn-text" data-text="Join IBPC" />
													</Link>
													<Link href="/service" className="btn btn-four">
														<span className="btn-text" data-text="Explore Initiatives" />
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
													<span>Welcome!</span> Creating a thriving platform for mutual success.</div>
												<h1 className="hero-title">
													<div className="title1" data-ani="slideinup" data-ani-delay="0.2s">Building Bridges</div>
													<div className="title2" data-ani="slideinup" data-ani-delay="0.3s">Between Nations</div>
													<div className="title3" data-ani="slideinup" data-ani-delay="0.4s">And Businesses</div>
												</h1>
												<div className="tg-button-wrap" data-ani="slideinup" data-ani-delay="0.5s">
													<Link href="/contact" className="btn btn-three">
														<span className="btn-text" data-text="Become a Member" />
													</Link>
													<Link href="/service" className="btn btn-four">
														<span className="btn-text" data-text="Discover More" />
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
													<span>Welcome!</span> Uniting business leaders across India and Kuwait.</div>
												<h1 className="hero-title">
													<div className="title1" data-ani="slideinup" data-ani-delay="0.2s">Connect.</div>
													<div className="title2" data-ani="slideinup" data-ani-delay="0.3s">Collaborate.</div>
													<div className="title3" data-ani="slideinup" data-ani-delay="0.4s">Succeed.</div>
												</h1>
												<div className="tg-button-wrap" data-ani="slideinup" data-ani-delay="0.5s">
													<Link href="/contact" className="btn btn-three">
														<span className="btn-text" data-text="View Membership" />
													</Link>
													<Link href="/service" className="btn btn-four">
														<span className="btn-text" data-text="Learn More" />
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
