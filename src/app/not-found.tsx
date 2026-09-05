import Link from "next/link";

import Artwork from "@/components/Artwork";

export default function NotFound() {
  return (
    <div className="page">
      <section className="container opening" aria-label="Page not found">
        <div className="opening__text">
          <h1 className="t-display">Page not found</h1>
          <p className="t-lede">
            The ball went out. Nothing lives at this address.
          </p>
          <p className="t-body">
            <Link href="/">Back to the home page</Link>
          </p>
        </div>
        <div className="opening__art">
          <Artwork name="k1-fallen-back" />
        </div>
      </section>
    </div>
  );
}
