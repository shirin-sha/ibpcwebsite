import Link from "next/link"

export type NewsCard = {
	id: string
	title: string
	shortDescription: string
	publishedDate: string
	categoryLabel: string
	imageUrl: string | null
	signatureEvent?: boolean
	showOnHomepage?: boolean
}

type Section9Props = {
	items?: NewsCard[]
}

const parseDate = (date: string) => {
	const [dd, mm, yy] = date.split("/")
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	const monthIndex = parseInt(mm || "1", 10) - 1
	return {
		day: dd || "--",
		month: months[monthIndex] || "MN",
		year: yy || ""
	}
}

export default function Section9({ items = [] }: Section9Props) {
	const news = items
		.filter((item) => {
			if (typeof item.showOnHomepage === "boolean") {
				return item.showOnHomepage
			}
			return !item.signatureEvent
		})
		.slice(0, 3)

	return (
		<section className="blog-area-1 pt-120 pb-120">
			<div className="container">
				<div className="section__title mb-50 text-center">
					<span className="sub-title text-anim">COMPLETE UPDATES ABOUT IBPC</span>
					<h2 className="title text-anim2">Recent News & Updates</h2>
				</div>

				{news.length === 0 ? (
					<div className="text-center" style={{ color: "#666" }}>
						Latest updates will appear here soon.
					</div>
				) : (
					<div className="row gy-40 justify-content-center">
						{news.map((item) => {
							const { day, month } = parseDate(item.publishedDate || "")
							return (
								<div className="col-xl-4 col-md-6" key={item.id || item.title}>
									<Link href={`/blog-details?id=${item.id}`} style={{ textDecoration: "none" }}>
									<div className="blog__post-item blog__post-item-two blog__post-item-three" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
										<div className="blog__post-thumb image-anim" style={{ backgroundColor: "#f8f9ff", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "220px" }}>
											{item.imageUrl ? (
												<img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
											) : (
												<div style={{ padding: "40px 20px", textAlign: "center", color: "#9ca3af", fontWeight: 600 }}>
													<span style={{ display: "block" }}>IBPC NEWS</span>
													<small style={{ display: "block", marginTop: "8px" }}>{item.categoryLabel}</small>
												</div>
											)}
											<div className="blog__post-date">
												{day} <span>{month}</span>
											</div>
										</div>
										<div className="blog__post-content" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
											<p style={{ fontSize: "13px", color: "#7c8498", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>{item.categoryLabel}</p>
											<h3 className="title" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
												{item.title}
											</h3>
											<p className="text" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "auto" }}>
												{item.shortDescription || "Explore insights and updates from the IBPC community."}
											</p>
											<div className="blog__post-bottom">
												<span className="link-btn" style={{ cursor: "pointer" }}>
													READ MORE
													<i className="fas fa-arrow-right" />
												</span>
											</div>
										</div>
									</div>
									</Link>
								</div>
							)
						})}
					</div>
				)}
			</div>
		</section>
	)
}
