"use client";

import { Children, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContentSliderProps {
  children: React.ReactNode;
  id: string;
  itemLabel: string;
  label: string;
  variant: "books" | "classes" | "accessories";
}

export function ContentSlider({
  children,
  id,
  itemLabel,
  label,
  variant,
}: ContentSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const slides = Children.toArray(children);

  function syncPage() {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const firstSlide = track.firstElementChild;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const slideWidth = firstSlide?.getBoundingClientRect().width ?? track.clientWidth;
    const slidesPerPage = Math.max(
      1,
      Math.floor((track.clientWidth + gap) / (slideWidth + gap)),
    );
    const pages = Math.max(1, Math.ceil(track.children.length / slidesPerPage));
    setPageCount(pages);
    setActivePage(
      maxScroll > 1
        ? Math.round((track.scrollLeft / maxScroll) * (pages - 1))
        : 0,
    );
  }

  function goToPage(page: number) {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    track.scrollTo({
      left: pageCount > 1 ? (maxScroll * page) / (pageCount - 1) : 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(syncPage);
    observer.observe(track);
    syncPage();
    return () => observer.disconnect();
  }, []);

  return (
    <div className="commerce-content-slider" data-variant={variant}>
      <div className="commerce-content-slider-controls">
        <button
          className="commerce-content-slider-button"
          type="button"
          aria-label={`Show previous ${label.toLowerCase()}`}
          aria-controls={id}
          disabled={activePage === 0}
          onClick={() => goToPage(activePage - 1)}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="commerce-content-slider-button"
          type="button"
          aria-label={`Show more ${label.toLowerCase()}`}
          aria-controls={id}
          disabled={activePage >= pageCount - 1}
          onClick={() => goToPage(activePage + 1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        className="commerce-content-slider-track"
        id={id}
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={syncPage}
      >
        {slides.map((slide, index) => (
          <div className="commerce-content-slider-slide" key={index}>
            {slide}
          </div>
        ))}
      </div>
      {pageCount > 1 && (
        <nav className="commerce-content-slider-pagination" aria-label={`${label} pages`}>
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              className="commerce-content-slider-dot"
              type="button"
              key={index}
              aria-label={`Show ${itemLabel} page ${index + 1} of ${pageCount}`}
              aria-current={activePage === index ? "page" : undefined}
              onClick={() => goToPage(index)}
            />
          ))}
        </nav>
      )}
    </div>
  );
}