"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll<HTMLElement>(
      "main section, main article, main .commerce-contact > *",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );

    targets.forEach((target, index) => {
      target.classList.add("scroll-reveal");
      target.style.setProperty(
        "--scroll-reveal-delay",
        `${(index % 4) * 70}ms`,
      );
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}