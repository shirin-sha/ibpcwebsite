import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {}

if (!uri) {
	throw new Error("Please add your MongoDB connection string to MONGODB_URI in .env.local")
}

declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient> | undefined
}

const client = new MongoClient(uri, options)

const clientPromise =
	process.env.NODE_ENV === "development"
		? global._mongoClientPromise || (global._mongoClientPromise = client.connect())
		: client.connect()

export async function getDb() {
	const dbName = process.env.MONGODB_DB
	if (!dbName) {
		throw new Error("Please define MONGODB_DB in .env.local")
	}
	const connection = await clientPromise
	return connection.db(dbName)
}





