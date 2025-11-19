import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import AdminListPage, { StatusMessage } from "@/components/admin/AdminListPage"
import { Column } from "@/components/admin/AdminTable"

type HeroSliderDocument = {
	_id: { toString(): string }
	eyebrow?: string
	mainTitle?: string
	button1Text?: string
	button1Link?: string
	button2Text?: string
	button2Link?: string
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

type AdminHeroSlidersListPageProps = {
	searchParams?: {
		status?: string
		error?: string
	}
}

export default async function AdminHeroSlidersListPage({ searchParams }: AdminHeroSlidersListPageProps) {
	const { db } = await requireAdminSession()
	const docs = (await db
		.collection("heroSliders")
		.find(
			{},
			{
				projection: {
					eyebrow: 1,
					mainTitle: 1,
					button1Text: 1,
					button1Link: 1,
					button2Text: 1,
					button2Link: 1,
					createdAt: 1
				}
			}
		)
		.sort({ order: 1, createdAt: -1 })
		.limit(50)
		.toArray()) as HeroSliderDocument[]

	const sliders = docs.map((slider) => ({
		id: slider._id?.toString?.() ?? "",
		eyebrow: slider.eyebrow || "—",
		mainTitle: slider.mainTitle || "Untitled slider",
		button1Text: slider.button1Text || "—",
		button1Link: slider.button1Link || "—",
		button2Text: slider.button2Text || "—",
		button2Link: slider.button2Link || "—",
		createdAt: slider.createdAt instanceof Date ? slider.createdAt.toLocaleString() : ""
	}))

	const statusMessage: StatusMessage =
		searchParams?.status === "updated"
			? { type: "success", text: "Hero slider updated successfully." }
			: searchParams?.status === "success"
				? { type: "success", text: "Hero slider created successfully." }
				: searchParams?.status === "deleted"
					? { type: "success", text: "Hero slider deleted successfully." }
					: searchParams?.error === "update_failed"
						? { type: "error", text: "Unable to update hero slider. Please try again." }
						: searchParams?.error === "missing_title"
							? { type: "error", text: "Please provide the main title." }
							: searchParams?.error === "delete_failed"
								? { type: "error", text: "Unable to delete hero slider. Please try again." }
								: null

	const columns: Column<typeof sliders[0]>[] = [
		{
			key: "mainTitle",
			label: "Main Title",
			maxWidth: "260px",
			render: (item) => <strong>{item.mainTitle}</strong>
		},
		{
			key: "eyebrow",
			label: "Eyebrow",
			maxWidth: "200px"
		},
		{
			key: "button1Text",
			label: "Button 1",
			maxWidth: "150px",
			render: (item) =>
				item.button1Text !== "—" ? (
					<div>
						<div style={{ fontSize: "12px", fontWeight: 600 }}>{item.button1Text}</div>
						<div style={{ fontSize: "11px", color: "#6b7280" }}>{item.button1Link}</div>
					</div>
				) : (
					"—"
				)
		},
		{
			key: "button2Text",
			label: "Button 2",
			maxWidth: "150px",
			render: (item) =>
				item.button2Text !== "—" ? (
					<div>
						<div style={{ fontSize: "12px", fontWeight: 600 }}>{item.button2Text}</div>
						<div style={{ fontSize: "11px", color: "#6b7280" }}>{item.button2Link}</div>
					</div>
				) : (
					"—"
				)
		},
		{
			key: "createdAt",
			label: "Created",
			render: (item) => item.createdAt || "--"
		}
	]

	return (
		<AdminLayout active="hero-sliders-list">
			<AdminListPage
				title="Hero Sliders List"
				description="Manage homepage hero slider slides."
				createButtonText="Add Slider"
				createButtonHref="/admin/hero-sliders"
				statusMessage={statusMessage}
				columns={columns}
				data={sliders}
				editPath={(item) => `/admin/hero-sliders/${item.id}/edit`}
				deleteApiPath="/api/admin/hero-sliders"
				deleteItemName="hero slider"
				emptyMessage="No hero sliders have been added yet."
			/>
		</AdminLayout>
	)
}

