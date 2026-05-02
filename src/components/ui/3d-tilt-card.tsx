import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function TiltCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * -15;
    const tiltY = ((x - centerX) / centerX) * 15;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const shadowX = tilt.y * 0.5;
  const shadowY = tilt.x * 0.5;
  const shadowBlur = 40 + Math.abs(tilt.x + tilt.y) * 0.5;

  return (
    <div className="w-full flex items-center justify-center py-24 bg-white p-8 relative overflow-hidden">
      {/* Background decoration to match the site's aesthetic */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative z-10">
        <Link
          to="/custom-app-builder"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-80 h-48 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-200 ease-out border-2 border-black/5 rounded-3xl bg-white shadow-sm no-underline group"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
            boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.05)`,
          }}
        >
          {/* Subtle background image from Unsplash */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
              alt="Background"
              className="w-full h-full object-cover opacity-[0.05] group-hover:opacity-10 transition-opacity grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
          </div>

          <div className="relative z-10">
            <span className="text-3xl font-black tracking-tighter text-black uppercase transition-transform duration-300 group-hover:scale-110 block">
              Learn More
            </span>
            <div className="mt-2 h-1 w-0 bg-black mx-auto transition-all duration-300 group-hover:w-full" />
          </div>
        </Link>
      </div>
    </div>
  );
}
