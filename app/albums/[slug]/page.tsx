import MasonryGallery from "@/components/MasonryGallery";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const photos = {
  travel: [
    "/images/travel/1.jpg",
    "/images/travel/2.jpg",
  ],
};

export default async function AlbumPage({ params }: Props) {
  const { slug } = await params;

  const images =
    photos[slug as keyof typeof photos] || [];

  return (
    <div style={{ padding: "40px" }}>
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "30px",
        }}
      >
        Album: {slug}
      </h1>

      <MasonryGallery images={images} />
    </div>
  );
}