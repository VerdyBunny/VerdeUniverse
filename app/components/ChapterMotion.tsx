"use client";

import { useEffect } from "react";

// The chapters move like a deck of cards as I scroll: the next chapter slides up over the
// one before it (a little smaller and lower at first, straightening as it lands), while the
// chapter being covered sinks back (shrinks a touch and fades). Driven by scroll position,
// so it also plays when a menu link or button jumps me there. Off with reduced motion.
export function ChapterMotion() {
  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>(".chapter"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chapters.forEach((el) => el.classList.add("is-dealt"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      chapters.forEach((el, i) => {
        const top = el.getBoundingClientRect().top;
        // entering: 0 when its top is at the bottom of the screen, 1 once it's 35% up
        // the last card (the footer) sits flat: the page ends before it could rise far enough
        // to straighten, so it doesn't tilt in at all
        const last = i === chapters.length - 1;
        const enter = last ? 1 : Math.min(1, Math.max(0, (vh - top) / (vh * 0.65)));
        el.style.setProperty("--enter", enter.toFixed(3));
        // covered: how far the NEXT chapter has slid over this one
        const next = chapters[i + 1];
        const nTop = next ? next.getBoundingClientRect().top : vh;
        const cover = Math.min(1, Math.max(0, (vh - nTop) / vh));
        el.style.setProperty("--cover", cover.toFixed(3));
        // once a chapter is a quarter of the way up, its cards are dealt (and stay dealt)
        if (last ? top < vh * 0.9 : enter > 0.25) el.classList.add("is-dealt");
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
