import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import GalleryForm from "@/components/admin/GalleryForm"

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
}

type AdminGalleryPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

export default async function AdminGalleryPage({ searchParams }: AdminGalleryPageProps) {
	await requireAdminSession()

	const statusMessage =
		searchParams?.status === "success"
			? { type: "success" as const, text: "Album saved successfully." }
			: searchParams?.status === "updated"
				? { type: "success" as const, text: "Album updated successfully." }
				: searchParams?.error === "missing_title"
					? { type: "error" as const, text: "Please provide an album title." }
					: searchParams?.error === "missing_image"
						? { type: "error" as const, text: "Please upload a cover image." }
						: searchParams?.error === "unauthorized"
							? { type: "error" as const, text: "Your session has expired. Please sign in again." }
							: null

	return (
		<AdminLayout active="gallery">
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
					Add Photo Gallery Album
				</h2>
				<p style={{ color: "#666", fontSize: "14px" }}>Upload a cover image, title, and gallery images for a new album.</p>
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
				<GalleryForm />
			</div>
		</AdminLayout>
	)
}


