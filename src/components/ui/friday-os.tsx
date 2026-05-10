import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NODES = [
  "Krista AI",
  "GitNexus",
  "CRM",
  "ERP",
  "HR",
  "Finance",
  "Sales",
  "Support",
  "Outlook",
  "Slack",
  "Teams",
  "SAP"
];

export function FridayOS() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate node positions in a circle
  const radius = 35; // percentage of container
  const nodesWithPositions = NODES.map((name, i) => {
    const angle = (i / NODES.length) * Math.PI * 2;
    // Alternate radius slightly for a more organic look
    const r = i % 2 === 0 ? radius : radius - 5;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    return { name, x, y };
  });

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden rounded-3xl">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at center, black 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {nodesWithPositions.map((node, i) => (
          <g key={`line-group-${i}`}>
            {/* Base line */}
            <line
              x1="50%"
              y1="50%"
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
            {/* Animated Data Pulse */}
            <motion.line
              x1="50%"
              y1="50%"
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke="url(#line-gradient)"
              strokeWidth="3"
              pathLength="100"
              initial={{ strokeDasharray: "0 100", strokeDashoffset: 100 }}
              animate={{ 
                strokeDasharray: ["0 100", "20 80", "0 100"],
                strokeDashoffset: [100, 50, 0] 
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }}
            />
          </g>
        ))}
      </svg>

      {/* Central Node: Friday_OS */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute z-20 flex flex-col items-center justify-center w-48 h-48 bg-white border border-blue-100 rounded-full shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]"
        style={{ left: "50%", top: "50%" }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-blue-500/20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 text-center">
          <h3 className="text-xl font-black text-black tracking-tight mb-1">Friday_OS</h3>
          <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold max-w-[120px] leading-tight mx-auto">
            AI Brain & Command Layer
          </p>
        </div>
      </motion.div>

      {/* Outer Nodes */}
      {nodesWithPositions.map((node, i) => (
        <motion.div
          key={node.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
          className="absolute z-10"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            x: "-50%",
            y: "-50%",
          }}
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            whileHover={{ scale: 1.1, zIndex: 30 }}
            className="group flex flex-col items-center gap-2 cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 group-hover:border-blue-200 group-hover:shadow-blue-500/20 transition-all duration-300">
              <div className="w-3 h-3 rounded-full bg-blue-500/80 group-hover:bg-blue-600 transition-colors" />
              {/* Node glow on hover */}
              <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
            </div>
            <span className="text-xs font-bold text-gray-600 group-hover:text-blue-600 transition-colors whitespace-nowrap bg-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm border border-transparent group-hover:border-blue-100">
              {node.name}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
