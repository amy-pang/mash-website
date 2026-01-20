import React, { useMemo, useState } from "react";
import "./App.css";

function clamp(i, n) {
  return ((i % n) + n) % n;
}

function OutfitRow({ label, images, index, onPrev, onNext }) {
  return (
    <div className="row-card">
      <div className="row-header">
        <div className="row-label">{label}</div>
        <div className="row-hint">Click arrows to change</div>
      </div>

      <div className="row-body">
        <button className="arrow-btn" onClick={onPrev} aria-label={`Previous ${label}`}>
          ‹
        </button>

        <div className="viewport">
          <div
            className="track"
            style={{
              width: `${images.length * 100}%`,
              transform: `translateX(${-index * (100 / images.length)}%)`,
            }}
          >
            {images.map((src, i) => (
              <div className="slide" key={src + i}>
                <img src={src} alt={`${label} option ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <button className="arrow-btn" onClick={onNext} aria-label={`Next ${label}`}>
          ›
        </button>
      </div>

      <div className="dots">
        {images.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function OutfitMixer() {
  const outfit = useMemo(
    () => ({
      Tops: [
        "https://picsum.photos/id/1011/1200/700",
        "https://picsum.photos/id/1012/1200/700",
        "https://picsum.photos/id/1013/1200/700",
      ],
      Bottoms: [
        "https://picsum.photos/id/1021/1200/700",
        "https://picsum.photos/id/1022/1200/700",
        "https://picsum.photos/id/1023/1200/700",
      ],
      Shoes: [
        "https://picsum.photos/id/1031/1200/700",
        "https://picsum.photos/id/1032/1200/700",
        "https://picsum.photos/id/1033/1200/700",
      ],
    }),
    []
  );

  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);
  const [shoeIdx, setShoeIdx] = useState(0);

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Outfit Mixer</h1>
        <p className="subtitle">Mix & match by swapping each section.</p>

        <div className="stack">
          <OutfitRow
            label="Top"
            images={outfit.Tops}
            index={topIdx}
            onPrev={() => setTopIdx((i) => clamp(i - 1, outfit.Tops.length))}
            onNext={() => setTopIdx((i) => clamp(i + 1, outfit.Tops.length))}
          />
          <OutfitRow
            label="Bottom"
            images={outfit.Bottoms}
            index={bottomIdx}
            onPrev={() => setBottomIdx((i) => clamp(i - 1, outfit.Bottoms.length))}
            onNext={() => setBottomIdx((i) => clamp(i + 1, outfit.Bottoms.length))}
          />
          <OutfitRow
            label="Shoes"
            images={outfit.Shoes}
            index={shoeIdx}
            onPrev={() => setShoeIdx((i) => clamp(i - 1, outfit.Shoes.length))}
            onNext={() => setShoeIdx((i) => clamp(i + 1, outfit.Shoes.length))}
          />
        </div>

        <div className="summary">
          <strong>Current pick:</strong>{" "}
          Top {topIdx + 1} • Bottom {bottomIdx + 1} • Shoes {shoeIdx + 1}
        </div>
      </div>
    </div>
  );
}
