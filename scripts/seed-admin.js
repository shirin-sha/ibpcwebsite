#!/usr/bin/env node
const path = require("path")
const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

async function main() {
	const email = process.argv[2]
	const password = process.argv[3]

	if (!uri || !dbName) {
		console.error("Please set MONGODB_URI and MONGODB_DB in .env.local before running the seed script.")
		process.exit(1)
	}

	if (!email || !password) {
		console.error("Usage: npm run seed:admin <email> <password>")
		process.exit(1)
	}

	const normalizedEmail = email.toLowerCase()
	const client = new MongoClient(uri)

	try {
		await client.connect()
		const db = client.db(dbName)
		const passwordHash = await bcrypt.hash(password, 10)

		const result = await db.collection("adminUsers").updateOne(
			{ email: normalizedEmail },
			{
				$set: {
					email: normalizedEmail,
					passwordHash,
					updatedAt: new Date()
				},
				$setOnInsert: {
					createdAt: new Date()
				}
			},
			{ upsert: true }
		)

		if (result.upsertedCount > 0) {
			console.log(`Created new admin user ${normalizedEmail}`)
		} else {
			console.log(`Updated password for admin user ${normalizedEmail}`)
		}
	} catch (error) {
		console.error("Failed to seed admin:", error)
		process.exit(1)
	} finally {
		await client.close()
	}
}

main()






