/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import * as UTIF from "utif";

interface Props {
  src: string;
  className?: string;
}

export default function TiffPreview({ src, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderTiff = async () => {
      try {
        const response = await fetch(src);
        const buffer = await response.arrayBuffer();

        const ifds = UTIF.decode(buffer);

        // @types/utif provides decodeImage (singular). Decode each IFD into image data.
        ifds.forEach((ifd: any) => UTIF.decodeImage(buffer, ifd));

        const firstPage = ifds[0];

        const rgba = UTIF.toRGBA8(firstPage);

        const canvas = canvasRef.current;

        if (!canvas) return;

        canvas.width = firstPage.width;
        canvas.height = firstPage.height;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const imageData = ctx.createImageData(
          firstPage.width,
          firstPage.height
        );

        imageData.data.set(rgba);

        ctx.putImageData(imageData, 0, 0);
      } catch (error) {
        console.error("TIFF render failed", error);
      }
    };

    renderTiff();
  }, [src]);

  return <canvas ref={canvasRef} className={className} />;
}
