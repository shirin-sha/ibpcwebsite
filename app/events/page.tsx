import Layout from "@/components/layout/Layout"
import Link from "next/link"

const events = [
	{
		dateTime: "August 21, 2025 To August 22, 2025",
		location: "HICC, Novotel, Hyderabad, India",
		title: "AgriBiz Connect 2025 – ASSOCHAM",
		link: "/events/business-innovation-forum",
		description: "Engage with agri-business leaders and explore bilateral trade and investment opportunities."
	},
	{
		dateTime: "August 28, 2025 To August 30, 2025",
		location: "Bharat Mandapam, New Delhi",
		title: "11th India International MSME Expo & Summit – 2025",
		link: "/events/cultural-exchange-networking",
		description: "Connect with MSME innovators driving partnerships between India and the wider global market."
	},
	{
		dateTime: "September 4, 2025 To September 6, 2025",
		location: "Bharat Mandapam, New Delhi",
		title: "11th Edition iPHEX-2025: India’s Mega Pharma Exhibition & B2B",
		link: "/events/trade-opportunities-roundtable",
		description: "Discover the latest advancements in pharma and healthcare exports at India’s premier B2B expo."
	},
	{
		dateTime: "September 11, 2025",
		location: "Bombay Exhibition Centre, Goregaon, Mumbai",
		title: "15th AIGMF International Conference on ‘AI and Digitalisation – the future for sustainable glassmaking",
		link: "/events/investment-summit",
		description: "Learn how AI and digitalisation are transforming sustainable manufacturing in the glass sector."
	},
	{
		dateTime: "September 11, 2025",
		location: "Bombay Exhibition Centre, Mumbai",
		title: "15th AIGMF International Conference",
		link: "/events/women-in-business-mixer",
		description: "Join global experts and industry leaders discussing future-forward strategies for glass manufacturing."
	},
	{
		dateTime: "October 4, 2026, 11:00 AM",
		location: "Bengaluru, India",
		title: "Tech Partnerships Showcase",
		link: "/events/tech-partnerships-showcase",
		description: "Spotlight on collaborative tech ventures, showcasing innovation across India’s emerging industries."
	}
]

export default function Events() {
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
										<h3 className="title">General Events</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">General Events</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="blog-area-2 pt-120 pb-120">
						<div className="container">
							<div className="section__title mb-50 text-center">
								<span className="sub-title text-anim">CONNECTING COMMUNITIES THROUGH EVENTS</span>
								<h2 className="title text-anim2">Upcoming General Events</h2>
							</div>
							<div className="row gy-40 justify-content-center">
								{events.map((event, index) => (
									<div className="col-lg-6" key={index}>
										<div
											className="blog__post-item blog__post-item-four"
											style={{ padding: "30px", background: "#fff", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
										>
											<div className="blog__post-meta">
												<ul className="list-wrap">
													<li>
														<Link href={event.link} style={{ color: "var(--tg-theme-primary)" }}>
															<i className="fas fa-calendar" style={{ color: "var(--tg-theme-primary)" }} />
															{event.dateTime}
														</Link>
													</li>
													<li>
														<Link href={event.link} style={{ color: "var(--tg-theme-primary)" }}>
															<i className="fas fa-map-marker-alt" style={{ color: "var(--tg-theme-primary)" }} />
															{event.location}
														</Link>
													</li>
												</ul>
											</div>
											<h3 className="title">
												<Link href={event.link} className="event-title-link">
													{event.title}
												</Link>
											</h3>
											<p className="mb-20">{event.description}</p>
											<div className="blog__post-bottom">
												<Link href={event.link} className="link-btn" style={{ color: "var(--tg-theme-primary)" }}>
													LEARN MORE
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

