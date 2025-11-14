import Link from 'next/link'

export default function Section9() {
	return (
		<>

			<section className="blog-area-1 pt-120 pb-120">
				<div className="container">
					<div className="section__title mb-50 text-center">
						<span className="sub-title text-anim">COMPLETE UPDATES ABOUT IBPC</span>
						<h2 className="title text-anim2">Recent News & Updates</h2>
					</div>
					<div className="row gy-40 justify-content-center">
						<div className="col-xl-4 col-md-6">
							<div className="blog__post-item blog__post-item-two blog__post-item-three" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
								<div className="blog__post-thumb image-anim">
									<Link href="/blog-details"><img src="/assets/img/blog/1-1.jpg" alt="img" /></Link>
									<div className="blog__post-date">15 <span>Jan</span></div>
								</div>
								<div className="blog__post-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
									<h3 className="title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
										<Link href="/blog-details">N.R. Narayana Murthy speaks on entrepreneurship at IBPC Kuwait.</Link>
									</h3>
									<p className="text" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 'auto' }}>
										The founder and Chairman Emeritus of Infosys Technologies Ltd, N R Narayana Murthy..
									</p>
									<div className="blog__post-bottom">
										<Link href="/blog-details" className="link-btn">
											READ MORE
											<i className="fas fa-arrow-right" />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-md-6">
							<div className="blog__post-item blog__post-item-two blog__post-item-three" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
								<div className="blog__post-thumb image-anim">
									<Link href="/blog-details"><img src="/assets/img/blog/1-2.jpg" alt="img" /></Link>
									<div className="blog__post-date">20 <span>FEB</span></div>
								</div>
								<div className="blog__post-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
									<h3 className="title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
										<Link href="/blog-details">Melodies of the Sarod Concert</Link>
									</h3>
									<p className="text" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 'auto' }}>
										The Sarod Concert showcased the rich heritage of Indian classical music, featuring a mesmerizing performance that captivated the audience and….
									</p>
									<div className="blog__post-bottom">
										<Link href="/blog-details" className="link-btn">
											READ MORE
											<i className="fas fa-arrow-right" />
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-md-6">
							<div className="blog__post-item blog__post-item-two blog__post-item-three" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
								<div className="blog__post-thumb image-anim">
									<Link href="/blog-details"><img src="/assets/img/blog/1-3.jpg" alt="img" /></Link>
									<div className="blog__post-date">05 <span>JUN</span></div>
								</div>
								<div className="blog__post-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
									<h3 className="title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
										<Link href="/blog-details">IBPC Meritorious Students Award 2018</Link>
									</h3>
									<p className="text" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 'auto' }}>
										The IBPC Meritorious Students Award – 2018 celebrated academic excellence by honoring top-performing Indian students in Kuwait, encouraging youth achievement….
									</p>
									<div className="blog__post-bottom">
										<Link href="/blog-details" className="link-btn">
											READ MORE
											<i className="fas fa-arrow-right" />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

		</>
	)
}
