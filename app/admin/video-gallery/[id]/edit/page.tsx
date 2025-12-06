import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
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

	return { db }
}

type AdminVideoGalleryEditPageProps = {
	params: { id: string }
}

export default async function AdminVideoGalleryEditPage({ params }: AdminVideoGalleryEditPageProps) {
	const { db } = await requireAdminSession()
	let videoData: {
		id?: string
		title?: string
		description?: string
		videoUrl?: string
		publishedDate?: string
	} | null = null

	try {
		const doc = await db.collection("videoGallery").findOne({ _id: new ObjectId(params.id) })
		if (doc) {
			videoData = {
				id: doc._id?.toString?.(),
				title: doc.title || "",
				description: doc.description || "",
				videoUrl: doc.videoUrl || "",
				publishedDate: doc.publishedDate || ""
			}
		}
	} catch (error) {
		console.error("Failed to load video", error)
	}

	if (!videoData) {
		redirect("/admin/video-gallery/list?error=not_found")
	}

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
				<div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-30" style={{ gap: "10px" }}>
					<div>
						<h2 className="title mb-4" style={{ fontSize: "24px" }}>
							Edit Video
						</h2>
						<a href="/admin/video-gallery/list" style={{ fontSize: "13px", color: "var(--tg-theme-primary)" }}>
							&larr; Back to list
						</a>
					</div>
				</div>
				<VideoGalleryForm initialData={videoData} />
			</div>
		</AdminLayout>
	)
}



