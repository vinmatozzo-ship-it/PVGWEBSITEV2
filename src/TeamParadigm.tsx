import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight,
  Quote
} from "lucide-react";

interface TeamParadigmProps {
  setIsContactModalOpen?: (open: boolean) => void;
}

export default function TeamParadigm({ setIsContactModalOpen }: TeamParadigmProps) {
  const team = [
    { name: "Adam Anderson", role: "Chief Operating Officer", image: "/adam-anderson.jpg" },
    { name: "Jimmy DiGiacomo", role: "VP Sales / Healthcare Sales", image: "/jimmy-digiacomo.jpg" },
    { name: "Michelle Taukeuvea", role: "CEO CBT Analytics", image: "/michelle-taukeuvea.jpg" },
    { name: "Steve Brewer", role: "SVP Sales", image: "/steve-brewer.jpg" },
    { name: "Fengjiang Zhuang", role: "CEO CubeDrive API / AWS / AI LLM Architect", image: "/fengjiang-zhuang.jpg" },
    { name: "Glinda Cho", role: "Solutions Analyst / SDR SHIFT", image: "/glinda-cho.jpg" },
    { name: "Matt Wilder", role: "Principal FinTech Enablement & Strategic Partnership", image: "/matt-wilder.jpg" },
    { name: "Tim Ingram", role: "Executive Director / Special Consulting Inventory & Logistics", image: "/tim-ingram.jpg" },
    { name: "Shawn Fleming", role: "Sales Dev and SHIFT / Supplier Partnerships", image: "/shawn-fleming.jpg" },
    { name: "Deb Zolna", role: "Executive Consultant / Special Consulting The BRIDGE", image: "/deb-zolna.jpg" },
    { name: "Adam Rusin", role: "SAAS Sales / SHIFT Business Dev Terzo, Krista", image: "/adam-rusin.jpg" },
    { name: "Wyatt Ziegler", role: "Solution Architect", image: "/wyatt-ziegler.jpg" }
  ];

  const partners = [
    "Data Leverage Group",
    "Krista",
    "Terzo",
    "Evanston Technology Partners",
    "5S / Space Innovation",
    "Seal Shield",
    "CBT Analytics",
    "SC Worx",
    "CyberCrucible",
    "SD Labs",
    "Tryon Clear View Group",
    "Third Stage Consulting Group",
    "Simplify EDI Healthcare"
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-blue-100 pt-32 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.05),transparent_50%)] pointer-events-none" />
      
      {/* 1. TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-paradigm-blue"
          >
            Team <span className="text-blue-600">Paradigm</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            A collective of industry veterans, innovators, and strategists driving enterprise transformation.
          </motion.p>
        </div>

        {/* Featured: Vin Matozzo */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           transition={{ delay: 0.2 }}
           className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-10 mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xl shadow-black/[0.03] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-lg relative z-10">
            <img 
              src="/vin-matozzo.png" 
              alt="Vin Matozzo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<span class="text-3xl font-bold text-blue-500 flex items-center justify-center w-full h-full bg-blue-50">VM</span>';
              }}
            />
          </div>
          
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="text-3xl font-black text-paradigm-blue mb-2">Vin Matozzo</h3>
            <p className="text-blue-600 font-black mb-4 uppercase tracking-widest text-sm">CEO</p>
            <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base">
              Vin specializes in <span className="text-black font-bold">data-driven strategies, AI automation, and supply chain innovation</span> with 15+ years in IDNs, GPOs, and procurement. Previously System Director at Yale New Haven Health, he now serves on the SC Worx Corp Board. A recognized leader, he applies LEAN and AGILE methodologies to enhance efficiency and AI-driven decision-making.
            </p>
          </div>
        </motion.div>

        {/* Rest of the team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: (idx % 4) * 0.1, duration: 0.4 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 hover:shadow-black/[0.04] transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-50 border-[3px] border-white shadow-sm group-hover:border-blue-100 transition-colors flex items-center justify-center mb-5 shrink-0 relative z-10">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-black text-blue-300 group-hover:text-blue-600 transition-colors">
                    {getInitials(member.name)}
                  </span>
                )}
              </div>
              <h4 className="text-lg font-bold text-black mb-2 relative z-10">{member.name}</h4>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-widest leading-relaxed relative z-10">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. KEY PARTNERS SECTION */}
      <section className="py-24 px-6 border-t border-gray-100 relative z-10 bg-gray-50/50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-paradigm-blue">Key Partners</h2>
            <p className="text-gray-500 mb-16 text-lg max-w-2xl mx-auto">
              Our strategic alliance network empowering the next generation of enterprise innovation and operational excellence.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: (idx % 5) * 0.05 }}
                className="px-6 py-4 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all min-w-[180px] group cursor-default"
              >
                <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors text-center">
                  {partner}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="py-32 px-6 relative z-10 overflow-hidden flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center relative w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="bg-blue-600 p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-blue-600/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-700/50 mix-blend-overlay"></div>
            <Quote size={120} className="absolute -top-10 -left-10 text-white opacity-10" />
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight relative z-10">
              Connect with Paradigm
            </h2>
            <p className="text-xl text-blue-100 mb-10 font-medium max-w-2xl mx-auto relative z-10">
              Explore how Paradigm Venture Group can help your organization simplify complexity, improve interoperability, and accelerate transformation.
            </p>
            <button 
              onClick={() => setIsContactModalOpen?.(true)}
              className="group relative z-10 bg-white text-blue-600 px-10 py-5 rounded-full text-lg font-black flex items-center justify-center gap-3 mx-auto hover:bg-gray-50 transition-all hover:pr-8 active:scale-95 shadow-xl shadow-black/10"
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
