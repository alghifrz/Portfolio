import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import content from '@/data/content.json';
import { motion } from 'framer-motion';
import { circle, li } from 'framer-motion/client';

const steps = content.experience.step;

export default function Roadmap() {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // SVG dimensions
  const svgWidth = isMobile ? 360 : 1200;
  const svgHeight = isMobile ? 600 : 700;
  const margin = isMobile 
    ? { x: 30, y: 60 } 
    : { x: 0, y: 200 };

  const pathPoints = React.useMemo(() => {
    if (isMobile) {
      // Vertical layout for mobile
      const verticalSpacing = 100;
      
      return steps.map((_, index) => ({
        x: svgWidth / 2,
        y: margin.y + index * verticalSpacing
      }));
    } else {
      // Original layout for desktop
      const horizontalSpacing = (svgWidth - 2 * margin.x) / 2;
      const verticalSpacing = 280;
      
      return [
        { x: margin.x, y: margin.y },
        { x: margin.x + horizontalSpacing, y: margin.y },
        { x: margin.x + 2 * horizontalSpacing, y: margin.y },
        { x: margin.x + 2 * horizontalSpacing, y: margin.y + verticalSpacing },
        { x: margin.x + horizontalSpacing, y: margin.y + verticalSpacing },
        { x: margin.x, y: margin.y + verticalSpacing },
      ];
    }
  }, [isMobile, svgWidth, margin.x, margin.y]);

  const pathSegments = React.useMemo(() => {
    const segments = [];
    
    for (let i = 0; i < pathPoints.length - 1; i++) {
      const current = pathPoints[i];
      const next = pathPoints[i + 1];
      
      segments.push(`M${current.x} ${current.y} L${next.x} ${next.y}`);
    }
    
    return segments;
  }, [pathPoints]);

  const handleNext = () => {
    if (progress < steps.length - 1) {
      setProgress(p => p + 1);
    }
  };

  const handleBack = () => {
    if (progress > 0) {
      setProgress(p => p - 1);
    }
  };

  // Add gradient definitions for the SVG
  const gradientId = "lineGradient";
  const activeGradientId = "activeLineGradient";
  const circleGradientId = "circleGradient";

  return (
    <section id="experience" className="px-2 md:px-8 mt-24 md:mt-48 md:pt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className='mb-4 md:mb-20'
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        >
          {content.experience.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white mb-4 md:mb-6 text-center text-xs md:text-2xl"
        >
          {content.experience.subtitle}
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mb-12 pb-0 md:mb-2 overflow-x-hidden"
      >
        <svg width={svgWidth} height={svgHeight} className="mx-auto" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id={gradientId}>
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id={activeGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6">
                <animate
                  attributeName="offset"
                  values="-2; 1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#6366f1">
                <animate
                  attributeName="offset"
                  values="-1; 2"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#8b5cf6">
                <animate
                  attributeName="offset"
                  values="0; 3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <linearGradient id="flowingGradient" x1="0%" y1="0%" x2="200%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="33%" stopColor="#6366f1" />
              <stop offset="66%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="progressGradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <radialGradient id={circleGradientId}>
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </radialGradient>
          </defs>

          {pathSegments.map((segment, index) => {
            const isActive = index < progress;
            
            return (
              <g key={index}>
                {/* Background path */}
                <path
                  d={segment}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeOpacity={0.25}
                  strokeWidth={isMobile ? "12" : "24"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Active path */}
                {isActive && (
                  <motion.path
                    d={segment}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={isMobile ? "12" : "24"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text"
                    }}
                  />
                )}
              </g>
            );
          })}

          <style>
            {`
              path {
                stroke: url(#progressGradient);
              }
            `}
          </style>

          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6">
                <animate attributeName="offset" values="-0.5;1" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#6366f1">
                <animate attributeName="offset" values="0;1.5" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#8b5cf6">
                <animate attributeName="offset" values="0.5;2" dur="2s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>

          {pathPoints.map((pt, i) => {
            const isActive = progress >= i;
            const isCurrent = progress === i;
            const nodeSize = isMobile ? 20 : 48;
            const fontSize = isMobile ? 12 : 40;
            const labelFontSize = isMobile ? 10 : 24;
            const dateFontSize = isMobile ? 9 : 20;
            const companyFontSize = isMobile ? 9 : 20;

            const isEven = i % 2 === 0;
            const textOffset = isMobile ? (isEven ? 38 : -38) : 0;
            const textX = isMobile ? pt.x + textOffset : pt.x;
            
            const dateY = isMobile 
              ? pt.y - 20
              : pt.y + (i < 3 ? -145 : 90);
            
            const textY = isMobile 
              ? pt.y - 2
              : pt.y + (i < 3 ? -110 : 125);
            
            const companyY = isMobile 
              ? pt.y + 30  // Increased the distance from title
              : pt.y + (i < 3 ? -80 : 155);
            
            const textAnchorMobile = isMobile
              ? (isEven ? 'start' : 'end')
              : 'middle';
            
            const circleX = isMobile
              ? (isEven ? pt.x - 4 : pt.x + 4)
              : pt.x;

            return (
              <g key={i}>
                {/* Large glow effect */}
                {isActive && (
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r={nodeSize * 1.8}
                    fill="#60a5fa"
                    className="transition-all duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: isCurrent ? 0.2 : 0.1,
                      fill: isCurrent ? "#8b5cf6" : "#60a5fa"
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      filter: 'blur(20px)',
                    }}
                  />
                )}
                {/* Medium glow effect */}
                {isActive && (
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r={nodeSize * 1.4}
                    fill="#60a5fa"
                    className="transition-all duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: isCurrent ? 0.3 : 0.15,
                      fill: isCurrent ? "#8b5cf6" : "#60a5fa"
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      filter: 'blur(10px)',
                    }}
                  />
                )}
                {/* Close glow effect */}
                {isActive && (
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r={nodeSize * 1.2}
                    className="transition-all duration-300"
                    fill="#60a5fa"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: isCurrent ? 0.4 : 0.2,
                      fill: isCurrent ? "#8b5cf6" : "#60a5fa"
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      filter: 'blur(5px)',
                    }}
                  />
                )}
                {/* White background circle for active nodes */}
                {isActive && (
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r={nodeSize + (isMobile ? 3 : 6)}
                    fill="white"
                    className="transition-all duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {/* Main circle with gradient */}
                <motion.circle
                  cx={pt.x}
                  cy={pt.y}
                  r={nodeSize}
                  fill={isActive ? `url(#${circleGradientId})` : '#e5e7eb'}
                  className="transition-all duration-300"
                  stroke={isActive ? '#60a5fa' : '#e5e7eb'}
                  strokeWidth={isMobile ? 2 : 3}
                  initial={false}
                  animate={{ 
                    fill: isActive 
                      ? (isCurrent ? "url(#progressGradient)" : `url(#${circleGradientId})`) 
                      : '#e5e7eb',
                    stroke: isActive
                      ? (isCurrent ? "#8b5cf6" : "#60a5fa")
                      : '#e5e7eb'
                  }}
                  transition={{ duration: 0.5 }}
                />
                <motion.text
                  x={circleX}
                  y={pt.y + 1}
                  textAnchor={textAnchorMobile}
                  dominantBaseline="middle"
                  fontSize={fontSize}
                  fontWeight="bold"
                  initial={false}
                  animate={{ 
                    fill: isActive 
                      ? (isCurrent ? "#ffffff" : "#ffffff")
                      : '#6b7280'
                  }}
                  className="transition-all duration-300"
                >
                  {i + 1}
                </motion.text>
                <text
                  x={textX}
                  y={dateY}
                  textAnchor={textAnchorMobile}
                  fontSize={dateFontSize}
                  className={`transition-all duration-300 ${isActive ? 'fill-blue-400' : 'fill-gray-500'}`}
                  fontWeight="bold"
                >
                  📆 {steps[i].date}
                </text>
                <text
                  x={textX}
                  y={textY}
                  textAnchor={textAnchorMobile}
                  fontSize={labelFontSize}
                  className={`transition-all duration-300 ${isActive ? 'fill-white' : 'fill-gray-500'}`}
                  fontWeight="bold"
                >
                  {isMobile ? (
                    // Mobile: Break text into maximum 2 lines
                    steps[i].title.split(' ').reduce((acc, word, idx, arr) => {
                      if (idx === 0) return word;
                      const lines = acc.split('\n');
                      // If already 2 lines, just append to second line
                      if (lines.length === 2) {
                        return lines[0] + '\n' + lines[1] + ' ' + word;
                      }
                      // Check if adding this word would make the line too long
                      const currentLine = lines[lines.length - 1];
                      if ((currentLine + ' ' + word).length > 20) {
                        return acc + '\n' + word;
                      }
                      return acc + ' ' + word;
                    }, '').split('\n').map((line, lineIdx) => (
                      <tspan
                        key={lineIdx}
                        x={textX}
                        dy={lineIdx === 0 ? 0 : 15}
                        textAnchor={textAnchorMobile}
                      >
                        {line}
                      </tspan>
                    ))
                  ) : (
                    // Desktop: Single line
                    steps[i].title
                  )}
                </text>
                <text
                  x={textX}
                  y={companyY}
                  textAnchor={textAnchorMobile}
                  fontSize={companyFontSize}
                  className={`transition-all duration-300 ${isActive ? 'fill-white' : 'fill-gray-500'}`}
                >
                  {steps[i].company}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-4 md:gap-8"
      >
        <div className="flex gap-3 md:gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            disabled={progress === 0}
            className="z-10 cursor-pointer flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white font-medium px-4 md:px-4 py-2 md:py-2 text-sm md:text-lg rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 border border-blue-400 shadow-[0px_0px_8px_1px_rgba(59,130,246,0.3)]"
          >
            <span className={isMobile ? 'text-md' : 'text-xl'}>{'<'}</span> Prev
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={progress === steps.length-1}
            className="z-10 cursor-pointer flex items-center gap-2 md:gap-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-medium px-4 md:px-4 py-2 md:py-2 text-sm md:text-lg rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-[0px_0px_8px_1px_rgba(59,130,246,0.3)]"
          >
            Next <span className={isMobile ? 'text-md' : 'text-xl'}>{'>'}</span>
          </motion.button>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-1 md:gap-8 z-10'>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-2 md:mt-4 p-4 md:p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-400 [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40] hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60] transition-all duration-300 text-center w-full md:w-5xl md:h-115 text-base md:text-lg"
          >
            <div className='flex justify-between'>
              <div className='align-text-top justify-items-start'>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-bold justify-items-start justify-start text-[10px] md:text-xl"
                >
                  {steps[progress].title}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-white text-[10px] md:text-base italic justify-items-start"
                >
                  {steps[progress].company}
                </motion.p>
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="justify-items-end align-text-top text-blue-400 md:text-xl text-[10px] font-bold"
              >
                {steps[progress].date}
              </motion.p>
            </div>
            <div className="mt-2 md:mt-4 justify-items-center">
              {steps[progress].description[0].includes('.png') ? (
                <motion.img 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  src={steps[progress].description[0]} 
                  alt={'Sertifikat'} 
                  className="justify-center justify-items-center w-1/2 h-auto" 
                />
              ) : (
                <motion.ul 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="list-disc pl-5 text-[9px] md:text-lg"
                >
                  {steps[progress].description.map((desc, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <p className="text-white text-[9px] md:text-lg justify-items-start text-left">
                        {desc}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-sm mt-2 md:mt-4 p-4 md:p-6 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-400 [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40] hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60] transition-all duration-300 text-center w-full max-w-lg text-base md:text-lg flex flex-col"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-extrabold text-xs md:text-2xl mb-2"
            >
              {content.experience.key}
            </motion.p>
            <div className="flex-1 flex items-center justify-center">
              <motion.ul 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-2 justify-center items-center"
              >
                {steps[progress].skill.map((desc, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <p className="text-blue-200 text-[10px] md:text-sm bg-blue-400/20 px-3 py-1 rounded-full border border-blue-400 inline-block hover:bg-blue-400/30 transition-all duration-300">
                      {desc}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}