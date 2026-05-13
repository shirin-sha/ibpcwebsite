import Link from 'next/link'

export default function Header1({ scroll, isMobileMenu, handleMobileMenu }: any) {
	return (
		<>
			<header>
				<div id="header-fixed-height" className="header-fixed-height-two" />
				<div className="tg-header__top tg-header__top-two d-lg-block d-none">
					<div className="container">
						<div className="row">
							<div className="col-xl-6">
								<ul className="tg-header__top-info left-side list-wrap justify-content-xl-start justify-content-center">
									<li>
										
										Empowering Indian Professionals and Businesses in Kuwait
									</li>
								</ul>
							</div>
							<div className="col-xl-6 col-md-4 d-xl-block d-none">
								<ul className="tg-header__top-right list-wrap">
									<li className="tg-header__top-social">
										<ul className="list-wrap">
											<li><Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f me-2" />Facebook</Link></li>
											<li><Link href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter me-2" />Twitter</Link></li>
											<li><Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in me-2" />Linkedin</Link></li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="tg-header__middle d-lg-block d-none">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="tgmenu__wrap">
									<nav className="tgmenu__nav">
										<div className="logo">
											<Link href="/"><img src="/assets/img/logo/logo.png" alt="Logo" /></Link>
										</div>
										<div className="info-card-wrap">
											<div className="info-card">
												<div className="info-card_icon">
													<i className="fas fa-phone-alt" />
												</div>
												<div className="info-card_content">
													<p className="info-card_text">Phone Number</p>
													<Link href="/tel:+965 5007 8512" className="info-card_link">+965 5007 8512</Link>
												</div>
											</div>
											<div className="info-card">
												<div className="info-card_icon">
													<i className="fas fa-envelope" />
												</div>
												<div className="info-card_content">
													<p className="info-card_text">Email Us Here</p>
													<Link href="/mailto:info@ibpckuwait.org" className="info-card_link">info@ibpckuwait.org</Link>
												</div>
											</div>
											<div className="info-card">
												<div className="info-card_icon">
													<i className="fas fa-calendar-alt" />
												</div>
												<div className="info-card_content">
													<p className="info-card_text">Browse Events</p>
													<Link href="/events" className="info-card_link">General Events Info</Link>
												</div>
											</div>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="sticky-header" className="tg-header__area tg-header__area-two">
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="tgmenu__wrap">
									<nav className="tgmenu__nav">
										<div className="logo d-lg-none d-block">
											<Link href="/"><img src="/assets/img/logo/logo.png" alt="Logo" style={{  height: '60px' }} /></Link>
										</div>
										<div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-lg-flex">
											<ul className="navigation">
												<li ><Link href="/">HOME</Link></li>
												<li><Link href="/about">ABOUT IBPC</Link></li>
												<li ><Link href="/committee">COMMITTEE</Link></li>
												<li className="menu-item-has-children"><Link href="#">MEMBERSHIP</Link>
													<ul className="sub-menu">
														<li><a href="https://mms.ibpckuwait.org/login" target='_blank'>Members Login</a></li>
														<li><a href="https://mms.ibpckuwait.org/register" target='_blank'>New Membership</a></li>
														<li><a href="https://mms.ibpckuwait.org" target='_blank'>Membership Directory</a></li>
													</ul>
												</li>
												<li className="menu-item-has-children"><Link href="#">MEDIA</Link>
													<ul className="sub-menu">
														<li><Link href="/events">General Events</Link></li>
														<li><Link href="/news-events">News & Events</Link></li>
														<li><Link href="/photo-gallery">Photo Gallery</Link></li>
														<li><Link href="/video-gallery">Video Gallery</Link></li>
													</ul>
												</li>
												<li><Link href="/contact">CONTACT US</Link></li>
											</ul>
										</div>
										<div className="tgmenu__action d-none d-lg-block">
											<a href="https://mms.ibpckuwait.org/login" className="btn btn-two menu-tigger" target="_blank" rel="noopener noreferrer" aria-label="Member login">
												<span className="btn-text" data-text="Member Login" />
											</a>
										</div>
										<div className="mobile-nav-toggler d-lg-none d-inline-flex">
											<Link href="#" className="sidebar-btn" aria-label="Open navigation menu">
												<span className="line" />
												<span className="line" />
												<span className="line" />
											</Link>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Mobile Menu  */}
				<div className="tgmobile__menu">
					<nav className="tgmobile__menu-box">
						<div className="close-btn"><i className="fas fa-times" /></div>
						<div className="nav-logo">
							<Link href="/"><img src="/assets/img/logo/logo.png" alt="Logo" /></Link>
						</div>
						<div className="tgmobile__menu-outer">
							{/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
						</div>
						<div className="tgmobile__menu-bottom">
							<div className="contact-info">
								<ul className="list-wrap">
									<li>Mail: <Link href="mailto:info@ibpckuwait.org">info@ibpckuwait.org</Link></li>
									<li>Phone: <Link href="tel:+96550078512">+965 5007 8512</Link></li>
								</ul>
							</div>
							<div className="social-links">
								<ul className="list-wrap">
									<li><Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f" /></Link></li>
									<li><Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter" /></Link></li>
									<li><Link href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp" /></Link>
									</li>
									<li><Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></Link></li>
									<li><Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube" /></Link>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
				<div className="tgmobile__menu-backdrop" />
				{/* End Mobile Menu */}
				{/* offCanvas-menu */}
				<div className="offCanvas__info">
					<div className="offCanvas__close-icon menu-close">
						<button type="button" aria-label="Close appointment panel"><i className="fas fa-times" /></button>
					</div>
					<div className="appointment-wrap2">
						<div className="appointment-thumb2 d-lg-block d-none">
							<img src="/assets/img/others/appointment2-1.png" alt="" />
						</div>
						<div className="row justify-content-end">
							<div className="col-lg-6">
								<div className="appointment-form-wrap">
									<div className="section__title mb-30">
										<h4 className="title">Contact IBPC Kuwait</h4>
										<p className="sec-text mt-20 mb-0">
											For membership, events, or general inquiries, please use our contact page so your message reaches the right team.
										</p>
									</div>
									<Link href="/contact" className="btn mt-20">
										<span className="btn-text" data-text="Go to Contact" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="offCanvas__overly" />
				{/* offCanvas-menu-end */}
			</header>

		</>
	)
}
