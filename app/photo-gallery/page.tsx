
import Layout from "@/components/layout/Layout"
import Link from "next/link"

const galleryItems = [
	{
		title: "IBPC Picnic 2022",
		image: "/assets/img/project/project3-1.jpg"
	},
	{
		title: "IBPC Picnic 2019",
		image: "/assets/img/project/project3-2.jpg"
	},
	{
		title: "Seminar by Sunderam Fund",
		image: "/assets/img/project/project3-3.jpg"
	},
	{
		title: "Shahid Parvez Concert",
		image: "/assets/img/project/project3-4.jpg"
	},
	{
		title: "Sarod Concert",
		image: "/assets/img/project/project3-5.jpg"
	},
	{
		title: "Meritorious Students Award",
		image: "/assets/img/project/project3-6.jpg"
	},
	{
		title: "IBPC Picnic 2018",
		image: "/assets/img/project/project3-7.jpg"
	},
	{
		title: "Explore Business Opportunities",
		image: "/assets/img/project/project3-8.jpg"
	}
]

export default function PhotoGallery() {
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
							<div className="row gy-30">
								{galleryItems.map((item, index) => (
									<div className="col-lg-6" key={index}>
										<div className="gallery-card">
											<img src={item.image} alt={item.title} className="gallery-image" />
											<div className="gallery-overlay">
												<h4 className="gallery-title">{item.title}</h4>
												<Link href="#" className="link-btn gallery-btn">
													Explore Photos
													<i className="fas fa-angle-double-right" />
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
				</>
			</Layout>
		</>
	)
}