
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
							<div className="contact-wrap2 pt-120 pb-120 smoke5-bg text-center">
								<div className="row justify-content-end">
									<div className="col-xl-12">
										<div className="contact-form-wrap2">
											<div className="section__title mb-30">
												<span className="sub-title">Get In Touch</span>
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