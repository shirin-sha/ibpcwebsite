'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

type HeroSlider = {
	id: string
	eyebrow: string
	mainTitle: string
	button1Text: string
	button1Link: string
	button2Text: string
	button2Link: string
	imageUrl: string | null
}

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
	const [sliders, setSliders] = useState<HeroSlider[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isMounted = true
		let timeoutId: NodeJS.Timeout
		
		async function fetchSliders() {
			try {
				// Use cache and set timeout to prevent hanging
				const controller = new AbortController()
				timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
				
				const res = await fetch("/api/hero-sliders", { 
					cache: "force-cache", // Use cache for faster loads
					signal: controller.signal
				})
				
				if (!res.ok) throw new Error("Failed to load")
				const data = await res.json()
				
				if (!isMounted) return
				
				const mapped: HeroSlider[] = (data?.data || []).map((item: any) => ({
					id: item.id || "",
					eyebrow: item.eyebrow || "",
					mainTitle: item.mainTitle || "",
					button1Text: item.button1Text || "",
					button1Link: item.button1Link || "",
					button2Text: item.button2Text || "",
					button2Link: item.button2Link || "",
					imageUrl: item.imageUrl || null
				}))
				
				setSliders(mapped.length ? mapped : [])
			} catch (error) {
				if (error instanceof Error && error.name === 'AbortError') {
					console.error("Hero slider fetch timeout")
				} else {
					console.error("Failed to fetch hero sliders", error)
				}
				if (isMounted) {
					// Use fallback immediately on error
					setSliders([])
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
				if (timeoutId) {
					clearTimeout(timeoutId)
				}
			}
		}
		
		fetchSliders()
		
		return () => {
			isMounted = false
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
		}
	}, [])

	// Fallback default sliders if no sliders are loaded
	const defaultSliders: HeroSlider[] = [
		{
			id: "default-1",
			eyebrow: "Where opportunities meets growth.",
			mainTitle: "Empowering India-Kuwait Business Connections",
			button1Text: "General Events",
			button1Link: "/events",
			button2Text: "Learn More",
			button2Link: "/about",
			imageUrl: null
		},
		{
			id: "default-2",
			eyebrow: "Creating a thriving platform for mutual success.",
			mainTitle: "Building Bridges|Between Nations|And Businesses",
			button1Text: "Our Committee",
			button1Link: "/committee",
			button2Text: "Join Now",
			button2Link: "https://mms.ibpckuwait.org/register",
			imageUrl: null
		},
		{
			id: "default-3",
			eyebrow: "Uniting business leaders across India and Kuwait.",
			mainTitle: "Connect.|Collaborate.|Succeed.",
			button1Text: "IBPC News",
			button1Link: "/news-events",
			button2Text: "Contact Us",
			button2Link: "/contact",
			imageUrl: null
		}
	]

	const displaySliders = sliders.length > 0 ? sliders : defaultSliders

	const parseTitle = (title: string) => {
		const parts = title.split("|").map(p => p.trim()).filter(p => p)
		return parts
	}

	// Show fallback sliders immediately while loading, then update when data arrives
	const currentSliders = loading && sliders.length === 0 ? defaultSliders : displaySliders

	return (
		<>
			<section className="hero-wrapper hero-1">
				<div className="hero-slider1 overflow-hidden">
					{loading && sliders.length === 0 && (
						<div style={{ 
							position: "absolute", 
							top: "20px", 
							right: "20px", 
							zIndex: 10, 
							padding: "8px 16px", 
							background: "rgba(0,0,0,0.6)", 
							color: "#fff", 
							borderRadius: "4px",
							fontSize: "12px"
						}}>
							Loading sliders...
						</div>
					)}
					<Swiper {...swiperOptions} className="tg-swiper__slider swiper-container" id="heroSlider1" >
						<div className="swiper-wrapper">
							{currentSliders.map((slider, index) => {
								const titleParts = parseTitle(slider.mainTitle)
								const backgroundStyle = slider.imageUrl 
									? { backgroundImage: `url(${slider.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
									: { backgroundImage: `url(assets/img/hero/hero-bg1-${(index % 3) + 1}.png)` }

								return (
									<SwiperSlide key={slider.id} style={backgroundStyle} data-background={slider.imageUrl || `assets/img/hero/hero-bg1-${(index % 3) + 1}.png`}>
										<div className="hero-bg-shape1-1" />
										<div className="hero-bg-shape1-2" />
										<div className="container">
											<div className="row">
												<div className="col-lg-6">
													<div className="hero-style1">
														{slider.eyebrow && (
															<div className="sub-title" data-ani="slideinup" data-ani-delay="0.1s">
																{slider.eyebrow}
															</div>
														)}
														<h1 className="hero-title">
															{titleParts.map((part, i) => (
																<div 
																	key={i} 
																	className={i === 0 ? "title1" : i === 1 ? "title2" : "title3"} 
																	data-ani="slideinup" 
																	data-ani-delay={`0.${i + 2}s`}
																>
																	{part}
																</div>
															))}
														</h1>
														{(slider.button1Text || slider.button2Text) && (
															<div className="tg-button-wrap" data-ani="slideinup" data-ani-delay={`0.${titleParts.length + 2}s`}>
																{slider.button1Text && slider.button1Link && (
																	<Link 
																		href={slider.button1Link} 
																		className="btn btn-three"
																		{...(slider.button1Link.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
																	>
																		<span className="btn-text" data-text={slider.button1Text} />
																	</Link>
																)}
																{slider.button2Text && slider.button2Link && (
																	<Link 
																		href={slider.button2Link} 
																		className="btn btn-four"
																		{...(slider.button2Link.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
																	>
																		<span className="btn-text" data-text={slider.button2Text} />
																	</Link>
																)}
															</div>
														)}
													</div>
												</div>
											</div>
										</div>
									</SwiperSlide>
								)
							})}
						</div>
						<div className="slider-pagination2" />
					</Swiper>
				</div>
			</section>
		</>
	)
}
