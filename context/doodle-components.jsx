import React from 'react';

/**
 * Animated SVG Doodle Component Library for Fatimah's Portfolio
 * Color Palette Defaults:
 * - Dusty Rose: #B88D98 (Default Signature Accent)
 * - Crimson: #E53935 (High-Contrast Editorial Overlay)
 * - Warm Grey: #B5AEAA (Subtle Margin Details)
 */

// Keyframes styles inserted into document head or styled-components
export const DoodleStyles = () => (
  <style>{`
    @keyframes drawPath {
      from { stroke-dashoffset: 1000; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes floatCloud {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-6px) rotate(1deg); }
    }
    @keyframes pulseDot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.25); opacity: 0.85; }
    }
    
    .doodle-draw {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: drawPath 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .doodle-cloud-float {
      animation: floatCloud 6s ease-in-out infinite;
    }
    .doodle-pulse {
      animation: pulseDot 2s ease-in-out infinite;
    }
  `}</style>
);

// 1. Hand-Drawn Cloud (Thought / Curiosity Anchor)
export const CloudDoodle = ({ 
  color = "#B88D98", 
  size = 120, 
  animate = true, 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size * 0.65} 
    viewBox="0 0 160 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${animate ? 'doodle-cloud-float' : ''} ${className}`}
  >
    <path
      d="M30 70C18 70 10 60 12 48C14 36 26 30 38 32C42 20 56 12 70 15C82 8 100 12 108 24C118 18 132 22 138 32C148 34 154 44 150 56C146 68 134 72 122 70C118 80 102 86 88 82C76 88 58 84 48 76C40 78 34 76 30 70Z"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={animate ? "doodle-draw" : ""}
    />
  </svg>
);

// 2. Organic Arrow (Directional Guide to Margin Commentary)
export const ArrowDoodle = ({ 
  color = "#B88D98", 
  direction = "right", 
  width = 90, 
  height = 40,
  animate = true,
  className = "" 
}) => {
  const isLeft = direction === "left";
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 120 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: isLeft ? "scaleX(-1)" : "none" }}
      className={className}
    >
      {/* Curved main arrow shaft */}
      <path
        d="M10 25C35 10 75 15 105 28"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        className={animate ? "doodle-draw" : ""}
      />
      {/* Organic arrowhead */}
      <path
        d="M88 18C96 22 103 26 107 29C102 34 94 40 90 45"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "doodle-draw" : ""}
      />
    </svg>
  );
};

// 3. Sketchy Underline (Highlighting Core Keywords)
export const UnderlineDoodle = ({ 
  color = "#B88D98", 
  width = 200, 
  height = 18,
  animate = true,
  className = "" 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 240 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5 12C50 4 150 16 235 8M15 15C80 8 180 18 220 12"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      className={animate ? "doodle-draw" : ""}
    />
  </svg>
);

// 4. Loose Circle Highlight (Emphasizing Key Tags/Numbers)
export const HighlightCircleDoodle = ({ 
  color = "#E53935", 
  size = 70,
  animate = true,
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M50 12C22 10 10 32 12 58C14 82 38 90 64 88C88 86 92 60 88 38C84 18 58 8 36 14C22 18 12 32 15 48"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      className={animate ? "doodle-draw" : ""}
    />
  </svg>
);

// 5. Editorial Focal Crimson Dot Anchor
export const EditorialDot = ({ 
  color = "#E53935", 
  size = 14, 
  pulse = true,
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`${pulse ? 'doodle-pulse' : ''} ${className}`}
  >
    <circle cx="10" cy="10" r="8" fill={color} />
  </svg>
);

// 6. Handwritten Cursive Overlay Wrapper (Beth Ellen / Caveat Font Pair)
export const HandwrittenAnnotation = ({ 
  text, 
  color = "#B88D98", 
  fontSize = "1.1rem", 
  rotate = "-3deg",
  className = "" 
}) => (
  <span 
    style={{
      fontFamily: "'Beth Ellen', 'Caveat', cursive",
      color: color,
      fontSize: fontSize,
      display: "inline-block",
      transform: `rotate(${rotate})`,
      letterSpacing: "0.02em"
    }}
    className={className}
  >
    {text}
  </span>
);

// Default export wrapper containing all components
const DoodleLibrary = {
  DoodleStyles,
  CloudDoodle,
  ArrowDoodle,
  UnderlineDoodle,
  HighlightCircleDoodle,
  EditorialDot,
  HandwrittenAnnotation
};

export default DoodleLibrary;
