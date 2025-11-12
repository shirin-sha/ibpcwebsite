import Link from 'next/link'

export default function Section6() {
	return (
		<>

			<section className="team-area-1 pt-120 pb-120 title-bg section-radius">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-12">
							<div className="section__title text-center mb-50">
								<span className="sub-title text-anim">KEY LEADERS</span>
								<h2 className="title text-white text-anim2">Voices That Inspire Our Vision</h2>
							</div>
						</div>
					</div>
					<div className="row gy-30 justify-content-center">
						<div className="col-lg-4 col-md-6">
							<div className="team-card">
								<div className="box-img image-anim">
									<Link href="/team-details" className="thumb">
										<img src="/assets/img/team/team-1-1.jpg" alt="img" />
									</Link>
									<div className="team-social">
										<button className="icon-btn"><i className="fas fa-share-alt" /></button>
										<div className="social-wrap">
											<Link target="_blank" href="/https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
											<Link target="_blank" href="/https://youtube.com/" tabIndex={-1}><i className="fab fa-youtube" /></Link>
											<Link target="_blank" href="/https://behance.com/" tabIndex={-1}><i className="fab fa-behance" /></Link>
											<Link target="_blank" href="/https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
										</div>
									</div>
								</div>
								<div className="team-card-details">
									<h4 className="box-title"><Link href="/team-details">Dr. Adarsh Swaika</Link></h4>
									<span className="box-text">INDIAN AMBASSODOR TO KUWAIT</span>
									<p className="box-desc">
										I extend my heartiest greetings to Indian Business and Professional Council (IBPC), Kuwait. I commend IBPC for their persistent efforts and commitment in fostering trade..
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="team-card">
								<div className="box-img image-anim">
									<Link href="/team-details" className="thumb">
										<img src="/assets/img/team/team-1-2.jpg" alt="img" />
									</Link>
									<div className="team-social">
										<button className="icon-btn"><i className="fas fa-share-alt" /></button>
										<div className="social-wrap">
											<Link target="_blank" href="/https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
											<Link target="_blank" href="/https://youtube.com/" tabIndex={-1}><i className="fab fa-youtube" /></Link>
											<Link target="_blank" href="/https://behance.com/" tabIndex={-1}><i className="fab fa-behance" /></Link>
											<Link target="_blank" href="/https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
										</div>
									</div>
								</div>
								<div className="team-card-details">
									<h4 className="box-title"><Link href="/team-details">Meshal Al-Shamali</Link></h4>
									<span className="box-text">
KUWAIT'S AMBASSODOR TO INDIA
</span>
									<p className="box-desc">
										First of all, I express my gratitude to the leadership of the State of Kuwait and the Republic of India for their patronage and support for a strong Kuwait-India Partnership.
									</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="team-card">
								<div className="box-img image-anim">
									<Link href="/team-details" className="thumb">
										<img src="/assets/img/team/team-1-3.jpg" alt="img" />
									</Link>
									<div className="team-social">
										<button className="icon-btn"><i className="fas fa-share-alt" /></button>
										<div className="social-wrap">
											<Link target="_blank" href="/https://facebook.com/" tabIndex={-1}><i className="fab fa-facebook-f" /></Link>
											<Link target="_blank" href="/https://youtube.com/" tabIndex={-1}><i className="fab fa-youtube" /></Link>
											<Link target="_blank" href="/https://behance.com/" tabIndex={-1}><i className="fab fa-behance" /></Link>
											<Link target="_blank" href="/https://twitter.com/" tabIndex={-1}><i className="fab fa-twitter" /></Link>
										</div>
									</div>
								</div>
								<div className="team-card-details">
									<h4 className="box-title"><Link href="/team-details">Kaizar T Shakir</Link></h4>
									<span className="box-text">CHAIRMAN - IBPC</span>
									<p className="box-desc">
										Dear Members, Friends, and Well-wishers, Welcome to the official website of the Indian Business and Professional Council (IBPC), Kuwait — a distinguished forum that..
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

		</>
	)
}
