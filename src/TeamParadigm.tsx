import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight,
  Quote
} from "lucide-react";

interface TeamParadigmProps {
  setIsContactModalOpen?: (open: boolean) => void;
}



const featuredMember = {
  name: "Vin Matozzo",
  role: "CEO",
  image: "/vin-matozzo.png",
  preview: "Vin specializes in data-driven strategies, AI automation, and supply chain innovation with 15+ years in IDNs, GPOs, and procurement.",
  extended: "Previously System Director at Yale New Haven Health, he now serves on the SC Worx Corp Board. A recognized leader, he applies LEAN and AGILE methodologies to enhance efficiency and AI-driven decision-making."
};

const team = [
  {
    name: "Adam Rusin",
    role: "SAAS Sales / SHIFT Business Dev Krista",
    image: "/adam-rusin.jpg",
    preview: "Adam is a seasoned sales and business development executive with over 20 years of experience in healthcare technology and MedTech.",
    extended: "Adam Rusin is a seasoned sales and business development executive with over 20 years of experience in healthcare technology and MedTech. At PVGUS, he leads growth strategy and enterprise partnerships, helping health systems streamline procurement and value analysis processes through innovative solutions. Adam is a certified Project Management Professional and recognized for his calm leadership and results driven approach.",
    isPlaceholder: false
  },
  {
    name: "Shawn Fleming",
    role: "Sales Dev and SHIFT / Supplier Partnerships",
    image: "/shawn-fleming.jpg",
    preview: "Shawn is a healthcare sales and strategic partnerships executive with more than two decades of experience spanning GPO/IDN contracting, SaaS commercialization, and supply chain optimization.",
    extended: "Shawn Fleming is a healthcare sales and strategic partnerships executive with more than two decades of experience spanning GPO/IDN contracting, SaaS commercialization, and supply chain optimization. He previously held senior leadership roles at aptitude, LLC (a Vizient subsidiary), where he helped build healthcare's first online contracting marketplace from pre-launch to over $30 million in annual revenue, and later led enterprise-level legal operations reducing contract cycle times by more than 40%. At Paradigm, Shawn is focused on forging the strategic partnerships that drive growth across emerging and adjacent markets.",
    isPlaceholder: false
  },
  {
    name: "Fengjiang Zhuang",
    role: "CEO CubeDrive API / AWS / AI LLM Architect",
    image: "/fengjiang-zhuang.jpg",
    preview: "Fengjiang is a veteran cloud architect specializing in AWS and AI/LLM integration.",
    extended: "As CEO of CubeDrive API, he leads development of advanced API ecosystems, low-code workflow platforms, and secure enterprise data solutions.",
    isPlaceholder: false
  },
  {
    name: "Ala Obeidat",
    role: "Operational Systems & AI Workflows",
    image: "/ala-obeidat.jpg",
    preview: "Ala works at the intersection of operational systems, AI-enabled workflows, and technical problem-solving.",
    extended: "Ala Obeidat works at the intersection of operational systems, AI-enabled workflows, and technical problem-solving. His focus is on helping organizations improve operational clarity, reduce friction, and build scalable processes through thoughtful use of modern AI and automation tooling. At PVG, he supports workflow familiarization, operational optimization, and emerging technical initiatives across the organization’s evolving AI ecosystem.",
    isPlaceholder: false
  },
  {
    name: "Mike Seroka",
    role: "Healthcare Supply Chain and Strategic Sourcing Leader",
    image: "/mike-seroka.png",
    preview: "Mike is a healthcare supply chain and strategic sourcing leader with more than 15 years of experience supporting hospitals, health systems, and integrated delivery networks.",
    extended: "Mike is a healthcare supply chain and strategic sourcing leader with more than 15 years of experience supporting integrated delivery networks (IDNs), academic medical centers (AMCs), and community hospitals.\n\nHis expertise includes strategic sourcing, physician engagement, purchased service audits, and the development of value analysis programs that drive measurable cost savings and operational efficiency. Mike has successfully led procurement transformation initiatives, policy development and team leadership reform across complex healthcare organizations.\n\nHe continuously leverages AI and automation tools to simplify and accelerate everyday tasks, enabling hospitals and healthcare providers to make faster decisions, improve operational performance, and uncover new opportunities for savings and innovation.",
    isPlaceholder: false
  },
  {
    name: "Adriana Garcia Del Cid",
    role: "Executive Orchestrator, Paradigm Venture Group LLC",
    image: "/adriana-garcia.jpg",
    preview: "Adriana supports executive operations, scheduling, communications, partner coordination, and cross-functional follow-through for the Paradigm leadership team.",
    extended: "Adriana Garcia Del Cid serves as Executive Orchestrator at Paradigm Venture Group LLC, where she supports executive operations, scheduling coordination, external communications, and cross-functional follow-through for the Paradigm leadership team. Her role is centered on keeping high-priority conversations, meetings, partner interactions, and operational details moving with clarity and precision.\n\nAs part of Paradigm’s executive layer, Adriana helps coordinate communications between internal stakeholders and external partners, ensuring that meetings are scheduled, follow-ups are handled, and key relationships remain organized.",
    isPlaceholder: false
  }
];

