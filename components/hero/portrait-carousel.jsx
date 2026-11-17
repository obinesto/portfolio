"use client";
import Image from "next/image";
import { Plus } from "lucide-react";
import { ResponsiveCarousel } from "@/components/ui/responsive-carousel";
import { photos } from "./data";

export function PortraitCarousel() {
  return (
    <figure className="hero-portrait max-w-[360px] min-w-0 w-full">
      <div className="portrait-frame p-[9px] relative bg-paper">
        <ResponsiveCarousel
          items={photos}
          keyExtractor={(photo) => photo.image.src}
          label="Portrait photographs"
          interval={6500}
          renderItem={(photo, index) => (
            <div className="relative aspect-[0.88] overflow-hidden">
              <Image
                src={photo.image}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 600px) 65vw, (max-width: 800px) 32vw, 360px"
                style={{ objectPosition: photo.position }}
              />
            </div>
          )}
        />
        <span
          className="portrait-cross pointer-events-none absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 text-accent"
          aria-hidden="true"
        >
          <Plus
            size={80}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
      </div>
      <figcaption>
        <span>The person behind the code</span>
        <span>Nigeria · UTC +1</span>
      </figcaption>
    </figure>
  );
}
