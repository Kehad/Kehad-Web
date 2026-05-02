import React, { useState, useEffect } from 'react';
import image1 from '../../assets/images/1.png'
import image2 from '../../assets/images/2.png'
import image3 from '../../assets/images/3.jpg'
import image4 from '../../assets/images/4.jpg'
import image5 from '../../assets/images/5.jpg'
import image6 from '../../assets/images/6.png'
import image7 from '../../assets/images/7.jpg'
import image8 from '../../assets/images/8.jpg'
import { SuspenseImage } from '../others/SuspenseImage';

const RotatingCube3D: React.FC = () => {
  const [rotation, setRotation] = useState({ x: -20, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotation effect
  useEffect(() => {
    console.log(autoRotate);
    console.log(autoRotate, !autoRotate);
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 0.5
        // x: prev.x + 0.5
      }));
    }, 30);

    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setAutoRotate(false);
    setIsDragging(true);
    setLastMousePos({ 
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY 
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - lastMousePos.x;
    const deltaY = e.touches[0].clientY - lastMousePos.y;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setLastMousePos({ 
      x: e.touches[0].clientX, 
      y: e.touches[0].clientY 
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  // Example images - you can replace these with your own
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  return (
    <div className=" flex items-center justify-center p-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0"></div>
      
      <div className="relative z-10 w-full max-w-4xl">
        {/* Controls */}
        <div className="text-center mb-8">
          {/* <p className="text-purple-200 mb-6">Drag to rotate or watch it spin</p> */}
          <button
            onClick={toggleAutoRotate}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
          >
            {autoRotate ? '⏸ Pause Rotation' : '▶ Auto Rotate'}
          </button>
        </div>

        {/* 3D Scene Container */}
        <div 
          className="perspective-container cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="cube-wrapper"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            }}
          >
            {/* Front Face */}
            <div className="cube-face cube-front">
              <React.Suspense fallback={<div className="w-full h-full bg-purple-500/20 animate-pulse" />}>
                <SuspenseImage src={images[0]} alt="Front" loading="lazy" className="face-image" />
              </React.Suspense>
              <div className="face-overlay"></div>
            </div>

            {/* Back Face */}
            <div className="cube-face cube-back">
              <React.Suspense fallback={<div className="w-full h-full bg-purple-500/20 animate-pulse" />}>
                <SuspenseImage src={images[1]} alt="Back" loading="lazy" className="face-image" />
              </React.Suspense>
              <div className="face-overlay"></div>
            </div>

            {/* Right Face */}
            <div className="cube-face cube-right">
              <React.Suspense fallback={<div className="w-full h-full bg-purple-500/20 animate-pulse" />}>
                <SuspenseImage src={images[2]} alt="Right" loading="lazy" className="face-image" />
              </React.Suspense>
              <div className="face-overlay"></div>
            </div>

            {/* Left Face */}
            <div className="cube-face cube-left">
              <React.Suspense fallback={<div className="w-full h-full bg-purple-500/20 animate-pulse" />}>
                <SuspenseImage src={images[3]} alt="Left" loading="lazy" className="face-image" />
              </React.Suspense>
              <div className="face-overlay"></div>
            </div>

            {/* Top Face */}
            <div className="cube-face cube-top">
              <React.Suspense fallback={<div className="w-full h-full bg-purple-500/20 animate-pulse" />}>
                <SuspenseImage src={images[4]} alt="Top" loading="lazy" className="face-image" />
              </React.Suspense>
              <div className="face-overlay"></div>
            </div>

            {/* Bottom Face */}
            <div className="cube-face cube-bottom">
              <React.Suspense fallback={<div className="w-full h-full bg-purple-500/20 animate-pulse" />}>
                <SuspenseImage src={images[5]} alt="Bottom" loading="lazy" className="face-image" />
              </React.Suspense>
              <div className="face-overlay"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-container {
          perspective: 1200px;
          width: 100%;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cube-wrapper {
          position: relative;
          width: 300px;
          height: 300px;
          transform-style: preserve-3d;
          transition: transform ${autoRotate ? '0s' : '0.1s'} ease-out;
        }

        .cube-face {
          position: absolute;
          width: 300px;
          height: 300px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
          backdrop-filter: blur(10px);
        }

        .face-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .face-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1));
          pointer-events: none;
        }

        .cube-front {
          transform: translateZ(150px);
        }

        .cube-back {
          transform: rotateY(180deg) translateZ(150px);
        }

        .cube-right {
          transform: rotateY(90deg) translateZ(150px);
        }

        .cube-left {
          transform: rotateY(-90deg) translateZ(150px);
        }

        .cube-top {
          transform: rotateX(90deg) translateZ(150px);
        }

        .cube-bottom {
          transform: rotateX(-90deg) translateZ(150px);
        }

        @media (max-width: 640px) {
          .cube-wrapper,
          .cube-face {
            width: 250px;
            height: 250px;
          }

          .cube-front {
            transform: translateZ(125px);
          }

          .cube-back {
            transform: rotateY(180deg) translateZ(125px);
          }

          .cube-right {
            transform: rotateY(90deg) translateZ(125px);
          }

          .cube-left {
            transform: rotateY(-90deg) translateZ(125px);
          }

          .cube-top {
            transform: rotateX(90deg) translateZ(125px);
          }

          .cube-bottom {
            transform: rotateX(-90deg) translateZ(125px);
          }
        }
      `}</style>
    </div>
  );
};

export default RotatingCube3D;