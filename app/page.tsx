import Link from "next/link";
import { getAllAlbums } from "@/content/albums/lib/albums";

export const dynamic = "force-dynamic";

export default function Home() {
  const albums = getAllAlbums();
  const featuredAlbum = albums.find((album) => album.cover) || albums[0];
  const featuredImage = featuredAlbum?.cover || featuredAlbum?.images[0];

  return (
    <main>
      <section className="hero">
        {featuredImage ? (
          <img className="hero-image" src={featuredImage} alt="" />
        ) : null}

        <div className="hero-content">
          <p className="eyebrow">Fine art photography</p>
          <h1>Anastasia Photography</h1>
          <p>
            A quiet portfolio of selected works, albums, travel impressions,
            and visual stories collected over years of photography.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/albums">
              View albums
            </Link>
            <Link className="button button-secondary" href="/about">
              About the photographer
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="eyebrow">Selected albums</p>
          <h2>Recent collections</h2>
        </div>

        <div className="album-grid">
          {albums.slice(0, 3).map((album) => (
            <Link className="album-card" href={`/albums/${album.slug}`} key={album.slug}>
              {album.cover ? (
                <img src={album.cover} alt="" />
              ) : (
                <div className="album-placeholder" />
              )}
              <div>
                <h3>{album.title}</h3>
                <p>
                  {album.description ||
                    `${album.images.length} photo${album.images.length === 1 ? "" : "s"}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
