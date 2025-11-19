import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import ContactMessagesTable from "@/components/admin/ContactMessagesTable"

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

export default async function AdminContactEnquiriesPage() {
	const { db } = await requireAdminSession()
	const docs = (await db
		.collection("contactMessages")
		.find({})
		.sort({ createdAt: -1 })
		.limit(200)
		.toArray()) as any[]

	const messages = docs.map((doc) => ({
		id: doc._id?.toString?.() || "",
		name: doc.name || "Unknown",
		email: doc.email || "",
		mobile: doc.mobile || "",
		subject: doc.subject || "general-inquiries",
		message: doc.message || "",
		status: doc.status || "new",
		createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : ""
	}))

	return (
		<AdminLayout active="contact">
			<div
				style={{
					background: "#ffffff",
					borderRadius: "18px",
					boxShadow: "0 18px 45px rgba(0,0,0,0.07)",
					padding: "32px 28px"
				}}
			>
				<div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4" style={{ gap: "12px" }}>
					<div>
						<h2 className="title mb-2" style={{ fontSize: "24px" }}>
							Contact Enquiries
						</h2>
		
					</div>
				</div>
				<ContactMessagesTable messages={messages} />
			</div>
		</AdminLayout>
	)
}

