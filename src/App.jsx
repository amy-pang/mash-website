import React, { useMemo, useState } from "react";
import "./App.css";

function clamp(i, n) {
  return ((i % n) + n) % n;
}

function OutfitRow({ label, images, descriptions, index, onPrev, onNext }) {
  return (
    <div className="row-card">
      <div className="row-content">
        <div className="description">
          <div className="desc-text">{descriptions?.[index] ?? ""}</div>
        </div>
        
        <div className="picker">
          <button className="arrow" onClick={onPrev} aria-label={`Previous ${label}`}>
            ‹
          </button>

          <div className="square-box">
            <img src={images[index]} alt={`${label} option ${index + 1}`} />
          </div>

          <button className="arrow" onClick={onNext} aria-label={`Next ${label}`}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}


export default function OutfitMixer() {
  const outfit = {
    Tops: [
      "https://picsum.photos/seed/top1/300/300",
      "https://picsum.photos/seed/top2/300/300",
      "https://picsum.photos/seed/top3/300/300",
    ],
    TopDescriptions: [
      "White cropped tee with a relaxed fit.",
      "Soft ribbed long-sleeve top in oatmeal.",
      "Lightweight knit sweater with a boxy silhouette.",
    ],
    Bottoms: [
      "https://picsum.photos/seed/bottom1/300/300",
      "https://picsum.photos/seed/bottom2/300/300",
      "https://picsum.photos/seed/bottom3/300/300",
    ],
    BottomDescriptions: [
      "High-waisted straight-leg denim.",
      "Tailored black trousers with subtle stretch.",
      "Relaxed linen pants for warm weather.",
    ],
  };


  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);

  return (
    <div className="page">
      <div className="container">

        <div className="stack">
          <OutfitRow
            label="Top"
            images={outfit.Tops}
            descriptions={outfit.TopDescriptions}
            index={topIdx}
            onPrev={() => setTopIdx((i) => clamp(i - 1, outfit.Tops.length))}
            onNext={() => setTopIdx((i) => clamp(i + 1, outfit.Tops.length))}
          />

          <OutfitRow
            label="Bottom"
            images={outfit.Bottoms}
            descriptions={outfit.BottomDescriptions}
            index={bottomIdx}
            onPrev={() => setBottomIdx((i) => clamp(i - 1, outfit.Bottoms.length))}
            onNext={() => setBottomIdx((i) => clamp(i + 1, outfit.Bottoms.length))}
          />
        </div>
      </div>
    </div>
  );
}
