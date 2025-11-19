import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function POST(request: Request) {
	const sessionToken = cookies().get("ibpc_admin_session")?.value

	if (sessionToken) {
		const db = await getDb()
		// Delete the session from database
		await db.collection("adminSessions").deleteOne({ sessionId: sessionToken })
	}

	// Clear the cookie
	cookies().delete("ibpc_admin_session")

	const url = new URL(request.url)
	url.pathname = "/admin"
	url.search = ""
	return NextResponse.redirect(url)
}



