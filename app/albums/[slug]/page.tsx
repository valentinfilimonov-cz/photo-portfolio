import MasonryGallery from "@/components/MasonryGallery";
import { getAlbumBySlug, getAllAlbums } from "@/content/albums/lib/albums";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllAlbums().map((album) => ({
    slug: album.slug,
  }));
}

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  return (
    <main className="page">
      <div className="page-title">
        <p className="eyebrow">Album</p>
        <h1>{album.title}</h1>

        {album.description ? (
          <p>{album.description}</p>
        ) : (
          <p>
            {album.images.length} photo{album.images.length === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {album.images.length > 0 ? (
        <MasonryGallery images={album.images} />
      ) : (
        <p className="empty-state">This album does not have photos yet.</p>
      )}
    </main>
  );
}
