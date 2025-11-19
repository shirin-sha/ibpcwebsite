import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import NewsForm from "@/components/admin/NewsForm"

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

const toInputDate = (date?: Date) => {
	if (!date) return ""
	const yyyy = date.getFullYear()
	const mm = String(date.getMonth() + 1).padStart(2, "0")
	const dd = String(date.getDate()).padStart(2, "0")
	return `${yyyy}-${mm}-${dd}`
}

type EditPageProps = {
	params: { id: string }
}

export default async function EditNewsPage({ params }: EditPageProps) {
	const { db } = await requireAdminSession()
	let newsItem = null

	try {
		const doc = await db.collection("news").findOne({ _id: new ObjectId(params.id) })
		if (doc) {
			newsItem = {
				id: doc._id?.toString?.(),
				title: doc.title || "",
				shortDescription: doc.shortDescription || "",
				longDescription: doc.longDescription || "",
				publishedDate: doc.publishedDate || "",
				category: doc.category || "",
				signatureEvent: Boolean(doc.signatureEvent),
				showOnHomepage: Boolean(doc.showOnHomepage)
			}
		}
	} catch (error) {
		console.error("Failed to load news item", error)
	}

	if (!newsItem) {
		redirect("/admin/news/list?error=not_found")
	}

	const today = new Date()
	const defaultDate = toInputDate(today)

	return (
		<AdminLayout active="news">
			<div
				className="admin-news-card"
				style={{
					background: "#ffffff",
					borderRadius: "18px",
					boxShadow: "0 18px 45px rgba(0,0,0,0.07)",
					padding: "32px 28px"
				}}
			>
				<div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-30" style={{ gap: "10px" }}>
					<div>
						<h2 className="title mb-4" style={{ fontSize: "24px" }}>
							Edit News Item
						</h2>
						<a href="/admin/news/list" style={{ fontSize: "13px", color: "var(--tg-theme-primary)" }}>
							&larr; Back to list
						</a>
					</div>
				</div>
				<NewsForm defaultDate={defaultDate} initialData={newsItem} />
			</div>
		</AdminLayout>
	)
}