function FeaturedMemberCard({ member }: { member: typeof featuredMember }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div 
       layout
       onClick={handleClick}
       onKeyDown={handleKeyDown}
       tabIndex={0}
       role="button"
       aria-expanded={isExpanded}
       transition={{
         layout: { type: "tween", duration: 0.35, ease: [0.25, 1, 0.5, 1] }
       }}
       className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-10 mb-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xl shadow-black/[0.03] relative overflow-hidden group cursor-pointer transition-[border-color,box-shadow] duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-blue-50 border-4 border-white shadow-lg relative z-10 shrink-0 flex items-center justify-center">
        {member.image ? (
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = '<span class="text-3xl font-bold text-blue-500 flex items-center justify-center w-full h-full bg-blue-50">VM</span>';
            }}
          />
        ) : (
          <span className="text-3xl font-bold text-blue-500 flex items-center justify-center w-full h-full bg-blue-50">VM</span>
        )}
      </div>
      
      <div className="flex-1 text-center md:text-left relative z-10 w-full">
        <h3 className="text-3xl font-black text-paradigm-blue mb-2">{member.name}</h3>
        <p className="text-blue-600 font-black mb-4 uppercase tracking-widest text-sm">{member.role}</p>
        
        <p className="text-gray-600 leading-relaxed font-medium text-sm md:text-base mb-2">
          {member.preview}
        </p>

        <motion.div 
          initial={false}
          animate={{ 
            height: isExpanded ? "auto" : 0, 
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : -8
          }}
          transition={{
            height: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
            opacity: { duration: 0.25, ease: "linear", delay: isExpanded ? 0.05 : 0 },
            y: { duration: 0.3, ease: [0.25, 1, 0.5, 1] }
          }}
          className="overflow-hidden"
        >
          <p className="text-gray-500 leading-relaxed font-medium text-sm md:text-base mt-2 pt-2 border-t border-gray-100/50 whitespace-pre-line">
            {member.extended}
          </p>
        </motion.div>
        
        <div className="text-xs text-blue-500 font-black uppercase tracking-widest mt-4 opacity-60 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
          {isExpanded ? "Click/tap to collapse" : "Click/tap to expand"}
        </div>
      </div>
    </motion.div>
  );
}

function TeamMemberCard({ member }: { member: typeof team[0] }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleClick = () => {
    if (!member.isPlaceholder) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!member.isPlaceholder && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div 
      layout
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={member.isPlaceholder ? -1 : 0}
      role={member.isPlaceholder ? undefined : "button"}
      aria-expanded={member.isPlaceholder ? undefined : isExpanded}
      transition={{
        layout: { type: "tween", duration: 0.35, ease: [0.25, 1, 0.5, 1] }
      }}
      className={`group bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden h-full justify-between transition-[border-color,box-shadow] duration-300 ease-out ${
        member.isPlaceholder 
          ? "cursor-default" 
          : "cursor-pointer hover:border-blue-200 hover:shadow-xl shadow-black/[0.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="w-full flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-50 border-[3px] border-white shadow-sm group-hover:border-blue-100 transition-colors flex items-center justify-center mb-5 shrink-0 relative z-10">
          {member.image ? (
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-black text-blue-300 group-hover:text-blue-600 transition-colors">
              {getInitials(member.name)}
            </span>
          )}
        </div>
        
        <h4 className="text-lg font-bold text-black mb-1 relative z-10">{member.name}</h4>
        
        <p className="text-xs text-blue-600 font-bold uppercase tracking-widest leading-relaxed relative z-10 mb-4 text-center">
          {member.role}
        </p>
        
        <p className="text-xs text-gray-500 font-medium leading-relaxed">
          {member.preview}
        </p>
        
        {!member.isPlaceholder && (
          <motion.div 
            initial={false}
            animate={{ 
              height: isExpanded ? "auto" : 0, 
              opacity: isExpanded ? 1 : 0,
              y: isExpanded ? 0 : -8
            }}
            transition={{
              height: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
              opacity: { duration: 0.25, ease: "linear", delay: isExpanded ? 0.05 : 0 },
              y: { duration: 0.3, ease: [0.25, 1, 0.5, 1] }
            }}
            className="overflow-hidden w-full"
          >
            <p className="text-xs text-gray-400 font-medium leading-relaxed mt-2 pt-2 border-t border-gray-100/50 whitespace-pre-line text-left">
              {member.extended}
            </p>
          </motion.div>
        )}
      </div>

      <div className="w-full flex justify-center mt-4">
        {!member.isPlaceholder ? (
          <div className="text-[10px] text-blue-500 font-black uppercase tracking-wider opacity-60 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex items-center gap-1">
            {isExpanded ? "Show less" : "Click/tap to expand"}
          </div>
        ) : (
          <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider flex items-center gap-1">
            Future Content
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function TeamParadigm({ setIsContactModalOpen }: TeamParadigmProps) {
  const partners = [
    "Data Leverage Group",
    "Krista",
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
        <FeaturedMemberCard member={featuredMember} />

        {/* Rest of the team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: (idx % 4) * 0.1, duration: 0.4 }}
            >
              <TeamMemberCard member={member} />
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
