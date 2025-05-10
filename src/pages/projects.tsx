import Head from "next/head";
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import content from '@/data/content.json';

const Projects = () => {
  const { meta, projects } = content;
  const allProjects = projects.featured;

  return (
    <>
      <Head>
        <title>Projects | {meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="relative md:py-20 py-2 px-6 bg-black backdrop-blur-3xl text-white overflow-hidden">
        <div className="z-0 absolute top-10 left-10 w-60 h-60 bg-blue-400 opacity-40 rounded-full blur-3xl animate-float-wild"></div>
        <div className="z-0 absolute bottom-12 right-24 w-72 h-72 bg-blue-400 opacity-40 rounded-full blur-3xl animate-float-wild2"></div>
        <div className="z-0 absolute top-20 left-32 w-52 h-52 bg-blue-300 opacity-35 rounded-full blur-3xl animate-float-wild3"></div>
        <div className="z-0 absolute bottom-20 right-10 w-64 h-64 bg-blue-500 opacity-40 rounded-full blur-3xl animate-float-wild4"></div>
        <div className="z-0 absolute top-1/4 right-1/3 w-72 h-72 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild5"></div>
        <div className="z-0 absolute bottom-1/4 left-1/5 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-float-wild6"></div>
        <div className="z-0 absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400 opacity-25 rounded-full blur-3xl animate-float-wild7"></div>
        <div className="z-0 absolute top-2/3 left-1/4 w-52 h-52 bg-blue-300 opacity-30 rounded-full blur-3xl animate-float-wild8"></div>
        <div className="z-0 absolute top-[35%] right-[15%] w-60 h-60 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
        <div className="z-0 absolute bottom-[18%] left-[38%] w-96 h-96 bg-pink-400 opacity-25 rounded-full blur-3xl animate-float-wild10"></div>
        <div className="z-0 absolute top-[5%] right-[10%] w-40 h-40 bg-yellow-300 opacity-30 rounded-full blur-3xl animate-float-wild2"></div>
        <div className="z-0 absolute bottom-[10%] left-[8%] w-48 h-48 bg-green-300 opacity-20 rounded-full blur-3xl animate-float-wild5"></div>
        <div className="z-0 absolute top-[45%] left-[50%] w-56 h-56 bg-red-300 opacity-25 rounded-full blur-3xl animate-float-wild1"></div>
        <div className="z-0 absolute bottom-[40%] right-[40%] w-44 h-44 bg-rose-400 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
        <div className="z-0 absolute bottom-20 right-10 w-64 h-64 bg-blue-500 opacity-40 rounded-full blur-3xl animate-float-wild4"></div>
        <div className="z-0 absolute top-1/4 right-1/3 w-72 h-72 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild5"></div>
        <div className="z-0 absolute bottom-1/4 left-1/5 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-float-wild6"></div>
        <div className="z-0 absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400 opacity-25 rounded-full blur-3xl animate-float-wild7"></div>
        <div className="z-0 absolute top-2/3 left-1/4 w-52 h-52 bg-blue-300 opacity-30 rounded-full blur-3xl animate-float-wild8"></div>
        <div className="z-0 absolute top-[35%] right-[15%] w-60 h-60 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
        <div className="z-0 absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400 opacity-25 rounded-full blur-3xl animate-float-wild7"></div>
        <div className="z-0 absolute top-2/3 left-1/4 w-52 h-52 bg-blue-300 opacity-30 rounded-full blur-3xl animate-float-wild8"></div>
        <div className="z-0 absolute top-[35%] right-[15%] w-60 h-60 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
        <div className="z-0 absolute bottom-[18%] left-[38%] w-96 h-96 bg-pink-400 opacity-25 rounded-full blur-3xl animate-float-wild10"></div>
        <div className="z-0 absolute top-[5%] right-[10%] w-40 h-40 bg-yellow-300 opacity-30 rounded-full blur-3xl animate-float-wild2"></div>
        <div className="z-0 absolute bottom-[10%] left-[8%] w-48 h-48 bg-green-300 opacity-20 rounded-full blur-3xl animate-float-wild5"></div>
        <div className="z-0 absolute top-[45%] left-[50%] w-56 h-56 bg-red-300 opacity-25 rounded-full blur-3xl animate-float-wild1"></div>
        <div className="z-0 absolute bottom-[40%] right-[40%] w-44 h-44 bg-rose-400 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:py-2 md:mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              All Projects
            </h1>
            <p className="text-white mb-4 md:mb-6 text-center text-xs md:text-2xl">
              A comprehensive showcase of my work and technical expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300
                          [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                          hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60]"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-blue-500/30 hover:border-blue-500/50"
                      >
                        <FaGithub className="text-blue-400 text-xl" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors border border-blue-500/30 hover:border-blue-500/50"
                        >
                          <FaExternalLinkAlt className="text-blue-400 text-xl" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between min-h-[24rem] p-6">
                  <div className="">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-sm font-medium rounded-full mb-3">
                      {project.cat}
                    </span>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-br from-gray-800/50 to-gray-900/50 text-gray-300 rounded-full text-sm
                                  [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end">
                      <Link
                        href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-full 
                                hover:from-blue-500 hover:to-purple-700 transition-all duration-300 text-sm
                                [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_1px_#60a5fa40]
                                hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_2px_#60a5fa60]"
                      >
                        See More
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects; 