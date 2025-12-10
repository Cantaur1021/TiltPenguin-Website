// lib/cloudinary.ts
type CloudinaryMedia = {
  publicId?: string;
  resourceType?: "image" | "video";
  format?: string;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function buildCloudinaryUrl(
  media: CloudinaryMedia,
  options?: { width?: number }
) {
  if (!media?.publicId || !cloudName) return "";

  const resourceType = media.resourceType || "image";
  const format = media.format || "webp";

  const transformations = [];
  if (options?.width) {
    transformations.push(`w_${options.width}`);
  }
  transformations.push("q_auto", "f_auto");

  const transformString = transformations.length
    ? transformations.join(",")
    : "";

  // Example:
  // https://res.cloudinary.com/<cloudName>/image/upload/w_1200,q_auto,f_auto/<publicId>.webp
  return [
    `https://res.cloudinary.com/${cloudName}/${resourceType}/upload`,
    transformString,
    `${media.publicId}.${format}`,
  ]
    .filter(Boolean)
    .join("/");
}
