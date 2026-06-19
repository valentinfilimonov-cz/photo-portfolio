import Link from "next/link";
import { getAllAlbums } from "@/content/albums/lib/albums";

export const dynamic = "force-dynamic";

export default function AlbumsPage() {
  const albums = getAllAlbums();

  return (
    <main style={{ padding: 40 }}>
      <h1>Albums</h1>

      {albums.length === 0 ? (
        <p>No albums yet.</p>
      ) : (
        <ul>
          {albums.map((album) => (
            <li key={album.slug}>
              <Link href={`/albums/${album.slug}`}>{album.title}</Link>
              {album.description ? <p>{album.description}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
