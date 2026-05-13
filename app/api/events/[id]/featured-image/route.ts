import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDb } from "@/lib/mongodb"

export async function GET(_request: Request, { params }: { params: { id: string } }) {
	let objectId: ObjectId
	try {
		objectId = new ObjectId(params.id)
	} catch {
		return new NextResponse(null, { status: 400 })
	}

	const db = await getDb()
	const doc = await db.collection("events").findOne(
		{ _id: objectId },
		{ projection: { featuredImage: 1 } }
	)

	const img = doc?.featuredImage as { data?: string; contentType?: string } | undefined
	if (!img?.data) {
		return new NextResponse(null, { status: 404 })
	}

	let body: Buffer
	try {
		body = Buffer.from(img.data, "base64")
	} catch {
		return new NextResponse(null, { status: 500 })
	}

	return new NextResponse(new Uint8Array(body), {
		headers: {
			"Content-Type": img.contentType || "application/octet-stream",
			"Cache-Control": "private, no-store"
		}
	})
}
