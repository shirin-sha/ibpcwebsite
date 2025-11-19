
import Layout from "@/components/layout/Layout"
import Link from "next/link"

type ContactPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

export default function Contact({ searchParams }: ContactPageProps) {
	const status = searchParams?.status
	const error = searchParams?.error
	const alert =
		status === "success"
			? { type: "success", message: "Thank you! Your message has been sent to the IBPC admin team." }
			: error === "missing_fields"
				? { type: "error", message: "Please fill in your name, email, and message before submitting." }
				: error === "failed"
					? { type: "error", message: "Something went wrong while sending your message. Please try again." }
					: null

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
							<div className="contact-wrap2 pt-120 pb-120 smoke5-bg text-center">
								<div className="row justify-content-end">
									<div className="col-xl-12">
										<div className="contact-form-wrap2">
											<div className="section__title mb-30">
												<span className="sub-title">Reach Out Anytime</span>
												<h2 className="title">Need help? Let’s connect</h2>
											</div>
											{alert && (
												<div
													style={{
														marginBottom: "20px",
														padding: "14px 18px",
														borderRadius: "12px",
														fontWeight: 600,
														color: alert.type === "success" ? "#0f5132" : "#b42318",
														background: alert.type === "success" ? "rgba(209,231,221,0.9)" : "rgba(248,215,218,0.85)",
														border: `1px solid ${alert.type === "success" ? "rgba(25,135,84,0.4)" : "rgba(220,53,69,0.4)"}`
													}}
												>
													{alert.message}
												</div>
											)}
											<form action="/api/contact" method="POST" className="contact__form ajax-contact">
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
													<div className="col-lg-6">
														<div className="form-group">
															<input type="text" className="form-control style-white" name="mobile" id="mobile" placeholder="Mobile Number" />
														</div>
													</div>
													<div className="col-6">
														<div className="form-group">
															<select name="subject" id="subject" className="form-select style-white">
																<option selected hidden>Select Service</option>
																<option value="general-inquiries">General Inquiries</option>
																<option value="new-membership">New Membership</option>
																<option value="community-partnerships">Community &amp; Partnerships</option>
															</select>
															<label className="form-icon-right2">
																<svg width={16} height={8} viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M1.125 0.6875C1.21875 0.5625 1.34375 0.5 1.5 0.5C1.59375 0.5 1.71875 0.53125 1.8125 0.625L7.96875 6.28125L14.1562 0.625C14.3438 0.4375 14.6562 0.4375 14.8438 0.65625C15.0312 0.84375 15.0312 1.15625 14.8125 1.34375L8.3125 7.34375C8.125 7.53125 7.84375 7.53125 7.65625 7.34375L1.15625 1.34375C0.9375 1.1875 0.9375 0.875 1.125 0.6875Z" fill="currentColor" />
																</svg>
															</label>
														</div>
													</div>
													<div className="col-12">
														<div className="form-group">
															<textarea name="message" placeholder="Type Your Message" id="contactForm" className="form-control style-white" />
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
					<section className="pt-60 pb-120">
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-lg-8">
									<div className="section__title text-center mb-40">
										<span className="sub-title">Stay Connected</span>
										<h2 className="title">Contact Us</h2>
										<p className="sec-text mt-3">Our team is ready to support you across membership, events, and feedback.</p>
									</div>
								</div>
							</div>
							<div className="row gy-4">
								<div className="col-lg-6">
									<div className="info-card membership-card h-100" style={{ background: '#ffffff', borderRadius: '18px', boxShadow: '0 18px 45px rgba(0,0,0,0.07)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
										<div className="d-flex align-items-start" style={{ gap: '18px' }}>
											<div className="info-card_icon" style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--tg-theme-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
												<i className="fas fa-id-card" />
											</div>
											<div className="text-start">
												<p className="text-uppercase fw-semibold mb-2" style={{ letterSpacing: '0.08em', color: 'var(--tg-theme-primary)' }}>Membership</p>
												<h4 className="mb-3" style={{ lineHeight: 1.4 }}>Would you like to join our growing team?</h4>
												<p className="mb-0" style={{ color: '#666' }}>Get all the membership support you need from the IBPC Secretariat.</p>
											</div>
										</div>
										<div className="contact-details text-start" style={{ borderTop: '1px solid #f0f0f0', paddingTop: '18px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
											<p className="mb-0" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--tg-theme-primary)' }}>
												<i className="fas fa-envelope me-2" />
												<Link href="mailto:info@ibpckuwait.org" style={{ color: 'inherit' }}>info@ibpckuwait.org</Link>
											</p>
											<p className="mb-0" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--tg-theme-primary)' }}>
												<i className="fas fa-phone me-2" />
												<Link href="tel:+96550078512" style={{ color: 'inherit' }}>+965 5007 8512</Link>
											</p>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="info-card feedback-card h-100" style={{ background: '#ffffff', borderRadius: '18px', boxShadow: '0 18px 45px rgba(0,0,0,0.07)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
										<div className="d-flex align-items-start" style={{ gap: '18px' }}>
											<div className="info-card_icon" style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--tg-theme-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
												<i className="fas fa-comments" />
											</div>
											<div className="text-start">
												<p className="text-uppercase fw-semibold mb-2" style={{ letterSpacing: '0.08em', color: 'var(--tg-theme-primary)' }}>Feedbacks</p>
												<h4 className="mb-3" style={{ lineHeight: 1.4 }}>Have a question in mind? Send a message.</h4>
												<p className="mb-0" style={{ color: '#666' }}>Share suggestions or ask about upcoming initiatives—we're always listening.</p>
											</div>
										</div>
										<div className="contact-details text-start" style={{ borderTop: '1px solid #f0f0f0', paddingTop: '18px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
											<p className="mb-0" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--tg-theme-primary)' }}>
												<i className="fas fa-envelope me-2" />
												<Link href="mailto:admin@ibpckuwait.org" style={{ color: 'inherit' }}>admin@ibpckuwait.org</Link>
											</p>
											<p className="mb-0" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--tg-theme-primary)' }}>
												<i className="fas fa-phone me-2" />
												<Link href="tel:+96550078512" style={{ color: 'inherit' }}>+965 5007 8512</Link>
											</p>
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