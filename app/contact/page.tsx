
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Contact() {
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
										<h3 className="title">Contact Us</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">Contact Us</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* breadcrumb-area-end */}
					{/*==============================
						Contact Area
					==============================*/}
					<section className="contact-page-area overflow-hidden pt-120">
						<div className="container">
							<div className="contact-wrap2 pt-120 pb-120 smoke5-bg">
								<div className="row gy-5 align-items-center">
									<div className="col-xl-5">
										<div className="section__title mb-30">
											<span className="sub-title">Get in touch</span>
											<h2 className="title">Contact us</h2>
											<p className="mt-3">We are here to answer any question you may have.</p>
										</div>
										<div className="contact-info-list">
											<div className="contact-info-card d-flex align-items-start mb-25">
												<div className="contact-info-icon">
													<i className="fas fa-id-card" />
												</div>
												<div className="contact-info-content">
													<p className="fw-semibold mb-1 text-uppercase" style={{ letterSpacing: '0.08em', color: 'var(--tg-theme-primary)' }}>Membership</p>
													<h4 className="mb-2">Would you like to join our growing team?</h4>
													<ul className="list-unstyled mb-0">
														<li><i className="fas fa-envelope me-2" />info@ibpckuwait.org</li>
														<li><i className="fas fa-phone me-2" />+965 5007 8512</li>
													</ul>
												</div>
											</div>
											<div className="contact-info-card d-flex align-items-start">
												<div className="contact-info-icon">
													<i className="fas fa-comments" />
												</div>
												<div className="contact-info-content">
													<p className="fw-semibold mb-1 text-uppercase" style={{ letterSpacing: '0.08em', color: 'var(--tg-theme-primary)' }}>Feedbacks</p>
													<h4 className="mb-2">Have a question in mind? Send a message.</h4>
													<ul className="list-unstyled mb-0">
														<li><i className="fas fa-envelope me-2" />admin@ibpckuwait.org</li>
														<li><i className="fas fa-phone me-2" />+965 5007 8512</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-7">
										<div className="contact-form-wrap2 text-center">
											<div className="section__title mb-30">
												<span className="sub-title">Send a message</span>
												<h2 className="title">Needs Help? Let’s Get in Touch</h2>
											</div>
											<form action="mail.php" method="POST" className="contact__form ajax-contact">
												<div className="row gy-4">
													<div className="col-lg-6">
														<div className="form-group">
															<input type="text" className="form-control style-white" name="name" id="name" placeholder="Your Name" />
														</div>
													</div>
													<div className="col-lg-6">
														<div className="form-group">
															<input type="text" className="form-control style-white" name="email" id="email" placeholder="Email Address" />
														</div>
													</div>
													<div className="col-12">
														<div className="form-group">
															<input type="text" className="form-control style-white" name="subject" id="subject" placeholder="Subject" />
														</div>
													</div>
													<div className="col-12">
														<div className="form-group">
															<textarea name="message" placeholder="Your Message (optional)" id="contactForm" className="form-control style-white" />
														</div>
													</div>
												</div>
												<button type="submit" className="btn mt-30">
													<span className="btn-text" data-text="Send Message" />
												</button>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / Contact Section ========*/}
				</>
			</Layout>
		</>
	)
}