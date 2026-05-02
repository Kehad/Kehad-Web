import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const accentColor = mounted && theme === "light" ? "#2563eb" : "#3b82f6"; // Blue 600 / Blue 500

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0F19] relative overflow-hidden selection:bg-blue-500/30">
      
      {/* Background grids / noise */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-colors duration-500 bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.08)_1px,transparent_0)]"
        style={{ backgroundSize: '48px 48px' }}
      ></div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Glowing 404 */}
          <div 
            className="absolute inset-0 blur-[80px] rounded-full opacity-50 mix-blend-screen"
            style={{ backgroundColor: accentColor }}
          ></div>
          <h1 className="text-8xl md:text-[150px] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-gray-400 dark:from-white dark:to-gray-500 relative z-10 drop-shadow-lg">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 md:mt-8 flex flex-col items-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 tracking-wide uppercase mb-4">
            System Breach: Page Not Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mb-10 text-sm md:text-base leading-relaxed">
            The coordinates you provided do not exist within the current architecture. The sector may have been deleted, or the trajectory was miscalculated.
          </p>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden cursor-pointer group px-8 py-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white/5 dark:bg-[#151a23]/50 backdrop-blur-md shadow-lg"
            >
              {/* Button Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: accentColor }}
              ></div>
              
              <span className="relative z-10 flex items-center gap-2 text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-widest transition-colors group-hover:text-black dark:group-hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-1 transition-transform">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Return to Protocol
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Orbits */}
      <motion.svg width="100%" height="100%" viewBox="0 0 800 800" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 dark:opacity-30">
        <motion.g 
          animate={{ rotateZ: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          style={{ transformOrigin: "400px 400px" }}
        >
          <circle cx="400" cy="400" r="300" fill="none" stroke={accentColor} strokeWidth="1" strokeDasharray="10 20" />
          <circle cx="100" cy="400" r="4" fill={accentColor} />
          <circle cx="700" cy="400" r="6" fill={accentColor} />
        </motion.g>
        <motion.g 
          animate={{ rotateZ: -360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          style={{ transformOrigin: "400px 400px" }}
        >
          <circle cx="400" cy="400" r="200" fill="none" stroke={accentColor} strokeWidth="1" strokeDasharray="5 15" />
          <circle cx="400" cy="200" r="3" fill={accentColor} />
        </motion.g>
      </motion.svg>
    </div>
  );
}
