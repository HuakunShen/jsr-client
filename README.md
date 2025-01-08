# JSR API Client generated from OpenAPI

**JSR Package:** https://jsr.io/@hk/jsr-client

**TypeDoc:** https://huakunshen.github.io/jsr-client/

## Usage

### HeyAPI

```ts
import { client, listPackageVersions } from "@hk/jsr-client/hey-api-client";

client.setConfig({
  baseUrl: "https://api.jsr.io",
});

const res = await listPackageVersions({
  path: {
    scope: "kunkun",
    package: "api",
  },
});
```

### openapi-fetch

```ts
import { getClient } from "@hk/jsr-client";

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
```

### zod client

```ts
import { createApiClient } from "@hk/jsr-client/zod-client";

const client = createApiClient("https://api.jsr.io");
const res = await client.getPackage({
  params: {
    scope: "kunkun",
    package: "api",
  },
});
```

## Generate

https://api.jsr.io/.well-known/openapi

### openapi-fetch

```bash
npx openapi-typescript https://api.jsr.io/.well-known/openapi -o src/ts-client/schema.d.ts
```

### heyapi

```bash
wget https://api.jsr.io/.well-known/openapi
npx @hey-api/openapi-ts \
  -c @hey-api/client-fetch \
  -i ./openapi.yml \
  -o src/client
```

### zod client generation

```bash
deno run -A npm:openapi-zod-client "https://api.jsr.io/.well-known/openapi" -o "./src/zod-client.ts"
```
