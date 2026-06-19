"use client";

import { useState } from "react";

type Props = {
  images: string[];
};

export default function MasonryGallery({ images }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  const close = () => setIndex(null);

  const prev = () => {
    if (index === null) return;
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const next = () => {
    if (index === null) return;
    setIndex(index === images.length - 1 ? 0 : index + 1);
  };

  return (
    <>
      <div className="masonry">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {index !== null && (
        <div className="lightbox" onClick={close}>
          <button
            aria-label="Previous image"
            className="prev"
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
          >
            &lt;
          </button>

          <img
            src={images[index]}
            alt=""
            onClick={(event) => event.stopPropagation()}
          />

          <button
            aria-label="Next image"
            className="next"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
          >
            &gt;
          </button>

          <button aria-label="Close image" className="close" onClick={close}>
            x
          </button>
        </div>
      )}

      <style jsx>{`
        .masonry {
          column-count: 3;
          column-gap: 16px;
        }

        img {
          width: 100%;
          margin-bottom: 16px;
          border-radius: 8px;
          cursor: pointer;
          display: block;
          transition: 0.2s;
        }

        img:hover {
          transform: scale(1.02);
        }

        @media (max-width: 1100px) {
          .masonry {
            column-count: 2;
          }
        }

        @media (max-width: 700px) {
          .masonry {
            column-count: 1;
          }
        }

        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .lightbox img {
          width: auto;
          height: auto;
          max-width: 90%;
          max-height: 90%;
          margin: 0;
          border-radius: 10px;
          object-fit: contain;
        }

        .prev,
        .next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 40px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 20px;
        }

        .prev {
          left: 10px;
        }

        .next {
          right: 10px;
        }

        .close {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 24px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
