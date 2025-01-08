import { client, listPackageVersions } from "../src/hey-api-client/index.ts";
import { expect } from "jsr:@std/expect";

Deno.test("Get package versions", async () => {
  client.setConfig({
    baseUrl: "https://api.jsr.io",
  });

  const res = await listPackageVersions({
    path: {
      scope: "kunkun",
      package: "api",
    },
  });

  expect(res.data).toBeDefined();
});
