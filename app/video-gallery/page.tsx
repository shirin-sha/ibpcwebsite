import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { loadVideoGalleryIndex } from "@/lib/video-gallery-index"

export const dynamic = "force-dynamic"

export default async function VideoGallery() {
	const videoItems = await loadVideoGalleryIndex()

	return (
		<>
			<Layout>
				<>
					<section className="breadcrumb__area fix" data-background="assets/img/bg/breadcrumb-bg.png">
						<div className="breadcrumb__bg-shape" />
						<div className="container">
							<div className="row align-items-center">
								<div className="col-xl-6">
									<div className="breadcrumb__content">
										<h3 className="title">Video Gallery</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">Video Gallery</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="project-area-3 pt-120 pb-120 overflow-hidden">
						<div className="container">
							{videoItems.length === 0 ? (
								<div style={{ 
									textAlign: "center", 
									color: "#6b7280", 
									fontSize: "18px", 
									padding: "80px 20px",
									background: "#f9fafb",
									borderRadius: "16px"
								}}>
									<i className="fab fa-youtube" style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5, color: "#dc2626" }} />
									<p style={{ marginBottom: 0 }}>No videos available yet.</p>
								</div>
							) : (
							<div className="row gy-30 justify-content-center">
								{videoItems.map((video, index) => (
										<div className="col-lg-6" key={video.id || index}>
										<div className="video-card">
												{video.publishedDate && (
													<div className="video-date">{video.publishedDate}</div>
												)}
												{video.embedUrl ? (
												<div className="video-frame">
													<iframe
															src={video.embedUrl}
														title={video.title}
														frameBorder="0"
														allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
														allowFullScreen
															loading="lazy"
													/>
												</div>
											) : (
												<div className="video-frame placeholder">
														<span>Video preview unavailable</span>
												</div>
											)}
											<h3 className="video-title">{video.title}</h3>
												{video.description && (
											<p className="video-description">{video.description}</p>
												)}
												{video.videoUrl && (
													<Link href={video.videoUrl} className="video-btn" target="_blank" rel="noopener noreferrer">
												Watch on YouTube
												<i className="fas fa-angle-double-right" />
											</Link>
												)}
										</div>
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
