import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
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

	return { db }
}

type AdminGalleryEditPageProps = {
	params: { id: string }
}

export default async function AdminGalleryEditPage({ params }: AdminGalleryEditPageProps) {
	const { db } = await requireAdminSession()
	let galleryData: {
		id?: string
		title?: string
		coverImage?: string | null
		galleryImages?: Array<{ url: string; index: number }>
	} | null = null

	try {
		const doc = await db.collection("photoGallery").findOne({ _id: new ObjectId(params.id) })
		if (doc) {
			const coverImageUrl = doc.coverImage?.data
				? `data:${doc.coverImage.contentType || "image/jpeg"};base64,${doc.coverImage.data}`
				: null

			const galleryImagesData = Array.isArray(doc.galleryImages)
				? doc.galleryImages.map((img: any, index: number) => ({
						url: img.data ? `data:${img.contentType || "image/jpeg"};base64,${img.data}` : "",
						index
				  }))
				: []

			galleryData = {
				id: doc._id?.toString?.(),
				title: doc.title || "",
				coverImage: coverImageUrl,
				galleryImages: galleryImagesData
			}
		}
	} catch (error) {
		console.error("Failed to load gallery item", error)
	}

	if (!galleryData) {
		redirect("/admin/gallery/list?error=not_found")
	}

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
				<div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-30" style={{ gap: "10px" }}>
					<div>
						<h2 className="title mb-4" style={{ fontSize: "24px" }}>
							Edit Album
						</h2>
						<a href="/admin/gallery/list" style={{ fontSize: "13px", color: "var(--tg-theme-primary)" }}>
							&larr; Back to list
						</a>
					</div>
				</div>
				<GalleryForm initialData={galleryData} />
			</div>
		</AdminLayout>
	)
}


