# JSR API Client generated from OpenAPI

https://api.jsr.io/.well-known/openapi

```bash
wget https://api.jsr.io/.well-known/openapi
npx @hey-api/openapi-ts \
  -c @hey-api/client-fetch \
  -i ./openapi.yml \
  -o src/client
```

## zod client generation

```bash
deno run -A npm:openapi-zod-client "https://api.jsr.io/.well-known/openapi" -o "./src/zod-client.ts"
```
