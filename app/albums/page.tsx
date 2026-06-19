import Link from "next/link";
import { getAllAlbums } from "@/content/albums/lib/albums";

export const dynamic = "force-dynamic";

export default function AlbumsPage() {
  const albums = getAllAlbums();

  return (
    <main className="page">
      <div className="page-title">
        <p className="eyebrow">Portfolio</p>
        <h1>Albums</h1>
        <p>
          Browse the photo collections managed from the CMS. Each album is a
          simple JSON entry in the project content folder.
        </p>
      </div>

      {albums.length === 0 ? (
        <p className="empty-state">No albums yet.</p>
      ) : (
        <div className="album-grid">
          {albums.map((album) => (
            <Link className="album-card" href={`/albums/${album.slug}`} key={album.slug}>
              {album.cover ? (
                <img src={album.cover} alt="" />
              ) : (
                <div className="album-placeholder" />
              )}
              <div>
                <h2>{album.title}</h2>
                <p>
                  {album.description ||
                    `${album.images.length} photo${album.images.length === 1 ? "" : "s"}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
