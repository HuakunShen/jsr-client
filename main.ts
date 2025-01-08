import { client, listPackageVersions } from "./src/hey-api-client/index.ts";

client.setConfig({
  baseUrl: "https://api.jsr.io",
});

const res = await listPackageVersions({
  path: {
    scope: "kunkun",
    package: "api",
  },
});

console.log(res);
