import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function TeamDetails() {
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
										<h3 className="title">Team Details</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">Team Details</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* breadcrumb-area-end */}
					{/*==============================
					Team Details Area
					==============================*/}
					<section className="team__details-area pt-120 pb-120">
						<div className="container">
							<div className="team__details-wrap">
								<div className="row gx-60 gy-60">
									<div className="col-xl-6">
										<div className="team__details-thumb">
											<div className="thumb">
												<img src="/assets/img/team/team-details-1-1.jpg" alt="img" />
											</div>
										</div>
									</div>
									<div className="col-xl-6">
										<div className="team__details-content">
											<h3 className="title mb-15">S.K. Wadhawan											</h3>
											<h4 className="subtitle">Chairman, Samara Auto Supplies Ltd</h4>
											<p className="mt-30 mb-30">Mr. S.K. Wadhawan is a respected business leader and the Chairman of Samara
Auto Supplies Ltd., one of Kuwait’s leading distributors of automotive parts.
With decades of experience in the automotive sector, he has built a strong
reputation for reliability, quality, and trust among clients and partners. Under
his leadership, Samara Auto Supplies has become synonymous with excellence
in sourcing, distribution, and customer satisfaction, catering to both retail and
commercial markets across Kuwait and the wider GCC region.</p>
											<p className="mb-30">A long-standing member of the Indian Business and Professional Council (IBPC)
Kuwait, Mr. Wadhawan actively contributes to strengthening India–Kuwait
business ties through his entrepreneurial insight and professional expertise.
Known for his integrity and commitment to community values, he continues to
inspire emerging entrepreneurs in the Indian business fraternity in Kuwait. His
dedication to innovation and sustainable growth has not only advanced his
company but also reinforced the role of Indian enterprises in Kuwait’s economic
landscape.</p>
											<ul className="team-info-wrap" style={{ listStyle: 'none',  }}>
												<li style={{ marginBottom: '20px', }}>
													<p style={{ margin: 0, fontSize: '14px', color: '#666', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
														<i className="fas fa-phone-alt" style={{ color: 'var(--tg-theme-primary)', fontSize: '16px' }} />
														Mobile
													</p>
													<h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#000',  }}><a href="tel:+96599612676">+965 9961 2676</a></h4>
												</li>
												<li style={{ marginBottom: '20px' }}>
													<p style={{ margin: 0, fontSize: '14px', color: '#666', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
														<i className="fas fa-phone" style={{ color: 'var(--tg-theme-primary)', fontSize: '16px' }} />
														Telephone
													</p>
													<h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#000',  }}><a href="tel:+96524833059">+965 2483 3059</a> <br/> <a href="tel:+96524815628">+965 2481 5628</a></h4>
												</li>
												<li style={{ marginBottom: '20px',  }}>
													<p style={{ margin: 0,  fontSize: '14px', color: '#666', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
														<i className="fas fa-envelope" style={{ color: 'var(--tg-theme-primary)', fontSize: '16px' }} />
														Email 1
													</p>
													<h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#000', wordBreak: 'break-all', }}><a href="mailto:skumar@samara-group.com">skumar@samara-group.com</a></h4>
												</li>
												<li style={{ marginBottom: '20px' }}>
													<p style={{ margin: 0, fontSize: '14px', color: '#666', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
														<i className="fas fa-envelope-open" style={{ color: 'var(--tg-theme-primary)', fontSize: '16px' }} />
														Email 2
													</p>
													<h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#000', wordBreak: 'break-all',}}><a href="mailto:samara@samara-kwt.com">samara@samara-kwt.com</a></h4>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / Team Section ========*/}
			
				</>
			</Layout>
		</>
	)
}