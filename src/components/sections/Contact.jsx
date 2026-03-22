import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative bg-[#0a0a0a] min-h-[90vh] flex flex-col justify-end overflow-hidden border-t border-white/5">
      
      {/* Massive Background Text */}
      <div className="absolute top-1/4 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden opacity-5">
        <h2 className="text-[20vw] font-heavy tracking-tighter text-white whitespace-nowrap leading-none mt-10">
          CONTACT
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 justify-between items-end pb-20">
          
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h3 className="text-4xl md:text-5xl font-heavy text-white uppercase mb-8">
              Let's Build Something
            </h3>
            <form className="flex flex-col gap-8">
              <div className="relative group">
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#00e5b0] transition-colors peer placeholder-transparent cursor-none" 
                  placeholder="Name" 
                />
                <label htmlFor="name" className="absolute left-0 -top-6 text-xs font-mono text-white/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#00e5b0]">Name</label>
              </div>

              <div className="relative group mt-4">
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#00e5b0] transition-colors peer placeholder-transparent cursor-none" 
                  placeholder="Email" 
                />
                <label htmlFor="email" className="absolute left-0 -top-6 text-xs font-mono text-white/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#00e5b0]">Email</label>
              </div>

              <div className="relative group mt-4">
                <textarea 
                  id="message" 
                  rows="1" 
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#00e5b0] transition-colors peer placeholder-transparent cursor-none resize-none" 
                  placeholder="Message" 
                />
                <label htmlFor="message" className="absolute left-0 -top-6 text-xs font-mono text-white/40 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-[#00e5b0]">Message</label>
              </div>

              <button type="submit" className="group mt-4 self-start flex items-center gap-3 border-b-2 border-transparent hover:border-[#00e5b0] pb-1 transition-all cursor-none">
                <span className="text-white font-heavy uppercase tracking-widest group-hover:text-[#00e5b0] transition-colors">
                  Send Message
                </span>
                <Send className="w-4 h-4 text-white group-hover:text-[#00e5b0] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Direct Contact Side */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/3 flex flex-col gap-12 text-left md:text-right"
          >
            <div>
              <p className="text-[#00e5b0] font-mono text-xs uppercase tracking-widest mb-2 font-bold">Location</p>
              <p className="text-white text-lg font-light">Planet Earth</p>
            </div>
            <div>
              <p className="text-[#00e5b0] font-mono text-xs uppercase tracking-widest mb-2 font-bold">Email</p>
              <a href="mailto:nithishkumarreddynare1@gmail.com" className="text-white text-lg font-light hover:text-[#00e5b0] transition-colors cursor-none">nithishkumarreddynare1@gmail.com</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-white/5 py-8 mt-auto relative z-10 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Nithish Reddy.
          </p>
          <div className="flex gap-6">
            {[
              { Icon: Github, href: "https://github.com/nithish1105" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/nithishkumarreddy-nare-151539382" },
              { Icon: Twitter, href: "https://twitter.com" },
              { Icon: Instagram, href: "https://instagram.com" }
            ].map(({ Icon, href }, idx) => (
              <a 
                key={idx} 
                href={href} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#00e5b0] transition-colors cursor-none pointer-events-auto"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
