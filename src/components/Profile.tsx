import content from '@/data/content.json';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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
    <>
        {/* Decorative blurred circles */}
        <div className="relative py-10 z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-start items-center gap-0 md:gap-20">
          {/* Foto Slider */}
          <div className="order-2 md:order-1 w-full md:w-1/2 flex flex-col items-center">
            <div className="flex gap-5 items-center justify-center w-full">
              <button
                onClick={prevPhoto}
                className="flex bg-blue-400/30 hover:bg-gradient-to-r from-blue-400 to-purple-600 text-2xl rounded-full p-2 transition-all"
              >
                &lt;
              </button>

              <div className="w-[600px] h-[400px] flex flex-col items-center justify-center">
                <Image
                  src={photos[current]}
                  alt={`Photo ${current + 1}`}
                  width={600}
                  height={400}
                  className="shadow-2xl object-cover rounded-2xl md:w-[600px] md:h-[400px] w-[400px] h-[250px] transition-all duration-300"
                  priority
                />

                {/* Dots indicator */}
                <div className="flex gap-2 mt-3 md:mt-6">
                  {photos.map((_, idx) => (
                    <span
                      key={idx}
                      className={`md:w-3 md:h-3 w-2 h-2 rounded-full ${
                        idx === current ? "bg-white" : "bg-white/40"
                      } inline-block`}
                    ></span>
                  ))}
                </div>
              </div>

              <button
                onClick={nextPhoto}
                className="flex bg-blue-400/30 hover:bg-gradient-to-r from-blue-400 to-purple-600 text-2xl rounded-full p-2 transition-all"
              >
                &gt;
              </button>
            </div>
          </div>
          {/* Teks */}
          <div className="order-1 md:order-2 w-full md:w-1/2 text-center md:text-left md:items-start md:mt-0">
            <h2 className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-bold mb-4 pb-5 border-b border-white">{content.about.about}</h2>
            <p className="text-sm md:text-xl leading-relaxed">
              {content.about.detail}
            </p>
          </div>
        </div>
    </>
    // </section>
  );
};

export default Profile; 