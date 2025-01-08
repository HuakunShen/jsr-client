import { createClient } from "@hey-api/openapi-ts";

createClient({
  client: "@hey-api/client-fetch",
  input: "./openapi.yaml",
  output: "./src/client",
});
