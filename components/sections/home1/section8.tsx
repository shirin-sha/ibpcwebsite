'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 3,
	spaceBetween: 30,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
		pauseOnMouseEnter: true
	},
	loop: true,
	navigation: {
		nextEl: ".h1n",
		prevEl: ".h1p"
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 30
		},
		575: {
			slidesPerView: 2,
			spaceBetween: 30
		},
		767: {
			slidesPerView: 2,
			spaceBetween: 30
		},
		991: {
			slidesPerView: 2,
			spaceBetween: 30
		},
		1199: {
			slidesPerView: 3,
			spaceBetween: 30
		},
		1350: {
			slidesPerView: 3,
			spaceBetween: 30
		}
	}
}

type SignatureNews = {
	id: string
	title: string
	categoryLabel: string
	imageUrl: string | null
	shortDescription: string
}

const fallbackItems: SignatureNews[] = [
	{
		id: "fallback-1",
		categoryLabel: "Business & Trade",
		title: "Indian Business & Professional Council Elected New Managing Committee",
		imageUrl: "/assets/img/project/project1-1.jpg",
		shortDescription: "Leadership transition that underscores continuity and commitment."
	},
  
	{
		id: "fallback-2",
		categoryLabel: "IBPC Community",
		title: "IBPC celebrates its 14th Anniversary",
		imageUrl: "/assets/img/project/project1-2.jpg",
		shortDescription: "An evening of gratitude, nostalgia, and outlook for the future."
	},
	{
		id: "fallback-3",
		categoryLabel: "Innovation & Technology",
		title: "Seminar by Sunderam Fund on Investments in India",
		imageUrl: "/assets/img/project/project1-3.jpg",
		shortDescription: "Insights on India’s growth sectors and investment corridors."
	},
	{
		id: "fallback-4",
		categoryLabel: "Events & Activities",
		title: "Indian Business Delegates Explore Opportunities in Kuwait",
		imageUrl: "/assets/img/project/project1-4.jpg",
		shortDescription: "High-level business discussions and bilateral networking."
	}
]

export default function Section8() {
	const [items, setItems] = useState<SignatureNews[]>(fallbackItems)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isMounted = true
		async function fetchSignatureEvents() {
			try {
				const res = await fetch("/api/news?signature=true&limit=8", { cache: "no-store" })
				if (!res.ok) throw new Error("Failed to load")
				const data = await res.json()
				if (!isMounted) return
				const mapped: SignatureNews[] = data?.data?.map((item: any) => ({
					id: item.id || item.title,
					title: item.title,
					categoryLabel: item.categoryLabel,
					imageUrl: item.imageUrl,
					shortDescription: item.shortDescription || ""
				}))
				setItems(mapped.length ? mapped : fallbackItems)
			} catch (error) {
				console.error("Failed to load signature news", error)
				if (isMounted) setItems(fallbackItems)
			} finally {
				if (isMounted) setLoading(false)
			}
		}
		fetchSignatureEvents()
		return () => {
			isMounted = false
		}
	}, [])

	return (
		<section className="project-area-1 overflow-hidden">
			<div className="container">
				<div className="row justify-content-between align-items-center">
					<div className="col-xl-6 col-lg-7">
						<div className="section__title mb-50">
							<span className="sub-title text-anim">OUR IMPACT STORIES</span>
							<h2 className="title text-anim2">Our Signature Events</h2>
						</div>
					</div>
					<div className="col-auto">
						<div className="tg-button-wrap mb-50">
							<button className="slider-arrow default btn btn-five h1p" aria-label="Previous slide">
								<i className="fas fa-arrow-left" />
								<div className="btn-text" data-text="PREV" />
							</button>
							<button className="slider-arrow default btn btn-five h1n" aria-label="Next slide">
								<span className="btn-text" data-text="NEXT" />
								<i className="fas fa-arrow-right" />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="container-fluid p-0">
				<div className="project-slider1 overflow-hidden">
					<Swiper {...swiperOptions} className="tg-swiper__slider swiper-container" id="projectSlider1">
						<div className="swiper-wrapper">
							{items.map((project) => (
								<SwiperSlide key={project.id}>
									<div className="project-card image-anim">
										<div className="project-thumb" style={{ backgroundColor: "#f2f4ff" }}>
											{project.imageUrl ? (
												<img src={project.imageUrl} alt={project.title} />
											) : (
												<div style={{ padding: "40px 20px", textAlign: "center", color: "#9ca3af", fontWeight: 600 }}>
													IBPC SIGNATURE EVENT
												</div>
											)}
										</div>
										<div className="project-card-details">
										
											<h4 className="project-title" style={{ marginBottom: "8px" }}>
												<Link href={`/blog-details?id=${project.id}`}>{project.title}</Link>
											</h4>
										
										</div>
									</div>
								</SwiperSlide>
							))}
						</div>
					</Swiper>
					{loading && (
						<div style={{ textAlign: "center", marginTop: "20px", color: "#7c8498", fontSize: "14px" }}>
							Loading signature events...
						</div>
					)}
				</div>
			</div>
		</section>
	)
}