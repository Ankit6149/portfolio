"use client";

import styles from "../v1-art.module.css";

// Static botanical petal coordinates to avoid unnecessary state/effects
const PETALS = [
  { id: 1, top: "12%", left: "42%", size: 36, delay: 0, duration: 9, rot: 15, img: "/v1-art/petals-layer-1.png" },
  { id: 2, top: "28%", left: "55%", size: 48, delay: 2, duration: 11, rot: -25, img: "/v1-art/petals-layer-2.png" },
  { id: 3, top: "45%", left: "38%", size: 28, delay: 1, duration: 10, rot: 40, img: "/v1-art/petals-layer-1.png" },
  { id: 4, top: "68%", left: "62%", size: 42, delay: 3, duration: 12, rot: -10, img: "/v1-art/petals-layer-2.png" },
  { id: 5, top: "82%", left: "48%", size: 32, delay: 2.5, duration: 8.5, rot: 30, img: "/v1-art/petals-layer-1.png" },
  { id: 6, top: "22%", left: "75%", size: 54, delay: 4, duration: 13, rot: -45, img: "/v1-art/petals-layer-2.png" },
];

export default function FloatingPetals() {
  return (
    <div className={styles.floatingPetalsContainer} aria-hidden="true">
      {PETALS.map((p) => (
        <div
          key={p.id}
          className={styles.petalParticle}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `v1PetalFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            transform: `rotate(${p.rot}deg)`,
            backgroundImage: `url(${p.img})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            opacity: 0.85,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes v1PetalFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) translateX(10px) rotate(8deg);
          }
          100% {
            transform: translateY(8px) translateX(-8px) rotate(-6deg);
          }
        }
      `}</style>
    </div>
  );
}
