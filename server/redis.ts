import { createClient } from "redis";

export let client: ReturnType<typeof createClient>;

export const createRedis = async () => {
  client = createClient({
    url: "redis://127.0.0.1:6379",
  });

  client.connect();
};
