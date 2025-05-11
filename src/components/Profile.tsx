import content from '@/data/content.json';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const photos = Array.from({ length: 11 }, (_, i) => `/me${i + 1}.jpg`);
  const [current, setCurrent] = useState(0);

  const nextPhoto = () => {
    setCurrent((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Auto scroll setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextPhoto();
    }, 5000);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <section id="profile" className="relative py-5 z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-start items-center gap-0 md:gap-20 md:py-32">
      {/* Decorative blurred circles */}
      <div className="relative py-5 z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-start items-center gap-0 md:gap-20">
        {/* Foto Slider */}
        <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col items-center">
          <div className="flex gap-3 md:gap-5 items-center justify-center w-full">
            <button
              onClick={prevPhoto}
              className="flex bg-blue-400/30 hover:bg-gradient-to-r from-blue-400 to-purple-600 text-xl md:text-2xl rounded-full p-1.5 md:p-2 transition-all"
            >
              &lt;
            </button>

            <div className="relative w-[280px] h-[180px] md:w-[600px] md:h-[400px] flex flex-col items-center justify-center mt-4 md:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full h-full"
                >
                  <Image
                    src={photos[current]}
                    alt={`Photo ${current + 1}`}
                    fill
                    className="shadow-2xl object-cover rounded-xl md:rounded-2xl transition-all duration-300"
                    sizes="(max-width: 768px) 280px, (max-width: 1200px) 600px, 33vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={nextPhoto}
              className="flex bg-blue-400/30 hover:bg-gradient-to-r from-blue-400 to-purple-600 text-xl md:text-2xl rounded-full p-1.5 md:p-2 transition-all"
            >
              &gt;
            </button>
          </div>
        </div>
        {/* Teks */}
        <div className="order-1 md:order-2 w-full md:w-1/2 text-center md:text-left md:items-start mt-4 md:mt-0 px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-bold mb-3 md:mb-4 pb-3 md:pb-5 border-b border-white">{content.about.about}</h2>
          <p className="text-sm md:text-xl leading-relaxed">
            {content.about.detail}
          </p>
        </div>
      </div>

      {/* Decorative wave transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[50px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-black"
          ></path>
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute bottom-0 left-0 w-full h-[50px] md:h-[100px] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 md:w-2 h-1.5 md:h-2 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile; 