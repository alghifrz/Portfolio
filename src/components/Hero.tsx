import Image from 'next/image'
import content from '@/data/content.json'

const Hero = () => {
    const { hero } = content;
    
    return (
        <>
            {/* <section className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white min-h-screen flex items-center"> */}
            <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-transparant">
                <div className="max-w-[1217px] mx-auto px-4 md:px-8 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 relative z-10">
                    
                    {/* Text Content */}
                    <div className="md:w-1/2">
                        <h1 className="text-xl md:text-2xl font-medium text-black">
                            {hero.title.welcome}
                            <p className="text-3xl md:text-4xl font-bold text-blue-400 mb-1 md:mb-2 mt-1 md:mt-2">{hero.title.name}</p>
                            <p className="text-2xl md:text-3xl text-black font-bold mt-1">{hero.title.highlight}</p>
                        </h1>
                                                
                        {/* Email */}
                        <div className="mt-6 flex items-center gap-2 text-black">
                            <i className={`${hero.email.icon} text-lg`}></i>
                            <a 
                                href={`mailto:${hero.email.address}`}
                                className="hover:text-blue-400 transition text-xs md:text-sm"
                            >
                                {hero.email.address}
                            </a>
                        </div>

                        <p className="mt-4 text-sm md:text-base text-black">
                            {hero.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-4">
                            <a href={hero.buttons.cv.link} target='_blank' rel="noopener noreferrer">
                                <button className="cursor-pointer px-5 py-2.5 border-2 font-semibold border-blue-400 bg-blue-400 rounded-full text-white hover:bg-blue-500 transition shadow-lg hover:shadow-xl text-xs md:text-sm">
                                    {hero.buttons.cv.text}
                                </button>
                            </a>
                            <a href={hero.buttons.portfolio.link} target='_blank' rel="noopener noreferrer">
                                <button className="cursor-pointer px-5 py-2.5 bg-transparant border-2 border-blue-400 text-blue-400 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg hover:shadow-xl text-xs md:text-sm">
                                    {hero.buttons.portfolio.text}
                                </button>
                            </a>
                        </div>

                        {/* Social Media */}
                        <div className="mt-8 flex gap-4">
                            {hero.socialMedia.map((social) => (
                                <a 
                                    key={social.platform}
                                    href={social.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="cursort-pointer w-8 h-8 flex items-center justify-center text-black text-lg hover:text-blue-400 transition rounded-full border border-black hover:border-blue-400 shadow-md hover:shadow-lg bg-tranparant"
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>

                    </div>

                    {/* Image */}
                    <div className="md:w-1/2 relative flex justify-center">
                        <Image
                            src="/foto.png"
                            alt="Hero Image"
                            width={400}
                            height={400}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded-[150px] shadow-md md:hover:shadow-2xl transition-shadow duration-300 w-[280px] h-[350px] md:w-[400px] md:h-[500px] object-cover"
                            priority
                        />
                    </div>

                </div>
            </section>
        </>
    )
}

export default Hero