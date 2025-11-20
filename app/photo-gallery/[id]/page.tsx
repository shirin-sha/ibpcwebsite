'use client'

import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useEffect, useState, useRef, useCallback } from "react"

export const dynamic = 'force-dynamic'

type ImageData = {
	url: string
	alt: string
}

type AlbumPageProps = {
	params: { id: string }
}

const IMAGES_PER_PAGE = 12

export default function AlbumPage({ params }: AlbumPageProps) {
	const [album, setAlbum] = useState<{ title: string; images: ImageData[] } | null>(null)
	const [displayedImages, setDisplayedImages] = useState<ImageData[]>([])
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const [hasMore, setHasMore] = useState(true)
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const observerTarget = useRef<HTMLDivElement>(null)
	const thumbnailScrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		async function fetchAlbum() {
			try {
				const response = await fetch(`/api/photo-gallery/${params.id}`)
				if (!response.ok) throw new Error('Failed to fetch album')
				
				const data = await response.json()
				setAlbum(data)
				
				// Load first batch
				const firstBatch = data.images.slice(0, IMAGES_PER_PAGE)
				setDisplayedImages(firstBatch)
				setHasMore(data.images.length > IMAGES_PER_PAGE)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching album:', error)
				setLoading(false)
			}
		}
		
		fetchAlbum()
	}, [params.id])

	const loadMore = useCallback(() => {
		if (!album || !hasMore) return
		
		const nextPage = page + 1
		const startIndex = page * IMAGES_PER_PAGE
		const endIndex = startIndex + IMAGES_PER_PAGE
		const newImages = album.images.slice(startIndex, endIndex)
		
		if (newImages.length > 0) {
			setDisplayedImages(prev => [...prev, ...newImages])
			setPage(nextPage)
			setHasMore(endIndex < album.images.length)
		} else {
			setHasMore(false)
		}
	}, [album, page, hasMore])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					loadMore()
				}
			},
			{ threshold: 0.1 }
		)

		const currentTarget = observerTarget.current
		if (currentTarget) {
			observer.observe(currentTarget)
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget)
			}
		}
	}, [loadMore, hasMore, loading])

	const openLightbox = (index: number) => {
		setCurrentImageIndex(index)
		setLightboxOpen(true)
		document.body.style.overflow = 'hidden'
	}

	const closeLightbox = () => {
		setLightboxOpen(false)
		document.body.style.overflow = 'auto'
	}

	const goToNext = () => {
		if (!album) return
		const nextIndex = (currentImageIndex + 1) % album.images.length
		setCurrentImageIndex(nextIndex)
		scrollThumbnailIntoView(nextIndex)
	}

	const goToPrev = () => {
		if (!album) return
		const prevIndex = currentImageIndex === 0 ? album.images.length - 1 : currentImageIndex - 1
		setCurrentImageIndex(prevIndex)
		scrollThumbnailIntoView(prevIndex)
	}

	const goToImage = (index: number) => {
		setCurrentImageIndex(index)
		scrollThumbnailIntoView(index)
	}

	const scrollThumbnailIntoView = (index: number) => {
		if (thumbnailScrollRef.current) {
			const thumbnail = thumbnailScrollRef.current.children[index] as HTMLElement
			if (thumbnail) {
				thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
			}
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!lightboxOpen) return
			
			if (e.key === 'Escape') closeLightbox()
			else if (e.key === 'ArrowRight') goToNext()
			else if (e.key === 'ArrowLeft') goToPrev()
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lightboxOpen, currentImageIndex, album])

	if (loading) {
		return (
			<Layout headerStyle={1} footerStyle={1}>
				<section className="pt-120 pb-120">
					<div className="container">
						<div style={{ textAlign: "center", padding: "60px 20px" }}>
							<div className="spinner-border text-primary" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<p style={{ marginTop: "16px", color: "#6b7280" }}>Loading album...</p>
						</div>
					</div>
				</section>
			</Layout>
		)
	}

	if (!album) {
		return (
			<Layout headerStyle={1} footerStyle={1}>
				<section className="pt-120 pb-120">
					<div className="container">
						<div style={{ textAlign: "center", padding: "60px 20px" }}>
							<h3>Album not found</h3>
							<Link href="/photo-gallery" className="btn mt-3">
								<span className="btn-text" data-text="Back to Gallery" />
							</Link>
						</div>
					</div>
				</section>
			</Layout>
		)
	}
	
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
										<h3 className="title">{album.title}</h3>
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
												<Link href="/photo-gallery">Photo Gallery</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">{album.title}</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="pt-120 pb-120">
						<div className="container">
							<div className="row mb-40">
								<div className="col-12">
									<Link 
										href="/photo-gallery" 
										style={{ 
											fontSize: "14px", 
											color: "var(--tg-theme-primary)",
											textDecoration: "none",
											display: "inline-flex",
											alignItems: "center",
											gap: "8px",
											fontWeight: 500
										}}
									>
										<i className="fas fa-arrow-left" />
										Back to Gallery
									</Link>
								</div>
							</div>
							
							{album.images.length === 0 ? (
								<div style={{ 
									textAlign: "center", 
									color: "#6b7280", 
									fontSize: "18px", 
									padding: "80px 20px",
									background: "#f9fafb",
									borderRadius: "16px"
								}}>
									<i className="fas fa-images" style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }} />
									<p style={{ marginBottom: 0 }}>No images in this album yet.</p>
								</div>
							) : (
								<>
									<div className="mb-30" style={{ textAlign: "center" }}>
										<p style={{ color: "#6b7280", fontSize: "15px" }}>
											<i className="fas fa-images" style={{ marginRight: "8px" }} />
											{album.images.length} {album.images.length === 1 ? 'photo' : 'photos'} in this album
											{displayedImages.length < album.images.length && (
												<span style={{ marginLeft: "12px", color: "#9ca3af" }}>
													(showing {displayedImages.length})
												</span>
											)}
										</p>
									</div>
									<div className="photo-grid">
										{displayedImages.map((image, index) => (
											<div 
												className="photo-grid-item" 
												key={index}
												onClick={() => openLightbox(index)}
											>
												<img 
													src={image.url} 
													alt={image.alt}
													loading="lazy"
												/>
												<div className="photo-overlay">
													<span className="photo-number">{index + 1}</span>
													<div className="zoom-icon">
														<i className="fas fa-search-plus" />
													</div>
												</div>
											</div>
										))}
									</div>
									
									{/* Intersection observer target for infinite scroll */}
									{hasMore && (
										<div ref={observerTarget} style={{ 
											padding: "40px 20px", 
											textAlign: "center" 
										}}>
											<div className="spinner-border text-primary" role="status" style={{ width: "2rem", height: "2rem" }}>
												<span className="visually-hidden">Loading more...</span>
											</div>
											<p style={{ marginTop: "12px", color: "#6b7280", fontSize: "14px" }}>Loading more photos...</p>
										</div>
									)}
									
									{!hasMore && displayedImages.length > IMAGES_PER_PAGE && (
										<div style={{ 
											textAlign: "center", 
											padding: "40px 20px",
											color: "#9ca3af",
											fontSize: "14px"
										}}>
											<i className="fas fa-check-circle" style={{ marginRight: "8px" }} />
											All photos loaded
										</div>
									)}
								</>
							)}
						</div>
						
						{/* Lightbox Modal */}
						{lightboxOpen && album && (
							<div className="lightbox-overlay" onClick={closeLightbox}>
								<button className="lightbox-close" onClick={closeLightbox}>
									<i className="fas fa-times" />
								</button>
								
								<button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); goToPrev(); }}>
									<i className="fas fa-chevron-left" />
								</button>
								
								<button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
									<i className="fas fa-chevron-right" />
								</button>
								
								<div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
									<div className="lightbox-main-image">
										<img 
											src={album.images[currentImageIndex]?.url} 
											alt={album.images[currentImageIndex]?.alt}
										/>
									</div>
									
									<div className="lightbox-counter">
										{currentImageIndex + 1} / {album.images.length}
									</div>
									
									<div className="lightbox-thumbnails" ref={thumbnailScrollRef}>
										{album.images.map((image, index) => (
											<div 
												key={index}
												className={`lightbox-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
												onClick={() => goToImage(index)}
											>
												<img src={image.url} alt={`Thumbnail ${index + 1}`} />
											</div>
										))}
									</div>
								</div>
							</div>
						)}
						
						<style dangerouslySetInnerHTML={{
							__html: `
								.photo-grid {
									display: grid;
									grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
									gap: 20px;
								}
								
								.photo-grid-item {
									position: relative;
									overflow: hidden;
									border-radius: 12px;
									background: #f3f4f6;
									aspect-ratio: 1;
									box-shadow: 0 4px 12px rgba(0,0,0,0.08);
									transition: all 0.3s ease;
									cursor: pointer;
								}
								
								.photo-grid-item:hover {
									transform: translateY(-6px);
									box-shadow: 0 12px 24px rgba(0,0,0,0.15);
								}
								
								.photo-grid-item img {
									width: 100%;
									height: 100%;
									object-fit: cover;
									display: block;
									transition: transform 0.3s ease;
								}
								
								.photo-grid-item:hover img {
									transform: scale(1.05);
								}
								
								.photo-overlay {
									position: absolute;
									top: 0;
									left: 0;
									right: 0;
									bottom: 0;
									background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%);
									opacity: 0;
									transition: opacity 0.3s ease;
									display: flex;
									align-items: center;
									justify-content: center;
								}
								
								.photo-grid-item:hover .photo-overlay {
									opacity: 1;
								}
								
								.photo-number {
									position: absolute;
									top: 12px;
									left: 12px;
									background: rgba(255,255,255,0.95);
									color: #1f2937;
									padding: 6px 12px;
									border-radius: 20px;
									font-size: 13px;
									font-weight: 600;
									box-shadow: 0 2px 8px rgba(0,0,0,0.1);
								}
								
								.zoom-icon {
									color: #fff;
									font-size: 32px;
									text-shadow: 0 2px 8px rgba(0,0,0,0.3);
								}
								
								/* Lightbox Styles */
								.lightbox-overlay {
									position: fixed;
									top: 0;
									left: 0;
									right: 0;
									bottom: 0;
									background: rgba(0, 0, 0, 0.95);
									z-index: 9999;
									display: flex;
									align-items: center;
									justify-content: center;
									animation: fadeIn 0.3s ease;
								}
								
								@keyframes fadeIn {
									from { opacity: 0; }
									to { opacity: 1; }
								}
								
								.lightbox-close {
									position: fixed;
									top: 20px;
									right: 20px;
									width: 50px;
									height: 50px;
									background: rgba(255, 255, 255, 0.1);
									border: 2px solid rgba(255, 255, 255, 0.3);
									border-radius: 50%;
									color: #fff;
									font-size: 24px;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									transition: all 0.3s ease;
									z-index: 10001;
								}
								
								.lightbox-close:hover {
									background: rgba(255, 255, 255, 0.2);
									transform: rotate(90deg);
								}
								
								.lightbox-nav {
									position: fixed;
									top: 50%;
									transform: translateY(-50%);
									width: 50px;
									height: 50px;
									background: rgba(255, 255, 255, 0.1);
									border: 2px solid rgba(255, 255, 255, 0.3);
									border-radius: 50%;
									color: #fff;
									font-size: 20px;
									cursor: pointer;
									display: flex;
									align-items: center;
									justify-content: center;
									transition: all 0.3s ease;
									z-index: 10001;
								}
								
								.lightbox-nav:hover {
									background: rgba(255, 255, 255, 0.2);
									transform: translateY(-50%) scale(1.1);
								}
								
								.lightbox-prev {
									left: 20px;
								}
								
								.lightbox-next {
									right: 20px;
								}
								
								.lightbox-content {
									width: 100%;
									height: 100%;
									display: flex;
									flex-direction: column;
									padding: 80px 80px 20px;
								}
								
								.lightbox-main-image {
									flex: 1;
									display: flex;
									align-items: center;
									justify-content: center;
									margin-bottom: 20px;
									overflow: hidden;
								}
								
								.lightbox-main-image img {
									max-width: 100%;
									max-height: 100%;
									object-fit: contain;
									border-radius: 8px;
									box-shadow: 0 8px 32px rgba(0,0,0,0.5);
								}
								
								.lightbox-counter {
									text-align: center;
									color: #fff;
									font-size: 16px;
									font-weight: 600;
									margin-bottom: 15px;
									letter-spacing: 1px;
								}
								
								.lightbox-thumbnails {
									display: flex;
									gap: 10px;
									overflow-x: auto;
									padding: 10px 0;
									scroll-behavior: smooth;
									-webkit-overflow-scrolling: touch;
								}
								
								.lightbox-thumbnails::-webkit-scrollbar {
									height: 8px;
								}
								
								.lightbox-thumbnails::-webkit-scrollbar-track {
									background: rgba(255,255,255,0.1);
									border-radius: 4px;
								}
								
								.lightbox-thumbnails::-webkit-scrollbar-thumb {
									background: rgba(255,255,255,0.3);
									border-radius: 4px;
								}
								
								.lightbox-thumbnails::-webkit-scrollbar-thumb:hover {
									background: rgba(255,255,255,0.5);
								}
								
								.lightbox-thumbnail {
									flex-shrink: 0;
									width: 80px;
									height: 80px;
									border-radius: 8px;
									overflow: hidden;
									cursor: pointer;
									border: 3px solid transparent;
									transition: all 0.3s ease;
									opacity: 0.6;
								}
								
								.lightbox-thumbnail:hover {
									opacity: 0.9;
									transform: scale(1.05);
								}
								
								.lightbox-thumbnail.active {
									border-color: var(--tg-theme-primary, #3e80ff);
									opacity: 1;
									transform: scale(1.05);
								}
								
								.lightbox-thumbnail img {
									width: 100%;
									height: 100%;
									object-fit: cover;
								}
								
								@media (max-width: 768px) {
									.photo-grid {
										grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
										gap: 12px;
									}
									
									.photo-grid-item {
										border-radius: 8px;
									}
									
									.photo-number {
										top: 8px;
										left: 8px;
										padding: 4px 10px;
										font-size: 12px;
									}
									
									.zoom-icon {
										font-size: 24px;
									}
									
									.lightbox-content {
										padding: 70px 10px 10px;
									}
									
									.lightbox-close {
										top: 10px;
										right: 10px;
										width: 40px;
										height: 40px;
										font-size: 20px;
									}
									
									.lightbox-nav {
										width: 40px;
										height: 40px;
										font-size: 16px;
									}
									
									.lightbox-prev {
										left: 10px;
									}
									
									.lightbox-next {
										right: 10px;
									}
									
									.lightbox-thumbnail {
										width: 60px;
										height: 60px;
									}
								}
								
								@media (max-width: 480px) {
									.photo-grid {
										grid-template-columns: repeat(2, 1fr);
									}
									
									.lightbox-content {
										padding: 60px 5px 5px;
									}
									
									.lightbox-thumbnail {
										width: 50px;
										height: 50px;
									}
								}
							`
						}} />
					</section>
				</>
			</Layout>
		</>
	)
}

