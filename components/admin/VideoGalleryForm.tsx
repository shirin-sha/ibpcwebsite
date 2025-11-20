'use client'

import { useState } from "react"

type VideoGalleryFormProps = {
	initialData?: {
		id?: string
		title?: string
		description?: string
		videoUrl?: string
		publishedDate?: string
	}
}

export default function VideoGalleryForm({ initialData }: VideoGalleryFormProps) {
	// Convert dd/mm/yy to yyyy-mm-dd for date input
	const toInputDate = (ddmmyy?: string) => {
		if (!ddmmyy) return ""
		const [dd, mm, yy] = ddmmyy.split("/")
		if (dd && mm && yy) {
			const year = yy.length === 2 ? `20${yy}` : yy
			return `${year}-${mm}-${dd}`
		}
		return ""
	}

	// Convert yyyy-mm-dd to dd/mm/yy
	const toDisplayDate = (yyyymmdd: string) => {
		if (!yyyymmdd) return ""
		const [year, month, day] = yyyymmdd.split("-")
		if (year && month && day) {
			const shortYear = year.slice(-2)
			return `${day}/${month}/${shortYear}`
		}
		return ""
	}

	const [displayDate, setDisplayDate] = useState(initialData?.publishedDate || "")

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formatted = toDisplayDate(e.target.value)
		setDisplayDate(formatted)
	}
	// Extract video ID from YouTube URL for preview
	const getYouTubeEmbedUrl = (url: string) => {
		if (!url) return null
		
		// Handle various YouTube URL formats
		const patterns = [
			/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
			/youtube\.com\/watch\?.*v=([^&\s]+)/
		]
		
		for (const pattern of patterns) {
			const match = url.match(pattern)
			if (match && match[1]) {
				return `https://www.youtube.com/embed/${match[1]}`
			}
		}
		
		return null
	}

	return (
		<form action="/api/admin/video-gallery" method="POST" style={{ marginTop: "25px" }}>
			{initialData?.id && <input type="hidden" name="videoId" value={initialData.id} />}
			<div className="row gy-3">
				<div className="col-12">
					<label htmlFor="video-title" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Video Title
					</label>
					<input
						id="video-title"
						name="title"
						type="text"
						className="form-control"
						placeholder="e.g., IBPC Annual Meeting 2024"
						required
						defaultValue={initialData?.title}
					/>
				</div>
				<div className="col-12">
					<label htmlFor="video-description" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Description
					</label>
					<textarea
						id="video-description"
						name="description"
						className="form-control"
						rows={3}
						placeholder="Brief description of the video content"
						defaultValue={initialData?.description}
					/>
				</div>
				<div className="col-12">
					<label htmlFor="video-url" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						YouTube Video URL
					</label>
					<input
						id="video-url"
						name="videoUrl"
						type="url"
						className="form-control"
						placeholder="https://www.youtube.com/watch?v=..."
						required
						defaultValue={initialData?.videoUrl}
					/>
					<p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
						Paste the full YouTube video URL (e.g., https://www.youtube.com/watch?v=ABC123 or https://youtu.be/ABC123)
					</p>
				
				</div>
				<div className="col-md-6">
					<label htmlFor="video-date-picker" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Published Date
					</label>
					<input
						id="video-date-picker"
						type="date"
						className="form-control"
						defaultValue={toInputDate(initialData?.publishedDate)}
						onChange={handleDateChange}
						required
					/>
					<input
						type="hidden"
						name="publishedDate"
						value={displayDate}
					/>
				
				</div>
				<div className="col-12">
					<button type="submit" className="btn" style={{ marginTop: "10px" }}>
						<span className="btn-text" data-text={initialData?.id ? "Update Video" : "Save Video"} />
					</button>
				</div>
			</div>
		</form>
	)
}

