import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
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

	return { db }
}

const toInputDate = (date: Date) => {
	const yyyy = date.getFullYear()
	const mm = String(date.getMonth() + 1).padStart(2, "0")
	const dd = String(date.getDate()).padStart(2, "0")
	return `${yyyy}-${mm}-${dd}`
}

type AdminEventEditPageProps = {
	params: { id: string }
}

export default async function AdminEventEditPage({ params }: AdminEventEditPageProps) {
	const { db } = await requireAdminSession()

	let eventData: {
		id: string
		title: string
		description: string
		longDescription: string
		location: string
		startDate: string
		endDate: string
	} | null = null

	try {
		const doc = await db.collection("events").findOne({ _id: new ObjectId(params.id) })
		if (doc) {
			eventData = {
				id: doc._id?.toString?.() ?? "",
				title: doc.title || "",
				description: doc.description || "",
				longDescription: doc.longDescription || "",
				location: doc.location || "",
				startDate: doc.startDate || "",
				endDate: doc.endDate || ""
			}
		}
	} catch (error) {
		console.error("Failed to load event", error)
	}

	if (!eventData) {
		redirect("/admin/events/list?error=not_found")
	}

	const today = new Date()
	const defaultDate = toInputDate(today)

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
				<div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4" style={{ gap: "12px" }}>
					<div>
						<h2 className="title mb-2" style={{ fontSize: "24px" }}>
							Edit Event
						</h2>
						<a href="/admin/events/list" style={{ fontSize: "13px", color: "var(--tg-theme-primary)" }}>
							&larr; Back to events list
						</a>
					</div>
				</div>
				<EventsForm defaultStartDate={defaultDate} initialData={eventData} />
			</div>
		</AdminLayout>
	)
}



