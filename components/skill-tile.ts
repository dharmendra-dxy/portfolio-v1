/**
 * A few tech logos in `public/icons` are white-on-transparent, so they vanish
 * against the light tiles we render them in. Those need a dark backdrop.
 */
const LIGHT_LOGOS = new Set(["nextjs"]);

export const skillTileClass = (title: string) =>
  LIGHT_LOGOS.has(title.toLowerCase()) ? "bg-zinc-900" : "";
