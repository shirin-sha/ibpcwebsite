'use client'

import { useMemo, useState } from "react"

type ContactMessage = {
	id: string
	name: string
	email: string
	mobile?: string
	subject?: string
	message: string
	status?: string
	createdAt?: string
}

const SUBJECT_LABELS: Record<string, string> = {
	"general-inquiries": "General Inquiries",
	"new-membership": "New Membership",
	"community-partnerships": "Community & Partnerships"
}

type ContactMessagesTableProps = {
	messages: ContactMessage[]
}

const formatDate = (value?: string) => {
	if (!value) return "--"
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return "--"
	return date.toLocaleString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	})
}

export default function ContactMessagesTable({ messages }: ContactMessagesTableProps) {
	const [selected, setSelected] = useState<ContactMessage | null>(null)

	const sortedMessages = useMemo(() => messages, [messages])

	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: `
				.contact-table-wrapper {
					border: 1px solid #e5e7eb;
					border-radius: 12px;
					overflow: hidden;
					background: #fff;
				}
				.contact-table-wrapper .table {
					margin-bottom: 0;
					border-collapse: separate;
					border-spacing: 0;
					min-width: 720px;
				}
				.contact-table-wrapper .table thead {
					background: #f9fafb;
					border-bottom: 2px solid #e5e7eb;
				}
				.contact-table-wrapper .table thead th {
					border: none;
					border-right: 1px solid #e5e7eb;
					border-bottom: 2px solid #e5e7eb;
					padding: 16px 20px;
					font-weight: 600;
					font-size: 13px;
					color: #374151;
					text-transform: uppercase;
					letter-spacing: 0.5px;
					vertical-align: middle;
				}
				.contact-table-wrapper .table thead th:last-child {
					border-right: none;
				}
				.contact-table-wrapper .table tbody tr {
					border-bottom: 1px solid #e5e7eb;
					transition: background-color 0.15s ease;
				}
				.contact-table-wrapper .table tbody tr:last-child {
					border-bottom: none;
				}
				.contact-table-wrapper .table tbody tr:hover {
					background-color: #f9fafb;
				}
				.contact-table-wrapper .table tbody tr:nth-child(even) {
					background-color: #fafafa;
				}
				.contact-table-wrapper .table tbody tr:nth-child(even):hover {
					background-color: #f3f4f6;
				}
				.contact-table-wrapper .table tbody td {
					border: none;
					border-right: 1px solid #e5e7eb;
					padding: 16px 20px;
					font-size: 14px;
					color: #4b5563;
					vertical-align: middle;
				}
				.contact-table-wrapper .table tbody td:last-child {
					border-right: none;
				}
				.view-enquiry-btn:hover {
					background: rgba(59, 130, 246, 0.1) !important;
					border-radius: 6px;
				}
				@media (max-width: 768px) {
					.contact-table-wrapper .table thead th,
					.contact-table-wrapper .table tbody td {
						padding: 12px 14px;
						font-size: 13px;
					}
				}
			` }} />
			<div className="table-responsive contact-table-wrapper">
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Date</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Subject</th>
							<th scope="col" style={{ textAlign: "center", width: "100px" }}>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedMessages.length === 0 ? (
							<tr>
								<td colSpan={5} style={{ textAlign: "center", padding: "32px 0", color: "#8188a1" }}>
									No contact enquiries have been received yet.
								</td>
							</tr>
						) : (
							sortedMessages.map((item) => (
								<tr key={item.id}>
									<td>{formatDate(item.createdAt)}</td>
									<td><strong>{item.name}</strong></td>
									<td>{item.email}</td>
									<td>{SUBJECT_LABELS[item.subject || "general-inquiries"] || "General Inquiries"}</td>
									<td style={{ textAlign: "center" }}>
										<button
											type="button"
											onClick={() => setSelected(item)}
											className="view-enquiry-btn"
											style={{
												border: "none",
												background: "transparent",
												cursor: "pointer",
												color: "var(--tg-theme-primary)",
												fontSize: "16px",
												padding: "8px",
												display: "inline-flex",
												alignItems: "center",
												justifyContent: "center",
												width: "32px",
												height: "32px",
												transition: "all 0.2s"
											}}
											aria-label="View enquiry"
											title="View details"
										>
											<i className="far fa-eye" />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			{selected && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: "rgba(15, 23, 42, 0.55)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000,
						padding: "20px"
					}}
				>
					<div
						style={{
							background: "#fff",
							borderRadius: "16px",
							width: "100%",
							maxWidth: "560px",
							padding: "28px",
							boxShadow: "0 25px 60px rgba(15, 23, 42, 0.2)",
							position: "relative"
						}}
					>
						<button
							type="button"
							onClick={() => setSelected(null)}
							style={{
								position: "absolute",
								top: "14px",
								right: "14px",
								border: "none",
								background: "transparent",
								fontSize: "18px",
								cursor: "pointer",
								color: "#6b7280"
							}}
							aria-label="Close"
						>
							<i className="fas fa-times" />
						</button>
						<h4 style={{ marginBottom: "18px" }}>Enquiry Details</h4>
						<div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "#4b5563" }}>
							<div>
								<strong style={{ display: "block", color: "#111827" }}>Date</strong>
								{formatDate(selected.createdAt)}
							</div>
							<div>
								<strong style={{ display: "block", color: "#111827" }}>Name</strong>
								{selected.name}
							</div>
							<div>
								<strong style={{ display: "block", color: "#111827" }}>Email</strong>
								{selected.email}
							</div>
							{selected.mobile && (
								<div>
									<strong style={{ display: "block", color: "#111827" }}>Mobile</strong>
									{selected.mobile}
								</div>
							)}
							<div>
								<strong style={{ display: "block", color: "#111827" }}>Subject</strong>
								{SUBJECT_LABELS[selected.subject || "general-inquiries"] || "General Inquiries"}
							</div>
							<div>
								<strong style={{ display: "block", color: "#111827" }}>Message</strong>
								<p style={{ margin: 0, whiteSpace: "pre-line" }}>{selected.message}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

