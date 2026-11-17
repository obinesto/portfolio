"use client";
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel";
import { slides } from "./data";

export function CarouselDemo() {
  return (
    <div
      className="carousel-demo w-[88%] min-w-0"
      aria-label="React Infinite Scroll Carousel demo"
    >
      <div className="demo-top pb-3 flex justify-between">
        <span>Try the carousel</span>
        <span aria-hidden="true">↔</span>
      </div>
      <ResponsiveCarousel
        items={slides}
        keyExtractor={(slide) => slide.number}
        label="Project demonstration"
        renderItem={(slide) => (
          <div className={`demo-slide aspect-[1.25] p-[23px] flex flex-col justify-between demo-${slide.color}`}>
            <span className="demo-number">{slide.number}</span>
            <strong>{slide.word}</strong>
            <span>{slide.detail}</span>
          </div>
        )}
      />
    </div>
  );
}
