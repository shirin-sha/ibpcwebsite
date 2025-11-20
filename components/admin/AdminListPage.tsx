import Link from "next/link"
import { ReactNode } from "react"
import AdminTable, { Column } from "./AdminTable"

type StatusMessage = {
	type: "success" | "error"
	text: string
} | null

type AdminListPageProps<T = any> = {
	title: string
	description: string
	createButtonText: string
	createButtonHref: string
	statusMessage?: StatusMessage
	columns: Column<T>[]
	data: T[]
	editPath?: string | ((item: T) => string)
	deleteApiPath?: string
	deleteItemName?: string
	emptyMessage?: string
	showActions?: boolean
}

export default function AdminListPage<T extends { id: string }>({
	title,
	description,
	createButtonText,
	createButtonHref,
	statusMessage,
	columns,
	data,
	editPath,
	deleteApiPath,
	deleteItemName,
	emptyMessage,
	showActions = true
}: AdminListPageProps<T>) {
	return (
		<div
			style={{
				background: "#fff",
				borderRadius: "18px",
				boxShadow: "0 18px 45px rgba(0,0,0,0.07)",
				padding: "32px 28px",
				minHeight: "400px"
			}}
		>
			<div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4" style={{ gap: "12px" }}>
				<div>
					<h2 className="title mb-2" style={{ fontSize: "24px" }}>
						{title}
					</h2>
					<p style={{ color: "#666", fontSize: "14px", marginBottom: 0 }}>{description}</p>
				</div>
				<Link href={createButtonHref} className="btn" style={{ padding: "10px 18px" }}>
					<span className="btn-text" data-text={createButtonText} />
				</Link>
			</div>
			{statusMessage && (
				<div
					style={{
						borderRadius: "12px",
						padding: "14px 18px",
						marginBottom: "20px",
						fontWeight: 600,
						color: statusMessage.type === "success" ? "#0f5132" : "#b42318",
						background: statusMessage.type === "success" ? "rgba(209,231,221,0.9)" : "rgba(248,215,218,0.85)",
						border: `1px solid ${statusMessage.type === "success" ? "rgba(25,135,84,0.4)" : "rgba(220,53,69,0.4)"}`
					}}
				>
					{statusMessage.text}
				</div>
			)}
			<AdminTable
				columns={columns}
				data={data}
				editPath={editPath}
				deleteApiPath={deleteApiPath}
				deleteItemName={deleteItemName}
				emptyMessage={emptyMessage}
				showActions={showActions}
			/>
		</div>
	)
}

export type { StatusMessage }




