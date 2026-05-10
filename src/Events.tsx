import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

// Standard Icon Imports
import { CheckCircle2 as CheckIcon } from "lucide-react";
import { ArrowRight as ArrowIcon, Calendar as CalendarIcon, MapPin as MapPinIcon, Clock as ClockIcon, ChevronDown as DownIcon, ChevronUp as UpIcon } from "lucide-react";

interface EventCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  objectives?: string[];
  date?: string;
  location?: string;
  link?: string;
  buttonText?: string;
  isClickableCard?: boolean;
  imagePosition?: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] }
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

// Animation Variants for Horizontal Card
const cardSectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const imageFadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const titleSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const contentFadeInDelay = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
  }
};

function EventCard({ 
  image, 
  title, 
  subtitle,
  description, 
  objectives,
  date, 
  location, 
  link = "#", 
  buttonText = "Access Event",
  isClickableCard = false,
  imagePosition = "object-center"
}: EventCardProps) {
  const CardWrapper = isClickableCard ? 'a' : 'div';
  
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
    >
      <CardWrapper 
        href={isClickableCard ? link : undefined}
        target={isClickableCard ? "_blank" : undefined}
        rel={isClickableCard ? "noopener noreferrer" : undefined}
        className="flex flex-col h-full cursor-pointer"
      >
        <div className="relative h-64 overflow-hidden bg-gray-50">
          <img 
            src={image} 
            alt={title} 
            className={`w-full h-full object-cover ${imagePosition} transition-transform duration-700 group-hover:scale-105`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="p-8 flex flex-col flex-1">
          {(date || location) && (
            <div className="flex flex-wrap gap-4 mb-4 text-[10px] font-black text-blue-600 uppercase tracking-widest">
              {date && (
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-3 h-3" />
                  {date}
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1.5">
                  <MapPinIcon className="w-3 h-3" />
                  {location}
                </div>
              )}
            </div>
          )}
          
          <h3 className="text-2xl font-black mb-2 tracking-tight leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {subtitle && (
            <p className="text-sm font-bold text-gray-400 mb-4 leading-tight">
              {subtitle}
            </p>
          )}
          
          <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
            {description}
          </p>

          {objectives && (
            <div className="space-y-2 mb-8">
              {objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-medium text-gray-600">
                  <CheckIcon className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          )}
          
          {!isClickableCard && (
            <div className="mt-auto">
              <a 
                href={link}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 self-start"
              >
                {buttonText}
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          )}
        </div>
      </CardWrapper>
    </motion.div>
  );
}

