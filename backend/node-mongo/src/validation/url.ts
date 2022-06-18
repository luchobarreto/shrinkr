import Joi from "@hapi/joi";
import { ObjectId } from "mongodb";

const url = Joi.string(),
	id = Joi.string()
		.min(6)
		.regex(/^[0-9a-fA-F]{24}$/)
		.message("It must have a valid ObjectId"),
	userId = Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/)
		.message("It must have a valid ObjectId");

export const getUrlSchema = Joi.object({ id: id.required() });

export const getUrlsByUserSchema = Joi.object({
	id: userId,
	page: Joi.number(),
	size: Joi.number(),
});

export const getUrlShortId = Joi.object({
	shortId: Joi.string(),
});

export const addUrlSchema = Joi.object({
	url: url.required(),
	userId: userId.required(),
});

export const editUrlSchema = Joi.object({
	url,
	id: id.required(),
	userId: userId.required(),
});

export const deleteUrlSchema = Joi.object({
	id: id.required(),
	userId: userId.required(),
});

export interface Url {
	url: string;
	ownerId: ObjectId;
	views?: number;
	createdAt?: Date;
	shortId?: string;
	active?: boolean;
}
