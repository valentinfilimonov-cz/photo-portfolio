import Link from "next/link";

export default function AlbumsPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Albums</h1>

      <ul>
        <li>
          <Link href="/albums/travel">Travel</Link>
        </li>
      </ul>
    </div>
  );
}