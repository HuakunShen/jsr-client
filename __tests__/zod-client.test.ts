import { expect, test } from "bun:test";
import { createApiClient } from "../src/zod-client.ts";

test("Get package versions", async () => {
  const client = createApiClient("https://api.jsr.io");
  const res = await client.getPackage({
    params: {
      scope: "kunkun",
      package: "api",
    },
  });
  expect(res).toBeDefined();
});
