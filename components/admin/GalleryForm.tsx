'use client'

import { useState, useRef } from "react"

type GalleryFormProps = {
	initialData?: {
		id?: string
		title?: string
		coverImage?: string | null
		galleryImages?: Array<{ url: string; index: number }>
	}
}

export default function GalleryForm({ initialData }: GalleryFormProps) {
	const [title, setTitle] = useState(initialData?.title || "")
	const [coverPreview, setCoverPreview] = useState<string | null>(null)
	const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
	const [existingGalleryImages, setExistingGalleryImages] = useState<Array<{ url: string; index: number }>>(
		initialData?.galleryImages || []
	)
	const [deleteImageIndices, setDeleteImageIndices] = useState<number[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)

	const coverInputRef = useRef<HTMLInputElement>(null)
	const galleryInputRef = useRef<HTMLInputElement>(null)

	const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setCoverPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || [])
		if (files.length > 0) {
			const newPreviews: string[] = []
			files.forEach((file) => {
				const reader = new FileReader()
				reader.onloadend = () => {
					newPreviews.push(reader.result as string)
					if (newPreviews.length === files.length) {
						setGalleryPreviews((prev) => [...prev, ...newPreviews])
					}
				}
				reader.readAsDataURL(file)
			})
		}
	}

	const removeGalleryPreview = (index: number) => {
		setGalleryPreviews((prev) => prev.filter((_, i) => i !== index))
	}

	const removeExistingImage = (index: number) => {
		setDeleteImageIndices((prev) => [...prev, index])
		setExistingGalleryImages((prev) => prev.filter((_, i) => i !== index))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (isSubmitting) return

		setIsSubmitting(true)

		const formData = new FormData()
		formData.append("title", title)

		if (initialData?.id) {
			formData.append("galleryId", initialData.id)
		}

		if (coverInputRef.current?.files?.[0]) {
			formData.append("coverImage", coverInputRef.current.files[0])
		}

		if (galleryInputRef.current?.files) {
			Array.from(galleryInputRef.current.files).forEach((file) => {
				formData.append("galleryImages", file)
			})
		}

		if (deleteImageIndices.length > 0) {
			formData.append("deleteImageIndices", JSON.stringify(deleteImageIndices))
		}

		try {
			const response = await fetch("/api/admin/gallery", {
				method: "POST",
				body: formData
			})

			if (response.redirected) {
				window.location.href = response.url
			} else {
				const result = await response.json()
				if (result.error) {
					alert(result.error)
				}
			}
		} catch (error) {
			console.error("Failed to submit form", error)
			alert("Failed to save album. Please try again.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
			{/* Title Field */}
			<div>
				<label htmlFor="title" style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px" }}>
					Album Title <span style={{ color: "#dc3545" }}>*</span>
				</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					style={{
						width: "100%",
						padding: "12px 16px",
						border: "1px solid #e5e7eb",
						borderRadius: "8px",
						fontSize: "14px"
					}}
					placeholder="Enter album title"
				/>
			</div>

			{/* Cover Image Field */}
			<div>
				<label htmlFor="coverImage" style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px" }}>
					Cover Image {!initialData?.id && <span style={{ color: "#dc3545" }}>*</span>}
				</label>
				<input
					ref={coverInputRef}
					type="file"
					id="coverImage"
					accept="image/*"
					onChange={handleCoverChange}
					required={!initialData?.id}
					style={{
						width: "100%",
						padding: "12px 16px",
						border: "1px solid #e5e7eb",
						borderRadius: "8px",
						fontSize: "14px"
					}}
				/>
				{coverPreview && (
					<div style={{ marginTop: "12px", display: "flex", gap: "8px", alignItems: "center" }}>
						<img
							src={coverPreview}
							alt="Cover preview"
							style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e5e7eb" }}
						/>
						<button
							type="button"
							onClick={() => {
								setCoverPreview(null)
								if (coverInputRef.current) coverInputRef.current.value = ""
							}}
							style={{
								padding: "6px 12px",
								background: "#dc3545",
								color: "#fff",
								border: "none",
								borderRadius: "6px",
								cursor: "pointer",
								fontSize: "12px"
							}}
						>
							Remove
						</button>
					</div>
				)}
				{initialData?.coverImage && !coverPreview && (
					<div style={{ marginTop: "12px", display: "flex", gap: "8px", alignItems: "center" }}>
						<img
							src={initialData.coverImage}
							alt="Current cover"
							style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e5e7eb" }}
						/>
						<span style={{ fontSize: "12px", color: "#666" }}>Current cover image</span>
					</div>
				)}
			</div>

			{/* Gallery Images Field */}
			<div>
				<label htmlFor="galleryImages" style={{ display: "block", marginBottom: "8px", fontWeight: 600, fontSize: "14px" }}>
					Gallery Images
				</label>
				<input
					ref={galleryInputRef}
					type="file"
					id="galleryImages"
					accept="image/*"
					multiple
					onChange={handleGalleryChange}
					style={{
						width: "100%",
						padding: "12px 16px",
						border: "1px solid #e5e7eb",
						borderRadius: "8px",
						fontSize: "14px"
					}}
				/>
				{galleryPreviews.length > 0 && (
					<div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
						{galleryPreviews.map((preview, index) => (
							<div key={index} style={{ position: "relative" }}>
								<img
									src={preview}
									alt={`Preview ${index + 1}`}
									style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e5e7eb" }}
								/>
								<button
									type="button"
									onClick={() => removeGalleryPreview(index)}
									style={{
										position: "absolute",
										top: "-4px",
										right: "-4px",
										width: "18px",
										height: "18px",
										background: "#dc3545",
										color: "#fff",
										border: "none",
										borderRadius: "50%",
										cursor: "pointer",
										fontSize: "10px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									×
								</button>
							</div>
						))}
					</div>
				)}
				{existingGalleryImages.length > 0 && (
					<div style={{ marginTop: "12px" }}>
						<p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>Existing gallery images:</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
							{existingGalleryImages.map((img, index) => (
								<div key={index} style={{ position: "relative" }}>
									<img
										src={img.url}
										alt={`Gallery ${index + 1}`}
										style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e5e7eb" }}
									/>
									<button
										type="button"
										onClick={() => removeExistingImage(index)}
										style={{
											position: "absolute",
											top: "-4px",
											right: "-4px",
											width: "18px",
											height: "18px",
											background: "#dc3545",
											color: "#fff",
											border: "none",
											borderRadius: "50%",
											cursor: "pointer",
											fontSize: "10px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center"
										}}
									>
										×
									</button>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Submit Button */}
			<div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
				<button
					type="submit"
					disabled={isSubmitting}
					className="btn"
					style={{
						padding: "12px 24px",
						borderRadius: "8px",
						fontSize: "14px",
						fontWeight: 600,
						cursor: isSubmitting ? "not-allowed" : "pointer",
						opacity: isSubmitting ? 0.6 : 1
					}}
				>
					<span className="btn-text" data-text={isSubmitting ? "Saving..." : initialData?.id ? "Update Album" : "Create Album"} />
				</button>
				{initialData?.id && (
					<a
						href="/admin/gallery/list"
						style={{
							padding: "12px 24px",
							borderRadius: "8px",
							fontSize: "14px",
							fontWeight: 600,
							textDecoration: "none",
							background: "#f3f4f6",
							color: "#374151",
							border: "1px solid #e5e7eb"
						}}
					>
						Cancel
					</a>
				)}
			</div>
		</form>
	)
}
