'use client'

import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"
import "react-quill/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

type NewsFormProps = {
	defaultDate: string
	initialData?: {
		id?: string
		title?: string
		shortDescription?: string
		longDescription?: string
		publishedDate?: string
		category?: string
		signatureEvent?: boolean
		showOnHomepage?: boolean
	}
}

const toInputDate = (ddmmyy?: string, fallback?: string) => {
	if (!ddmmyy) return fallback || ""
	const parts = ddmmyy.split("/")
	if (parts.length !== 3) return fallback || ""
	const [dd, mm, yy] = parts
	const year = yy.length === 2 ? `20${yy}` : yy
	return `${year}-${mm}-${dd}`
}

export default function NewsForm({ defaultDate, initialData }: NewsFormProps) {
	const [longDescription, setLongDescription] = useState(initialData?.longDescription || "")

	useEffect(() => {
		setLongDescription(initialData?.longDescription || "")
	}, [initialData])

	const quillModules = useMemo(
		() => ({
			toolbar: [
				[{ header: [1, 2, 3, false] }],
				["bold", "italic", "underline", "strike"],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ align: [] }],
				["link"],
				["clean"]
			]
		}),
		[]
	)

	return (
		<form action="/api/admin/news" method="POST" encType="multipart/form-data" style={{ marginTop: "25px" }}>
			{initialData?.id && <input type="hidden" name="newsId" value={initialData.id} />}
			<div className="row gy-3">
				<div className="col-12">
					<label htmlFor="news-title" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Title
					</label>
					<input
						id="news-title"
						name="title"
						type="text"
						className="form-control"
						placeholder="Enter news title"
						required
						defaultValue={initialData?.title}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="news-date" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Date
					</label>
					<input
						id="news-date"
						name="date"
						type="date"
						className="form-control"
						defaultValue={toInputDate(initialData?.publishedDate, defaultDate)}
						required
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="news-category" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Category
					</label>
					<select id="news-category" name="category" className="form-select" defaultValue={initialData?.category || ""}>
						<option value="">Select category</option>
						<option value="business-trade">Business &amp; Trade</option>
						<option value="innovation-technology">Innovation &amp; Technology</option>
						<option value="events-activities">Events &amp; Activities</option>
						<option value="ibpc-community">IBPC Community</option>
						<option value="partnerships-relations">Partnerships &amp; Relations</option>
					</select>
				</div>
				<div className="col-12">
					<label htmlFor="news-short" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Short Description
					</label>
					<textarea
						id="news-short"
						name="shortDescription"
						className="form-control"
						rows={2}
						placeholder="A brief summary that will appear in the listing."
						defaultValue={initialData?.shortDescription}
					/>
				</div>
				<div className="col-12">
					<label className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Long Description
					</label>
					<div className="quill-wrapper" style={{ background: "#fff", borderRadius: "12px", overflow: "hidden" }}>
						<style dangerouslySetInnerHTML={{
							__html: `
								.quill-wrapper .ql-toolbar {
									background: #ffffff !important;
									border: 1px solid #e5e7f0 !important;
									border-radius: 8px 8px 0 0;
									padding: 8px;
								}
								.quill-wrapper .ql-toolbar .ql-stroke {
									stroke: #374151 !important;
								}
								.quill-wrapper .ql-toolbar .ql-fill {
									fill: #374151 !important;
								}
								.quill-wrapper .ql-toolbar button:hover,
								.quill-wrapper .ql-toolbar button:focus,
								.quill-wrapper .ql-toolbar button.ql-active {
									background: #f3f4f6 !important;
								}
								.quill-wrapper .ql-toolbar button:hover .ql-stroke,
								.quill-wrapper .ql-toolbar button:focus .ql-stroke,
								.quill-wrapper .ql-toolbar button.ql-active .ql-stroke {
									stroke: #111827 !important;
								}
								.quill-wrapper .ql-toolbar button:hover .ql-fill,
								.quill-wrapper .ql-toolbar button:focus .ql-fill,
								.quill-wrapper .ql-toolbar button.ql-active .ql-fill {
									fill: #111827 !important;
								}
								.quill-wrapper .ql-container {
									background: #ffffff !important;
									border: 1px solid #e5e7f0 !important;
									border-top: none !important;
									border-radius: 0 0 8px 8px;
									font-size: 14px;
								}
								.quill-wrapper .ql-editor {
									color: #1f2937 !important;
									font-size: 14px;
									min-height: 200px;
									background: #ffffff !important;
								}
								.quill-wrapper .ql-editor.ql-blank::before {
									color: #9ca3af;
									font-style: normal;
								}
							`
						}} />
						<ReactQuill theme="snow" value={longDescription} onChange={setLongDescription} modules={quillModules} />
					</div>
					<input type="hidden" name="longDescription" value={longDescription} />
				</div>
				<div className="col-12">
					<label htmlFor="news-image" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Featured Image
					</label>
					<input id="news-image" name="image" type="file" accept="image/*" className="form-control" />
					<p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>Recommended: JPG or PNG, at least 800px wide.</p>
				</div>
				<div className="col-12">
					<label className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Signature Event
					</label>
					<div className="form-check" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<input
							className="form-check-input"
							type="checkbox"
							id="signature-event"
							name="signatureEvent"
							style={{ width: "18px", height: "18px" }}
							defaultChecked={initialData?.signatureEvent}
						/>
						<label className="form-check-label" htmlFor="signature-event" style={{ fontSize: "14px", color: "#4b5563" }}>
							Mark this as a Signature IBPC Event
						</label>
					</div>
				</div>
				<div className="col-12">
					<label className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Homepage Highlight
					</label>
					<div className="form-check" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<input
							className="form-check-input"
							type="checkbox"
							id="homepage-highlight"
							name="showOnHomepage"
							style={{ width: "18px", height: "18px" }}
							defaultChecked={initialData?.showOnHomepage}
						/>
						<label className="form-check-label" htmlFor="homepage-highlight" style={{ fontSize: "14px", color: "#4b5563" }}>
							Mark this to show on Homepage News Lists
						</label>
					</div>
				</div>
				<div className="col-12">
					<button type="submit" className="btn" style={{ marginTop: "10px" }}>
						<span className="btn-text" data-text="Save News" />
					</button>
				</div>
			</div>
		</form>
	)
}

