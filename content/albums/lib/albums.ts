import fs from "node:fs";
import path from "node:path";

export type Album = {
  slug: string;
  title: string;
  description?: string;
  cover?: string;
  images: string[];
};

type AlbumFile = {
  title?: string;
  description?: string;
  cover?: string;
  images?: string[];
};

const albumsDirectory = path.join(process.cwd(), "content", "albums");

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function readAlbumFile(fileName: string): Album | null {
  if (!fileName.endsWith(".json")) {
    return null;
  }

  const filePath = path.join(albumsDirectory, fileName);
  const raw = fs.readFileSync(filePath, "utf8").trim();

  if (!raw) {
    return null;
  }

  const slug = fileName.replace(/\.json$/, "");
  const data = JSON.parse(raw) as AlbumFile;

  return {
    slug,
    title: data.title || titleFromSlug(slug),
    description: data.description || "",
    cover: data.cover || data.images?.[0] || "",
    images: Array.isArray(data.images) ? data.images.filter(Boolean) : [],
  };
}

export function getAllAlbums() {
  if (!fs.existsSync(albumsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(albumsDirectory)
    .map(readAlbumFile)
    .filter((album): album is Album => album !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getAlbumBySlug(slug: string) {
  return getAllAlbums().find((album) => album.slug === slug) || null;
}
