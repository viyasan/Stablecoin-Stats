// Countries section registry.
// Each country page is driven entirely by its dataset, looked up by URL slug.

import { canada } from "./canada";
import { us } from "./us";
import { uk } from "./uk";
import { mexico } from "./mexico";
import type { CountryDataset } from "./types";

export * from "./types";
export { canada } from "./canada";
export { us } from "./us";
export { uk } from "./uk";
export { mexico } from "./mexico";

/** Every country with a page, keyed by URL slug (/countries/<slug>). */
export const COUNTRIES: Record<string, CountryDataset> = {
  us,
  uk,
  canada,
  mexico,
};

/** Slugs in the order they should appear in navigation and on the index page. */
export const COUNTRY_SLUGS = Object.keys(COUNTRIES);

export function getCountry(slug: string | undefined): CountryDataset | null {
  if (!slug) return null;
  return COUNTRIES[slug] ?? null;
}
