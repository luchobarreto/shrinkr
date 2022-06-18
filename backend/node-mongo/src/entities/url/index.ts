import { nanoid } from "nanoid";
import buildMakeUrl from "./Url";

export async function idGenerator({ urlsDb, usedIds = [] }: { urlsDb: any, usedIds: string[] }): Promise<string> {
    const id = await nanoid(6);
    let isUsed = false;
    for(let i = 0; i < usedIds.length; i++) {
        if(id === usedIds[i]) {
            isUsed = true;
            return (await idGenerator({ urlsDb, usedIds }));
        }
    }
    const url = await urlsDb.findOne({ shortId: id }).catch();
    if(url) {
        usedIds.push(id);
        return (await idGenerator({ urlsDb, usedIds }));
    }
    return id;
}

const makeUrl = buildMakeUrl({ idGenerator });

export default makeUrl;
