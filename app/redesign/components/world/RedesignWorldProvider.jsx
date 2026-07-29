"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import HeroWorld from "./HeroWorld";

export default function RedesignWorldProvider({ children }) {
  const [heroStage, setHeroStage] = useState(null);

  useEffect(() => {
    const stage = document.querySelector(".redesign-hero__stage");
    setHeroStage(stage);
  }, []);

  return (
    <>
      {children}
      {heroStage ? createPortal(<HeroWorld />, heroStage) : null}
    </>
  );
}
