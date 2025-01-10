import { expect, test } from "bun:test";
import { getClient } from "../src/ts-client/index.ts";

test("Get package versions", async () => {
  const client = getClient({
    url: "https://api.jsr.io",
  });

  const res = await client.GET("/scopes/{scope}/packages/{package}", {
    params: {
      path: {
        scope: "kunkun",
        package: "api",
      },
    },
  });
  expect(res.data).toBeDefined();
});
