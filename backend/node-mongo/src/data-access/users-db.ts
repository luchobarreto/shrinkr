import { Db, ObjectId } from "mongodb";
import { BadRequest } from "../errors";

const COLLECTION = "users";

export default function makeUrDb({ makeDb }: { makeDb: Function }) {
	async function find({ ...query }) {
		const db: Db = await makeDb();
		const result = await db.collection(COLLECTION).find(query).sort({ createdAt: -1 });
		return await result.toArray();
	}

	async function findById({ id, field }: { id: string; field?: string }) {
		const db: Db = await makeDb();
		let _id;
		try {
			_id = new ObjectId(id);
		} catch (error) {
			throw new BadRequest("Invalid id");
		}
		let query: any = {};
		if (field) {
			query[field] = _id;
		} else {
			query._id = _id;
		}

		const result = await db.collection(COLLECTION).findOne(query);
		return result;
	}

	async function findOne({ ...query }) {
		const db: Db = await makeDb();
		const result = await db.collection(COLLECTION).findOne(query);
		return result;
	}

	async function insertOne({ ...data }) {
		const db: Db = await makeDb();
		const result = await db.collection(COLLECTION).insertOne(data);
		return result.insertedId;
	}

	async function updateOne(query: {}, data: {}) {
		const db: Db = await makeDb();
		const result = await db.collection(COLLECTION).updateOne(query, { $set: { ...data } });
		return result;
	}

	async function incrementOne(query: {}, data: {}) {
		const db: Db = await makeDb();
		const result = await db.collection(COLLECTION).updateOne(query, { $inc: { ...data } });
		return result;
	}

	async function deleteOne({ ...query }) {
		const db: Db = await makeDb();
		const result = await db.collection(COLLECTION).deleteOne(query);
		return result;
	}

	async function deleteMany({ ...query }) {
		const db: Db = await makeDb();
		const result = await db.collection(COLLECTION).deleteMany(query);
		return result.deletedCount;
	}

	return Object.freeze({
		find,
		findById,
		findOne,
		insertOne,
		updateOne,
		incrementOne,
		deleteOne,
		deleteMany,
	});
}
