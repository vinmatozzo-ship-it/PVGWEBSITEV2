import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, ChevronRight } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.45, 0.32, 0.9] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

interface MediaItem {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  link: string;
  image: string;
  date?: string;
  speakers?: string;
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: "Securing the Chain: Endpoint Security throughout Supply Chain and Logistics",
    description: "In a world where cyber-attacks have caused disruptions for 60% of organizations and with over 70% of supply chain breaches owing to vulnerabilities in third-party endpoints, securing the supply chain and logistics sector is of utmost importance!\n\nSpeakers provided valuable insights on strengthening security in logistics and the supply chain.",
    speakers: "Susan Farrell, Roman Zhukov, Wolfgang Lehmacher, Vincent Matozzo, and Rachael White.",
    date: "This event was aired on June 15th, 2023 | 10 AM CST.",
    ctaText: "Access the Recording",
    link: "https://www.hexnode.com/events/hexnode-live/securing-the-chain-endpoint-security-throughout-supply-chain-and-logistics/",
    image: "/2f8f4bb5-6551-4244-a713-0234a7b22f2c.png"
  },
  {
    id: 2,
    title: "The Speed of Savings: interoperability. Power Supply Media 9/7/2021",
    description: "Machine learning and artificial intelligence are driving innovation and creating the tools that will take Supply Chain to the next level. In this week's episode of Power Supply, Vincent Matozzo CEO & Managing Partner at Paradigm Venture Group LLC joins the rest of the team to share his vision for the future of Supply Chain and what can be done today to view aggregated data from disparate platforms and make that information work for you! With the proper guardrails and governance in place, we can then begin to put these tools to work so that we learn faster, drive outcomes and become more resilient. But first, we need to connect each of these tools so that they can work together with sophisticated dashboards that are targeting the right metrics.",
    ctaText: "Find Out More",
    link: "#",
    image: "/4a17e5ef-48b2-451a-a9a0-87ea3597bdea.png"
  },
  {
    id: 3,
    title: "The Healthcare Leadership Experience with Lisa Miller Episode 7",
    description: "Interview featuring Vin Matozzo / Paradigm discussing \"Being Intentional with your Hospital Supply Chain Strategy.\"",
    ctaText: "Access the Recording",
    link: "#",
    image: "/5bdab12b-246d-4ca2-88e7-3cd1041891d1.png"
  },
  {
    id: 4,
    title: "Expert Series Conference: Panel Interviews with Industry Leaders",
    description: "Exclusive interview with Vincent Matozzo & Shawn Kenavan was featured in the Value Analysis Magazine.",
    date: "This article was posted on June 6th, 2022.",
    ctaText: "Access the Article",
    link: "#",
    image: "/26d06bc0-4215-4743-b663-3707e755b7ef.png"
  },
  {
    id: 5,
    title: "Beyond Clean Podcast",
    description: "Discussing Interoperability of Data. Podcast featuring Vin Matozzo / Paradigm.",
    ctaText: "Access the Recording",
    link: "#",
    image: "/929afe9f-9540-4b20-90c9-bb86e5b964a5.png"
  },
  {
    id: 6,
    title: "Power Supply \"The Speed of Savings\" Episode.",
    description: "Machine learning and artificial intelligence are driving innovation and creating the tools that will take Supply Chain to the next level. In this week's episode of Power Supply, Vincent Matozzo CEO & Managing Partner at Paradigm Venture Group LLC joins the rest of the team to share his vision for the future of Supply Chain and what can be done today to view aggregated data from disparate platforms and make that information work for you! With the proper guardrails and governance in place, we can then begin to put these tools to work so that we learn faster, drive outcomes and become more resilient.  But first, we need to connect each of these tools so that they can work together with sophisticated dashboards that are targeting the right metrics.",
    ctaText: "Listen Here",
    link: "https://zcu.io/nikk",
    image: "/ab2c490b-59eb-4a02-9237-0891c4a6eb50.png"
  },
  {
    id: 7,
    title: "Beyond Clean Podcast",
    description: "Discussing Interoperability of Data. Podcast featuring Vin Matozzo / Paradigm.",
    ctaText: "Access the Recording",
    link: "#",
    image: "/b4179839-f561-4486-96c5-ccc7ca0e3392.png"
  },
  {
    id: 8,
    title: "GHX Summit 2020 Digital Connect",
    description: "Moving to a cloud based ERP.",
    ctaText: "Find Out More",
    link: "#",
    image: "/ca701a8a-8646-4f11-bd88-307148566a7f.png"
  },
  {
    id: 9,
    title: "Healthcare Value Analysis & Utilization Management Magazine Leadership Interview Questions",
    description: "Exclusive Interview with Vincent Matozzo & Shawn Kenavan was featured in the Value Analysis Magazine.",
    date: "June 6th, 2022",
    ctaText: "Access the Article",
    link: "https://valueanalysismag.com/healthcare-value-analysis-utilization-management-magazine-leadership-interview-questions-with-vincent-matozzo-shawn-kenavan/",
    image: "/f4bf52ee-613c-4170-a85f-8d0f2c3e1521.png"
  },
  {
    id: 10,
    title: "Supply Chain Partners Virtual Summit June 2023",
    description: "The most prominent event for B2B firms, offering sought-after insights and strategies from leading industry experts who address critical issues and educate the global business world on business and supply chain topics impacting and shaping the industry.\n\nThis global Virtual Summits attracted business and supply chain professionals from Australia, United States of America, India, Indonesia, Pakistan, Nigeria, Mexico, Egypt, Turkey, Germany, Thailand, United Kingdom, South Africa, Canada, Saudi Arabia, Malaysia, Mali, Netherlands, United Arab Emirates, Austria, Singapore, New Zealand, Ethiopia, Sweden, Fiji and Barbados.",
    ctaText: "Find out more",
    link: "https://www.supplychainpartners.co/events/supply-chain-partners-virtual-summit-june-2023",
    image: "/f5260b49-c53e-4d4a-88e3-247799450c25.png"
  },
  {
    id: 11,
    title: "\"Why is interoperability so elusive?\" PowerSupply Expert Series January, 2022",
    description: "We're excited for another release of our 2022 Interoperability Power Supply #ExpertSeries with Vincent Matozzo this week! Download the this release here: https://lnkd.in/d8uUhy_a Is your healthcare organization still operating in disconnected silos? Are you looking to become more agile and use lean methodologies to drive your supply chain ecosystem? To help our growing audience better understand the potentials of greater interoperability within your health system, we are excited to announce our newest Power Supply Expert Series™ with subject matter expert, Vincent Matozzo!",
    ctaText: "Access the Recording",
    link: "https://lnkd.in/d8uUhy_a",
    image: "/f83217ed-f9ee-47e6-9db7-4eb4a23871c6.png"
  },
];

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeIn}
      className="group flex flex-col md:flex-row items-center gap-10 md:gap-16 py-16 md:py-24 border-b border-black/5 last:border-b-0 cursor-pointer"
    >
      <div className="md:w-1/2 flex-shrink-0 w-full">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-auto object-contain rounded-xl drop-shadow-md transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
      
      <div className="md:w-1/2 flex flex-col justify-center max-w-2xl">
        {(item.date || item.speakers) && (
          <div className="flex flex-wrap gap-4 mb-6 text-[11px] font-black text-blue-600 uppercase tracking-widest">
            {item.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </div>
            )}
            {item.speakers && (
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span className="line-clamp-1" title={item.speakers}>{item.speakers}</span>
              </div>
            )}
          </div>
        )}
        
        <h2 className="text-2xl md:text-3xl font-black mb-6 tracking-tight leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h2>

        <div className="text-gray-500 text-base font-medium leading-relaxed mb-8 whitespace-pre-wrap">
          {item.description}
        </div>
        {item.link !== "#" && (
          <div className="mt-auto flex items-center gap-1.5 text-[13px] font-black text-[#2a7698] uppercase tracking-widest group-hover:text-blue-700 transition-colors">
            <span className="border-b-[1.5px] border-[#2a7698] group-hover:border-blue-700 pb-0.5 transition-colors">{item.ctaText}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </motion.a>
  );
}

export default function MediaAndArticles() {
  return (
    <main className="min-h-screen bg-white text-black font-sans pt-40 pb-24">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl"
        >
          <motion.div 
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase mb-8"
          >
            Insights & Thought Leadership
          </motion.div>
          <motion.h1 
            variants={fadeIn}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8 text-gray-900"
          >
            Media and Articles
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl text-gray-500 leading-relaxed font-medium"
          >
            Explore Paradigm's media appearances, interviews, webinars, podcasts, and thought leadership content.
          </motion.p>
        </motion.div>
      </section>

      {/* MEDIA LIST */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col">
          {mediaItems.map((item) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={staggerContainer}
            >
              <MediaCard item={item} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
