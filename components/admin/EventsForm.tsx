'use client'

import dynamic from "next/dynamic"
import { useEffect, useMemo, useState } from "react"
import "react-quill/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

type EventsFormProps = {
	defaultStartDate: string
	initialData?: {
		id?: string
		title?: string
		description?: string
		longDescription?: string
		location?: string
		startDate?: string
		endDate?: string
	}
}

const toInputDate = (date?: string, fallback?: string) => {
	if (!date) return fallback || ""
	const [dd, mm, yy] = date.split("/")
	if (dd && mm && yy) {
		const year = yy.length === 2 ? `20${yy}` : yy
		return `${year}-${mm}-${dd}`
	}
	return fallback || ""
}

export default function EventsForm({ defaultStartDate, initialData }: EventsFormProps) {
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
		<form action="/api/admin/events" method="POST" encType="multipart/form-data" style={{ marginTop: "25px" }}>
			{initialData?.id && <input type="hidden" name="eventId" value={initialData.id} />}
			<div className="row gy-3">
				<div className="col-12">
					<label htmlFor="event-title" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Title
					</label>
					<input
						id="event-title"
						name="title"
						type="text"
						className="form-control"
						placeholder="Enter event title"
						required
						defaultValue={initialData?.title}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="event-start" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Start Date
					</label>
					<input
						id="event-start"
						name="startDate"
						type="date"
						className="form-control"
						defaultValue={toInputDate(initialData?.startDate, defaultStartDate)}
						required
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="event-end" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						End Date
					</label>
					<input
						id="event-end"
						name="endDate"
						type="date"
						className="form-control"
						defaultValue={toInputDate(initialData?.endDate, defaultStartDate)}
						required
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="event-location" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Location
					</label>
					<input id="event-location" name="location" type="text" className="form-control" placeholder="City / Venue" defaultValue={initialData?.location} />
				</div>
				<div className="col-12">
					<label htmlFor="event-description" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Short Description
					</label>
					<textarea
						id="event-description"
						name="description"
						className="form-control"
						rows={3}
						placeholder="A brief summary that will appear in the listing"
						defaultValue={initialData?.description}
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
					<label htmlFor="event-image" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Featured Image
					</label>
					<input id="event-image" name="image" type="file" accept="image/*" className="form-control" />
					<p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
						{initialData?.id ? "Leave empty to keep current image." : "Recommended: JPG or PNG, at least 800px wide."}
					</p>
				</div>
				<div className="col-12">
					<button type="submit" className="btn" style={{ marginTop: "10px" }}>
						<span className="btn-text" data-text={initialData?.id ? "Update Event" : "Save Event"} />
					</button>
				</div>
			</div>
		</form>
	)
}


