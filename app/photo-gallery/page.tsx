import Layout from "@/components/layout/Layout"
import Link from "next/link"
import CmsImage from "@/components/CmsImage"
import { loadPhotoGalleryIndex, PLACEHOLDER_IMAGE } from "@/lib/photo-gallery-index"

export const dynamic = "force-dynamic"

export default async function PhotoGallery() {
	const galleryItems = await loadPhotoGalleryIndex()
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
										<h3 className="title">Photo Gallery</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">Photo Gallery</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="project-area-3 pt-120 pb-120 overflow-hidden">
						<div className="container">
							{galleryItems.length === 0 ? (
								<div style={{ textAlign: "center", color: "#6b7280", fontSize: "18px" }}>
									No albums available.
								</div>
							) : (
								<div className="row gy-30">
									{galleryItems.map((item) => (
										<div className="col-lg-6" key={item.id}>
											<div className="gallery-card">
												<CmsImage
													src={item.coverImageUrl || PLACEHOLDER_IMAGE}
													alt={item.title}
													width={1200}
													height={675}
													sizes="(max-width: 991px) 100vw, 50vw"
													className="gallery-image"
													style={{ width: "100%", height: "auto", display: "block" }}
												/>
												<div className="gallery-overlay">
													<h4 className="gallery-title">{item.title}</h4>
													<p style={{ marginBottom: "12px", fontSize: "14px", opacity: 0.9 }}>
														{item.imageCount} {item.imageCount === 1 ? 'photo' : 'photos'}
													</p>
													<Link href={`/photo-gallery/${item.id}`} className="link-btn gallery-btn" prefetch={false}>
														Explore Photos
														<i className="fas fa-angle-double-right" />
													</Link>
												</div>
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
