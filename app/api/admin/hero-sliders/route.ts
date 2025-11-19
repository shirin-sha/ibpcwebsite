import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

const redirectWithStatus = (request: Request, params: Record<string, string>, pathname = "/admin/hero-sliders/list") => {
	const url = new URL(request.url)
	url.pathname = pathname
	url.search = new URLSearchParams(params).toString()
	return NextResponse.redirect(url)
}

export async function POST(request: Request) {
	const sessionToken = cookies().get("ibpc_admin_session")?.value

	if (!sessionToken) {
		return redirectWithStatus(request, { error: "unauthorized" })
	}

	const db = await getDb()
	const session = await db.collection("adminSessions").findOne<{ sessionId: string; expiresAt?: Date; email?: string }>({
		sessionId: sessionToken,
		expiresAt: { $gt: new Date() }
	} as any)

	if (!session) {
		return redirectWithStatus(request, { error: "unauthorized" })
	}

	const formData = await request.formData()
	const sliderId = formData.get("sliderId")?.toString().trim()
	const eyebrow = formData.get("eyebrow")?.toString().trim() || ""
	const mainTitle = formData.get("mainTitle")?.toString().trim()
	const button1Text = formData.get("button1Text")?.toString().trim() || ""
	const button1Link = formData.get("button1Link")?.toString().trim() || ""
	const button2Text = formData.get("button2Text")?.toString().trim() || ""
	const button2Link = formData.get("button2Link")?.toString().trim() || ""

	if (!mainTitle) {
		return redirectWithStatus(request, { error: "missing_title" })
	}

	let backgroundImage: { data: string; contentType: string; fileName: string; size: number } | undefined
	const file = formData.get("image")

	if (file && file instanceof File && file.size > 0) {
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		backgroundImage = {
			data: buffer.toString("base64"),
			contentType: file.type || "application/octet-stream",
			fileName: file.name || `upload-${Date.now()}`,
			size: buffer.length
		}
	}

	const payload: Record<string, any> = {
		eyebrow,
		mainTitle,
		button1Text,
		button1Link,
		button2Text,
		button2Link
	}

	if (backgroundImage) {
		payload.backgroundImage = backgroundImage
	}

	if (sliderId) {
		try {
			const objectId = new ObjectId(sliderId)
			payload.updatedAt = new Date()
			await db.collection("heroSliders").updateOne({ _id: objectId }, { $set: payload })
		} catch (error) {
			console.error("Failed to update hero slider", error)
			return redirectWithStatus(request, { error: "update_failed" }, "/admin/hero-sliders/list")
		}
		return redirectWithStatus(request, { status: "updated" }, "/admin/hero-sliders/list")
	}

	await db.collection("heroSliders").insertOne({
		...payload,
		backgroundImage,
		createdAt: new Date(),
		createdBy: session.email || "admin",
		order: 0
	})

	return redirectWithStatus(request, { status: "success" }, "/admin/hero-sliders/list")
}


