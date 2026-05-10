import React, { Suspense, lazy } from "react";
import { Card } from "@/src/components/ui/card";
import { Spotlight } from "@/src/components/ui/spotlight";
import { motion } from "framer-motion";
import { Database, ServerCog, MonitorSmartphone } from "lucide-react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

export function CustomAppBuilder() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 bg-white">
      <section className="w-full flex items-center justify-center">
        <Card className="mx-auto h-[500px] w-full max-w-[75%] overflow-hidden rounded-3xl border-0 bg-black/[0.96] shadow-2xl relative">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex h-full flex-col md:flex-row">
            {/* Left content */}
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12">
              <h1 className="max-w-xl bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl">
                Discover new solutions with Paradigm Venture Group.
              </h1>
            </div>

            {/* Right 3D content */}
            <div className="relative flex-1 min-h-[260px] md:min-h-full">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </Card>
      </section>
      
      <div className="w-full flex flex-col items-center mt-20 mb-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-paradigm-blue mb-10 text-center tracking-tight">
          Build a Custom App in Weeks
        </h2>
        
        <div className="max-w-4xl w-full bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col gap-6 text-lg md:text-[1.35rem] leading-relaxed text-gray-500 font-medium text-center md:text-left">
            <p>
              Our end-to-end Enterprise Application Development Platform is the only platform with profound business and development knowledge built-in. This built-in capability enables you to build &ldquo;Enterprise Ready&rdquo; apps in weeks, not months/years. Our ecosystem can fully integrate into your existing landscape, are bi-directional, scalable, and secure &ndash; without requiring a single line of code.
            </p>
            <p>
              We work with a team-based discovery approach to solidify intakes, handoffs, WHILE standardizing and aligning policies and procedures. Our role-based views and visualization provide value and continuous improvement each step of the journey.
            </p>
            <p>
              We thrive on connecting disparate data and providing interoperable insights.
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Design Section */}
      <section className="relative w-full py-32 overflow-hidden bg-[#fafafa]">
        {/* Subtle radial background glow */}
        <div 
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 60%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Image with floating animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative"
            >
              {/* Blur behind image */}
              <div className="absolute inset-0 bg-[#38bdf8]/10 blur-3xl rounded-full scale-90 transform translate-y-4" />
              
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="/dashboard-mockup.png" 
                  alt="Responsive Dashboard Mockup" 
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </motion.div>
            </motion.div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h3 className="text-sm md:text-base font-bold tracking-widest text-[#60a5fa] uppercase mb-4 relative inline-block">
                  Responsive Design
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#60a5fa]/30 origin-left"
                  />
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-[500px] mt-6 font-medium"
              >
                At Paradigm Venture Group, our vision is to be the leading consulting firm in the industry. We aim to achieve this by constantly innovating and providing exceptional services that exceed our clients' expectations.
              </motion.p>
            </div>

          </div>
        </div>
      </section>

      {/* Subtle Divider Between Sections */}
      <div className="w-full flex justify-center bg-[#fafafa]">
        <div className="w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60"></div>
      </div>

      {/* Continuation Section: Build a Custom App */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#fafafa]">
        {/* Subtle radial background glow - positioned differently */}
        <div 
          className="absolute top-[60%] right-1/4 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: "radial-gradient(circle at 70% 60%, rgba(56,189,248,0.07) 0%, transparent 60%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Image with enhanced floating animation */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group"
            >
              {/* Blur behind image - more pronounced */}
              <div className="absolute inset-0 bg-[#38bdf8]/15 blur-3xl rounded-full scale-95 transform translate-y-6 transition-all duration-700 group-hover:scale-105 group-hover:bg-[#38bdf8]/20" />
              
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="/vinyl-app-builder.png" 
                  alt="Build a Custom App Mockup" 
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:scale-[1.04] transition-transform duration-700 ease-out rounded-xl border border-gray-100/40"
                />
              </motion.div>
            </motion.div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className="text-sm md:text-base font-bold tracking-widest text-[#60a5fa] uppercase mb-4 relative inline-block group">
                  Build a Custom App
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#60a5fa]/40 origin-left transition-transform duration-300 group-hover:scale-y-150"
                  />
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-[500px] mt-6 font-medium"
              >
                Easily create customizable applications with our intuitive step-by-step app creation process, empowering you to bring your unique ideas to life effortlessly.
              </motion.p>

              {/* Sub-block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="mt-10 pt-8 border-t border-gray-200/60 max-w-[400px] group hover:-translate-y-1 transition-transform duration-300 cursor-default"
              >
                <h4 className="text-[#38bdf8] font-bold text-base md:text-lg mb-2 tracking-wide">
                  FAST AND LOW-COST
                </h4>
                <p className="text-[#71717a] font-medium text-base">
                  Create personalized apps without code in weeks
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Thin Divider Between Sections */}
      <div className="w-full flex justify-center bg-[#fafafa]">
        <div className="w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-40"></div>
      </div>

      {/* Analytics Section: Dashboards and Analytics */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#fafafa]">
        
        {/* Subtle radial background glow - positioned on the left for text emphasis */}
        <div 
          className="absolute top-[70%] left-[20%] -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: "radial-gradient(circle at 20% 70%, rgba(56,189,248,0.08) 0%, transparent 60%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className="text-sm md:text-base font-bold tracking-widest text-[#60a5fa] uppercase mb-4 relative inline-block group">
                  Dashboards and Analytics
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#60a5fa]/40 origin-left transition-transform duration-300 group-hover:scale-y-150"
                  />
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-[520px] mt-6 font-medium group hover:text-gray-400 transition-colors duration-500"
              >
                Get a high-level overview of your organization with customizable dashboards and analytics insight to make confident decisions, easily scaling workflows for your evolving needs. Increase productivity, visibility and accountability across teams by maintaining a single source of truth.
              </motion.p>

              {/* Sub-block (Insight Highlight) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="mt-10 pt-8 border-t border-gray-200/60 max-w-[420px] flex items-start gap-4 group"
              >
                <div className="mt-1 w-1.5 h-6 bg-[#38bdf8] rounded-full shrink-0 group-hover:scale-y-125 transition-transform duration-300" />
                <div>
                  <h4 className="text-[#38bdf8] font-bold text-base md:text-lg mb-2 tracking-wide group-hover:brightness-110 transition-all duration-300">
                    DATA INSIGHT
                  </h4>
                  <p className="text-[#71717a] font-medium text-base">
                    Maintain a single source of truth across your organization
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: Image with structured floating animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group"
            >
              {/* Clean blur behind image - slightly more structured */}
              <div className="absolute inset-0 bg-[#38bdf8]/10 blur-3xl rounded-xl scale-95 transform translate-y-4 transition-all duration-700 group-hover:bg-[#38bdf8]/15" />
              
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="/analytics-dashboard.png" 
                  alt="Analytics Dashboard Mockup" 
                  className="w-full h-auto object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:scale-[1.03] transition-transform duration-700 ease-out rounded-xl border border-gray-100/50"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Thin Divider Between Sections */}
      <div className="w-full flex justify-center bg-[#fafafa]">
        <div className="w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-40"></div>
      </div>

      {/* Execution Section: Project and Task Management */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#fafafa]">
        
        {/* Subtle radial background glow - positioned differently */}
        <div 
          className="absolute top-[40%] left-[60%] -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: "radial-gradient(circle at 60% 40%, rgba(56,189,248,0.08) 0%, transparent 60%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Image with structured floating animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group"
            >
              {/* Clean blur behind image - process oriented */}
              <div className="absolute inset-0 bg-[#38bdf8]/10 blur-3xl rounded-xl scale-95 transform translate-y-4 transition-all duration-700 group-hover:bg-[#38bdf8]/15" />
              
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="/workflow-dashboard.png" 
                  alt="Project and Task Management Dashboard" 
                  className="w-full h-auto object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.12)] hover:scale-[1.03] transition-transform duration-700 ease-out rounded-xl border border-gray-100/60"
                />
              </motion.div>
            </motion.div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className="text-sm md:text-base font-bold tracking-widest text-[#60a5fa] uppercase mb-4 relative inline-block group">
                  Project and Task Management
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#60a5fa]/40 origin-left transition-transform duration-300 group-hover:scale-y-150"
                  />
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-[520px] mt-6 font-medium group hover:text-gray-400 transition-colors duration-500"
              >
                Efficiently manage and track projects and tasks with our custom app. Designed to boost team visibility, efficiency, and productivity by customizing workflows to fit your needs, streamlining work for maximum productivity.
              </motion.p>

              {/* Sub-block (Highlight Feature) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="mt-10 pt-8 border-t border-gray-200/60 max-w-[420px] flex items-start gap-4 group cursor-default"
              >
                <div className="mt-1 flex flex-col items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></div>
                  <div className="w-0.5 h-4 bg-[#38bdf8]/40"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></div>
                </div>
                <div>
                  <h4 className="text-[#38bdf8] font-bold text-base md:text-lg mb-2 tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                    WORKFLOW EFFICIENCY
                  </h4>
                  <p className="text-[#71717a] font-medium text-base">
                    Streamline tasks, approvals, and collaboration across your entire organization
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Thin Divider Between Sections */}
      <div className="w-full flex justify-center bg-[#fafafa]">
        <div className="w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-40"></div>
      </div>

      {/* Input Layer Section: Create Custom Forms */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#fafafa]">
        
        {/* Subtle radial background glow - positioned differently */}
        <div 
          className="absolute top-[60%] left-[40%] -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: "radial-gradient(circle at 40% 60%, rgba(56,189,248,0.06) 0%, transparent 60%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className="text-sm md:text-base font-bold tracking-widest text-[#60a5fa] uppercase mb-4 relative inline-block group">
                  Create Custom Forms
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#60a5fa]/40 origin-left transition-transform duration-300 group-hover:scale-y-150"
                  />
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-[520px] mt-6 font-medium group transition-colors duration-500"
              >
                Capture your <span className="text-gray-400 group-hover:text-[#60a5fa] transition-colors duration-300">data</span> and inputs with personalized questions through our customizable <span className="text-gray-400 group-hover:text-[#60a5fa] transition-colors duration-300">forms</span>, ensuring accurate and relevant information input.
              </motion.p>

              {/* Sub-block (Highlight Feature) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="mt-10 pt-8 border-t border-gray-200/60 max-w-[420px] flex items-start gap-4 group cursor-default"
              >
                <div className="mt-1.5 w-1.5 h-1.5 bg-[#38bdf8] rounded-sm shrink-0 group-hover:rotate-45 transition-transform duration-300" />
                <div>
                  <h4 className="text-[#38bdf8] font-bold text-base md:text-lg mb-2 tracking-wide group-hover:brightness-110 transition-all duration-300">
                    GUIDED DATA ENTRY
                  </h4>
                  <p className="text-[#71717a] font-medium text-base">
                    Use master data picklists and smart routing to ensure accuracy and consistency
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: Image with very stable, controlled floating animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group"
            >
              {/* Very subtle blur behind image */}
              <div className="absolute inset-0 bg-[#38bdf8]/5 blur-3xl rounded-xl scale-95 transform translate-y-2 transition-all duration-700 group-hover:bg-[#38bdf8]/10" />
              
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="/form-dashboard.png" 
                  alt="Custom Forms and Guided Input" 
                  className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-transform duration-700 ease-out rounded-xl border border-gray-100/40"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Thin Divider Between Sections */}
      <div className="w-full flex justify-center bg-[#fafafa]">
        <div className="w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-40"></div>
      </div>

      {/* Architecture Section: 3-Tier Data Approach */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#fafafa]">
        
        {/* Subtle radial background glow - positioned differently */}
        <div 
          className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: "radial-gradient(circle at 50% 30%, rgba(56,189,248,0.06) 0%, transparent 60%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Image with controlled floating animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group"
            >
              {/* Very subtle blur behind image */}
              <div className="absolute inset-0 bg-[#38bdf8]/5 blur-3xl rounded-xl scale-95 transform translate-y-2 transition-all duration-700 group-hover:bg-[#38bdf8]/10" />
              
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="/architecture-diagram.png" 
                  alt="3-Tier Data Architecture Diagram" 
                  className="w-full h-auto object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
              </motion.div>
            </motion.div>

            {/* Right: Text Content & 3-Tier List */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className="text-sm md:text-base font-bold tracking-widest text-[#60a5fa] uppercase mb-4 relative inline-block group">
                  3-Tier Data Approach and Integration
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#60a5fa]/40 origin-left transition-transform duration-300 group-hover:scale-y-150"
                  />
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-[520px] mt-6 font-medium"
              >
                Leveraging a 3-tier data approach and API integration optimizes your data ecosystem, enabling seamless data management and unlocking new possibilities for your business.
              </motion.p>

              {/* Tiers List */}
              <div className="mt-10 relative pl-8">
                {/* Thin vertical accent line */}
                <div className="absolute left-[11px] top-4 bottom-6 w-px bg-gradient-to-b from-gray-300 via-gray-200 to-transparent"></div>
                
                <div className="flex flex-col gap-8">
                  {/* Tier 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    className="relative group cursor-default flex flex-col"
                  >
                    <div className="absolute -left-[32px] top-0.5 bg-[#fafafa] p-1 rounded-full text-gray-400 group-hover:text-[#38bdf8] transition-colors duration-300">
                      <Database className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-gray-800 font-bold text-sm md:text-base tracking-wide mb-1 group-hover:text-[#38bdf8] transition-colors duration-300">
                      DATA STORAGE LAYER
                    </h4>
                    <p className="text-[#71717a] text-base max-w-[400px]">
                      Securely stores and manages data in a centralized repository.
                    </p>
                  </motion.div>

                  {/* Tier 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                    className="relative group cursor-default flex flex-col"
                  >
                    <div className="absolute -left-[32px] top-0.5 bg-[#fafafa] p-1 rounded-full text-gray-400 group-hover:text-[#38bdf8] transition-colors duration-300">
                      <ServerCog className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-gray-800 font-bold text-sm md:text-base tracking-wide mb-1 group-hover:text-[#38bdf8] transition-colors duration-300">
                      DATA PROCESSING LAYER
                    </h4>
                    <p className="text-[#71717a] text-base max-w-[400px]">
                      Handles data transformation, validation, and business logic.
                    </p>
                  </motion.div>

                  {/* Tier 3 */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                    className="relative group cursor-default flex flex-col"
                  >
                    <div className="absolute -left-[32px] top-0.5 bg-[#fafafa] p-1 rounded-full text-gray-400 group-hover:text-[#38bdf8] transition-colors duration-300">
                      <MonitorSmartphone className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-gray-800 font-bold text-sm md:text-base tracking-wide mb-1 group-hover:text-[#38bdf8] transition-colors duration-300">
                      DATA PRESENTATION LAYER
                    </h4>
                    <p className="text-[#71717a] text-base max-w-[400px]">
                      Provides an intuitive interface for users to interact with the data.
                    </p>
                  </motion.div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Thin Divider Between Sections */}
      <div className="w-full flex justify-center bg-[#fafafa]">
        <div className="w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-40"></div>
      </div>

      {/* Contract Execution Section: DocuSign Integration */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#fafafa]">
        
        {/* Subtle radial background glow - positioned differently */}
        <div 
          className="absolute top-[65%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px]"
          style={{ background: "radial-gradient(circle at 35% 65%, rgba(56,189,248,0.06) 0%, transparent 60%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h3 className="text-sm md:text-base font-bold tracking-widest text-[#60a5fa] uppercase mb-4 relative inline-block group">
                  DocuSign Integration for Contract Signatures
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#60a5fa]/40 origin-left transition-transform duration-300 group-hover:scale-y-150"
                  />
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed max-w-[520px] mt-6 font-medium group transition-colors duration-500"
              >
                Seamlessly manage <span className="text-gray-400 group-hover:text-[#60a5fa] transition-colors duration-300">contract</span> approvals with integrated <span className="text-gray-400 group-hover:text-[#60a5fa] transition-colors duration-300">DocuSign</span> workflows. Send, track, and finalize documents in real time, ensuring secure, compliant, and efficient signature processes across your organization.
              </motion.p>

              {/* Sub-block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                className="mt-10 pt-8 border-t border-gray-200/60 max-w-[420px] flex items-start gap-4 group cursor-default"
              >
                <div className="mt-1.5 w-1.5 h-1.5 bg-[#38bdf8] rounded-full shrink-0 group-hover:scale-150 transition-transform duration-300" />
                <div>
                  <h4 className="text-[#38bdf8] font-bold text-base md:text-lg mb-2 tracking-wide group-hover:brightness-110 transition-all duration-300">
                    SIGNATURE WORKFLOWS
                  </h4>
                  <p className="text-[#71717a] font-medium text-base">
                    Automate document routing, track signing status, and eliminate manual follow-ups with fully integrated approval flows.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: Image with very stable, minimal floating animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative group"
            >
              {/* Very subtle blur behind image */}
              <div className="absolute inset-0 bg-[#38bdf8]/5 blur-3xl rounded-xl scale-95 transform translate-y-2 transition-all duration-700 group-hover:bg-[#38bdf8]/10" />
              
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="/docusign-dashboard.png" 
                  alt="DocuSign Contract Integration Dashboard" 
                  className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:scale-[1.01] transition-transform duration-700 ease-out rounded-xl border border-gray-100/40"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
