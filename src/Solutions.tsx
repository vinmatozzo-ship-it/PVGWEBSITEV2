import { motion } from "motion/react";

import { GooeyMarquee } from "./components/ui/gooey-marquee";
import solutionsVideo from "./components/ui/hf_20260501_081848_87ec58cb-009a-4bc7-98ae-4f84aa84d5bf.mp4";
import TiltCard from "./components/ui/3d-tilt-card";

export function Solutions() {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <GooeyMarquee text="Helping businesses thrive" className="mb-12" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Video */}
            <div className="w-full flex justify-center lg:justify-start items-center">
              <video 
                src={solutionsVideo} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-auto max-w-md lg:max-w-[30vw] object-contain"
              />
            </div>

            {/* Right Side: Text */}
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-balance">
                Welcome to Paradigm Venture Group
              </h1>
              <div className="text-xl text-gray-600 max-w-2xl leading-relaxed font-medium flex flex-col gap-6">
                <p>
                  We specialize in revolutionizing business workflows, processes, and technology integration.
                </p>
                <p>
                  Our focus is clear – to enhance the interoperability of your critical business systems. In today's business landscape, the need for efficient, accurate, and interconnected systems is paramount. This gap not only diminishes the potential value of your data but also burdens your senior personnel with administrative complexities.
                </p>
                <p>
                  Here at Paradigm, we bridge this gap. We offer a suite of advanced content management capabilities designed to improve accuracy and interoperability. Our solutions are tailored to enable efficient cost management, accurate reporting, and unlocking improved revenue opportunities.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center">
              Solutions
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side: Text */}
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                Custom Application Builder
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Build exactly what your business needs to succeed in weeks.
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="w-full flex justify-center items-center">
              <img 
                src="/cubes.png" 
                alt="Custom Application Builder" 
                className="w-full h-auto max-w-[260px] object-contain mix-blend-multiply"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side: Image */}
            <div className="w-full flex justify-center items-center order-2 lg:order-1">
              <img 
                src="/arrow.png" 
                alt="Sales Accelerator" 
                className="w-full h-auto max-w-[360px] object-contain mix-blend-multiply"
              />
            </div>

            {/* Right Side: Text */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                Sales Accelerator
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Build a tailored customer acquisition system that fills your calendar with high-value opportunities.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side: Text */}
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                Conversational AI
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                World's first ever AI that can have full on 10-40 minute long phone calls.
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="w-full flex justify-center items-center">
              <img 
                src="/chat.png" 
                alt="Conversational AI" 
                className="w-full h-auto max-w-[260px] object-contain mix-blend-multiply"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side: Image */}
            <div className="w-full flex justify-center items-center order-2 lg:order-1">
              <img 
                src="/data.png" 
                alt="Data Cleaning" 
                className="w-full h-auto max-w-[360px] object-contain mix-blend-multiply"
              />
            </div>

            {/* Right Side: Text */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                Data Cleaning
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Specializing in developing state-of-the art robust and flexible platforms for supply chain and value analysis professionals.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side: Text */}
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                Contract Management
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                All-in-one toolkit for third party lifecycle management.
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="w-full flex justify-center items-center">
              <img 
                src="/contract.png" 
                alt="Contract Management" 
                className="w-full h-auto max-w-[260px] object-contain mix-blend-multiply"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side: Image */}
            <div className="w-full flex justify-center items-center order-2 lg:order-1">
              <img 
                src="/revenue.png" 
                alt="Revenue Cycle" 
                className="w-full h-auto max-w-[260px] object-contain mix-blend-multiply"
              />
            </div>

            {/* Right Side: Text */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                Revenue Cycle
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Third Party and Patient Receivables process; converts simply and efficiently bad patient debt into immediate cash flow.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side: Text */}
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
                Rebate and Compliance Management
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Align surgeons, supply chain and administration to standardize procedures, improve outcomes and lower cost.
              </p>
            </div>

            {/* Right Side: Image */}
            <div className="w-full flex justify-center items-center">
              <img 
                src="/rebate.png" 
                alt="Rebate and Compliance Management" 
                className="w-full h-auto max-w-[260px] object-contain mix-blend-multiply"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <TiltCard />
    </div>
  );
}
