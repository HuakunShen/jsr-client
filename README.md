# JSR API Client generated from OpenAPI

https://api.jsr.io/.well-known/openapi

```bash
wget https://api.jsr.io/.well-known/openapi
npx @hey-api/openapi-ts \
  -c @hey-api/client-fetch \
  -i ./openapi.yml \
  -o src/client
```
