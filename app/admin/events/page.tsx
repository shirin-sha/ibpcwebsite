import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import EventsForm from "@/components/admin/EventsForm"
import { getDb } from "@/lib/mongodb"

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

	return session
}

type AdminEventsPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

const toInputDate = (date: Date) => {
	const yyyy = date.getFullYear()
	const mm = String(date.getMonth() + 1).padStart(2, "0")
	const dd = String(date.getDate()).padStart(2, "0")
	return `${yyyy}-${mm}-${dd}`
}

export default async function AdminEventsPage({ searchParams }: AdminEventsPageProps) {
	await requireAdminSession()

	const today = new Date()
	const defaultDate = toInputDate(today)

	const statusMessage =
		searchParams?.status === "success"
			? { type: "success", text: "Event saved successfully." }
			: searchParams?.error === "missing_title"
				? { type: "error", text: "Please provide the event title." }
				: searchParams?.error === "unauthorized"
					? { type: "error", text: "Your session has expired. Please sign in again." }
					: null

	return (
		<AdminLayout active="events">
			<div
				style={{
					background: "#fff",
					borderRadius: "18px",
					boxShadow: "0 18px 45px rgba(0,0,0,0.07)",
					padding: "32px 28px",
					minHeight: "400px"
				}}
			>
				<h2 className="title mb-3" style={{ fontSize: "24px" }}>
					Add Upcoming Event
				</h2>
				<p style={{ color: "#666", fontSize: "14px" }}>Share details about upcoming IBPC events, meetings, and engagements.</p>
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
				<EventsForm defaultStartDate={defaultDate} />
			</div>
		</AdminLayout>
	)
}







