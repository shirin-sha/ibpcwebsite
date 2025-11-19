import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import NewsForm from "@/components/admin/NewsForm"

async function requireAdminSession() {
	const sessionToken = cookies().get("ibpc_admin_session")?.value
	if (!sessionToken) {
		redirect("/admin?error=unauthorized")
	}

	const db = await getDb()
	const session = await db.collection("adminSessions").findOne<{ sessionId: string; expiresAt?: Date; email?: string }>({
		sessionId: sessionToken,
		expiresAt: { $gt: new Date() }
	} as any)

	if (!session) {
		redirect("/admin?error=unauthorized")
	}

	return session
}

type AdminNewsPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

export default async function AdminNewsPage({ searchParams }: AdminNewsPageProps) {
	const session = await requireAdminSession()

	const today = new Date()
	const yyyy = today.getFullYear()
	const mm = String(today.getMonth() + 1).padStart(2, "0")
	const dd = String(today.getDate()).padStart(2, "0")
	const todayStr = `${yyyy}-${mm}-${dd}`

	const statusMessage =
		searchParams?.status === "success"
			? { type: "success", text: "News item saved successfully." }
			: searchParams?.error === "missing_title"
				? { type: "error", text: "Please provide a title before saving." }
				: searchParams?.error === "unauthorized"
					? { type: "error", text: "Your session has expired. Please sign in again." }
					: null

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
				<div>
					<h2 className="title mb-4" style={{ fontSize: "24px" }}>
						Create News Item
					</h2>
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
					<NewsForm defaultDate={todayStr} />
				</div>
			</div>
		</AdminLayout>
	)
}


