'use client'

import { useState } from "react"

type GalleryFormProps = {
	initialData?: {
		id?: string
		title?: string
		coverImage?: string | null
		galleryImages?: Array<{ url: string; index: number }>
	}
}

export default function GalleryForm({ initialData }: GalleryFormProps) {
	const [coverPreview, setCoverPreview] = useState<string | null>(null)
	const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
	const [existingGalleryImages, setExistingGalleryImages] = useState<Array<{ url: string; index: number }>>(
		initialData?.galleryImages || []
	)
	const [imagesToDelete, setImagesToDelete] = useState<number[]>([])
	const [replaceCover, setReplaceCover] = useState(false)

	const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setCoverPreview(reader.result as string)
				setReplaceCover(true)
			}
			reader.readAsDataURL(file)
		} else {
			setCoverPreview(null)
			setReplaceCover(false)
		}
	}

	const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files.length > 0) {
			const newPreviews: string[] = []
			let loadedCount = 0

			Array.from(files).forEach((file) => {
				const reader = new FileReader()
				reader.onloadend = () => {
					newPreviews.push(reader.result as string)
					loadedCount++
					if (loadedCount === files.length) {
						setGalleryPreviews(newPreviews)
					}
				}
				reader.readAsDataURL(file)
			})
		} else {
			setGalleryPreviews([])
		}
	}

	const removeGalleryPreview = (index: number) => {
		setGalleryPreviews((prev) => prev.filter((_, i) => i !== index))
		// Clear the file input to allow re-selection
		const input = document.getElementById("gallery-images") as HTMLInputElement
		if (input) input.value = ""
	}

	const removeExistingImage = (imageIndex: number) => {
		setExistingGalleryImages((prev) => prev.filter((img) => img.index !== imageIndex))
		setImagesToDelete((prev) => [...prev, imageIndex])
	}

	return (
		<form action="/api/admin/gallery" method="POST" encType="multipart/form-data" style={{ marginTop: "25px" }}>
			{initialData?.id && <input type="hidden" name="galleryId" value={initialData.id} />}
			{imagesToDelete.length > 0 && <input type="hidden" name="deleteImageIndices" value={JSON.stringify(imagesToDelete)} />}
			<div className="row gy-3">
				<div className="col-12">
					<label htmlFor="gallery-cover-image" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Cover Image
					</label>
					{initialData?.coverImage && !replaceCover && (
						<div style={{ marginBottom: "12px" }}>
							<p style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#374151" }}>Current Cover:</p>
							<div 
								style={{
									position: "relative",
									width: "80px",
									height: "80px",
									borderRadius: "8px",
									overflow: "hidden",
									boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
								}}
							>
								<img 
									src={initialData.coverImage} 
									alt="Current cover" 
									style={{ 
										width: "100%", 
										height: "100%",
										objectFit: "cover",
										display: "block"
									}} 
								/>
							</div>
						</div>
					)}
					<input 
						id="gallery-cover-image" 
						name="coverImage" 
						type="file" 
						accept="image/*" 
						className="form-control" 
						required={!initialData?.id}
						onChange={handleCoverImageChange}
					/>
					<p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
						{initialData?.id ? "Upload a new image to replace the current cover." : "This will be the main album thumbnail. Recommended: JPG or PNG, at least 1200px wide."}
					</p>
					{coverPreview && (
						<div style={{ marginTop: "12px" }}>
							<p style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#374151" }}>New Preview:</p>
							<div 
								style={{
									position: "relative",
									width: "80px",
									height: "80px",
									borderRadius: "8px",
									overflow: "hidden",
									boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
								}}
							>
								<img 
									src={coverPreview} 
									alt="Cover preview" 
									style={{ 
										width: "100%", 
										height: "100%",
										objectFit: "cover",
										display: "block"
									}} 
								/>
							</div>
						</div>
					)}
				</div>
				<div className="col-12">
					<label htmlFor="gallery-title" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Album Title
					</label>
					<input
						id="gallery-title"
						name="title"
						type="text"
						className="form-control"
						placeholder="e.g., IBPC Annual Picnic 2024"
						required
						defaultValue={initialData?.title}
					/>
				</div>
				<div className="col-12">
					<label htmlFor="gallery-images" className="form-label" style={{ fontWeight: 600, marginBottom: "6px" }}>
						Gallery Images
					</label>
					{existingGalleryImages.length > 0 && (
						<div style={{ marginBottom: "12px" }}>
							<p style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#374151" }}>
								Current Images ({existingGalleryImages.length}):
							</p>
							<div 
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "8px"
								}}
							>
								{existingGalleryImages.map((img) => (
									<div
										key={img.index}
										style={{
											position: "relative",
											width: "60px",
											height: "60px",
											borderRadius: "6px",
											overflow: "hidden",
											boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
										}}
									>
										<img
											src={img.url}
											alt={`Existing image ${img.index + 1}`}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover"
											}}
										/>
										<button
											type="button"
											onClick={() => removeExistingImage(img.index)}
											style={{
												position: "absolute",
												top: "2px",
												right: "2px",
												width: "20px",
												height: "20px",
												borderRadius: "50%",
												border: "none",
												background: "rgba(220, 38, 38, 0.95)",
												color: "#fff",
												fontSize: "10px",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												transition: "background 0.2s",
												padding: 0
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.background = "rgba(185, 28, 28, 1)"
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.background = "rgba(220, 38, 38, 0.95)"
											}}
											title="Delete image"
										>
											<i className="fas fa-times" />
										</button>
									</div>
								))}
							</div>
						</div>
					)}
					<input 
						id="gallery-images" 
						name="galleryImages" 
						type="file" 
						accept="image/*" 
						multiple 
						className="form-control"
						onChange={handleGalleryImagesChange}
					/>
					<p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
						{initialData?.id 
							? "Select multiple images to add to this album. Existing images will be kept unless deleted." 
							: "Select multiple images for this album. Hold Ctrl/Cmd to select multiple files."}
					</p>
					{galleryPreviews.length > 0 && (
						<div style={{ marginTop: "12px" }}>
							<p style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#374151" }}>
								New Images to Add ({galleryPreviews.length}):
							</p>
							<div 
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "8px"
								}}
							>
								{galleryPreviews.map((preview, index) => (
									<div
										key={index}
										style={{
											position: "relative",
											width: "60px",
											height: "60px",
											borderRadius: "6px",
											overflow: "hidden",
											boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
										}}
									>
										<img
											src={preview}
											alt={`Gallery preview ${index + 1}`}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover"
											}}
										/>
										<button
											type="button"
											onClick={() => removeGalleryPreview(index)}
											style={{
												position: "absolute",
												top: "2px",
												right: "2px",
												width: "20px",
												height: "20px",
												borderRadius: "50%",
												border: "none",
												background: "rgba(220, 38, 38, 0.95)",
												color: "#fff",
												fontSize: "10px",
												cursor: "pointer",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												transition: "background 0.2s",
												padding: 0
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.background = "rgba(185, 28, 28, 1)"
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.background = "rgba(220, 38, 38, 0.95)"
											}}
											title="Remove image"
										>
											<i className="fas fa-times" />
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				<div className="col-12">
					<button type="submit" className="btn" style={{ marginTop: "10px" }}>
						<span className="btn-text" data-text={initialData?.id ? "Update Album" : "Save Album"} />
					</button>
				</div>
			</div>
		</form>
	)
}


