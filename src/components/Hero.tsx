import Link from 'next/link'
import Image from 'next/image'
import content from '@/data/content.json'

const Hero = () => {
    const { hero } = content;
    
    return (
        <>
            {/* <section className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white min-h-screen flex items-center"> */}
            <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-transparant">
                <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-30 relative z-10">
                    
                    {/* Text Content */}
                    <div className="md:w-1/2">
                        <h1 className="text-2xl md:text-3xl font-medium text-black">
                            {hero.title.welcome}
                            <p className="text-4xl md:text-5xl font-bold text-blue-400 md:mb-2 md:mt-2">{hero.title.name}</p>
                            <p className="text-3xl md:text-4xl text-black font-bold">{hero.title.highlight}</p>
                        </h1>
                                                
                        {/* Email */}
                        <div className="mt-4 flex items-center gap-2 text-black">
                            <i className={`${hero.email.icon} text-xl`}></i>
                            <a 
                                href={`mailto:${hero.email.address}`}
                                className="hover:text-blue-400 transition"
                            >
                                {hero.email.address}
                            </a>
                        </div>

                        <p className="mt-3 text-lg text-black">
                            {hero.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-4">
                            <a href={hero.buttons.cv.link} target='_blank' rel="noopener noreferrer">
                                <button className="cursor-pointer px-6 py-3 border-2 font-semibold border-blue-400 bg-blue-400 rounded-full text-white hover:bg-blue-500 transition shadow-lg hover:shadow-xl">
                                    {hero.buttons.cv.text}
                                </button>
                            </a>
                            <a href={hero.buttons.portfolio.link} target='_blank' rel="noopener noreferrer">
                                <button className="cursor-pointer px-6 py-3 bg-transparant border-2 border-blue-400 text-blue-400 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg hover:shadow-xl">
                                    {hero.buttons.portfolio.text}
                                </button>
                            </a>
                        </div>

                        {/* Social Media */}
                        <div className="mt-6 flex gap-4">
                            {hero.socialMedia.map((social) => (
                                <a 
                                    key={social.platform}
                                    href={social.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="cursort-pointer w-10 h-10 flex items-center justify-center text-black text-2xl hover:text-blue-400 transition rounded-full border border-black hover:border-blue-400 shadow-md hover:shadow-lg bg-tranparant"
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>

                    </div>

                    {/* Image */}
                    <div className="md:w-1/2 relative">
                        <Image
                            src="/foto.png"
                            alt="Hero Image"
                            width={300}
                            height={300}
                            className="rounded-full shadow-xl md:hover:shadow-2xl transition-shadow duration-300 md:w-120 md:h-100%"
                            priority
                        />
                    </div>

                </div>
            </section>
        </>
    )
}

export default Hero