import { createClient } from "@hey-api/openapi-ts";

createClient({
  client: "@hey-api/client-fetch",
  input: "./openapi.yaml",
  output: "./src/hey-api-client",
});
