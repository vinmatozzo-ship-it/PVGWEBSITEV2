import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Database, 
  Activity, 
  BarChart3, 
  Settings2, 
  Workflow, 
  Globe2, 
  Eye, 
  Boxes, 
  Users2, 
  Shuffle,
  ChevronRight
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 1.02 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1.5, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  text: string;
  image: string;
  icon: any;
  index: number;
  onLearnMore: () => void;
}

function ServiceCard({ title, subtitle, text, image, icon: Icon, index, onLearnMore }: ServiceCardProps) {

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -12, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
        <motion.img 
          variants={imageVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />

        <div className="absolute top-6 left-6 z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-3 rounded-2xl bg-white/90 backdrop-blur shadow-xl"
          >
            <Icon className="w-6 h-6 text-black" />
          </motion.div>
        </div>
      </div>
      
      <div className="p-10 flex flex-col flex-1">
        {subtitle && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4 block"
          >
            {subtitle}
          </motion.span>
        )}
        <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-base font-medium leading-relaxed mb-8 flex-1">
          {text}
        </p>
        <motion.button 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4 }}
          onClick={onLearnMore}
          className="flex items-center gap-2 text-xs font-black text-gray-900 group/link hover:text-blue-600 transition-colors w-fit"
        >
          LEARN MORE <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </motion.button>
      </div>

    </motion.div>
  );
}

export function AdvisoryServices({ setIsContactModalOpen }: { setIsContactModalOpen?: (open: boolean) => void }) {
  const services = [

    {
      title: "Navigating the Pillars of Supply Chain",
      subtitle: "Connected Contract Management & Enhanced RF(X)",
      text: "Our industry professionals have over 20 years of strategic sourcing, procurement, and bid solicitation experience. We take a connected approach to aligning your catalogue, spend data, and requirements in an innovative approach to bringing your requests to market integrated with technology. We integrate benchmarks, best in class information, and SHIFT workflows to your strategic sourcing acumen.",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2670",
      icon: ShieldCheck
    },
    {
      title: "Data Governance",
      text: "Allow us to be your guide in item master normalization, data integrity analytics, and supply chain integration. We create interoperability which helps you visualize and establish your item master and formulary as the interoperable asset and your source of truth.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2670",
      icon: Database
    },
    {
      title: "Clinical Integration and CQO Improvement",
      text: "Are you struggling with connecting your Electronic Health Records, Materials Requirements and Planning systems where they intersect with cost, quality, and outcomes? Let our experts guide you on how to connect patient records, physician preference profiles, utilization information, and supply chain spend to optimize revenue and improve your margin.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2670",
      icon: Activity
    },
    {
      title: "Supplier Resiliency Program Development",
      text: "Need help understanding the key performance indicators in your supply chain? Allow our experts to help you improve forecast accuracy, prepare for future demand, and aid your decisions by AI integration. We can drive improved outcomes based on real-time and predictive analytics.",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=2670",
      icon: BarChart3
    },
    {
      title: "Formulary Control and Guided Purchasing Development",
      text: "Let us help you establish end-to-end visibility over your supply network and production. We can collaborate to connect intelligent workflows, reduce risk, increase precision, and speed to value.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2670",
      icon: Settings2
    },
    {
      title: "Enabled Workflow & Business Intelligence",
      text: "Allow us to connect the silos of your business processes to optimize financial goals and performance. We can respond quickly to real-time demand, supply, and delivery constraints and remove disconnected information that builds trust with partners to improve outcomes and act on real-time data.",
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=2670",
      icon: Workflow
    },
    {
      title: "Channel & Distribution Optimization",
      text: "We can help truly understand your cost to serve by implementing key indicators with near-time data from your manufacturers, distributors, shipping, and channel partners, creating a connected enterprise across your network.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2670",
      icon: Globe2
    },
    {
      title: "Omni-channel Visualization",
      text: "Omni-channel visualization is the key to the supply chain's success of the future.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2670",
      icon: Eye
    },
    {
      title: "Inventory Management Visualization",
      text: "There is an unprecedented ability to connect inventory turns, demand forecasting, utilization, and formulary management to improve patient outcomes and achieve unprecedented levels of supply chain efficiency. Let us help you develop, build, and deploy cutting-edge workflow and tech to keep you one step ahead.",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=2670",
      icon: Boxes
    },
    {
      title: "Small Business and Supplier Diversity Program Development",
      text: "World-class efficacy = local impact. Allow us to quickly and effortlessly create a small disadvantaged business reporting program. Enhance the impact to your local and international supplier community while enriching your data to uncover diversity categories, classifications, certifications, and much more.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=2670",
      icon: Users2
    },
    {
      title: "P2P AND D2D Workflow Design and Modernization",
      text: "Attain the necessary insights to optimize your end-to-end supply chain. Whether you need help navigating the procure-to-pay or demand-to-disbursement ecosystems, we will operationalize real insights to help streamline and capture DSO (days sales outstanding) and cash flow optimization.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2670",
      icon: Shuffle
    }



  ];

  return (
    <main className="min-h-screen pt-32 pb-20 bg-white overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="max-w-7xl mx-auto px-6 mb-24"
      >
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div variants={cardVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase mb-8">
            Consulting Services
          </motion.div>
          <motion.h1 variants={cardVariants} className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-gray-900">
            Advisory Services
          </motion.h1>
          <motion.p variants={cardVariants} className="text-xl md:text-2xl text-gray-500 leading-relaxed font-medium">
            Strategic guidance to transform your supply chain into a resilient, data-driven competitive advantage.
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              {...service}
              index={index}
              onLearnMore={() => setIsContactModalOpen?.(true)}
            />
          ))}

        </motion.div>
      </section>

      {/* Bottom CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-32 px-6 bg-[#fafafa]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={cardVariants} className="text-4xl md:text-6xl font-black text-gray-900 mb-10 tracking-tighter leading-tight">
            Ready to evolve your<br />strategic operations?
          </motion.h2>
          <motion.button 
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              backgroundColor: "#111"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsContactModalOpen?.(true)}
            className="bg-black text-white px-12 py-6 rounded-full text-lg font-bold transition-all duration-300"
          >
            Schedule an Advisory Session
          </motion.button>

        </div>
      </motion.section>
    </main>
  );
}
