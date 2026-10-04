/**
 * Project covers live on Cloudinary. Requesting a right-sized, auto-formatted
 * variant straight from their CDN is far cheaper than piping every image
 * through the Next.js optimiser (no server work, no extra hop, edge cached).
 */
export function cloudinaryImage(url: string | undefined, width: number) {
  if (!url) return url;
  if (!url.includes("res.cloudinary.com")) return url;
  if (url.includes("/f_auto")) return url;
  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${width}/`);
}
