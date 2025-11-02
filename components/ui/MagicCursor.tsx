import { useEffect, useRef } from "react";

export default function MagicCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];

    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        size: Math.random() * 4 + 1,
        opacity: 1,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= 0.5;
        p.opacity -= 0.02;
        ctx.fillStyle = `${p.color}`;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.opacity <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(animate);
    };
    animate();

    const handleMove = (e: MouseEvent) => createParticle(e.clientX, e.clientY);
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
}
