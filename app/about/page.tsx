
import CounterUp from '@/components/elements/CounterUp'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function About() {

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
										<h3 className="title">About Us</h3>
									</div>
								</div>
								<div className="col-xl-6">
									<div className="breadcrumb-wrap">
										<nav className="breadcrumb">
											<span property="itemListElement" typeof="ListItem">
												<Link href="/">Home</Link>
											</span>
											<span className="breadcrumb-separator">/</span>
											<span property="itemListElement" typeof="ListItem">About Us</span>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* breadcrumb-area-end */}
					
					<section className="about-area-2 pt-120 pb-120 overflow-hidden">
						<div className="container">
							<div className="about-wrap2">
								<div className="row gx-60 gy-5 align-items-center">
									<div className="col-xl-6">
										<div className="about-single-image">
											<img 
												src="/assets/img/others/about2-1.jpg" 
												alt="About IBPC" 
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
											<span className="sub-title text-anim">EMPOWERING INDO-KUWAIT BUSINESS RELATIONS</span>
											<h2 className="title text-anim2">About Indian Business and Professional Council (Kuwait)</h2>
										</div>
										<p className="mt-30 mb-40">
											The Indian Business and Professional Council, Kuwait (IBPC) was established in 2001 under the patronage of the Ambassador of India to Kuwait. IBPC is a non-profit, voluntary association of leading businessmen, senior corporate executives and professionals from the Indian diaspora community in Kuwait, dedicated to promoting business, trade, and investment between Kuwait & India.
										</p>
										<div className="checklist-wrap">
											<ul className="list-wrap">
												<li>
													<span className="icon">
														<i className="fas fa-check-circle" />
													</span>
													Institutional linkage with ASSOCHAM, FICCI, CII and Kuwait Chamber of Commerce.
												</li>
												<li>
													<span className="icon">
														<i className="fas fa-check-circle" />
													</span>
													Facilitates direct business connections through investment seminars and networking events.
												</li>
												<li>
													<span className="icon">
														<i className="fas fa-check-circle" />
													</span>
													Promotes India's business opportunities and rich cultural heritage to Kuwait.
												</li>
											</ul>
										</div>
									
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / About Section ========*/}
						{/*==============================
						CTA Area - Diplomatic Engagements
					==============================*/}
					<section className="cta-area pt-120 pb-120" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
						<div className="container">
							<div className="row align-items-center">
								<div className="col-xl-7 col-lg-6">
									<div className="section__title">
										<span className="sub-title text-white text-anim">BUILDING BRIDGES BETWEEN NATIONS</span>
										<h2 className="title text-white text-anim2">Diplomatic Engagements and Community Impact</h2>
									</div>
									<p className="text-white mt-30 mb-30">
										Over the years IBPC members have accompanied high level Kuwaiti delegations travelling to India including the Amir of Kuwait and later the Prime Minister of Kuwait and senior officials from Kuwaiti ministries.
									</p>
									<p className="text-white mb-40">
										IBPC recognizes various issues concerning the Indian diaspora and its members offer generous support to the various social and welfare causes. To encourage students at various Indian schools in Kuwait IBPC recognizes and honors the top student achievers and counsel students in further studies.
									</p>
								</div>
								<div className="col-xl-5 col-lg-6 text-lg-end text-center">
									<div className="cta-btn-wrap">
										<Link href="/contact" className="btn btn-three">
											<span className="btn-text" data-text="Contact Us Now" />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / CTA Section ========*/}
					{/*==============================
Counter Area
==============================*/}
					<section className="counter-area-1 pb-120 pt-120 pt-xl-0 mt-120 ">
						<div className="container">
							<div className="row justify-content-center mb-50">
								<div className="col-12">
									<div className="section__title text-center">
										<span className="sub-title text-anim">OUR ACHIEVEMENTS</span>
										<h2 className="title text-anim2">Key Highlights of IBPC</h2>
									</div>
								</div>
							</div>
							<div className="row gy-30 justify-content-center">
								<div className="col-lg-3 col-md-6">
									<div className="counter-card">
										<h3 className="counter-card_title"><CounterUp>100</CounterUp>+</h3>
										<p className="counter-card_subtitle">Events Hosted</p>
										<p className="counter-card_text">Successfully organized business forums, seminars, and networking events.</p>
									</div>
								</div>
								<div className="col-lg-3 col-md-6">
									<div className="counter-card">
										<h3 className="counter-card_title"><CounterUp>20</CounterUp>+</h3>
										<p className="counter-card_subtitle">Years of Service</p>
										<p className="counter-card_text">Serving the Indo-Kuwait business community since 2001.</p>
									</div>
								</div>
								<div className="col-lg-3 col-md-6">
									<div className="counter-card">
										<h3 className="counter-card_title"><CounterUp>50</CounterUp>+</h3>
										<p className="counter-card_subtitle">Strategic Partnerships</p>
										<p className="counter-card_text">Strong collaborations with leading Chambers of Commerce.</p>
									</div>
								</div>
								<div className="col-lg-3 col-md-6">
									<div className="counter-card">
										<h3 className="counter-card_title"><CounterUp>30</CounterUp>+</h3>
										<p className="counter-card_subtitle">Cultural Events</p>
										<p className="counter-card_text">Promoting Indian culture through workshops and performances.</p>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / Counter Section ========*/}
						{/*==============================
						Mission, Vision, Values Area
					==============================*/}
					<section className="about-area-2 overflow-hidden">
						<div className="container">
							<div className="about-wrap2">
								<div className="row gx-60 gy-5 align-items-center">
									<div className="col-xl-6">
										<div className="about-single-image">
											<img 
												src="/assets/img/others/mission.png" 
												alt="IBPC Mission Vision Values" 
												style={{
													width: '79%',
													height: 'auto',
													borderRadius: '10px',
													objectFit: 'cover'
												}}
											/>
										</div>
									</div>
									<div className="col-xl-6">
										<div className="goal-grid-card mb-30">
											<div className="box-icon">
												<i className="fas fa-handshake" style={{ fontSize: '40px', color: '#ffffff' }} />
											</div>
											<div className="card-details">
												<h4 className="box-title">Our Mission</h4>
												<h5 className="mb-15" style={{ color: 'var(--tg-theme-primary)' }}>Fostering Growth Through Connection</h5>
												<p className="box-text">IBPC is committed to promoting business, trade, and professional relationships between India and Kuwait, empowering members through networking, collaboration, and meaningful opportunities for mutual success.</p>
											</div>
										</div>
										<div className="goal-grid-card mb-30">
											<div className="box-icon">
												<i className="fas fa-rocket" style={{ fontSize: '40px', color: '#ffffff' }} />
											</div>
											<div className="card-details">
												<h4 className="box-title">Our Vision</h4>
												<h5 className="mb-15" style={{ color: 'var(--tg-theme-primary)' }}>A Stronger India-Kuwait Partnership</h5>
												<p className="box-text">We envision a vibrant platform where Indian and Kuwaiti businesses thrive together, driven by trust, innovation, and sustainable growth that benefits communities across both nations.</p>
											</div>
										</div>
										<div className="goal-grid-card">
											<div className="box-icon">
												<i className="fas fa-award" style={{ fontSize: '40px', color: '#ffffff' }} />
											</div>
											<div className="card-details">
												<h4 className="box-title">Our Values</h4>
												<h5 className="mb-15" style={{ color: 'var(--tg-theme-primary)' }}>Integrity, Collaboration, Excellence</h5>
												<p className="box-text">IBPC stands on the pillars of integrity, inclusivity, and excellence—cultivating a professional community built on shared knowledge, cultural respect, and long-term partnerships.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / Mission Vision Values Section ========*/}

					{/*==============================
						Leadership Messages Area
					==============================*/}
					<section className="leadership-messages pt-120 pb-120 overflow-hidden">
						<div className="container">
							<div className="row justify-content-center mb-60">
								<div className="col-xl-8">
									<div className="section__title text-center">
										<span className="sub-title text-anim">GUIDING IBPC'S MISSION</span>
										<h2 className="title text-anim2">Distinguished Voices of Leadership</h2>
										<p className="mt-20">Strengthening India-Kuwait Relations Through Vision and Collaboration</p>
									</div>
								</div>
							</div>

							{/* Leader 1 - Kaizar T Shakir */}
							<div className="about-wrap2 mb-80">
								<div className="row gx-60 gy-5 align-items-start">
									<div className="col-xl-4 col-lg-4">
										<div className="text-center">
											<div className="about-single-image mb-20">
												<img 
													src="/assets/img/team/team-1-3.jpg" 
													alt="Kaizar T Shakir" 
													style={{
														width: '100%',
														height: 'auto',
														borderRadius: '10px',
														objectFit: 'cover'
													}}
												/>
											</div>
											<h4 className="box-title">Kaizar T Shakir</h4>
											<span className="box-text" style={{ color: 'var(--tg-theme-primary)', fontWeight: 'bold' }}>CHAIRMAN - IBPC</span>
										</div>
									</div>
									<div className="col-xl-8 col-lg-8">
										<div className="leadership-content" style={{ position: 'relative' }}>
											<i className="fas fa-quote-left" style={{ fontSize: '40px', color: 'var(--tg-theme-primary)', opacity: '0.3', position: 'absolute', top: '-10px', left: '-10px' }} />
											<p className="mb-20">
												The Indian Business and Professional Council, Kuwait has completed it's 15 years of fruitful existence and this is our 6th Award presentation ceremony. After tonite, we would have honred and appreciated the work done by 60 persons in fostering and cementing traditionally long and lasting Kuwait/India relationship.
											</p>
											<p className="mb-20">
												We at IBPC endoeavour to promote business, culture, tourism and investment between Kuwait and India. Our emphasis is on business, by way of inviting prominent business leaders from India as speaker and Indian culture, by arranging classical Indian music recitals by world renowned artistes from India.
											</p>
											<p>
												Our membership stands at 180 Indians and Kuwaitis. We welcome and encourage Kuwait Nationals to join our council. We look forward to more members joining IBPC.
											</p>
											<i className="fas fa-quote-right" style={{ fontSize: '40px', color: 'var(--tg-theme-primary)', opacity: '0.3', float: 'right', marginTop: '10px' }} />
										</div>
									</div>
								</div>
							</div>

							{/* Leader 2 - Dr. Adarsh Swaika */}
							<div className="about-wrap2 mb-80">
								<div className="row gx-60 gy-5 align-items-start">
									<div className="col-xl-8 col-lg-8 order-lg-1 order-2">
										<div className="leadership-content" style={{ position: 'relative' }}>
											<i className="fas fa-quote-left" style={{ fontSize: '40px', color: 'var(--tg-theme-primary)', opacity: '0.3', position: 'absolute', top: '-10px', left: '-10px' }} />
											<p className="mb-20">
												I extend my heartiest greetings to Indian Business and Professional Council (IBPC), Kuwait. I commend IBPC for their persistent efforts and commitment in fostering trade and investment cooperation between India and Kuwait.
											</p>
											<p className="mb-20">
												Over the years, IBPC has facilitated connect between Indian companies and Kuwaiti businesses by inviting prominent Indian Industrialists, businessmen, economists and investment bankers and conducting trade promotion activities and investment seminars.
											</p>
											<p className="mb-20">
												IBPC has also played a bridging role in promoting India's rich cultural heritage in Kuwait by organizing events by renowned Indian classical musicians and artists. IBPC's support as well as meaningful contributions made by its members toward issues concerning the Indian diaspora in Kuwait are noteworthy as well.
											</p>
											<p>
												I am confident that the India-Kuwait relationship will continue to flourish in the coming years. Organisations like IBPC will need to play an active role in furthering closer economic relations between India and Kuwait.
											</p>
											<i className="fas fa-quote-right" style={{ fontSize: '40px', color: 'var(--tg-theme-primary)', opacity: '0.3', float: 'right', marginTop: '10px' }} />
										</div>
									</div>
									<div className="col-xl-4 col-lg-4 order-lg-2 order-1">
										<div className="text-center">
											<div className="about-single-image mb-20">
												<img 
													src="/assets/img/team/team-1-1.jpg" 
													alt="Dr. Adarsh Swaika" 
													style={{
														width: '100%',
														height: 'auto',
														borderRadius: '10px',
														objectFit: 'cover'
													}}
												/>
											</div>
											<h4 className="box-title">Dr. Adarsh Swaika</h4>
											<span className="box-text" style={{ color: 'var(--tg-theme-primary)', fontWeight: 'bold' }}>INDIAN AMBASSADOR TO KUWAIT</span>
										</div>
									</div>
								</div>
							</div>

							{/* Leader 3 - Meshal Mustafa J Alshemali */}
							<div className="about-wrap2">
								<div className="row gx-60 gy-5 align-items-start">
									<div className="col-xl-4 col-lg-4">
										<div className="text-center">
											<div className="about-single-image mb-20">
												<img 
													src="/assets/img/team/team-1-2.jpg" 
													alt="Meshal Mustafa J Alshemali" 
													style={{
														width: '100%',
														height: 'auto',
														borderRadius: '10px',
														objectFit: 'cover'
													}}
												/>
											</div>
											<h4 className="box-title">Meshal Mustafa J Alshemali</h4>
											<span className="box-text" style={{ color: 'var(--tg-theme-primary)', fontWeight: 'bold' }}>KUWAIT'S AMBASSADOR TO INDIA</span>
										</div>
									</div>
									<div className="col-xl-8 col-lg-8">
										<div className="leadership-content" style={{ position: 'relative' }}>
											<i className="fas fa-quote-left" style={{ fontSize: '40px', color: 'var(--tg-theme-primary)', opacity: '0.3', position: 'absolute', top: '-10px', left: '-10px' }} />
											<p className="mb-20">
												First of all, I express my gratitude to the leadership of the State of Kuwait and the Republic of India for their patronage and support for a strong Kuwait-India Partnership.
											</p>
											<p className="mb-20">
												I extend my best wishes to the Indian Business and Professional Council (IBPC), Kuwait and its members. The organization plays a vital role in strengthening the economic and trade ties between the State of Kuwait and the Republic of India, promoting trade and investment, facilitating professional development, and fostering collaboration between the concerned authorities of both countries.
											</p>
											<p className="mb-20">
												Kuwait and India have a strong economic relationship, with a total bilateral trade reaching US$ 10.47 billion during FY 2023-24. During the recent visit of H.E Mr. Narendra Modi to the State of Kuwait on December 21-22, 2024, both sides recognized the need for closer and greater engagement between investment authorities in Kuwait and India.
											</p>
											<p className="mb-20">
												I appreciate IBPC's efforts in creating a dynamic platform for networking, knowledge sharing, and collaboration among Indian businesses and professionals in the State of Kuwait. Your commitment to fostering a strong business ecosystem, promoting cross-border growth, and providing valuable resources for IBPC members is commendable.
											</p>
											<p>
												I would like to convey through IBPC that the future of Kuwait-India relations looks promising for multifaceted partnership. Both nations are keen to explore new avenues of cooperation, including renewable energy, healthcare, technology, education, food security and cyber security.
											</p>
											<i className="fas fa-quote-right" style={{ fontSize: '40px', color: 'var(--tg-theme-primary)', opacity: '0.3', float: 'right', marginTop: '10px' }} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/*======== / Leadership Messages Section ========*/}
				
				</>

			</Layout>
		</>
	)
}