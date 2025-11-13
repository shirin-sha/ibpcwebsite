import Layout from "@/components/layout/Layout"
import Link from "next/link"

const videoItems = [
	{
		date: "05-02-2019",
		title: "Research and Development Mr. Anant Kapadiya KTV2 - Part 1",
		description: "IBPC Kuwait – Interview – Chairman Maruti & Secretary of IBPC Mr. Anant Kapadiya.",
		link: "https://youtube.com/watch?v=CL5DIHf8D8s&feature=youtu.be",
		embed: "https://www.youtube.com/embed/CL5DIHf8D8s"
	},
	{
		date: "05-02-2019",
		title: "Mr. Anant Kapadiya KTV - Part 2",
		description: "Continuation of the IBPC Kuwait interview featuring Chairman Maruti & Secretary Mr. Anant Kapadiya.",
		link: "https://youtube.com/watch?v=CL5DIHf8D8s&feature=youtu.be",
		embed: "https://www.youtube.com/embed/CL5DIHf8D8s"
	},
	{
		date: "05-02-2019",
		title: "IBPC Speech – Living in Debt is Good",
		description: "Highlights from the 2nd Annual Debate hosted on 29 November 2017 at Sahara Golf and Country Club, Kuwait.",
		link: "https://youtube.com/watch?v=CL5DIHf8D8s&feature=youtu.be",
		embed: "https://www.youtube.com/embed/CL5DIHf8D8s"
	},
    {
		date: "05-02-2019",
		title: "IBPC Speech – Living in Debt is Good",
		description: "Highlights from the 2nd Annual Debate hosted on 29 November 2017 at Sahara Golf and Country Club, Kuwait.",
		link: "https://youtube.com/watch?v=CL5DIHf8D8s&feature=youtu.be",
		embed: "https://www.youtube.com/embed/CL5DIHf8D8s"
	}
]

export default function VideoGallery() {
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
							<div className="row gy-30 justify-content-center">
								{videoItems.map((video, index) => (
									<div className="col-lg-6" key={index}>
										<div className="video-card">
											<div className="video-date">{video.date}</div>
											{video.embed ? (
												<div className="video-frame">
													<iframe
														src={video.embed}
														title={video.title}
														frameBorder="0"
														allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
														allowFullScreen
													/>
												</div>
											) : (
												<div className="video-frame placeholder">
													<span>Video preview coming soon</span>
												</div>
											)}
											<h3 className="video-title">{video.title}</h3>
											<p className="video-description">{video.description}</p>
											<Link href={video.link} className="video-btn" target="_blank" rel="noopener noreferrer">
												Watch on YouTube
												<i className="fas fa-angle-double-right" />
											</Link>
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


