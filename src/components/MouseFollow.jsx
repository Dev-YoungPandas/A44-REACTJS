import React, { useRef, useEffect } from 'react';

const MouseFollow = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let mouseMoved = false;

        const pointer = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };

        const params = {
            pointsNumber: 40,
            widthFactor: 0.3,
            mouseThreshold: 0.6,
            spring: 0.4,
            friction: 0.5,
        };

        const trail = new Array(params.pointsNumber).fill().map(() => ({
            x: pointer.x,
            y: pointer.y,
            dx: 0,
            dy: 0,
        }));

        const updateMousePosition = (eX, eY) => {
            pointer.x = eX;
            pointer.y = eY;
        };

        const handleMouseMove = (e) => {
            mouseMoved = true;
            updateMousePosition(e.clientX, e.clientY);
        };

        const handleTouchMove = (e) => {
            mouseMoved = true;
            updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const update = (t) => {
            if (!mouseMoved) {
                pointer.x =
                    (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
                    window.innerWidth;
                pointer.y =
                    (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
                    window.innerHeight;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            trail.forEach((p, i) => {
                const prev = i === 0 ? pointer : trail[i - 1];
                const spring = i === 0 ? 0.4 * params.spring : params.spring;
                p.dx += (prev.x - p.x) * spring;
                p.dy += (prev.y - p.y) * spring;
                p.dx *= params.friction;
                p.dy *= params.friction;
                p.x += p.dx;
                p.y += p.dy;
            });

            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(trail[0].x, trail[0].y);

            for (let i = 1; i < trail.length - 1; i++) {
                const xc = (trail[i].x + trail[i + 1].x) / 2;
                const yc = (trail[i].y + trail[i + 1].y) / 2;
                ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
                ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
                ctx.stroke();
            }
            ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
            ctx.stroke();

            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default MouseFollow;
