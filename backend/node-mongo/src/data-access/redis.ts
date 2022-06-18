import { createClient } from "redis";
import { REDIS_OPTIONS } from "../config";

const main = () => {
    const client = createClient(REDIS_OPTIONS);
    client.on("error", (err) => console.error(err));
    return client;
}

export default main;