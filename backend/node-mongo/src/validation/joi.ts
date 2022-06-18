import { ObjectSchema } from "@hapi/joi";
import { BadRequest } from "../errors";

export const validate = async (schema: ObjectSchema, payload: any, message?: string) => {
    try {
        await schema.validateAsync(payload, { abortEarly: false });
    } catch (err) {
        throw new BadRequest(message ? message : err, undefined,err.details);
    }
}