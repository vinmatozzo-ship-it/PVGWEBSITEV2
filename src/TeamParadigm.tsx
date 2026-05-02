import React from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Users, 
  Lightbulb, 
  BarChart, 
  Quote, 
  ChevronRight,
  Stethoscope,
  Factory,
  Plane,
  Truck
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  hover: { 
    y: -8, 
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

interface TeamParadigmProps {
  setIsContactModalOpen?: (open: boolean) => void;
}

export default function TeamParadigm({ setIsContactModalOpen }: TeamParadigmProps) {
  const expertiseAreas = [
    "Strategic Management Consulting",
    "Supply Chain Innovation",
    "Business Continuity",
    "Digital Transformation",
    "Healthcare Operations",
    "Data Visualization",
    "C-Suite Relationship Development",
    "Procurement & Logistics",
    "Data Governance",
    "Revenue & Profitability Control",
    "Value Analysis",
    "Process Design",
    "Business Architecture",
    "LEAN & AGILE Methodology",
    "Market Entrance Strategy"
  ];

  const highlights = [
    {
      title: "Transformational Leadership",
      description: "Drives enterprise change and helps organizations modernize operations through strategic consulting and technology-enabled execution.",
      icon: Users
    },
    {
      title: "Healthcare & Supply Chain Expertise",
      description: "Experienced across healthcare, manufacturing, aerospace, and supply chain ecosystems, with a focus on operational improvement and digital transformation.",
      icon: Stethoscope
    },
    {
      title: "Technology Innovation",
      description: "Passionate about automation, data visualization, interoperability, and building systems that improve how work gets done.",
      icon: Lightbulb
    },
    {
      title: "LEAN & AGILE Strategy",
      description: "Subject matter expert in LEAN and AGILE process modeling, business architecture, workflow design, and performance optimization.",
      icon: BarChart
    }
  ];

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-blue-50 pt-40 pb-16">
      {/* 1. HERO / EXECUTIVE INTRO SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-blue-50 rounded-[2.5rem] -z-10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border border-black/5 bg-white">
              <img 
                src="/vin-matozzo.png" 
                alt="Vin Matozzo" 
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="absolute bottom-8 -right-8 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={staggerContainer}
              className="space-y-4"
            >
              <motion.span 
                variants={fadeIn}
                className="text-blue-600 font-black text-sm uppercase tracking-[0.3em]"
              >
                Leadership
              </motion.span>
              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
              >
                Vin Matozzo
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-2xl md:text-3xl font-bold text-gray-400 tracking-tight"
              >
                CEO and Managing Partner
              </motion.p>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed font-medium max-w-xl"
            >
              A dynamic, results-oriented, transformational, and forward-thinking leader focused on driving change, delivering measurable results, and helping organizations advance through healthcare innovation, technology, supply chain transformation, and entrepreneurial business development.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. LEADERSHIP HIGHLIGHTS SECTION */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover="hover"
                className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-black mb-4 tracking-tight leading-tight">{item.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. PROFESSIONAL PROFILE SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={fadeIn}
              className="lg:col-span-4"
            >
              <div className="sticky top-40">
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-4">Biography</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">Executive Profile</h2>
                <div className="w-12 h-1 bg-blue-600 mt-8" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.25 }}
              variants={staggerContainer}
              className="lg:col-span-8 space-y-12"
            >
              <motion.div variants={fadeIn} className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Vin Matozzo is a dynamic and results-oriented transformational leader who continually drives change and delivers results for clients, corporations, and consortiums. He acts as a catalyst for senior operations executives who are passionate about healthcare, technology, and entrepreneurial business development.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Vin is a serial collaborator in the exploration of technology innovations and services that support greater business efficiency through data visualization, LEAN methodology, and AGILE execution. He brings an unparalleled passion for automating the way work gets done while delivering superior customer experiences and enabling high-performing teams.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  He has extensive experience in process design, strategy creation, consensus building, integration planning, and stakeholder engagement across cultural and organizational silos.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. EXPERTISE AREAS SECTION */}
      <section className="bg-black text-white py-24 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Areas of Expertise</h2>
            <p className="text-gray-400 font-medium text-lg">Comprehensive capabilities across the enterprise lifecycle.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {expertiseAreas.map((area, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-sm font-bold tracking-tight backdrop-blur-sm transition-all"
              >
                {area}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. IMPACT & EXECUTION SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeIn}
            className="relative p-12 md:p-20 rounded-[3.5rem] bg-gray-50 border border-black/5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-4xl">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-6 block">Our Approach</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-tight">Execution That Moves Organizations Forward</h2>
              <div className="space-y-6 text-xl text-gray-600 leading-relaxed font-medium">
                <p>
                  Vin combines technical execution, supply chain innovation, and digital transformation expertise to help organizations adopt new technologies and reach higher levels of competitive advantage and effectiveness.
                </p>
                <p>
                  His work supports corporate supply chain, manufacturing, and distribution initiatives, helping teams launch, shift, and scale operations with confidence. He is skilled in designing and implementing innovative business architectures, models, and processes that produce dramatic operational results.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. INDUSTRY EXPERIENCE SECTION */}
      <section className="bg-white py-24 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Industry Experience</h2>
            <p className="text-gray-500 font-medium">Trusted by leading institutions and innovative startups.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Yale New Haven Health", icon: Stethoscope },
              { title: "Vizient Business Ventures", icon: BarChart },
              { title: "NYU Langone Health", icon: Stethoscope }
            ].map((org, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.25 }}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="p-10 bg-white rounded-3xl border border-black/5 shadow-sm text-center flex flex-col items-center justify-center gap-4 group transition-all"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <org.icon size={32} />
                </div>
                <h4 className="text-xl font-black tracking-tight">{org.title}</h4>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeIn}
            className="mt-16 p-8 bg-blue-50/50 rounded-2xl border border-blue-100 text-center"
          >
            <p className="text-lg text-blue-900 font-bold">
              Advising startups and emerging technology groups on market entrance strategies and data interpretation across U.S. and international markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. SPEAKER / ADVISORY SECTION */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeIn}
            className="bg-white p-12 md:p-20 rounded-[3rem] shadow-xl shadow-black/5 border border-black/5 relative"
          >
            <Quote size={80} className="absolute -top-10 -left-10 text-blue-600 opacity-10" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">Speaker, Advisor, and Innovation Catalyst</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              Vin is a featured speaker and expert in supply chain organizational development and business continuity. He has been a catalyst for accelerating education, strategic management consulting, innovation, C-Suite relationship development, and entrepreneurial growth.
            </p>
            <div className="w-20 h-1.5 bg-blue-600 mt-12 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="py-32 px-6 relative overflow-hidden flex items-center justify-center min-h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/30 z-0" />
        
        {/* Animated Background Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 0.08, scale: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden"
        >
          <img 
            src="/paradigm-logo-bg.png" 
            alt="" 
            className="w-[150%] max-w-none md:w-[110%] lg:w-full lg:max-w-7xl object-contain blur-[2px]"
          />
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeIn}
          >
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
              Connect with Paradigm Leadership
            </h2>
            <p className="text-xl text-gray-500 mb-12 font-medium max-w-2xl mx-auto">
              Explore how Paradigm Venture Group can help your organization simplify complexity, improve interoperability, and accelerate transformation.
            </p>
            <button 
              onClick={() => setIsContactModalOpen?.(true)}
              className="group bg-black text-white px-12 py-6 rounded-full text-xl font-bold flex items-center justify-center gap-3 mx-auto hover:bg-gray-800 transition-all hover:pr-8 active:scale-95 shadow-2xl shadow-black/20"
            >
              Contact Us
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
