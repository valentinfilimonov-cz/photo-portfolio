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
    <main style={{ padding: "40px" }}>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "12px",
        }}
      >
        {album.title}
      </h1>

      {album.description ? (
        <p style={{ maxWidth: "720px", marginBottom: "30px" }}>
          {album.description}
        </p>
      ) : null}

      {album.images.length > 0 ? (
        <MasonryGallery images={album.images} />
      ) : (
        <p>This album does not have photos yet.</p>
      )}
    </main>
  );
}
