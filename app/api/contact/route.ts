import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function POST(request: Request) {
	const formData = await request.formData()
	const name = formData.get("name")?.toString().trim()
	const email = formData.get("email")?.toString().trim()
	const mobile = formData.get("mobile")?.toString().trim()
	const subject = formData.get("subject")?.toString().trim()
	const message = formData.get("message")?.toString().trim()

	if (!name || !email || !message) {
		const errorUrl = new URL("/contact?error=missing_fields", request.url)
		return NextResponse.redirect(errorUrl)
	}

	try {
		const db = await getDb()
		await db.collection("contactMessages").insertOne({
			name,
			email,
			mobile,
			subject: subject || "general-inquiries",
			message,
			status: "new",
			createdAt: new Date()
		})
		const successUrl = new URL("/contact?status=success", request.url)
		return NextResponse.redirect(successUrl)
	} catch (error) {
		console.error("Failed to save contact message", error)
		const failUrl = new URL("/contact?error=failed", request.url)
		return NextResponse.redirect(failUrl)
	}
}




