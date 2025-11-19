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
			<div style={{ overflowX: "auto" }}>
				<table className="table" style={{ minWidth: "720px" }}>
					<thead>
						<tr style={{ color: "#6b7280", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
							<th scope="col">Date</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Subject</th>
							<th scope="col" style={{ textAlign: "center" }}>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedMessages.length === 0 ? (
							<tr>
								<td colSpan={5} style={{ textAlign: "center", padding: "32px 0", color: "#7c8498" }}>
									No contact enquiries have been received yet.
								</td>
							</tr>
						) : (
							sortedMessages.map((item) => (
								<tr key={item.id}>
									<td style={{ verticalAlign: "middle", fontSize: "13px", color: "#111" }}>{formatDate(item.createdAt)}</td>
									<td style={{ verticalAlign: "middle", fontSize: "13px" }}>{item.name}</td>
									<td style={{ verticalAlign: "middle", fontSize: "13px", color: "#4b5563" }}>{item.email}</td>
									<td style={{ verticalAlign: "middle", fontSize: "13px", color: "#4b5563" }}>
										{SUBJECT_LABELS[item.subject || "general-inquiries"] || "General Inquiries"}
									</td>
									<td style={{ verticalAlign: "middle", textAlign: "center" }}>
										<button
											type="button"
											onClick={() => setSelected(item)}
											style={{
												border: "none",
												background: "transparent",
												cursor: "pointer",
												color: "var(--tg-theme-primary)",
												fontSize: "16px"
											}}
											aria-label="View enquiry"
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

