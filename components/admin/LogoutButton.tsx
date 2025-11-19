'use client'

export default function LogoutButton() {
	return (
		<form action="/api/admin/logout" method="POST">
			<button
				type="submit"
				style={{
					display: "flex",
					alignItems: "center",
					gap: "8px",
					padding: "8px 16px",
					borderRadius: "8px",
					border: "1px solid #e5e7f0",
					background: "#fff",
					color: "#6b7280",
					fontSize: "14px",
					fontWeight: 500,
					cursor: "pointer",
					transition: "all 0.2s",
				}}
				onMouseOver={(e) => {
					e.currentTarget.style.borderColor = "#dc2626"
					e.currentTarget.style.color = "#dc2626"
					e.currentTarget.style.background = "#fef2f2"
				}}
				onMouseOut={(e) => {
					e.currentTarget.style.borderColor = "#e5e7f0"
					e.currentTarget.style.color = "#6b7280"
					e.currentTarget.style.background = "#fff"
				}}
			>
				<i className="fas fa-sign-out-alt" />
				<span>Logout</span>
			</button>
		</form>
	)
}


