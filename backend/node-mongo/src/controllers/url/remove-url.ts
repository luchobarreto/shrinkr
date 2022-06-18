import { HttpRequest } from "../../express-callback";
import { deleteUrlSchema, validate } from "../../validation";

export default function makeRemoveUrl({ deleteUrl }: { deleteUrl: any }) { 
    return async function removeUrl(httpRequest: HttpRequest) { 
        const { id } = httpRequest.params;
        const userId = httpRequest.session.userId;
        await validate(deleteUrlSchema, { id, userId });

        const response = await deleteUrl({ id, userId });
        
        return {
            headers: {
                'Content-Type': 'application/json',
            },
            statusCode: 200,
            body: response
        }
    }
}