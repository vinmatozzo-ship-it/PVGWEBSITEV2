/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";

import { ArrowRight, ChevronDown, Instagram, Linkedin } from "lucide-react";

import { Routes, Route, Link } from "react-router-dom";
import { Solutions } from "./Solutions";
import { cn } from "@/src/lib/utils";
import { LogoCloud } from "@/src/components/ui/logo-cloud-3";
import ScrollToTop from "./components/ScrollToTop";
import { ContactModal } from "./components/ui/contact-modal";
import { CustomAppBuilder } from "./CustomAppBuilder";
import { AISalesEcosystem } from "./AISalesEcosystem";
import { AdvisoryServices } from "./AdvisoryServices";
import TeamParadigm from "./TeamParadigm";
import Events from "./Events";
import MediaAndArticles from "./MediaAndArticles";




const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk Logo",
  },
];

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black/10">
      <ScrollToTop />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95vw] z-50 flex items-center px-8 py-3 bg-[rgba(255,255,255,0.4)] backdrop-blur-[32px] backdrop-saturate-[180%] border border-[rgba(255,255,255,0.6)] shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(255,255,255,0.2)] rounded-[36px]">
        <div className="flex-shrink-0 pl-4">
          <Link to="/" className="block group">
            <img src="/logo.png" alt="Paradigm Venture Group" className="h-16 w-auto group-hover:opacity-80 transition-opacity" />
          </Link>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-10 text-[13px] font-extrabold text-black uppercase tracking-widest">
          <div className="relative group cursor-pointer">
            <div className="group/link relative flex items-center gap-1 transition-all duration-300 hover:opacity-70 pb-2 pt-2">
              INTEROPERABLE SOLUTIONS <ChevronDown className="w-4 h-4 text-black stroke-[3] transition-transform duration-300 group-hover:rotate-180" />
              <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover/link:w-full"></span>
            </div>
            
            <div className="absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-white border border-black/10 rounded-xl shadow-2xl overflow-hidden p-2 mt-1">
                <Link to="/solutions" className="block px-4 py-3 text-sm font-bold text-black hover:bg-black/5 rounded-lg transition-colors">
                  Solutions Overview
                </Link>
                <Link to="/custom-app-builder" className="block px-4 py-3 text-sm font-bold text-black hover:bg-black/5 rounded-lg transition-colors">
                  Custom build App
                </Link>
                <Link to="/ai-sales-ecosystem" className="block px-4 py-3 text-sm font-bold text-black hover:bg-black/5 rounded-lg transition-colors">
                  AI-Powered Sales Ecosystem
                </Link>

              </div>
            </div>
          </div>

          <div className="relative group">
            <a href="#" className="group relative flex items-center gap-1 transition-all duration-300 hover:opacity-70 uppercase font-bold text-sm tracking-tight">CONSULTING SERVICES <ChevronDown className="w-4 h-4 text-black stroke-[3]" /><span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span></a>
            <div className="absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-white border border-black/10 rounded-xl shadow-2xl overflow-hidden p-2 mt-1">
                <Link to="/advisory-services" className="block px-4 py-3 text-sm font-bold text-black hover:bg-black/5 rounded-lg transition-colors">
                  Advisory Services
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <div className="group/link relative flex items-center gap-1 transition-all duration-300 hover:opacity-70 pb-2 pt-2 uppercase font-bold text-sm tracking-tight">
              ABOUT PARADIGM <ChevronDown className="w-4 h-4 text-black stroke-[3] transition-transform duration-300 group-hover:rotate-180" />
              <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover/link:w-full"></span>
            </div>
            
            <div className="absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-white border border-black/10 rounded-xl shadow-2xl overflow-hidden p-2 mt-1">
                <Link to="/team-paradigm" className="block px-4 py-3 text-sm font-bold text-black hover:bg-black/5 rounded-lg transition-colors">
                  Team Paradigm
                </Link>
                <Link to="/events" className="block px-4 py-3 text-sm font-bold text-black hover:bg-black/5 rounded-lg transition-colors">
                  Events
                </Link>
              </div>
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <div className="group/link relative flex items-center gap-1 transition-all duration-300 hover:opacity-70 pb-2 pt-2 uppercase font-bold text-sm tracking-tight">
              NEWSWORTHY <ChevronDown className="w-4 h-4 text-black stroke-[3] transition-transform duration-300 group-hover:rotate-180" />
              <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover/link:w-full"></span>
            </div>
            
            <div className="absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-white border border-black/10 rounded-xl shadow-2xl overflow-hidden p-2 mt-1">
                <Link to="/media-and-articles" className="block px-4 py-3 text-sm font-bold text-black hover:bg-black/5 rounded-lg transition-colors">
                  Media and Articles
                </Link>
              </div>
            </div>
          </div>
          <button onClick={() => setIsContactModalOpen(true)} className="group relative transition-all duration-300 hover:opacity-70 uppercase">CONTACT US<span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span></button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
      <main className="relative pt-32 pb-20 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-bold text-black w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
              </span>
              NEW: GPT-5 READINESS AUDIT
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-balance">
              Interoperability<br /> 
              <span className="text-black">
                as a service.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-lg leading-relaxed font-medium">
              Seamlessly connect your data, systems, and teams. We build intelligent integrations that eliminate silos and accelerate your business growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button onClick={() => setIsContactModalOpen(true)} className="group bg-black text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all hover:pr-6 active:scale-95 shadow-xl shadow-black/20">
                Contact Us 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-8 flex items-center gap-8 text-gray-400 uppercase tracking-widest text-[10px] font-bold">
              <div className="flex flex-col gap-1">
                <span>PROJECTS</span>
                <span className="text-black">124+</span>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="flex flex-col gap-1">
                <span>CLIENTS</span>
                <span className="text-black">GLOBAL</span>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="flex flex-col gap-1">
                <span>TRUST</span>
                <span className="text-black">100%</span>
              </div>
            </div>
          </motion.div>

          {/* Right Space with Hero Video */}
          <div className="hidden lg:flex relative h-full w-full items-center justify-center overflow-hidden translate-x-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
               className="w-full h-[750px] relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5 bg-white"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover grayscale contrast-125 brightness-95"
                poster="https://picsum.photos/seed/paradigm-hero/1200/1200?grayscale"
              >
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_3CXHkMcqA2kv5dtSisZdpZ22uU4/hf_20260419_113433_1258f109-ceed-4aa7-a9aa-1a067fa77783.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Overview Video Section */}
      <section className="relative mx-auto max-w-7xl pt-32 pb-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center w-full h-full"
          >
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-auto object-contain"
            >
              <source src="/overview-video-new.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Right: Text */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
              Bridging silos. Streamlining systems.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Paradigm Venture Group transforms healthcare by bridging silos and streamlining systems, platforms, people, and data. Our solutions, creative data first approach and cost effective no code / low code application builder drive growth and enhance digital experiences, ensuring seamless integration for clinical documentation and billing.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              With Paradigm's advanced interoperability as a service ecosystem, healthcare providers benefit from unparalleled accuracy, interoperability, and a robust Single Source of Truth drawn from extensive databases. We commit to semantic interoperability, ensuring data is not only exchanged but fully utilized through our workflow automation, marking a new era of efficiency, reporting, and revenue opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offerings and Integration Section */}
      <section className="relative mx-auto max-w-7xl py-24 px-6">
        <h2 className="mb-16 text-center text-4xl md:text-5xl font-bold text-black tracking-tight">
          Offerings and Integration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Offering Card 1: Enterprise Integration */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative w-full min-h-[420px] h-full bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative h-full p-8 md:p-12 flex flex-col">
              <div className="mb-8 p-4 w-fit rounded-2xl bg-black text-white group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5c0-1.1.9-2 2-2h2"/><path d="M17 3h2c1.1 0 2 .9 2 2v2"/><path d="M21 17v2c0 1.1-.9 2-2 2h-2"/><path d="M7 21H5c-1.1 0-2-.9-2-2v-2"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M12 7v2"/><path d="M12 15v2"/><path d="M15 12h2"/><path d="M7 12h2"/></svg>
              </div>
              
              <div className="flex-1">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3 block">
                  Seamless Orchestration
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-black mb-4 tracking-tight leading-tight">
                  Enterprise System<br />Interoperability
                </h3>
                <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                  Bridge the gap between legacy platforms and modern cloud architectures with our semantic data layer, creating a unified Single Source of Truth.
                </p>
              </div>


            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-black/[0.02] rounded-full group-hover:scale-150 transition-transform duration-1000" />
          </motion.div>

          {/* Offering Card 2: AI Workflow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative w-full min-h-[420px] h-full bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full p-8 md:p-12 flex flex-col">
              <div className="mb-8 p-4 w-fit rounded-2xl bg-black text-white group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
              </div>

              <div className="flex-1">
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-3 block">
                  Intelligent Automation
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-black mb-4 tracking-tight leading-tight">
                  AI-Powered Clinical<br />Workflow Design
                </h3>
                <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                  Leverage low-code application building and generative AI to automate complex documentation and billing cycles with unprecedented precision.
                </p>
              </div>


            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-black/[0.02] rounded-full group-hover:scale-150 transition-transform duration-1000" />
          </motion.div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section className="relative mx-auto max-w-5xl py-20 px-6">
        <h2 className="mb-10 text-center font-medium text-black text-xl tracking-tight md:text-3xl">
          <span className="text-gray-500">Trusted by experts.</span>
          <br />
          <span className="font-semibold">Used by the leaders.</span>
        </h2>
        <div className="mx-auto my-5 h-px max-w-sm bg-black/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

        <LogoCloud logos={logos} />

        <div className="mt-5 h-px bg-black/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </section>

          </>
        } />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/custom-app-builder" element={<CustomAppBuilder />} />
        <Route path="/ai-sales-ecosystem" element={<AISalesEcosystem setIsContactModalOpen={setIsContactModalOpen} />} />
        <Route path="/advisory-services" element={<AdvisoryServices setIsContactModalOpen={setIsContactModalOpen} />} />
        <Route path="/team-paradigm" element={<TeamParadigm setIsContactModalOpen={setIsContactModalOpen} />} />
        <Route path="/events" element={<Events />} />
        <Route path="/media-and-articles" element={<MediaAndArticles />} />




      </Routes>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-black/5 text-center sm:text-left text-gray-400 text-xs font-bold uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 PARADIGM VENTURE GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/paradigmventuregroupllc/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black transition-colors">
              <Instagram className="w-4 h-4" />
              INSTAGRAM
            </a>
            <a href="https://www.linkedin.com/company/pvgus/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black transition-colors">
              <Linkedin className="w-4 h-4" />
              LINKEDIN
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

