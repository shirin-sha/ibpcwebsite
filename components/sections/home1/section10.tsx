'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from 'next/link'

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	loop: true,
	autoplay: { 
		delay: 1000,
		disableOnInteraction: false 
	},

	breakpoints: {
		0: { spaceBetween: 30, slidesPerView: 1 },
		375: { spaceBetween: 30, slidesPerView: 2 },
		600: { spaceBetween: 30, slidesPerView: 2 },
		768: { spaceBetween: 30, slidesPerView: 3 },
		992: { spaceBetween: 30, slidesPerView: 4 },
		1200: { spaceBetween: 18, slidesPerView: 4 }
	}
};

const clientsData = [
	{
		logo: '/assets/img/client/client1-1.png'
	},
	{
		logo: '/assets/img/client/client1-2.png'
	},
	{
		logo: '/assets/img/client/client1-3.png'
	},
	{
		logo: '/assets/img/client/client1-4.png'
	},
	{
		logo: '/assets/img/client/client1-5.png'
	},
    {
		logo: '/assets/img/client/client1-6.png'
	},
    {
		logo: '/assets/img/client/client1-7.png'
	},
    {
		logo: '/assets/img/client/client1-8.png'
	},
    {
		logo: '/assets/img/client/client1-9.png'
	},
 

]

// Duplicate clients for smoother loop
const clients = [...clientsData, ...clientsData]

export default function Section10() {
	return (
		<>
			<section className="client-area-1 pt-120 pb-120 overflow-hidden">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-7 col-lg-9">
							<div className="section__title text-center mb-50">
								<span className="sub-title text-anim">TRUSTED CLIENTS & PARTNERS</span>
								<h2 className="title text-anim2">Collaborating With Industry Leaders</h2>
							</div>
						</div>
					</div>
					<Swiper {...swiperOptions}
						className="tg-swiper__slider swiper-container client-slider1"
						id="clientSlider1"
					>
						<div className="swiper-wrapper">
							{clients.map((client, index) => (
								<SwiperSlide key={index}>
									<div 
									
										className="client-card"
										style={{
											width: '280px',
											height: '160px',
											padding: '30px'
										}}
									>
										<img 
											src={client.logo} 
											alt={'logo'}
											style={{
												maxWidth: '100%',
												maxHeight: '100%',
												objectFit: 'contain'
											}}
										/>
									</div>
								</SwiperSlide>
							))}
						</div>
					</Swiper>
				</div>
			</section>
		</>
	)
}

