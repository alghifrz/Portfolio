import { useRouter } from 'next/router';
import Head from "next/head";
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaImage, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import content from '@/data/content.json';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
  cat: string;
  previewImages?: string[];
  preview?: {
    overview: string;
    features: string[];
    challenges: string[];
    solutions: string[];
  };
}

const ProjectDetail = () => {
  const router = useRouter();
  const { project } = router.query;
  const { meta, projects } = content;
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find the project based on the slug
  const projectSlug = Array.isArray(project) ? project.join('/') : project;
  const currentProject = projects.featured.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, '-') === projectSlug
  );

  useEffect(() => {
    if (currentProject?.preview) {
      // Load all images from the preview directory
      const loadPreviewImages = async () => {
        try {
          const response = await fetch(`/api/preview-images?project=${currentProject.preview}`);
          const data = await response.json();
          setPreviewImages(data.images);
        } catch (error) {
          console.error('Error loading preview images:', error);
        }
      };
      loadPreviewImages();
    }
  }, [currentProject?.preview]);

  useEffect(() => {
    const fetchPreviewFiles = async () => {
      if (currentProject?.preview) {
        try {
          const response = await fetch(`/api/preview-images?project=${currentProject.preview}`);
          if (response.ok) {
            const data = await response.json();
            setPreviewFiles(data.files);
          }
        } catch (error) {
          console.error('Error fetching preview files:', error);
        }
      }
    };

    fetchPreviewFiles();
  }, [currentProject]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % previewFiles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + previewFiles.length) % previewFiles.length);
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            Project Not Found
          </h1>
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-full 
                     hover:from-blue-500 hover:to-purple-700 transition-all duration-300
                     [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_1px_#60a5fa40]
                     hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_2px_#60a5fa60]"
          >
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{currentProject.title} | {meta.title}</title>
        <meta name="description" content={currentProject.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative md:py-10 py-2 px-6 bg-black backdrop-blur-3xl text-white overflow-hidden">
        {/* Background Elements */}
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
        <div className="z-0 absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400 opacity-25 rounded-full blur-3xl animate-float-wild7"></div>
        <div className="z-0 absolute top-2/3 left-1/4 w-52 h-52 bg-blue-300 opacity-30 rounded-full blur-3xl animate-float-wild8"></div>
        <div className="z-0 absolute top-[35%] right-[15%] w-60 h-60 bg-indigo-500 opacity-30 rounded-full blur-3xl animate-float-wild9"></div>
        <div className="z-0 absolute bottom-[18%] left-[38%] w-96 h-96 bg-pink-400 opacity-25 rounded-full blur-3xl animate-float-wild10"></div>
        <div className="z-0 absolute top-[5%] right-[10%] w-40 h-40 bg-yellow-300 opacity-30 rounded-full blur-3xl animate-float-wild2"></div>
        <div className="z-0 absolute bottom-[10%] left-[8%] w-48 h-48 bg-green-300 opacity-20 rounded-full blur-3xl animate-float-wild5"></div>
        <div className="z-0 absolute top-[45%] left-[50%] w-56 h-56 bg-red-300 opacity-25 rounded-full blur-3xl animate-float-wild1"></div>

        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            {/* Back Button */}
            <Link
              href="/projects"
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full 
                       hover:bg-white/20 transition-all duration-300 text-sm text-gray-300
                       border border-blue-500/30 hover:border-blue-500/50 mb-8"
            >
              <FaArrowLeft className="mr-2" />
              Back to Projects
            </Link>

            {/* Project Header */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden mb-8
                          [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                          hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_4px_#60a5fa60]
                          transition-all duration-300">
              <div className="relative h-64 md:h-96 w-full">
                <img
                  src={`/${currentProject.image}`}
                  alt={currentProject.title}
                  className="object-cover md:w-full md:h-full"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 md:p-6 p-3 flex flex-col justify-between md:min-h-[200px] bg-black/60 backdrop-blur-md">
                <div>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-400 to-purple-600 text-white md:text-sm text-[9px] font-medium rounded-full mb-3">
                    {currentProject.cat}
                  </span>
                  <h1 className="text-xs md:text-4xl font-bold text-white mb-2">
                    {currentProject.title}
                  </h1>
                  <p className="text-gray-200 text-[10px] md:text-lg">
                    {currentProject.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Main Content */}
              <div className="space-y-8 w-full">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 h-full
                              [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]">
                  <h2 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-br from-gray-800/50 to-gray-900/50 text-gray-300 rounded-full text-[10px] md:text-sm
                                 [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              <div className="space-y-8 md:w-1/3 w-full">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 h-full
                              [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]">
                  <h2 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                    Links
                  </h2>
                  <div className="space-y-4">
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors
                               border border-blue-500/30 hover:border-blue-500/50 text-gray-300 text-xs md:text-sm"
                    >
                      <FaGithub className="text-blue-400 mr-2 " />
                      View on GitHub
                    </a>
                    {currentProject.demo && (
                      <a
                        href={currentProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors
                                 border border-blue-500/30 hover:border-blue-500/50 text-gray-300"
                      >
                        <FaExternalLinkAlt className="text-blue-400 mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
            {/* Sidebar */}
            {/* Project Preview Section */}
            {previewFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=""
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6
                              [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      Project Preview
                    </h2>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        {currentIndex + 1} / {previewFiles.length}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevSlide}
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors
                                  [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]"
                        >
                          <FaArrowLeft className="text-white" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors
                                  [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]"
                        >
                          <FaArrowRight className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Main Preview */}
                  <div className="relative aspect-video rounded-xl overflow-hidden
                                [box-shadow:0_0_0_1px_#60a5fa40_inset] bg-white/5 backdrop-blur-sm">
                    <motion.img
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={`/previews/${currentProject.preview}/${encodeURIComponent(previewFiles[currentIndex])}`}
                      alt={`Preview ${currentIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Preview Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">
                          Screenshot {currentIndex + 1}
                        </span>
                        <span className="text-xs text-gray-300">
                          {previewFiles[currentIndex].split(' ').slice(1, 3).join(' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {previewFiles[currentIndex].replace(/Screenshot \d{8} \d{6}\.png$/, '')}
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="mt-6 flex gap-4 overflow-x-auto pb-4 
                                [&::-webkit-scrollbar]:h-1.5 
                                [&::-webkit-scrollbar-track]:bg-gray-800/50 
                                [&::-webkit-scrollbar-thumb]:bg-gradient-to-r 
                                [&::-webkit-scrollbar-thumb]:from-blue-400 
                                [&::-webkit-scrollbar-thumb]:to-purple-600 
                                [&::-webkit-scrollbar-thumb]:rounded-full">
                    {previewFiles.map((file, index) => (
                      <motion.button
                        key={file}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden
                                  transition-all duration-300 ${
                                    index === currentIndex
                                      ? '[box-shadow:0_0_0_2px_#60a5fa_inset] scale-105'
                                      : '[box-shadow:0_0_0_1px_#60a5fa40_inset] hover:scale-105'
                                  }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={`/previews/${currentProject.preview}/${encodeURIComponent(file)}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 transition-opacity duration-300 ${
                          index === currentIndex ? 'bg-blue-500/20' : 'bg-black/40'
                        }`} />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </motion.div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
            >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden
                            [box-shadow:0_0_0_1px_#60a5fa40_inset]">
                <img
                  src={`/previews/${currentProject.preview}/${encodeURIComponent(selectedImage)}`}
                  alt="Selected Preview"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Modal Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors
                             [box-shadow:0_0_0_1px_#60a5fa40_inset] hover:[box-shadow:0_0_0_1px_#60a5fa_inset]"
                    onClick={() => setSelectedImage(null)}
                  >
                    <FaArrowLeft className="text-white text-xl" />
                  </button>
                </div>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {selectedImage.replace(/Screenshot \d{8} \d{6}\.png$/, '')}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {selectedImage.split(' ').slice(1, 3).join(' ')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ProjectDetail; 