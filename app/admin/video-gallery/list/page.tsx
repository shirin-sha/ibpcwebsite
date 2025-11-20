import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import AdminListPage, { StatusMessage } from "@/components/admin/AdminListPage"
import { Column } from "@/components/admin/AdminTable"

type VideoDocument = {
	_id: { toString(): string }
	title?: string
	description?: string
	videoUrl?: string
	publishedDate?: string
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

type AdminVideoGalleryListPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

export default async function AdminVideoGalleryListPage({ searchParams }: AdminVideoGalleryListPageProps) {
	const { db } = await requireAdminSession()
	const docs = (await db
		.collection("videoGallery")
		.find(
			{},
			{
				projection: {
					title: 1,
					description: 1,
					videoUrl: 1,
					publishedDate: 1,
					createdAt: 1
				}
			}
		)
		.sort({ createdAt: -1 })
		.limit(100)
		.toArray()) as VideoDocument[]

	const videos = docs.map((video) => ({
		id: video._id?.toString?.() ?? "",
		title: video.title || "Untitled video",
		description: video.description || "",
		videoUrl: video.videoUrl || "",
		publishedDate: video.publishedDate || "",
		createdAt: video.createdAt instanceof Date ? video.createdAt.toLocaleString() : ""
	}))

	const statusMessage: StatusMessage =
		searchParams?.status === "updated"
			? { type: "success", text: "Video updated successfully." }
			: searchParams?.status === "success"
				? { type: "success", text: "Video added successfully." }
				: searchParams?.status === "deleted"
					? { type: "success", text: "Video deleted successfully." }
					: searchParams?.error === "update_failed"
						? { type: "error", text: "Unable to update video. Please try again." }
						: searchParams?.error === "missing_title"
							? { type: "error", text: "Please provide a video title." }
							: searchParams?.error === "delete_failed"
								? { type: "error", text: "Unable to delete video. Please try again." }
								: null

	const columns: Column<typeof videos[0]>[] = [
		{
			key: "title",
			label: "Video Title",
			render: (item) => (
				<div>
					<strong>{item.title}</strong>
					{item.description && (
						<div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
							{item.description.length > 80 ? `${item.description.slice(0, 77)}...` : item.description}
						</div>
					)}
				</div>
			)
		},
		{
			key: "publishedDate",
			label: "Published",
			maxWidth: "120px",
			render: (item) => item.publishedDate || "--"
		},
		{
			key: "videoUrl",
			label: "Video",
			maxWidth: "100px",
			render: (item) => (
				<a 
					href={item.videoUrl} 
					target="_blank" 
					rel="noopener noreferrer"
					style={{ 
						color: "var(--tg-theme-primary)", 
						textDecoration: "none",
						fontSize: "12px"
					}}
				>
					<i className="fab fa-youtube" style={{ marginRight: "4px" }} />
					Watch
				</a>
			)
		},
		{
			key: "createdAt",
			label: "Created",
			render: (item) => item.createdAt || "--"
		}
	]

	return (
		<AdminLayout active="video-gallery-list">
			<AdminListPage
				title="Video Gallery"
				description="Manage YouTube videos displayed on the video gallery page."
				createButtonText="Add Video"
				createButtonHref="/admin/video-gallery"
				statusMessage={statusMessage}
				columns={columns}
				data={videos}
				editPath={(item) => `/admin/video-gallery/${item.id}/edit`}
				deleteApiPath="/api/admin/video-gallery"
				deleteItemName="video"
				emptyMessage="No videos have been added yet."
			/>
		</AdminLayout>
	)
}

