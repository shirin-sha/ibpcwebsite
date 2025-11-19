import Link from "next/link"
import DeleteButton from "./DeleteButton"
import { ReactNode } from "react"

export type Column<T = any> = {
	key: string
	label: string
	render?: (item: T) => ReactNode
	width?: string | number
	maxWidth?: string | number
}

type AdminTableProps<T = any> = {
	columns: Column<T>[]
	data: T[]
	editPath?: string | ((item: T) => string)
	deleteApiPath?: string
	deleteItemName?: string
	emptyMessage?: string
	showActions?: boolean
}

export default function AdminTable<T extends { id: string }>({
	columns,
	data,
	editPath,
	deleteApiPath,
	deleteItemName = "item",
	emptyMessage = "No items found.",
	showActions = true
}: AdminTableProps<T>) {
	if (data.length === 0) {
		return <div style={{ textAlign: "center", color: "#8188a1" }}>{emptyMessage}</div>
	}

	const getEditUrl = (item: T): string | undefined => {
		if (!editPath) return undefined
		return typeof editPath === "function" ? editPath(item) : editPath.replace("[id]", item.id)
	}

	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: `
				.admin-table-wrapper {
					border: 1px solid #e5e7eb;
					border-radius: 12px;
					overflow: hidden;
					background: #fff;
				}
				.admin-table-wrapper .table {
					margin-bottom: 0;
					border-collapse: separate;
					border-spacing: 0;
				}
				.admin-table-wrapper .table thead {
					background: #f9fafb;
					border-bottom: 2px solid #e5e7eb;
				}
				.admin-table-wrapper .table thead th {
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
				.admin-table-wrapper .table thead th:last-child {
					border-right: none;
				}
				.admin-table-wrapper .table tbody tr {
					border-bottom: 1px solid #e5e7eb;
					transition: background-color 0.15s ease;
				}
				.admin-table-wrapper .table tbody tr:last-child {
					border-bottom: none;
				}
				.admin-table-wrapper .table tbody tr:hover {
					background-color: #f9fafb;
				}
				.admin-table-wrapper .table tbody tr:nth-child(even) {
					background-color: #fafafa;
				}
				.admin-table-wrapper .table tbody tr:nth-child(even):hover {
					background-color: #f3f4f6;
				}
				.admin-table-wrapper .table tbody td {
					border: none;
					border-right: 1px solid #e5e7eb;
					padding: 16px 20px;
					font-size: 14px;
					color: #4b5563;
					vertical-align: middle;
				}
				.admin-table-wrapper .table tbody td:last-child {
					border-right: none;
				}
				.edit-icon-link:hover {
					background: rgba(59, 130, 246, 0.1) !important;
				}
				@media (max-width: 768px) {
					.admin-table-wrapper .table thead th,
					.admin-table-wrapper .table tbody td {
						padding: 12px 14px;
						font-size: 13px;
					}
				}
			` }} />
			<div className="table-responsive admin-table-wrapper">
				<table className="table">
					<thead>
						<tr>
							{columns.map((col) => (
								<th
									key={col.key}
									scope="col"
									style={col.width ? { width: col.width } : col.maxWidth ? { maxWidth: col.maxWidth } : undefined}
								>
									{col.label}
								</th>
							))}
							{showActions && (
								<th scope="col" style={{ width: "120px", textAlign: "center" }}>
									Actions
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{data.map((item) => (
							<tr key={item.id}>
								{columns.map((col) => (
									<td
										key={col.key}
										style={col.maxWidth ? { maxWidth: col.maxWidth } : undefined}
									>
										{col.render ? col.render(item) : (item as any)[col.key] ?? "--"}
									</td>
								))}
								{showActions && (
									<td style={{ textAlign: "center" }}>
										<div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
											{editPath && getEditUrl(item) && (
												<Link
													href={getEditUrl(item)!}
													className="edit-icon-link"
													style={{
														fontSize: "16px",
														color: "var(--tg-theme-primary)",
														textDecoration: "none",
														display: "inline-flex",
														alignItems: "center",
														justifyContent: "center",
														width: "32px",
														height: "32px",
														borderRadius: "6px",
														transition: "all 0.2s"
													}}
													title="Edit"
												>
													<i className="fas fa-edit" />
												</Link>
											)}
											{deleteApiPath && (
												<DeleteButton
													id={item.id}
													apiPath={deleteApiPath}
													itemName={deleteItemName}
												/>
											)}
										</div>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