function FeaturedEventCard() {
  const [isAgendaOpen, setIsAgendaOpen] = useState(false);

  const agenda = [
    { time: "9:00 AM EST", session: "Keynote Session", duration: "15 min" },
    { time: "9:30 AM EST", session: "Reimagining Surgical Scheduling", duration: "1 hour" },
    { time: "10:45 AM EST", session: "Connecting the Consumer and Supply Chain", duration: "1 hour" },
    { time: "12:00 PM EST", session: "Integrating Workflows Through Automation", duration: "1 hour" },
    { time: "1:15 PM EST", session: "Driving Value Through Interoperability", duration: "1 hour" },
    { time: "2:30 PM EST", session: "Supply Chain & Revenue Cycle Alignment", duration: "1 hour" },
    { time: "3:45 PM EST", session: "Panel Discussion", duration: "1 hour" },
  ];

  return (
    <motion.div
      variants={fadeIn}
      className="bg-white rounded-[3rem] overflow-hidden border border-black/10 shadow-xl hover:shadow-2xl transition-all duration-700 mb-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Image Section */}
        <div className="lg:col-span-5 relative h-[400px] lg:h-auto overflow-hidden">
          <img 
            src="/breaking-silos.png" 
            alt="Breaking Silos Virtual Event 2023" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
          <div className="absolute top-8 left-8">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
              Featured Event
            </span>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col">
          <div className="flex flex-wrap gap-6 mb-8 text-[11px] font-black text-blue-600 uppercase tracking-widest border-b border-black/5 pb-8">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Thursday, January 19th, 2023
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              9:00 AM ET
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4" />
              1-Day Virtual Conference
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-4 text-paradigm-blue">
              BREAKING SILOS VIRTUAL EVENT 2023
            </h2>
            <p className="text-xl font-bold text-gray-400 tracking-tight">
              Building an Interoperable Healthcare Ecosystem
            </p>
          </div>

          <p className="text-lg text-gray-600 font-medium leading-relaxed mb-10 max-w-2xl">
            A full-day virtual conference focused on breaking down silos in healthcare by enabling interoperability, connecting systems, and aligning clinical, operational, and supply chain workflows.
          </p>

          {/* Agenda Section */}
          <div className="mb-10">
            <button 
              onClick={() => setIsAgendaOpen(!isAgendaOpen)}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-900 hover:text-blue-600 transition-colors mb-4"
            >
              {isAgendaOpen ? <UpIcon className="w-4 h-4" /> : <DownIcon className="w-4 h-4" />}
              {isAgendaOpen ? "Hide Agenda" : "View Agenda"}
            </button>

            <AnimatePresence>
              {isAgendaOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 py-4 border-l-2 border-blue-600/20 ml-2 pl-6">
                    {agenda.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
                      >
                        <span className="text-[10px] font-black text-blue-600 w-24 shrink-0">{item.time}</span>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">{item.session}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{item.duration}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-8 border-t border-black/5 flex flex-wrap gap-4">
            <a 
              href="https://event.on24.com/eventRegistration/EventLobbyServlet?target=reg20.jsp&eventid=4025005&sessionid=1&key=E811E2FF69D856CD80DFC713ACAD57FE&groupId=4338393&sourcepage=register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-black text-white rounded-full text-base font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-black/10"
            >
              Register / Access Content
              <ArrowIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HorizontalEventCard({ 
  image, 
  title, 
  subtitle,
  description, 
  objectives,
  date, 
  location, 
  link = "#", 
  imagePosition = "object-center"
}: EventCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={cardSectionVariants}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 mb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Left: Image */}
        <motion.div 
          variants={imageFadeScale}
          className="md:col-span-5 lg:col-span-4 relative h-[400px] md:h-auto overflow-hidden bg-white"
        >
          <img 
            src={image} 
            alt={title} 
            className={`w-full h-full object-cover ${imagePosition} transition-transform duration-700 group-hover:scale-105`}
          />
        </motion.div>

        {/* Right: Content */}
        <div className="md:col-span-7 lg:col-span-8 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <motion.div 
            variants={contentFadeInDelay}
            className="flex flex-wrap gap-6 mb-8 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-black/5 pb-8"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {date}
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              {location}
            </div>
          </motion.div>

          <motion.h2 
            variants={titleSlideUp}
            className="text-3xl md:text-5xl font-black tracking-tighter leading-none mb-6 text-paradigm-blue group-hover:text-blue-600 transition-colors"
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.h3 
              variants={titleSlideUp}
              className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-tight border-l-4 border-blue-600 pl-6"
            >
              {subtitle}
            </motion.h3>
          )}

          <motion.p 
            variants={contentFadeInDelay}
            className="text-lg text-gray-500 font-medium leading-relaxed mb-10 max-w-2xl"
          >
            {description}
          </motion.p>

          {objectives && (
            <motion.div 
              variants={contentFadeInDelay}
              className="space-y-6 max-w-2xl"
            >
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-600">Learning Objectives</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                {objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm font-semibold text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const otherEvents = [
    {
      title: "GHX SUMMIT 2022",
      subtitle: "Reshaping Supply Chain to Evolve with Care Moving Beyond Traditional Settings",
      description: "Care is moving to less complex settings to benefit patients. However, supply chain logistics becomes more complicated. In this session, we explore the challenges in redesigning the healthcare supply chain.",
      objectives: [
        "Understand evolving healthcare supply chain models",
        "Identify challenges in distributed environments",
        "Learn strategies for real-time delivery and coordination"
      ],
      image: "/ghx-summit.png",
      imagePosition: "object-[center_20%]",
      date: "Sunday April 10th, 2022",
      location: "Speaker: Vincent Matozzo",
      link: "#",
      isClickableCard: true
    },
    {
      title: "IDN Summit and Reverse Expo 2022",
      subtitle: "Executive Leadership Track: Presenting your Data.",
      description: "Clean, quality data is the foundation of building better outcomes in the healthcare setting, from both the cost and quality perspectives. This discussion explores how to use data to make an impact and improve decision-making through better visualization, integrity, and management.",
      objectives: [
        "Discuss data sources that are impactful to your organization",
        "Identify tools and platforms driving increased efficiencies",
        "Outline strategies to improve data analysis and management"
      ],
      image: "/idn-summit.png",
      imagePosition: "object-[center_28%]",
      date: "Sunday April 10th, 2022",
      location: "Speaker: Vincent Matozzo",
      link: "#",
      isClickableCard: true
    }
  ];

  const idnSummit2021 = {
    title: "IDN SUMMIT AND REVERSE EXPO 2021",
    subtitle: "Executive Leadership Track: AI in the Supply Chain",
    description: "Supply chain executives have a lot of conflicting thoughts about artificial intelligence (AI). They're intrigued about it, but also sometimes confused and a bit skeptical that AI can be a powerful tool to optimize supply chain operations, reduce spending waste, and ensure supply chain continuity for improved patient care. During this session we’ll discuss how to leverage AI to optimize your supply chain organization; from product production to improved workflows to enhanced patient use of AI technologies as we evolve into a more holistic patient health experience.",
    objectives: [
      "Analyze strategies to leverage artificial intelligence in the supply chain.",
      "Describe artificial intelligence’s role in improving patient outcomes.",
      "Evaluate strategies to implement AI technologies in your supply chain."
    ],
    image: "/idn-summit-red.png",
    date: "Monday August 30th, 2021 | 2:30 PM – 3:30 PM",
    location: "Speaker: Vincent Matozzo",
    link: "#"
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans pt-40 pb-20">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.div 
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase mb-8"
          >
            Insights & Thought Leadership
          </motion.div>
          <motion.h1 
            variants={fadeIn}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8"
          >
            Events
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl text-gray-500 leading-relaxed font-medium"
          >
            Explore Paradigm's latest events, insights, and thought leadership sessions designed to help organizations simplify complexity and accelerate transformation.
          </motion.p>
        </motion.div>
      </section>

      {/* FEATURED EVENT SECTION */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerContainer}
        >
          <FeaturedEventCard />
        </motion.div>
      </section>

      {/* RESTORED 2021 EVENT SECTION (Horizontal) */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerContainer}
        >
          <HorizontalEventCard {...idnSummit2021} />
        </motion.div>
      </section>

      {/* OTHER EVENTS GRID */}
      <section className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {otherEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </motion.div>
      </section>

    </main>
  );
}
