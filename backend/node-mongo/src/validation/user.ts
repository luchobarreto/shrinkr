import Joi from "@hapi/joi";

const name = Joi.string().min(3).max(20),
	email = Joi.string().email({ tlds: { allow: true } }),
	password = Joi.string().min(8);

export const registerUserSchema = Joi.object({
	name: name.required(),
	email: email.required(),
	photo: Joi.any(),
	password: password.required(),
});

export const loginSchema = Joi.object({
	email: email.required(),
	password: password.required(),
});

export const editUserSchema = Joi.object({
	email,
	password,
	name,
	photo: Joi.any(),
});

export interface User {
	name: string;
	email: string;
	password: string;
	photoUrl?: string;
	createdAt: Date;
	photo?: any;
}
