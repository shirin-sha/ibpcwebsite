import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import VideoGalleryForm from "@/components/admin/VideoGalleryForm"

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

type AdminVideoGalleryPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

export default async function AdminVideoGalleryPage({ searchParams }: AdminVideoGalleryPageProps) {
	await requireAdminSession()

	const statusMessage =
		searchParams?.status === "success"
			? { type: "success" as const, text: "Video saved successfully." }
			: searchParams?.status === "updated"
				? { type: "success" as const, text: "Video updated successfully." }
				: searchParams?.error === "missing_title"
					? { type: "error" as const, text: "Please provide a video title." }
					: searchParams?.error === "missing_url"
						? { type: "error" as const, text: "Please provide a YouTube video URL." }
						: searchParams?.error === "unauthorized"
							? { type: "error" as const, text: "Your session has expired. Please sign in again." }
							: null

	return (
		<AdminLayout active="video-gallery">
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
					Add Video to Gallery
				</h2>
				<p style={{ color: "#666", fontSize: "14px" }}>Add a new YouTube video to the video gallery.</p>
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
				<VideoGalleryForm />
			</div>
		</AdminLayout>
	)
}

