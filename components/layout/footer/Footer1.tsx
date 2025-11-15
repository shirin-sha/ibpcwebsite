import Link from 'next/link'

export default function Footer1() {
	return (
		<>
			<footer>
				<div className="footer__area footer__area-one  black1-bg">
					<div className="footer__bg-shape1-1"><img src="/assets/img/bg/footer-bg-shape1-1.png" alt="img" /></div>
					<div className="container">
						<div className="footer__top fix">
							<div className="row gy-40 justify-content-between align-items-center">
								<div className="col-xl-5 col-lg-6">
									<h3 className="footer__top-title">
										We Value Your Voice at IBPC Kuwait
									</h3>
								</div>
								<div className="col-auto">
									<Link href="/contact" className="btn btn-three">
										<span className="btn-text" data-text="Share Your Feedback" />
									</Link>
								</div>
							</div>
						</div>
						<div className="footer__middle">
							<div className="row justify-content-between">
								<div className="col-xl-3 col-lg-4 col-md-6">
									<div className="footer__widget footer__about">
										<div className="footer__logo">
											<Link href="/"><img src="/assets/img/logo/logo-white.png" alt="logo" /></Link>
										</div>
										<p className="footer__content mb-35">
											Indian Business & Professional Council (IBPC) Kuwait is a premier platform fostering business growth, professional excellence, and strong bilateral relations between India and Kuwait.
										</p>
										<div className="social-links">
											<ul className="list-wrap">
												<li><Link href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f" /></Link></li>
												<li><Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter" /></Link></li>
												<li><Link href="https://www.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in" /></Link></li>
												<li><Link href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram" /></Link></li>
												<li><Link href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube" /></Link></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xl-auto col-md-6">
									<div className="footer__widget footer__links">
										<h4 className="footer__widget-title">Quick Links</h4>
										<ul className="list-wrap">
											<li>
												<Link href="/about">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													About IBPC
												</Link>
											</li>
											<li>
												<Link href="/events">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													General Events
												</Link>
											</li>
											<li>
												<Link href="/ibpc-events">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													IBPC Events
												</Link>
											</li>
											<li>
												<Link href="/blog">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													News & Updates
												</Link>
											</li>
											<li>
												<Link href="/partners">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													Partners & Associations
												</Link>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-xl-auto col-md-6">
									<div className="footer__widget footer__contact">
										<h4 className="footer__widget-title">Office Information</h4>
										<div className="footer__info-item">
											<div className="footer__info-icon">
												<i className="fas fa-envelope" />
											</div>
											<div className="footer__info-content">
												<h4 className="title">Email</h4>
												<Link href="mailto:info@ibpckuwait.org">info@ibpckuwait.org</Link>
											</div>
										</div>
										<div className="footer__info-item">
											<div className="footer__info-icon">
												<i className="fas fa-phone-alt" />
											</div>
											<div className="footer__info-content">
												<h4 className="title">Phone Sec.</h4>
												<Link href="tel:+96599586968">+965 9958 6968</Link>
											</div>
										</div>
										<div className="footer__info-item">
											<div className="footer__info-icon">
												<i className="fas fa-phone-alt" />
											</div>
											<div className="footer__info-content">
												<h4 className="title">Phone Pres.</h4>
												<Link href="tel:+96599586968">+965 9958 6968</Link>
											</div>
										</div>
									
									</div>
								</div>
								<div className="col-xl-auto col-md-6">
									<div className="footer__widget footer__links">
										<h4 className="footer__widget-title">Membership Information</h4>
										<ul className="list-wrap">
											<li>
												<Link href="/member-login">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													Member's Login
												</Link>
											</li>
											<li>
												<Link href="/membership-directory">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													Membership Directory
												</Link>
											</li>
											<li>
												<Link href="/new-membership">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													New Membership
												</Link>
											</li>
											<li>
												<Link href="/committee">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													IBPC Committee
												</Link>
											</li>
											<li>
												<Link href="/gallery">
													<svg width={17} height={14} viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M9 1L15 7M15 7L9 13M15 7H0" stroke="currentColor" strokeWidth="1.5" />
													</svg>
													Photo Gallery
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="footer__bottom text-center">
						<div className="container">
							<div className="footer__copyright">
								<Link href="/">IBPC Kuwait</Link> - Copyright 2025. All rights reserved.
							</div>
						</div>
					</div>
				</div>
			</footer>

		</>
	)
}
