import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

const redirectWithStatus = (request: Request, params: Record<string, string>, pathname = "/admin/events/list") => {
	const url = new URL(request.url)
	url.pathname = pathname
	url.search = new URLSearchParams(params).toString()
	return NextResponse.redirect(url)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	const sessionToken = cookies().get("ibpc_admin_session")?.value

	if (!sessionToken) {
		return redirectWithStatus(request, { error: "unauthorized" })
	}

	const db = await getDb()
	const session = await db.collection("adminSessions").findOne<{ sessionId: string; expiresAt?: Date }>({
		sessionId: sessionToken,
		expiresAt: { $gt: new Date() }
	} as any)

	if (!session) {
		return redirectWithStatus(request, { error: "unauthorized" })
	}

	try {
		const objectId = new ObjectId(params.id)
		const result = await db.collection("events").deleteOne({ _id: objectId })

		if (result.deletedCount === 0) {
			return redirectWithStatus(request, { error: "not_found" })
		}

		return redirectWithStatus(request, { status: "deleted" })
	} catch (error) {
		console.error("Failed to delete event", error)
		return redirectWithStatus(request, { error: "delete_failed" })
	}
}







