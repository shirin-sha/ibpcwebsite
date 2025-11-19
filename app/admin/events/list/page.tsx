import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import AdminListPage, { StatusMessage } from "@/components/admin/AdminListPage"
import { Column } from "@/components/admin/AdminTable"

type EventDocument = {
	_id: { toString(): string }
	title?: string
	description?: string
	location?: string
	startDate?: string
	endDate?: string
	createdAt?: Date
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

type AdminEventsListPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

export default async function AdminEventsListPage({ searchParams }: AdminEventsListPageProps) {
	const { db } = await requireAdminSession()
	const docs = (await db
		.collection("events")
		.find({})
		.sort({ createdAt: -1 })
		.limit(50)
		.toArray()) as EventDocument[]

	const events = docs.map((event) => ({
		id: event._id?.toString?.() ?? "",
		title: event.title || "Untitled event",
		location: event.location || "—",
		startDate: event.startDate || "",
		endDate: event.endDate || "",
		description: event.description || "",
		createdAt: event.createdAt instanceof Date ? event.createdAt.toLocaleString() : ""
	}))

	const statusMessage: StatusMessage =
		searchParams?.status === "updated"
			? { type: "success", text: "Event updated successfully." }
			: searchParams?.status === "success"
				? { type: "success", text: "Event created successfully." }
				: searchParams?.status === "deleted"
					? { type: "success", text: "Event deleted successfully." }
					: searchParams?.error === "update_failed"
						? { type: "error", text: "Unable to update event. Please try again." }
						: searchParams?.error === "missing_title"
							? { type: "error", text: "Please provide the event title." }
							: searchParams?.error === "delete_failed"
								? { type: "error", text: "Unable to delete event. Please try again." }
								: null

	const columns: Column<typeof events[0]>[] = [
		{
			key: "title",
			label: "Title",
			maxWidth: "260px",
			render: (item) => <strong>{item.title}</strong>
		},
		{
			key: "location",
			label: "Location"
		},
		{
			key: "startDate",
			label: "Start Date",
			render: (item) => item.startDate || "--"
		},
		{
			key: "endDate",
			label: "End Date",
			render: (item) => item.endDate || "--"
		},
		{
			key: "createdAt",
			label: "Created",
			render: (item) => item.createdAt || "--"
		}
	]

	return (
		<AdminLayout active="events-list">
			<AdminListPage
				title="Events List"
				description="Overview of upcoming and past IBPC events."
				createButtonText="Add Event"
				createButtonHref="/admin/events"
				statusMessage={statusMessage}
				columns={columns}
				data={events}
				editPath={(item) => `/admin/events/${item.id}/edit`}
				deleteApiPath="/api/admin/events"
				deleteItemName="event"
				emptyMessage="No events have been added yet."
			/>
		</AdminLayout>
	)
}


