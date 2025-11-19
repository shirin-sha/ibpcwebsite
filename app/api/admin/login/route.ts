import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { randomUUID } from "crypto"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/mongodb"

export async function POST(request: Request) {
	const formData = await request.formData()
	const email = formData.get("email")?.toString().trim()
	const password = formData.get("password")?.toString()

	const redirectToAdmin = (params: URLSearchParams) => {
		const url = new URL(request.url)
		url.pathname = "/admin"
		url.search = params.toString()
		return NextResponse.redirect(url)
	}

	if (!email || !password) {
		return redirectToAdmin(new URLSearchParams({ error: "missing" }))
	}

	const normalizedEmail = email.toLowerCase()
	const db = await getDb()
	const adminUser = await db.collection("adminUsers").findOne<{ _id: unknown; email: string; passwordHash?: string; password?: string }>({ email: normalizedEmail })
	if (!adminUser || (!adminUser.passwordHash && !adminUser.password)) {
		return redirectToAdmin(new URLSearchParams({ error: "invalid" }))
	}

	const passwordHash = adminUser.passwordHash || adminUser.password
	const isPasswordValid = passwordHash?.startsWith("$2") ? await bcrypt.compare(password, passwordHash) : passwordHash === password

	if (!isPasswordValid) {
		return redirectToAdmin(new URLSearchParams({ error: "invalid" }))
	}

	const sessionValue = randomUUID()

	await db.collection("adminSessions").insertOne({
		sessionId: sessionValue,
		adminId: adminUser._id,
		email: adminUser.email,
		createdAt: new Date(),
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6),
		userAgent: request.headers.get("user-agent"),
		ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip")
	})

	cookies().set("ibpc_admin_session", sessionValue, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60 * 6 // 6 hours
	})

	const url = new URL(request.url)
	url.pathname = "/admin/news"
	url.search = ""
	return NextResponse.redirect(url)
}

