import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import AdminListPage, { StatusMessage } from "@/components/admin/AdminListPage"
import { Column } from "@/components/admin/AdminTable"

type GalleryDocument = {
	_id: { toString(): string }
	title?: string
	galleryImages?: Array<any>
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

type AdminGalleryListPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

export default async function AdminGalleryListPage({ searchParams }: AdminGalleryListPageProps) {
	const { db } = await requireAdminSession()
	const docs = (await db
		.collection("photoGallery")
		.find(
			{},
			{
				projection: {
					title: 1,
					galleryImages: 1,
					createdAt: 1
				}
			}
		)
		.sort({ createdAt: -1 })
		.limit(100)
		.toArray()) as GalleryDocument[]

	const albums = docs.map((album) => ({
		id: album._id?.toString?.() ?? "",
		title: album.title || "Untitled album",
		imageCount: Array.isArray(album.galleryImages) ? album.galleryImages.length : 0,
		createdAt: album.createdAt instanceof Date ? album.createdAt.toLocaleString() : ""
	}))

	const statusMessage: StatusMessage =
		searchParams?.status === "updated"
			? { type: "success", text: "Album updated successfully." }
			: searchParams?.status === "success"
				? { type: "success", text: "Album created successfully." }
				: searchParams?.status === "deleted"
					? { type: "success", text: "Album deleted successfully." }
					: searchParams?.error === "update_failed"
						? { type: "error", text: "Unable to update album. Please try again." }
						: searchParams?.error === "missing_title"
							? { type: "error", text: "Please provide an album title." }
							: searchParams?.error === "delete_failed"
								? { type: "error", text: "Unable to delete album. Please try again." }
								: null

	const columns: Column<typeof albums[0]>[] = [
		{
			key: "title",
			label: "Album Title",
			render: (item) => <strong>{item.title}</strong>
		},
		{
			key: "imageCount",
			label: "Images",
			maxWidth: "100px",
			render: (item) => (
				<div style={{ textAlign: "center" }}>
					<span style={{ 
						display: "inline-block",
						padding: "4px 12px",
						borderRadius: "12px",
						background: item.imageCount > 0 ? "#e0f2fe" : "#f3f4f6",
						color: item.imageCount > 0 ? "#0369a1" : "#6b7280",
						fontSize: "13px",
						fontWeight: 600
					}}>
						{item.imageCount}
					</span>
				</div>
			)
		},
		{
			key: "createdAt",
			label: "Created",
			render: (item) => item.createdAt || "--"
		}
	]

	return (
		<AdminLayout active="gallery-list">
			<AdminListPage
				title="Photo Gallery Albums"
				description="Manage the albums shown on the public photo gallery page."
				createButtonText="Add Album"
				createButtonHref="/admin/gallery"
				statusMessage={statusMessage}
				columns={columns}
				data={albums}
				editPath={(item) => `/admin/gallery/${item.id}/edit`}
				deleteApiPath="/api/admin/gallery"
				deleteItemName="gallery album"
				emptyMessage="No albums have been added yet."
			/>
		</AdminLayout>
	)
}


