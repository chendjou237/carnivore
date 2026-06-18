/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export default function EmberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Ember {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      decay: number;
      color: string;
    }

    const embers: Ember[] = [];
    const colors = ['#ff4d00', '#ff8800', '#ffaa00', '#ffffff', '#e63900'];

    const createEmber = (): Ember => {
      return {
        x: Math.random() * width,
        y: height + 20,
        size: Math.random() * 2.5 + 0.8,
        speedY: -(Math.random() * 1.5 + 0.5),
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.5,
        decay: Math.random() * 0.003 + 0.001,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Prepopulate some embers
    for (let i = 0; i < 40; i++) {
      const ember = createEmber();
      ember.y = Math.random() * height;
      embers.push(ember);
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Add new embers occasionally
      if (embers.length < 80 && Math.random() < 0.3) {
        embers.push(createEmber());
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.y += e.speedY;
        e.x += e.speedX;
        e.alpha -= e.decay;

        if (e.alpha <= 0 || e.y < -10) {
          embers.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = e.alpha;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        // Ember glow
        ctx.shadowBlur = 6;
        ctx.shadowColor = e.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
