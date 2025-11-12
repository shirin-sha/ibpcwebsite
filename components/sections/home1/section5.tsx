import CounterUp from '@/components/elements/CounterUp'

export default function Section5() {
	return (
		<>

			<section className="counter-area-1 pb-120 pt-120 pt-xl-0">
				<div className="container">
					<div className="row gy-30 justify-content-center">
						<div className="col-lg-4 col-md-6">
							<div className="counter-card">
								<h3 className="counter-card_title"><CounterUp>24</CounterUp>+</h3>
								<p className="counter-card_subtitle">Years of Service</p>
								<p className="counter-card_text">Since 2001, IBPC has been actively promoting trade, investment, and professional collaboration across industries.</p>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="counter-card">
								<h3 className="counter-card_title"><CounterUp>750</CounterUp>+</h3>
								<p className="counter-card_subtitle">Active Members</p>
								<p className="counter-card_text">A growing community of entrepreneurs, executives, and professionals contributing to a stronger business network.</p>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="counter-card">
								<h3 className="counter-card_title"><CounterUp>100</CounterUp>+</h3>
								<p className="counter-card_subtitle">Business Events Organized</p>
								<p className="counter-card_text">From trade forums to cultural showcases, IBPC continues to host events that strengthen bilateral partnerships.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

		</>
	)
}
