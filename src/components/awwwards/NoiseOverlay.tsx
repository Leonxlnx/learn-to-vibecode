import { useEffect, useRef } from "react";

// Animated film grain noise overlay fixed over entire viewport
// ~5 animation points: continuous noise pattern animation

const NoiseOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const noise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 15;    // A (very subtle)
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      frame++;
      // Only update every 3 frames for performance + film grain feel
      if (frame % 3 === 0) {
        noise();
      }
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.04]"
      style={{ mixBlendMode: "multiply" }}
    />
  );
};

export default NoiseOverlay;
