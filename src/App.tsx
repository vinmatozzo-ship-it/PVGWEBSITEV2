/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";

import { Menu, X, ArrowRight, ChevronDown, Instagram, Linkedin } from "lucide-react";

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
import { FridayOS } from "./components/ui/friday-os";
import { AIEnterpriseEcosystem } from "./AIEnterpriseEcosystem";




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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    solutions: false,
    consulting: false,
    about: false,
    newsworthy: false,
  });

  const toggleMobileDropdown = (key: keyof typeof mobileDropdowns) => {
    setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
                  Build a Custom App
                </Link>
                <Link to="/ai-sales-ecosystem" className="block px-4 py-3 text-sm font-bold text-black hover:bg-black/5 rounded-lg transition-colors">
                  AI-Powered Sales Ecosystem
                </Link>
                <Link to="/ai-enterprise-ecosystem" className="block px-4 py-3 text-sm font-bold text-black hover:bg-black/5 rounded-lg transition-colors">
                  AI Enterprise Ecosystem
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

        <div className="ml-auto xl:hidden pr-4 flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-black transition-opacity hover:opacity-70 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-[60] xl:hidden flex flex-col overflow-y-auto transition-transform duration-500 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <Link to="/" className="block" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Paradigm Venture Group" className="h-14 w-auto" />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col px-8 py-8 gap-6 text-black">
          {/* Solutions */}
          <div className="flex flex-col border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleMobileDropdown('solutions')}
              className="flex items-center justify-between font-extrabold text-lg tracking-wide uppercase focus:outline-none"
            >
              Interoperable Solutions
              <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", mobileDropdowns.solutions ? "rotate-180" : "")} />
            </button>
            <div className={cn("flex flex-col overflow-hidden transition-all duration-300", mobileDropdowns.solutions ? "mt-4 max-h-[400px]" : "max-h-0")}>
              <Link to="/solutions" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-base font-bold text-gray-500 hover:text-blue-600">Solutions Overview</Link>
              <Link to="/custom-app-builder" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-base font-bold text-gray-500 hover:text-blue-600">Build a Custom App</Link>
              <Link to="/ai-sales-ecosystem" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-base font-bold text-gray-500 hover:text-blue-600">AI-Powered Sales Ecosystem</Link>
              <Link to="/ai-enterprise-ecosystem" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-base font-bold text-gray-500 hover:text-blue-600">AI Enterprise Ecosystem</Link>
            </div>
          </div>

          {/* Consulting Services */}
          <div className="flex flex-col border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleMobileDropdown('consulting')}
              className="flex items-center justify-between font-extrabold text-lg tracking-wide uppercase focus:outline-none"
            >
              Consulting Services
              <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", mobileDropdowns.consulting ? "rotate-180" : "")} />
            </button>
            <div className={cn("flex flex-col overflow-hidden transition-all duration-300", mobileDropdowns.consulting ? "mt-4 max-h-[400px]" : "max-h-0")}>
              <Link to="/advisory-services" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-base font-bold text-gray-500 hover:text-blue-600">Advisory Services</Link>
            </div>
          </div>

          {/* About Paradigm */}
          <div className="flex flex-col border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleMobileDropdown('about')}
              className="flex items-center justify-between font-extrabold text-lg tracking-wide uppercase focus:outline-none"
            >
              About Paradigm
              <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", mobileDropdowns.about ? "rotate-180" : "")} />
            </button>
            <div className={cn("flex flex-col overflow-hidden transition-all duration-300", mobileDropdowns.about ? "mt-4 max-h-[400px]" : "max-h-0")}>
              <Link to="/team-paradigm" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-base font-bold text-gray-500 hover:text-blue-600">Team Paradigm</Link>
              <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-base font-bold text-gray-500 hover:text-blue-600">Events</Link>
            </div>
          </div>

          {/* Newsworthy */}
          <div className="flex flex-col border-b border-gray-100 pb-4">
            <button
              onClick={() => toggleMobileDropdown('newsworthy')}
              className="flex items-center justify-between font-extrabold text-lg tracking-wide uppercase focus:outline-none"
            >
              Newsworthy
              <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", mobileDropdowns.newsworthy ? "rotate-180" : "")} />
            </button>
            <div className={cn("flex flex-col overflow-hidden transition-all duration-300", mobileDropdowns.newsworthy ? "mt-4 max-h-[400px]" : "max-h-0")}>
              <Link to="/media-and-articles" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-base font-bold text-gray-500 hover:text-blue-600">Media and Articles</Link>
            </div>
          </div>

          {/* Contact Us */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsContactModalOpen(true);
            }}
            className="flex items-center justify-start font-extrabold text-lg tracking-wide uppercase text-blue-600 hover:text-blue-700 focus:outline-none transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>

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
                    <span className="text-paradigm-blue">
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

                {/* Right Space with Hero Visual */}
                <div className="hidden lg:flex relative h-full w-full items-center justify-center overflow-hidden translate-x-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    className="w-full h-[750px] relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5 bg-white p-4"
                  >
                    <FridayOS />
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
                  <h2 className="text-3xl md:text-4xl font-bold text-paradigm-blue tracking-tight">
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
              <h2 className="mb-16 text-center text-4xl md:text-5xl font-bold text-paradigm-blue tracking-tight">
                Offerings and Integration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5c0-1.1.9-2 2-2h2" /><path d="M17 3h2c1.1 0 2 .9 2 2v2" /><path d="M21 17v2c0 1.1-.9 2-2 2h-2" /><path d="M7 21H5c-1.1 0-2-.9-2-2v-2" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 7v2" /><path d="M12 15v2" /><path d="M15 12h2" /><path d="M7 12h2" /></svg>
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3 block">
                        Seamless Orchestration
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-paradigm-blue mb-4 tracking-tight leading-tight">
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
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative w-full min-h-[420px] h-full bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative h-full p-8 md:p-12 flex flex-col">
                    <div className="mb-8 p-4 w-fit rounded-2xl bg-black text-white group-hover:scale-110 transition-transform duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" /></svg>
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em] mb-3 block">
                        Intelligent Automation
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-paradigm-blue mb-4 tracking-tight leading-tight">
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

                {/* Offering Card 3: AI Enterprise Ecosystem */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative w-full min-h-[420px] h-full bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative h-full p-8 md:p-12 flex flex-col">
                    <div className="mb-8 p-4 w-fit rounded-2xl bg-black text-white group-hover:scale-110 transition-transform duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-3 block">
                        AI Orchestration
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-paradigm-blue mb-4 tracking-tight leading-tight">
                        AI Enterprise<br />Ecosystem
                      </h3>
                      <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                        Powered by Krista AI and Friday_OS. Unlock 15+ AI capabilities and orchestrate workflows across 200+ system integrations seamlessly.
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
        <Route path="/ai-enterprise-ecosystem" element={<AIEnterpriseEcosystem setIsContactModalOpen={setIsContactModalOpen} />} />




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

