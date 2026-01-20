import React, { useMemo, useState } from "react";
import "./App.css";

function clamp(i, n) {
  return ((i % n) + n) % n;
}

function OutfitRow({ label, images, index, onPrev, onNext }) {
  return (
    <div className="row-card">
      <button
        className="arrow"
        onClick={onPrev}
        aria-label={`Previous ${label}`}
      >
        ‹
      </button>
      
      <div className="square-box">
        <img
          src={images[index]}
          alt={`${label} option ${index + 1}`}
          draggable={false}
        />
      </div>

      <button
        className="arrow"
        onClick={onNext}
        aria-label={`Next ${label}`}
      >
        ›
      </button>
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
      ]
    }),
    []
  );

  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);

  return (
    <div className="page">
      <div className="container">

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
        </div>
      </div>
    </div>
  );
}
