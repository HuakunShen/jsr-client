import type { paths } from "./schema.d.ts";
import createClient from "openapi-fetch";

export function getClient(opts: {
  url: string;
}): ReturnType<typeof createClient<paths>> {
  return createClient<paths>({ baseUrl: opts.url });
}
export type { paths, components } from "./schema.d.ts";
