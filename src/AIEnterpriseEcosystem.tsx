import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  Network, 
  Blocks, 
  Zap, 
  Database,
  Eye,
  Target,
  ArrowRight,
  Server,
  Layers,
  Workflow
} from "lucide-react";

interface AIEnterpriseEcosystemProps {
  setIsContactModalOpen?: (open: boolean) => void;
}

export function AIEnterpriseEcosystem({ setIsContactModalOpen }: AIEnterpriseEcosystemProps) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black/10">
      {/* Spacer for fixed nav */}
      <div className="h-32" />

      {/* 1. Hero Section */}
      <section className="relative px-6 py-20 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-600 tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Enterprise Orchestration
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-balance mb-6">
            AI Enterprise <br />
            <span className="text-blue-600">Ecosystem.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium mt-8">
            15+ AI capabilities. 200+ enterprise integrations. One orchestration layer.
          </p>
        </motion.div>
      </section>

      {/* 2. Stats Section */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { value: "15+", label: "AI Capabilities", icon: BrainCircuit },
            { value: "200+", label: "Systems Integrated", icon: Network },
            { value: "4-6", label: "Week Deployment", icon: Zap },
            { value: "Low-Code", label: "Automation", icon: Blocks }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center hover:shadow-xl hover:shadow-black/[0.02] transition-all"
            >
              <stat.icon className="w-8 h-8 text-blue-500 mb-4" />
              <div className="text-3xl md:text-4xl font-black text-black mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3 & 4. Friday_OS Section */}
      <section className="px-6 py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-paradigm-blue">
              Meet <span className="text-blue-600">Friday_OS</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              Your enterprise's central AI brain and neural network.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Friday_OS provides a JARVIS-like front-end that serves as the ultimate CEO command layer and a team-shareable enterprise intelligence layer. It connects every disparate system into a single, conversational interface.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#0A0A0A] rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden border border-gray-800"
          >
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <div className="font-mono text-sm md:text-base leading-loose tracking-tight">
              <div className="text-blue-400 font-bold mb-2">Friday_OS /</div>
              <div className="text-gray-400 flex flex-col gap-1 ml-4 border-l border-gray-800 pl-4">
                <div className="hover:text-white transition-colors cursor-default">├── krista-ai/</div>
                <div className="hover:text-white transition-colors cursor-default">├── gitnexus/</div>
                <div className="hover:text-white transition-colors cursor-default">├── integrations/</div>
                <div className="hover:text-white transition-colors cursor-default">├── automations/</div>
                <div className="hover:text-white transition-colors cursor-default">├── crm/</div>
                <div className="hover:text-white transition-colors cursor-default">├── erp/</div>
                <div className="hover:text-white transition-colors cursor-default">├── hr/</div>
                <div className="hover:text-white transition-colors cursor-default">├── finance/</div>
                <div className="text-blue-400 transition-colors cursor-default font-bold">└── command-layer/</div>
              </div>
            </div>
            
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* 5. Powered by Krista AI Orchestration */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="bg-black text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Powered by <br className="hidden sm:block"/> Krista AI Orchestration
            </h2>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10">
              Krista provides the robust orchestration engine that brings Friday_OS to life. 
              By abstracting complex API calls and fragmented data silos into natural language, 
              Krista ensures security, governance, and rapid deployment for enterprise-grade automation.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full backdrop-blur-sm border border-white/10">
                <Database className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold tracking-wide">Data Security</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full backdrop-blur-sm border border-white/10">
                <Layers className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold tracking-wide">Enterprise Governance</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full backdrop-blur-sm border border-white/10">
                <Workflow className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold tracking-wide">Intelligent Workflows</span>
              </div>
            </div>
          </div>
          
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-900/40 to-transparent pointer-events-none" />
          <BrainCircuit className="absolute -right-20 -bottom-20 w-[400px] h-[400px] text-white/[0.03] pointer-events-none" />
        </motion.div>
      </section>

      {/* 6. AI Capabilities */}
      <section className="px-6 py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-paradigm-blue tracking-tight mb-4">
              AI Capabilities
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              A comprehensive suite of intelligent tools designed to perceive, analyze, and execute seamlessly across your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Understand",
                icon: Eye,
                color: "text-blue-500",
                bg: "bg-blue-50",
                items: ["Natural Language Processing", "Document Intelligence", "Computer Vision", "Sentiment Analysis", "Entity Extraction"]
              },
              {
                title: "Decide",
                icon: BrainCircuit,
                color: "text-indigo-500",
                bg: "bg-indigo-50",
                items: ["Predictive Analytics", "Risk Scoring", "Anomaly Detection", "Recommendation Engines", "Optimization Algorithms"]
              },
              {
                title: "Act",
                icon: Target,
                color: "text-purple-500",
                bg: "bg-purple-50",
                items: ["Workflow Automation", "RPA Integration", "API Orchestration", "Dynamic Routing", "Autonomous Agents"]
              }
            ].map((group, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:shadow-black/[0.03] transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${group.bg} flex items-center justify-center mb-8`}>
                  <group.icon className={`w-8 h-8 ${group.color}`} />
                </div>
                <h3 className="text-2xl font-black text-black mb-6 tracking-tight">{group.title}</h3>
                <ul className="space-y-4">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 font-medium">
                      <div className={`w-2 h-2 rounded-full ${group.bg} border ${group.color.replace('text-', 'border-')}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Enterprise Integrations */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-paradigm-blue tracking-tight mb-4">
            200+ Enterprise Integrations
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Friday_OS connects seamlessly to the tools your teams already use, eliminating data silos and streamlining operations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: "CRM", desc: "Salesforce, HubSpot" },
            { name: "ERP", desc: "SAP, Oracle, NetSuite" },
            { name: "HRM", desc: "Workday, BambooHR" },
            { name: "Finance", desc: "QuickBooks, Xero" },
            { name: "Operations", desc: "Supply Chain & Logistics" },
            { name: "Sales", desc: "Marketing Automation" },
            { name: "Support", desc: "Zendesk, Intercom" },
            { name: "Communication", desc: "Slack, Teams, Zoom" },
            { name: "Ticketing", desc: "Jira, ServiceNow" },
            { name: "Knowledge Bases", desc: "Confluence, Notion" }
          ].map((integration, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 transition-all cursor-default flex flex-col justify-center"
            >
              <Server className="w-6 h-6 text-gray-300 group-hover:text-blue-500 transition-colors mb-4" />
              <h4 className="font-bold text-black text-sm mb-1">{integration.name}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{integration.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
          <div className="absolute inset-0 bg-blue-700/50 mix-blend-overlay"></div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 tracking-tight">Ready to command your enterprise?</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10 font-medium">
            Deploy Friday_OS and unify your disparate systems into a single intelligent layer.
          </p>
          <button 
            onClick={() => setIsContactModalOpen?.(true)}
            className="group relative z-10 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all hover:pr-6 active:scale-95 shadow-xl shadow-black/10 inline-flex items-center gap-2"
          >
            Get Started 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
