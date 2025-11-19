'use client'

import { useState } from 'react'

type DeleteButtonProps = {
	id: string
	apiPath: string
	itemName?: string
}

export default function DeleteButton({ id, apiPath, itemName = "item" }: DeleteButtonProps) {
	const [isDeleting, setIsDeleting] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	const handleDelete = async () => {
		if (!showConfirm) {
			setShowConfirm(true)
			return
		}

		setIsDeleting(true)
		try {
			const response = await fetch(`${apiPath}/${id}`, {
				method: 'DELETE'
			})

			if (response.redirected) {
				window.location.href = response.url
			} else {
				window.location.reload()
			}
		} catch (error) {
			console.error('Failed to delete', error)
			setIsDeleting(false)
			setShowConfirm(false)
			alert('Failed to delete item. Please try again.')
		}
	}

	if (showConfirm) {
		return (
			<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
				<button
					type="button"
					onClick={handleDelete}
					disabled={isDeleting}
					style={{
						padding: "4px 12px",
						borderRadius: "6px",
						border: "1px solid #dc2626",
						background: "#dc2626",
						color: "#fff",
						fontSize: "12px",
						fontWeight: 500,
						cursor: isDeleting ? "not-allowed" : "pointer",
						opacity: isDeleting ? 0.6 : 1
					}}
				>
					{isDeleting ? "Deleting..." : "Confirm"}
				</button>
				<button
					type="button"
					onClick={() => setShowConfirm(false)}
					disabled={isDeleting}
					style={{
						padding: "4px 12px",
						borderRadius: "6px",
						border: "1px solid #e5e7f0",
						background: "#fff",
						color: "#6b7280",
						fontSize: "12px",
						fontWeight: 500,
						cursor: isDeleting ? "not-allowed" : "pointer"
					}}
				>
					Cancel
				</button>
			</div>
		)
	}

	return (
		<button
			type="button"
			onClick={handleDelete}
			title="Delete"
			style={{
				padding: 0,
				borderRadius: "6px",
				border: "1px solid #e5e7f0",
				background: "#fff",
				color: "#dc2626",
				fontSize: "16px",
				cursor: "pointer",
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: "32px",
				height: "32px",
				transition: "all 0.2s"
			}}
			onMouseOver={(e) => {
				e.currentTarget.style.borderColor = "#dc2626"
				e.currentTarget.style.background = "#fef2f2"
			}}
			onMouseOut={(e) => {
				e.currentTarget.style.borderColor = "#e5e7f0"
				e.currentTarget.style.background = "#fff"
			}}
		>
			<i className="fas fa-trash-alt" />
		</button>
	)
}

