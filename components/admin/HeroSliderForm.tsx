type HeroSliderFormProps = {
	initialData?: {
		id?: string
		eyebrow?: string
		mainTitle?: string
		button1Text?: string
		button1Link?: string
		button2Text?: string
		button2Link?: string
	}
}

export default function HeroSliderForm({ initialData }: HeroSliderFormProps) {
	return (
		<form action="/api/admin/hero-sliders" method="POST" encType="multipart/form-data" style={{ marginTop: "25px" }}>
			{initialData?.id && <input type="hidden" name="sliderId" value={initialData.id} />}
			<div className="row gy-3">
				<div className="col-12">
					<label htmlFor="slider-image" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Background Image
					</label>
					<input id="slider-image" name="image" type="file" accept="image/*" className="form-control" />
					<p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
						{initialData?.id ? "Leave empty to keep current image." : "Recommended: JPG or PNG, at least 1920px wide."}
					</p>
				</div>
				<div className="col-12">
					<label htmlFor="slider-eyebrow" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Eyebrow Text (Sub-title)
					</label>
					<input
						id="slider-eyebrow"
						name="eyebrow"
						type="text"
						className="form-control"
						placeholder="e.g., Where opportunities meets growth."
						defaultValue={initialData?.eyebrow}
					/>
				</div>
				<div className="col-12">
					<label htmlFor="slider-main-title" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Main Title
					</label>
					<input
						id="slider-main-title"
						name="mainTitle"
						type="text"
						className="form-control"
						placeholder="e.g., Empowering India-Kuwait Business Connections"
						required
						defaultValue={initialData?.mainTitle}
					/>
					<p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
						You can add multiple lines by separating with "|" (e.g., "Line 1|Line 2|Line 3")
					</p>
				</div>
				<div className="col-md-6">
					<label htmlFor="slider-button1-text" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Button 1 Text
					</label>
					<input
						id="slider-button1-text"
						name="button1Text"
						type="text"
						className="form-control"
						placeholder="e.g., General Events"
						defaultValue={initialData?.button1Text}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="slider-button1-link" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Button 1 Link
					</label>
					<input
						id="slider-button1-link"
						name="button1Link"
						type="text"
						className="form-control"
						placeholder="e.g., /events"
						defaultValue={initialData?.button1Link}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="slider-button2-text" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Button 2 Text
					</label>
					<input
						id="slider-button2-text"
						name="button2Text"
						type="text"
						className="form-control"
						placeholder="e.g., Learn More"
						defaultValue={initialData?.button2Text}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="slider-button2-link" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Button 2 Link
					</label>
					<input
						id="slider-button2-link"
						name="button2Link"
						type="text"
						className="form-control"
						placeholder="e.g., /about or https://example.com"
						defaultValue={initialData?.button2Link}
					/>
				</div>
				<div className="col-12">
					<button type="submit" className="btn" style={{ marginTop: "10px" }}>
						<span className="btn-text" data-text={initialData?.id ? "Update Slider" : "Save Slider"} />
					</button>
				</div>
			</div>
		</form>
	)
}






