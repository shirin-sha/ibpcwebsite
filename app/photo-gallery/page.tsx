
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getDb } from "@/lib/mongodb"

export const revalidate = 0

type GalleryItem = {
	id: string
	title: string
	coverImageUrl: string | null
	imageCount: number
}

const PLACEHOLDER_IMAGE = "/assets/img/project/project3-1.jpg"

async function fetchGalleryItems(): Promise<GalleryItem[]> {
	const db = await getDb()
	const docs = await db
		.collection("photoGallery")
		.find({})
		.sort({ createdAt: -1 })
		.limit(100)
		.toArray()

	return docs.map((doc) => ({
		id: doc._id?.toString?.() ?? "",
		title: doc.title || "Untitled album",
		coverImageUrl: doc.coverImage?.data
			? `data:${doc.coverImage.contentType || "image/jpeg"};base64,${doc.coverImage.data}`
			: PLACEHOLDER_IMAGE,
		imageCount: Array.isArray(doc.galleryImages) ? doc.galleryImages.length : 0
	}))
}

export default async function PhotoGallery() {
	const galleryItems = await fetchGalleryItems()
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
												<img src={item.coverImageUrl || PLACEHOLDER_IMAGE} alt={item.title} className="gallery-image" />
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