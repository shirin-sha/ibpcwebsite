import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import AdminListPage, { StatusMessage } from "@/components/admin/AdminListPage"
import { Column } from "@/components/admin/AdminTable"

type NewsDocument = {
	_id: { toString(): string }
	title?: string
	shortDescription?: string
	publishedDate?: string
	category?: string
	signatureEvent?: boolean
	createdAt?: Date
}

const CATEGORY_LABELS: Record<string, string> = {
	"business-trade": "Business & Trade",
	"innovation-technology": "Innovation & Technology",
	"events-activities": "Events & Activities",
	"ibpc-community": "IBPC Community",
	"partnerships-relations": "Partnerships & Relations"
}

async function requireAdminSession() {
	const sessionToken = cookies().get("ibpc_admin_session")?.value
	if (!sessionToken) {
		redirect("/admin?error=unauthorized")
	}

	const db = await getDb()
	const session = await db.collection("adminSessions").findOne<{ sessionId: string; expiresAt?: Date }>({
		sessionId: sessionToken,
		expiresAt: { $gt: new Date() }
	} as any)

	if (!session) {
		redirect("/admin?error=unauthorized")
	}

	return { db }
}

type AdminNewsListPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

export default async function AdminNewsListPage({ searchParams }: AdminNewsListPageProps) {
	const { db } = await requireAdminSession()
	const docs = (await db
		.collection("news")
		.find({})
		.sort({ createdAt: -1 })
		.limit(25)
		.toArray()) as NewsDocument[]

	const news = docs.map((item) => ({
		id: item._id?.toString?.() ?? "",
		title: item.title ?? "Untitled",
		shortDescription: item.shortDescription ?? "",
		publishedDate: item.publishedDate ?? "",
		categoryLabel: CATEGORY_LABELS[item.category || ""] || "General",
		signatureEvent: Boolean(item.signatureEvent),
		createdAt: item.createdAt instanceof Date ? item.createdAt.toLocaleString() : ""
	}))

	const statusMessage: StatusMessage =
		searchParams?.status === "updated"
			? { type: "success", text: "News item updated successfully." }
			: searchParams?.status === "deleted"
				? { type: "success", text: "News item deleted successfully." }
				: searchParams?.error === "not_found"
					? { type: "error", text: "News item not found or removed." }
					: searchParams?.error === "update_failed"
						? { type: "error", text: "Unable to update news entry. Please try again." }
						: searchParams?.error === "delete_failed"
							? { type: "error", text: "Unable to delete news item. Please try again." }
							: null

	const columns: Column<typeof news[0]>[] = [
		{
			key: "title",
			label: "Title",
			maxWidth: "260px",
			render: (item) => <strong>{item.title}</strong>
		},
		{
			key: "categoryLabel",
			label: "Category"
		},
		{
			key: "publishedDate",
			label: "Published",
			render: (item) => item.publishedDate || "--"
		},
		{
			key: "signatureEvent",
			label: "Signature",
			render: (item) =>
				item.signatureEvent ? (
					<span style={{ color: "var(--tg-theme-primary)", fontWeight: 600 }}>Yes</span>
				) : (
					"No"
				)
		},
		{
			key: "createdAt",
			label: "Created",
			render: (item) => item.createdAt || "--"
		}
	]

	return (
		<AdminLayout active="news-list">
			<AdminListPage
				title="News List"
				description="Latest news entries submitted by admins."
				createButtonText="Create News"
				createButtonHref="/admin/news"
				statusMessage={statusMessage}
				columns={columns}
				data={news}
				editPath={(item) => `/admin/news/${item.id}/edit`}
				deleteApiPath="/api/admin/news"
				deleteItemName="news item"
				emptyMessage="No news entries found."
			/>
		</AdminLayout>
	)
}


