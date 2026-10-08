export interface Wallpaper {
  /** stable id — also used as the React key, keep it unique */
  id: string;
  /** shown in the picker; rename freely */
  name: string;
  /**
   * Any valid CSS `background` shorthand value.
   *
   * Layer order matters — the first layer sits on top.
   * Comma separated layers are allowed and recommended: every layer paints in
   * a single pass. Please avoid `filter: blur()` and `backdrop-filter` here,
   * they force a full-screen rasterise on every frame and were the main
   * source of jank before.
   *
   * Examples:
   *   image     "url('/wallpapers/mac-1.jpg') center/cover no-repeat"
   *   gradient  "linear-gradient(160deg, #0ea5e9, #a855f7 55%, #f97316)"
   *   layered   "radial-gradient(...), linear-gradient(...)"
   *   solid     "#0b1020"
   */
  background: string;
  /** set to false to hide it from the pickers without deleting it */
  enabled?: boolean;
}

export type WallpaperPlatform = "mac" | "iphone";

/* ── macOS wallpapers (drop JPGs in /public/wallpapers) ──── */

export const MAC_WALLPAPERS: Wallpaper[] = [
  { id: "mac-1", name: "Wallpaper 01", background: "url('/wallpapers/mac-1.jpg') center/cover no-repeat" },
  { id: "mac-2", name: "Wallpaper 02", background: "url('/wallpapers/mac-2.jpg') center/cover no-repeat" },
  { id: "mac-3", name: "Wallpaper 03", background: "url('/wallpapers/mac-3.jpg') center/cover no-repeat" },
  { id: "mac-4", name: "Wallpaper 04", background: "url('/wallpapers/mac-4.jpg') center/cover no-repeat" },
  { id: "mac-5", name: "Wallpaper 05", background: "url('/wallpapers/mac-5.jpg') center/cover no-repeat" },
  { id: "mac-6", name: "Wallpaper 06", background: "url('/wallpapers/mac-6.jpg') center/cover no-repeat" },
  { id: "mac-7", name: "Wallpaper 07", background: "url('/wallpapers/mac-7.jpg') center/cover no-repeat" },
];

/* ── iOS wallpapers ────────────────────────────────────── */

export const IPHONE_WALLPAPERS: Wallpaper[] = [
  { id: "iphone-1", name: "Wallpaper 01", background: "url('/wallpapers/iphone-3.jpg') center/cover no-repeat" },
  { id: "iphone-2", name: "Wallpaper 02", background: "url('/wallpapers/iphone-2.jpg') center/cover no-repeat" },
  { id: "iphone-3", name: "Wallpaper 03", background: "url('/wallpapers/iphone-1.jpg') center/cover no-repeat" },
  { id: "iphone-4", name: "Wallpaper 04", background: "url('/wallpapers/iphone-4.jpg') center/cover no-repeat" },
  { id: "iphone-5", name: "Wallpaper 05", background: "url('/wallpapers/iphone-5.jpg') center/cover no-repeat" },
  { id: "iphone-6", name: "Wallpaper 06", background: "url('/wallpapers/iphone-6.jpg') center/cover no-repeat" },
  { id: "iphone-7", name: "Wallpaper 07", background: "url('/wallpapers/iphone-7.jpg') center/cover no-repeat" },
  { id: "iphone-8", name: "Wallpaper 08", background: "url('/wallpapers/iphone-8.jpg') center/cover no-repeat" },
  { id: "iphone-9", name: "Wallpaper 09", background: "url('/wallpapers/iphone-9.jpg') center/cover no-repeat" },
  { id: "iphone-10", name: "Wallpaper 10", background: "url('/wallpapers/iphone-10.jpg') center/cover no-repeat" },
  { id: "iphone-11", name: "Wallpaper 11", background: "url('/wallpapers/iphone-11.jpg') center/cover no-repeat" },
  { id: "iphone-12", name: "Wallpaper 12", background: "url('/wallpapers/iphone-12.jpg') center/cover no-repeat" },
];

/* ── To add more ──────────────────────────────────────────
 * 1. drop the file in /public/wallpapers/
 * 2. add an entry above, first id in the list = the default
 * 3. keep roughly 0.46 (iPhone) / 1.78 (mac) aspect ratios and
 *    under ~150KB — big files make the swap stutter on phones.
 * -------------------------------------------------------- */

export const DEFAULT_MAC_WALLPAPER_ID = MAC_WALLPAPERS[0].id;
export const DEFAULT_IPHONE_WALLPAPER_ID = IPHONE_WALLPAPERS[0].id;

export const wallpapersFor = (platform: WallpaperPlatform): Wallpaper[] =>
  platform === "mac" ? MAC_WALLPAPERS : IPHONE_WALLPAPERS;

export const availableWallpapers = (
  platform: WallpaperPlatform,
): Wallpaper[] => wallpapersFor(platform).filter((wallpaper) => wallpaper.enabled !== false);

export const getWallpaper = (
  platform: WallpaperPlatform,
  id?: string,
): Wallpaper =>
  availableWallpapers(platform).find((wallpaper) => wallpaper.id === id) ??
  availableWallpapers(platform)[0] ??
  wallpapersFor(platform)[0];

const URL_PATTERN = /url\((['"]?)([^'")]+)\1\)/;

/** First image url inside a wallpaper's background value, if there is one. */
export const wallpaperImageUrl = (wallpaper: Wallpaper): string | null => {
  const match = wallpaper.background.match(URL_PATTERN);
  return match ? match[2] : null;
};

const cache = new Map<string, HTMLImageElement>();

/**
 * Warms a bitmap wallpaper before it is shown, so applying it never paints an
 * empty frame. Gradients resolve immediately.
 */
export const preloadWallpaper = (wallpaper: Wallpaper): Promise<void> => {
  const src = wallpaperImageUrl(wallpaper);
  if (!src) return Promise.resolve();

  const cached = cache.get(src);
  if (cached?.complete) return Promise.resolve();

  return new Promise((resolve) => {
    const image = cache.get(src) ?? new Image();
    if (!cache.has(src)) {
      cache.set(src, image);
      image.decoding = "async";
    }
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
};
