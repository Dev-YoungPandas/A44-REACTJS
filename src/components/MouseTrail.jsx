import React, { useEffect, useRef } from 'react';
import '../css/MouseTrail.css';

const MouseTrail = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;

    let points = [];
    const segments = 50; // Number of segments in the trail
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Initialize points along the mouse path
    for (let i = 0; i < segments; i++) {
      points.push({ x: mouse.x, y: mouse.y });
    }

    const move = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const anim = () => {
      let px = mouse.x;
      let py = mouse.y;

      // Faster & smoother interpolation
      points.forEach((p, index) => {
        p.x += (px - p.x) * 0.6; // Higher factor for faster movement
        p.y += (py - p.y) * 0.6;

        const next = points[index + 1];
        if (next) {
          px = p.x;
          py = p.y;
        }
      });

      if (points.length > 1) {
        path.setAttribute(
          'd',
          `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`
        );
      }

      requestAnimationFrame(anim);
    };

    const resize = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      svg.style.width = `${ww}px`;
      svg.style.height = `${wh}px`;
      svg.setAttribute('viewBox', `0 0 ${ww} ${wh}`);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('resize', resize);

    resize();
    anim();

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <svg ref={svgRef} className="trail">
      <path
        ref={pathRef}
        d="M 0,0"
        stroke="black"
        strokeWidth="4" // Base stroke width
        strokeLinecap="round" // Smooth rounded edges
        strokeLinejoin="round"
        fill="none"
        style={{ filter: 'blur(0px)' }} // Subtle blur for smoothness
      />
    </svg>
  );
};

export default MouseTrail;
