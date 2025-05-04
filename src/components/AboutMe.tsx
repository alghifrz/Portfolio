import content from '@/data/content.json';
import Image from 'next/image';
import { useState } from 'react';

const photos = ['/me1.jpg', '/me2.jpg', '/me3.jpg'];

const AboutMe = () => {
  const [current, setCurrent] = useState(0);

  const prevPhoto = () => setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const nextPhoto = () => setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative md:py-20 py-20 px-6 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-black text-white overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-200 opacity-10 rounded-full blur-2xl"></div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center items-center gap-5 md:gap-20">
        {/* Foto Slider */}
        <div className="w-full md:w-1/2 flex flex-col items-center mb-8 md:mb-0">
          <div className="flex gap-5 items-center justify-center w-full">
            <button onClick={prevPhoto} className="flex md:flex bg-white/30 hover:bg-white/60 text-2xl rounded-full p-2 transition-all">
              &lt;
            </button>
            <div className="w-[600px] h-[400px] flex items-center justify-center">
              <Image
                src={photos[current]}
                alt={`About Me Photo ${current + 1}`}
                width={1000}
                height={1000}
                className="shadow-2xl object-cover rounded-2xl md:w-[600px] md:h-[400px] transition-all duration-300"
                priority
              />
            </div>
            <button onClick={nextPhoto} className="flex md:flex bg-white/30 hover:bg-white/60 text-2xl rounded-full p-2 transition-all">
              &gt;
            </button>
          </div>
          {/* Dots indicator */}
          <div className="flex gap-2 mt-1 md:mt-6">
            {photos.map((_, idx) => (
              <span key={idx} className={`w-3 h-3 rounded-full ${idx === current ? 'bg-white' : 'bg-white/40'} inline-block`}></span>
            ))}
          </div>
        </div>
        {/* Teks */}
        <div className="w-full md:w-1/2 text-center md:text-left md:items-start md:mt-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 pb-5 border-b border-white">{content.about.about}</h2>
          <p className="text-md md:text-xl leading-relaxed">
            {content.about.detail}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe; 