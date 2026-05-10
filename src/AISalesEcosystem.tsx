import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Workflow,
  Database,
  Layers,
  Settings2,
  Mail,
  UserPlus,
  ClipboardCheck,
  Bot,
  MousePointer2,
  FileCode2,
  Rocket,
  ShieldCheck,
  Headphones,
  CheckCircle2
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.21, 0.45, 0.32, 0.9],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

function FeatureCard({ title, description, image, index }: FeatureCardProps) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className={`py-24 ${isEven ? 'bg-white' : 'bg-[#fafafa]'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
          <motion.div variants={itemVariants} className="w-full lg:w-1/2">
            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border border-gray-100">
              <motion.img 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.2, ease: [0.21, 0.45, 0.32, 0.9] }}
                src={image} 
                alt={title} 
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="w-full lg:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-black text-paradigm-blue tracking-tighter leading-tight">
              {title}
            </h2>
            <p 
              className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export function AISalesEcosystem({ setIsContactModalOpen }: { setIsContactModalOpen?: (open: boolean) => void }) {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-white">
      {/* HERO SECTION */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="max-w-7xl mx-auto px-6 mb-32 text-center"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-extrabold text-blue-600 tracking-[0.2em] uppercase mb-8">
          <Zap className="w-3 h-3 fill-blue-600" />
          Powered by Paradigm
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-paradigm-blue">
          <span className="text-blue-600">SHIFT</span> Sales<br />Accelerator
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium mb-12">
          Elevate your sales with Paradigm's <span className="text-blue-600">SHIFT</span> Sales Accelerator. This innovative platform combines advanced analytics and intuitive technology to supercharge your sales processes.
        </motion.p>
        
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {[
            "Seamless integration with your existing systems for immediate impact.",
            "Real-time data insights for informed, rapid decision-making.",
            "Customizable to fit your unique business needs."
          ].map((text, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#fafafa] border border-gray-100 text-sm font-bold text-gray-600 leading-relaxed">
              {text}
            </div>
          ))}
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg font-bold text-gray-900 mb-8">
          Experience the future of sales with <span className="text-blue-600">SHIFT</span>. Transform your strategy, boost efficiency, and accelerate growth.
        </motion.p>

        <motion.a 
          href="https://calendly.com/vinpvg"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block bg-black text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all"
        >
          Discover more and schedule a demo today
        </motion.a>

      </motion.section>

      {/* FEATURE BLOCKS */}
      <div className="space-y-0">
        <FeatureCard 
          index={0}
          title="Lead Generation"
          description="Generate a list of qualified prospects in minutes."
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
        />
        <FeatureCard 
          index={1}
          title="Linkedin Message Automation"
          description="Expand your outreach and brand awareness on LinkedIn."
          image="https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&q=80&w=2574"
        />

        <FeatureCard 
          index={2}
          title="Campaign Management"
          description="Create and run multiple campaigns simultaneously with custom workflows."
          image="/campaign-management.png"
        />

        <FeatureCard 
          index={3}
          title="Analytics and Reporting"
          description="Get valuable insight and skyrocket your outreach and sales efforts."
          image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2670"
        />
        <FeatureCard 
          index={4}
          title="CRM Integration"
          description="Connect your existing CRM or use built-in pipeline management system."
          image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2670"
        />
        <FeatureCard 
          index={5}
          title="Productivity Integration"
          description="Connect your productivity apps and use triggers to customize workflows."
          image="https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=2664"
        />
        <FeatureCard 
          index={6}
          title="Email Integration"
          description="Connect your email account and send/receive messages directly through <span className='text-blue-600'>SHIFT</span>."
          image="https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=2670"
        />
      </div>

      {/* INTESA AI SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-32 px-6 bg-black text-white overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div variants={itemVariants} className="text-[#38bdf8] font-black text-xl mb-4 tracking-tight uppercase">
            Intesa AI
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-20 max-w-4xl mx-auto">
            100,000 sales and customer service reps at the tap of a button
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "24/7 Availability", desc: "Constant presence across all channels, ensuring no opportunity is missed." },
              { title: "Employee Training and Retention", desc: "AI that learns from your best performers and stays with your team forever." },
              { title: "Scalability", desc: "Instantly scale your outreach from 100 to 100,000 conversations without friction." },
              { title: "Streamlining Complex Processes", desc: "Automate intricate multi-step qualification and support workflows with ease." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="p-10 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl text-left transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#38bdf8]/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-[#38bdf8]" />
                </div>
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ONBOARDING FLOW SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-32 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-paradigm-blue tracking-tighter mb-4">Onboarding Process</h2>
            <p className="text-gray-500 font-medium text-lg">Your journey to supercharged sales in 6 simple steps.</p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 hidden lg:block -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {[
                { step: "01", title: "Create an Account", icon: UserPlus },
                { step: "02", title: "Submit onboarding form", icon: ClipboardCheck },
                { step: "03", title: "Create an Agent", icon: Bot },
                { step: "04", title: "Select Use Case", icon: MousePointer2 },
                { step: "05", title: "Generate Script", icon: FileCode2 },
                { step: "06", title: "Test and Deploy", icon: Rocket }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center group relative"
                >
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center mb-6 relative z-10 group-hover:border-black transition-colors duration-500 shadow-sm">
                    <step.icon className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors duration-500" />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 mb-2 tracking-widest">{step.step}</span>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">{step.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* PRICING / COST SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-32 px-6 bg-[#fafafa]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-paradigm-blue tracking-tighter mb-4">Investment & Support</h2>
            <p className="text-gray-500 font-medium text-lg">Transparent pricing for enterprise-grade solutions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Setup Fee", value: "$5,000–$25,000", icon: ShieldCheck, desc: "Initial configuration and environment setup." },
              { title: "Implementation", value: "Included", icon: Settings2, desc: "Seamless training and technical support." },
              { title: "Agent Testing", value: "Comprehensive", icon: BeakerIcon, desc: "Rigorous stress testing for all AI agents." },
              { title: "Continuous Support", value: "24/7 Dedicated", icon: Headphones, desc: "Ongoing optimization and priority assistance." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">{item.title}</h4>
                <div className="text-2xl font-black text-gray-900 mb-4 tracking-tight">{item.value}</div>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-32 px-6 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #3b82f6 100%)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={itemVariants}>
            <h2 className="text-5xl md:text-7xl font-black text-paradigm-blue mb-8 tracking-tighter leading-none">
              Ready to automate your revenue?
            </h2>
            <button 
              onClick={() => setIsContactModalOpen?.(true)}
              className="group relative bg-black text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-2xl shadow-black/20 overflow-hidden"
            >
              <span className="relative z-10">Request Ecosystem Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </div>
      </motion.section>

    </main>
  );
}

function BeakerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 3h15" />
      <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
      <path d="M6 14h12" />
    </svg>
  );
}
