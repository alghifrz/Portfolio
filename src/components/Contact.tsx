import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import content from '@/data/content.json';

export default function Contact() {
  const { hero } = content;
  const { email, socialMedia, whatsapp } = hero;

  return (
    <section id="contact" className="px-2 md:px-8 mt-24 md:mt-48 min-h-screen flex items-center relative overflow-hidden bg-transparant">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Let's Connect
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Email Card */}
          <motion.a
            href={`mailto:${email.address}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="group bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-blue-200/20
                      [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center mb-6
                            group-hover:scale-110 transition-transform duration-300">
                <FaEnvelope className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                Email
              </h3>
              <p className="text-gray-700">
                {email.address}
              </p>
            </div>
          </motion.a>

          {/* WhatsApp Card */}
          <motion.a
            href={`https://wa.me/${whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="group bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-blue-200/20
                      [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center mb-6
                            group-hover:scale-110 transition-transform duration-300">
                <FaWhatsapp className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                WhatsApp
              </h3>
              <p className="text-gray-700">
                +{whatsapp.number}
              </p>
            </div>
          </motion.a>

          {/* Social Media Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="group bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-blue-200/20
                      [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                      hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                      hover:shadow-[0_0_30px_rgba(96,165,250,0.3)] transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center mb-6
                            group-hover:scale-110 transition-transform duration-300">
                <FaLinkedin className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                Social Media
              </h3>
              <div className="flex gap-4">
                {socialMedia.map((social) => (
                  <a
                    key={social.platform}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-blue-200/20"
                  >
                    {social.platform === 'Github' && <FaGithub className="text-xl text-blue-400" />}
                    {social.platform === 'LinkedIn' && <FaLinkedin className="text-xl text-blue-400" />}
                    {social.platform === 'Instagram' && <FaInstagram className="text-xl text-blue-400" />}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-200/20
                            [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                            focus:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                            text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-200/20
                            [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                            focus:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                            text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl border border-blue-200/20
                          [box-shadow:0_0_0_1px_#60a5fa40_inset,0_0_20px_1px_#60a5fa20] 
                          focus:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_30px_2px_#60a5fa40]
                          text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-300"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-full 
                        hover:from-blue-500 hover:to-purple-700 transition-all duration-300 text-lg font-medium
                        [box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_1px_#60a5fa40]
                        hover:[box-shadow:0_0_0_1px_#60a5fa_inset,0_0_20px_2px_#60a5fa60]"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
} 