import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function Committee() {
	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<>
					{/* Breadcrumb Area */}
					<section className="breadcrumb__area fix" data-background="assets/img/bg/breadcrumb-bg.png">
						<div className="breadcrumb__bg-shape" />
						<div className="container">
							<div className="row align-items-center">
								<div className="col-xl-6">
									<div className="breadcrumb__content">
										<h3 className="title">IBPC Committee</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">Committee</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* breadcrumb-area-end */}

					{/* Committee Introduction Section */}
					<section className="about-area-2 pt-120 pb-120 overflow-hidden">
						<div className="container">
							<div className="about-wrap2">
								<div className="row gx-60 gy-5 align-items-center">
									<div className="col-xl-6">
										<div className="about-single-image">
											<img 
												src="/assets/img/others/committee.png" 
												alt="IBPC Committee" 
												style={{
													width: '100%',
													height: 'auto',
													borderRadius: '10px',
													objectFit: 'cover'
												}}
											/>
										</div>
									</div>
									<div className="col-xl-6">
										<div className="section__title">
											<span className="sub-title text-anim">DEDICATED TEAMS BEHIND IBPC'S VISION</span>
											<h2 className="title text-anim2">Committee Members</h2>
										</div>
										<p className="mt-30 mb-30">
											The Indian Business and Professional Council (IBPC), Kuwait, is led by a team of passionate and experienced individuals who bring strategic direction, organizational strength, and community spirit to life. Our Office Bearers, Senior Advisory Council, and various specialized committees work together to plan and execute initiatives that drive business, cultural, and professional collaboration between India and Kuwait.
										</p>
										<p className="mb-40">
											From overseeing web and social media outreach, organizing events and seminars, managing sponsorships, to mentoring students and honoring achievers, each committee is committed to fulfilling IBPC's mission. Their collective efforts ensure that the organization continues to thrive as a powerful bridge between the two nations.
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / Committee Introduction Section ========*/}

					{/* Committee Section */}
					<section className="team-area-1 pt-120 pb-120 gray-bg section-radius position-relative">
						<div className="team-bg-shape3-1 d-xl-block d-none">
							<img src="/assets/img/bg/team-bg-shape3-1.png" alt="img" />
						</div>
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-xl-8">
									<div className="section__title text-center mb-50">
										<span className="sub-title text-anim text-white">DRIVING IBPC'S MISSION FORWARD</span>
										<h2 className="title text-white text-anim2">Leading with Vision and Integrity</h2>
										<p className="text-white mt-20">Meet the dedicated members of IBPC Committee who guide our mission to strengthen India-Kuwait business relations</p>
									</div>
								</div>
							</div>
							<div className="row gy-30 justify-content-center">
								<div className="col-xl-3 col-md-6">
									<div className="team-card style3">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/team-3-1.jpg" alt="img" />
											</Link>
											<div className="social-wrap">
												<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
												<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
												<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
											</div>
										</div>
										<div className="team-card-details">
											<h4 className="box-title"><Link href="/team-details">Kaizar T Shakir</Link></h4>
											<span className="box-text">Hon. Chairman</span>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-md-6">
									<div className="team-card style3">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/team-3-2.jpg" alt="img" />
											</Link>
											<div className="social-wrap">
												<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
												<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
												<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
											</div>
										</div>
										<div className="team-card-details">
											<h4 className="box-title"><Link href="/team-details">Gaurav Oberoi</Link></h4>
											<span className="box-text">Hon. Vice Chairman</span>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-md-6">
									<div className="team-card style3">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/team-3-3.jpg" alt="img" />
											</Link>
											<div className="social-wrap">
												<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
												<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
												<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
											</div>
										</div>
										<div className="team-card-details">
											<h4 className="box-title"><Link href="/team-details">Suresh K P</Link></h4>
											<span className="box-text">Hon. Secretary</span>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-md-6">
									<div className="team-card style3">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/team-3-5.jpg" alt="img" />
											</Link>
											<div className="social-wrap">
												<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
												<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
												<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
											</div>
										</div>
										<div className="team-card-details">
											<h4 className="box-title"><Link href="/team-details">Sunnith Arora</Link></h4>
											<span className="box-text">Hon. Jt Secretary</span>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-md-6">
									<div className="team-card style3">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/team-3-4.jpg" alt="img" />
											</Link>
											<div className="social-wrap">
												<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
												<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
												<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
											</div>
										</div>
										<div className="team-card-details">
											<h4 className="box-title"><Link href="/team-details">Krishen Suryakanth</Link></h4>
											<span className="box-text">Hon. Treasurer</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / Committee Section ========*/}

					{/* Senior Advisory Council Section */}
					<section className="team-area-1 pt-120 pb-120 position-relative">
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-xl-8">
									<div className="section__title text-center mb-50">
										<span className="sub-title text-anim">STRATEGIC GUIDANCE AND WISDOM</span>
										<h2 className="title text-anim2">Senior Advisory Council</h2>
										<p className="mt-20">Guiding IBPC with Experience and Strategic Insight</p>
									</div>
								</div>
							</div>
							<div className="row gy-30 justify-content-center">
								<div className="col-lg-3 col-md-6">
									<div className="team-card">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/teamsc1.png" alt="img" />
											</Link>
											<div className="team-social">
												<button className="icon-btn"><i className="fas fa-share-alt" /></button>
												<div className="social-wrap">
													<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
													<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
													<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
													<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												</div>
											</div>
										</div>
										<div className="team-card-details">
										<h4 className="box-title"><Link href="/team-details">Tony Jashanma</Link></h4>
										<span className="box-text">Advisory Board Member</span>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6">
									<div className="team-card">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/teamsc2.png" alt="img" />
											</Link>
											<div className="team-social">
												<button className="icon-btn"><i className="fas fa-share-alt" /></button>
												<div className="social-wrap">
													<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
													<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
													<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
													<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												</div>
											</div>
										</div>
										<div className="team-card-details">
										<h4 className="box-title"><Link href="/team-details">S.K. Wadhawan</Link></h4>
										<span className="box-text">Advisory Board Member</span>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6">
									<div className="team-card">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/teamsc3.png" alt="img" />
											</Link>
											<div className="team-social">
												<button className="icon-btn"><i className="fas fa-share-alt" /></button>
												<div className="social-wrap">
													<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
													<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
													<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
													<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												</div>
											</div>
										</div>
										<div className="team-card-details">
										<h4 className="box-title"><Link href="/team-details">Kuldeep Singh</Link></h4>
										<span className="box-text">Advisory Board Member</span>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6">
									<div className="team-card">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/teamsc4.png" alt="img" />
											</Link>
											<div className="team-social">
												<button className="icon-btn"><i className="fas fa-share-alt" /></button>
												<div className="social-wrap">
													<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
													<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
													<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
													<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												</div>
											</div>
										</div>
										<div className="team-card-details">
										<h4 className="box-title"><Link href="/team-details">Sam Alphonso</Link></h4>
										<span className="box-text">Advisory Board Member</span>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6">
									<div className="team-card">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/teamsc5.png" alt="img" />
											</Link>
											<div className="team-social">
												<button className="icon-btn"><i className="fas fa-share-alt" /></button>
												<div className="social-wrap">
													<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
													<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
													<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
													<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												</div>
											</div>
										</div>
										<div className="team-card-details">
										<h4 className="box-title"><Link href="/team-details">Shivy Bhasin</Link></h4>
										<span className="box-text">Advisory Board Member</span>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6">
									<div className="team-card">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/teamsc6.png" alt="img" />
											</Link>
											<div className="team-social">
												<button className="icon-btn"><i className="fas fa-share-alt" /></button>
												<div className="social-wrap">
													<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
													<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
													<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
													<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												</div>
											</div>
										</div>
										<div className="team-card-details">
											<h4 className="box-title"><Link href="/team-details">Dhiraj Oberoi</Link></h4>
											<span className="box-text">Advisory Board Member</span>
										</div>
									</div>
								</div>
                                <div className="col-lg-3 col-md-6">
									<div className="team-card">
										<div className="box-img image-anim">
											<Link href="/team-details" className="thumb">
												<img src="/assets/img/team/teamsc7.png" alt="img" />
											</Link>
											<div className="team-social">
												<button className="icon-btn"><i className="fas fa-share-alt" /></button>
												<div className="social-wrap">
													<Link target="_blank" href="https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
													<Link target="_blank" href="https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
													<Link target="_blank" href="https://linkedin.com/" tabIndex={-1}><i className="fab fa-linkedin-in" /></Link>
													<Link target="_blank" href="https://instagram.com/" tabIndex={-1}><i className="fab fa-instagram" /></Link>
												</div>
											</div>
										</div>
										<div className="team-card-details">
											<h4 className="box-title"><Link href="/team-details">Gurvinder Singh Lamba</Link></h4>
											<span className="box-text">Advisory Board Member</span>
										</div>
									</div>
								</div>
                                
							</div>
						</div>
					</section>
					{/*======== / Senior Advisory Council Section ========*/}

					{/* Organizing Committee Section */}
					<section className="pt-120 pb-120 gray-bg">
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-xl-8">
									<div className="section__title text-center mb-60">
										<span className="sub-title text-anim">DRIVING EVENTS, ENGAGEMENT, AND EXECUTION WITH EXCELLENCE</span>
										<h2 className="title text-white text-anim2">Organizing Committee</h2>
									</div>
								</div>
							</div>
							<div className="row gy-4">
								{/* India - Kuwait Business Promotion */}
								<div className="col-xl-6 col-lg-6 col-md-6">
									<div style={{ 
										background: '#fff', 
										padding: '30px', 
										borderRadius: '10px', 
										height: '100%',
										boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
									}}>
										<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
											<i className="fas fa-handshake" style={{ fontSize: '35px', color: 'var(--tg-theme-primary)', marginRight: '15px' }} />
											<h4 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>India - Kuwait Business Promotion</h4>
										</div>
										<ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Kaizar T Shakir</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Suresh K P</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Gaurav Oberoi</li>
											<li style={{ padding: '8px 0' }}>• Gurvinder Singh Lamba</li>
										</ul>
									</div>
								</div>

								{/* All Events */}
								<div className="col-xl-6 col-lg-6 col-md-6">
									<div style={{ 
										background: '#fff', 
										padding: '30px', 
										borderRadius: '10px', 
										height: '100%',
										boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
									}}>
										<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
											<i className="fas fa-calendar-check" style={{ fontSize: '35px', color: 'var(--tg-theme-primary)', marginRight: '15px' }} />
											<div>
												<h4 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: 'bold' }}>All Events</h4>
												<p style={{ margin: '0', fontSize: '13px', fontStyle: 'italic', color: '#666' }}>Seminars / Debates / Functions / Cultural Events</p>
											</div>
										</div>
										<ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Suresh K P</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Kaizar T Shakir</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Gaurav Oberoi</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Sujit Aurora</li>
											<li style={{ padding: '8px 0' }}>• Kulsum Kunwa</li>
										</ul>
									</div>
								</div>

								{/* Souvenir Committee */}
								<div className="col-xl-6 col-lg-6 col-md-6">
									<div style={{ 
										background: '#fff', 
										padding: '30px', 
										borderRadius: '10px', 
										height: '100%',
										boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
									}}>
										<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
											<i className="fas fa-book" style={{ fontSize: '35px', color: 'var(--tg-theme-primary)', marginRight: '15px' }} />
											<h4 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Souvenir Committee</h4>
										</div>
										<ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Kaizar T Shakir</li>
											<li style={{ padding: '8px 0' }}>• Suresh K P</li>
										</ul>
									</div>
								</div>

								{/* Spouses Committee */}
								<div className="col-xl-6 col-lg-6 col-md-6">
									<div style={{ 
										background: '#fff', 
										padding: '30px', 
										borderRadius: '10px', 
										height: '100%',
										boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
									}}>
										<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
											<i className="fas fa-users" style={{ fontSize: '35px', color: 'var(--tg-theme-primary)', marginRight: '15px' }} />
											<h4 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Spouses Committee</h4>
										</div>
										<ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Raji Lamba</li>
											<li style={{ padding: '8px 0' }}>• Alka Kumra</li>
										</ul>
									</div>
								</div>

								{/* Membership Committee */}
								<div className="col-xl-6 col-lg-6 col-md-6">
									<div style={{ 
										background: '#fff', 
										padding: '30px', 
										borderRadius: '10px', 
										height: '100%',
										boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
									}}>
										<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
											<i className="fas fa-user-plus" style={{ fontSize: '35px', color: 'var(--tg-theme-primary)', marginRight: '15px' }} />
											<h4 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Membership Committee</h4>
										</div>
										<ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Sunit Aurora</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Krishen Kanth Sooryakanth</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Harvinder Singh Sahni</li>
											<li style={{ padding: '8px 0' }}>• Reema Chadha</li>
										</ul>
									</div>
								</div>

								{/* Sponsorship and Fund Raising */}
								<div className="col-xl-6 col-lg-6 col-md-6">
									<div style={{ 
										background: '#fff', 
										padding: '30px', 
										borderRadius: '10px', 
										height: '100%',
										boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
									}}>
										<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
											<i className="fas fa-hand-holding-usd" style={{ fontSize: '35px', color: 'var(--tg-theme-primary)', marginRight: '15px' }} />
											<h4 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Sponsorship and Fund Raising</h4>
										</div>
										<ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Gaurav Oberoi</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Kaizar T Shakir</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Suresh K P</li>
											<li style={{ padding: '8px 0' }}>• Harvinder Singh Sahni</li>
										</ul>
									</div>
								</div>

								{/* Web & Social Media Publishing */}
								<div className="col-xl-6 col-lg-6 col-md-6">
									<div style={{ 
										background: '#fff', 
										padding: '30px', 
										borderRadius: '10px', 
										height: '100%',
										boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
									}}>
										<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
											<i className="fas fa-globe" style={{ fontSize: '35px', color: 'var(--tg-theme-primary)', marginRight: '15px' }} />
											<h4 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Web & Social Media Publishing</h4>
										</div>
										<ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Suresh K P</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Gaurav Oberoi</li>
											<li style={{ padding: '8px 0' }}>• Burhanudeen</li>
										</ul>
									</div>
								</div>

								{/* Student Mentoring and Awards */}
								<div className="col-xl-6 col-lg-6 col-md-6">
									<div style={{ 
										background: '#fff', 
										padding: '30px', 
										borderRadius: '10px', 
										height: '100%',
										boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
									}}>
										<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
											<i className="fas fa-graduation-cap" style={{ fontSize: '35px', color: 'var(--tg-theme-primary)', marginRight: '15px' }} />
											<h4 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Student Mentoring and Awards</h4>
										</div>
										<ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Sunit Aurora</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Kaizar T Shakir</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Gaurav Oberoi</li>
											<li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>• Suresh K P</li>
											<li style={{ padding: '8px 0' }}>• Krishen Kanth Sooryakanth</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / Organizing Committee Section ========*/}
				</>
			</Layout>
		</>
	)
}

