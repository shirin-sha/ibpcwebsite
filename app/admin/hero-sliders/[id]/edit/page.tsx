import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import AdminLayout from "@/components/admin/AdminLayout"
import HeroSliderForm from "@/components/admin/HeroSliderForm"

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

type AdminHeroSliderEditPageProps = {
	params: { id: string }
}

export default async function AdminHeroSliderEditPage({ params }: AdminHeroSliderEditPageProps) {
	const { db } = await requireAdminSession()
	let sliderData: {
		id?: string
		eyebrow?: string
		mainTitle?: string
		button1Text?: string
		button1Link?: string
		button2Text?: string
		button2Link?: string
	} | null = null

	try {
		const doc = await db.collection("heroSliders").findOne({ _id: new ObjectId(params.id) })
		if (doc) {
			sliderData = {
				id: doc._id?.toString?.(),
				eyebrow: doc.eyebrow || "",
				mainTitle: doc.mainTitle || "",
				button1Text: doc.button1Text || "",
				button1Link: doc.button1Link || "",
				button2Text: doc.button2Text || "",
				button2Link: doc.button2Link || ""
			}
		}
	} catch (error) {
		console.error("Failed to load hero slider", error)
	}

	if (!sliderData) {
		redirect("/admin/hero-sliders/list?error=not_found")
	}

	return (
		<AdminLayout active="hero-sliders">
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
							Edit Hero Slider
						</h2>
						<a href="/admin/hero-sliders/list" style={{ fontSize: "13px", color: "var(--tg-theme-primary)" }}>
							&larr; Back to list
						</a>
					</div>
				</div>
				<HeroSliderForm initialData={sliderData} />
			</div>
		</AdminLayout>
	)
}






