// page.tsx (Next.js with Tailwind CSS & Framer Motion)
'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence, Variants } from 'framer-motion';
import { MapPin, Phone, Mail, Youtube, Building2, Home, Settings, Trophy, Box, ChevronLeft, ChevronRight, Search } from 'lucide-react';

// --- Placeholder Components / Utilities ---

const OptimizedImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  // In a real project, use Next/Image: <Image src={src} alt={alt} layout="fill" objectFit="cover" />
  <div className={`relative bg-neutral-200 overflow-hidden ${className}`}>
    <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-bold text-lg">
      <img 
              src="/stěhování" 
              alt="Stěhování" 
              className="w-full h-full object-cover"
              onError={(e) => {
                 // Fallback pro demo
                 e.currentTarget.src = "";
              }}
            />
    </div>
  </div>
);

const SectionHeadline = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <div className="mb-20 md:mb-32">
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-neutral-500 font-mono text-sm uppercase tracking-widest mb-4"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        className="font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none text-neutral-950"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
        }}
      >
        {title.split(' ').map((word, index) => (
          <span key={index} className="inline-block mr-3 md:mr-5">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, scaleY: 0.2, transformOrigin: 'top' },
                  visible: { opacity: 1, scaleY: 1, transition: { delay: index * 0.1 + charIndex * 0.03, duration: 1.5, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h2>
    </div>
  );
};

// --- Framer Motion Helper ---
const stager: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemAppear: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};


// --- Data Structures ---
const services = [
  { icon: Home, title: "STĚHOVÁNÍ", text: "Byty, kanceláře, firmy, státní organizace.", cta: "CHCI PŘESTĚHOVAT" },
  { icon: Box, title: "STĚHOVÁNÍ STROJŮ", text: "Strojních technologií, výrobních celků.", cta: "TĚŽKÁ BŘEMENA A STROJE" },
  { icon: Trophy, title: "SPECIÁLNÍ JEŘÁB & VZV", text: "Halové jeřáby, autodoprava, nadměrná přeprava.", cta: "POTŘEBUJI JEŘÁB" },
  { icon: Settings, title: "KARDEX", text: "Demontáže, montáže, manipulace kardexů.", cta: "MONTÁŽ KARDEXŮ" },
];

const testimonials = [
  { logo: 'GMP', text: '“Příprava i realizace proběhla výborně zejména díky velké odbornosti a flexibilitě zaměstnanců a odpovídajícímu technickému vybavení.”', author: 'G.M.P.' },
  { logo: 'META', text: '“vystavuji tímto referenční list pro firmu Richard Vosika AAA-RIVO list za provedené stěhování strojní výroby z německého Arnsbergu do Českých Budějovic...”', author: 'META Skladovací technika s.r.o.' },
  { logo: 'GEMAX', text: '“...spolupráce s nimi byla skvělá a jasně dokázali, že v manipulaci v omezeném prostoru jsou velmi zkušení...”', author: 'GEMAX s.r.o.' },
];

const stats = [
  { icon: Trophy, value: 29, label: "LET S VÁMI" },
  { icon: Building2, value: 5654, label: "PŘESTĚHOVANÝCH FIREM" },
  { icon: Home, value: 14890, label: "PŘESTĚHOVANÝCH BYTŮ" },
  { icon: Settings, value: 48950, label: "PŘESTĚHOVANÝCH STROJŮ" },
];


// --- Components for Sections ---

const CountingNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 1.5;
    let increment = Math.ceil(end / (totalDuration * 60)); // Aim for 60fps

    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toLocaleString('cs-CZ')}</span>;
};


// --- Main Page Component ---
const AAARIVOPage = () => {
  return (
    <div className="bg-neutral-50 min-h-screen text-neutral-900 font-sans antialiased overflow-x-hidden">
      
      {/* 1. Sticky Header & Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-neutral-50/90 backdrop-blur-sm border-b border-neutral-100">
        <nav className="max-w-[1700px] mx-auto flex items-center justify-between p-4 px-6 md:px-10 lg:p-6">
          <div className="flex items-center gap-2">
            <Box className="w-8 h-8 md:w-10 md:h-10 text-neutral-950" />
            <h1 className="font-extrabold text-2xl md:text-3xl tracking-tighter text-neutral-950">AAA-RIVO</h1>
          </div>
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {['Úvod', 'Služby', 'Vozový park', 'Fotogalerie', 'Ceník', 'Reference', 'Kontakt'].map((item, index) => (
              <li key={index} className="px-2 xl:px-3">
                <a href="#" className="font-medium text-neutral-700 hover:text-neutral-950 transition-colors duration-300 text-[15px]">{item}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-neutral-500 cursor-pointer hover:text-neutral-950 transition-colors" />
            <a href="tel:+420602408667" className="hidden sm:flex items-center gap-2.5 font-bold text-neutral-950 border border-neutral-200 px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-neutral-950 hover:text-neutral-50 transition-all">
              <Phone className="w-5 h-5 text-blue-600" />
              602 408 667
            </a>
          </div>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="relative h-[90vh] md:h-[95vh] flex items-center justify-center bg-white pt-24 pb-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-1 lg:col-span-7 pr-0 lg:pr-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-blue-600 font-mono text-sm sm:text-base uppercase tracking-widest mb-4"
            >
              Český specialista na stěhování s letitými zkušenostmi
            </motion.p>
            <motion.h1
              className="font-extrabold text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl tracking-tight leading-none text-neutral-950 mb-10 md:mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Dokážeme <span className="text-blue-600">pohnout</span> světem
            </motion.h1>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
              <a href="#quote" className="inline-flex items-center gap-3 font-bold text-neutral-50 bg-neutral-950 px-10 sm:px-12 py-5 sm:py-6 rounded-full hover:bg-blue-700 transition-all text-lg group">
                Získat Nezávaznou Nabídku
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className="inline-flex items-center gap-3 font-medium text-neutral-700 border border-neutral-200 px-10 sm:px-12 py-5 sm:py-6 rounded-full hover:border-neutral-950 hover:text-neutral-950 transition-all text-lg group">
                Zjistit Co Nabízíme
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <OptimizedImage
            src="/hero_image_placeholder.jpg"
            alt="Moving machinery with a massive Liebherr crane"
            className="hidden lg:block col-span-1 lg:col-span-5 aspect-[1/1] w-full h-full rounded-3xl"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-neutral-50 to-transparent"></div>
      </section>

      {/* 3. Services Section */}
      <section id="services" className="py-24 md:py-32 lg:py-40 px-6 md:px-10 lg:px-16 bg-neutral-50">
        <div className="max-w-[1600px] mx-auto">
          <SectionHeadline title="Vaše stěhování. Bezstarostně." subtitle="Specializace od A po Z" />
          <motion.div
            variants={stager}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemAppear}
                className="bg-white p-10 lg:p-12 rounded-3xl border border-neutral-100 hover:border-blue-100 transition-all group group-hover:shadow-2xl group-hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <service.icon className="w-16 h-16 md:w-20 md:h-20 text-neutral-950 mb-10 md:mb-12 border border-neutral-100 p-4 md:p-5 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-100 transition-all" />
                  <h3 className="font-extrabold text-3xl md:text-4xl tracking-tight text-neutral-950 mb-5 md:mb-6">{service.title}</h3>
                  <p className="text-neutral-600 text-lg md:text-xl font-normal leading-relaxed mb-10 md:mb-12">{service.text}</p>
                </div>
                <button className="inline-flex items-center gap-2.5 font-semibold text-neutral-950 hover:text-blue-700 transition-all text-lg group-hover:underline">
                  {service.cta}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Cinematic Video Presentation */}
      <section className="py-24 md:py-32 lg:py-40 px-6 md:px-10 lg:px-16 bg-white relative">
        <div className="max-w-[1600px] mx-auto">
          <SectionHeadline title="Vidět nás v akci." subtitle="Profesionální Přístup. Skvělé Výsledky." />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[16/9] w-full h-full bg-neutral-950 rounded-3xl overflow-hidden flex items-center justify-center relative group"
          >
            <OptimizedImage
              src="/video_still_placeholder.jpg"
              alt="Video presentation of AAA-RIVO moving a crane"
              className="absolute inset-0 aspect-[16/9] object-cover"
            />
            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center relative z-10 cursor-pointer hover:scale-110 transition-transform group-hover:bg-blue-50"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Youtube className="w-12 h-12 md:w-16 md:h-16 text-blue-600" />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                initial={{ opacity: 0, scale: 1.2 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent"></div>
            <p className="absolute bottom-8 lg:bottom-12 left-8 lg:left-12 font-semibold text-lg lg:text-xl text-neutral-100 group-hover:text-white transition-all">Video prezentace našich činností. Odhalte naše mistrovství.</p>
          </motion.div>
        </div>
      </section>

      {/* 5. Statistics with Count-up Animation */}
      <section className="py-24 md:py-32 lg:py-40 px-6 md:px-10 lg:px-16 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            variants={stager}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 lg:gap-14"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemAppear}
                className="bg-white p-10 md:p-12 lg:p-14 rounded-3xl border border-neutral-100 text-center flex flex-col items-center group hover:border-blue-100 transition-all hover:shadow-xl hover:-translate-y-2"
              >
                <stat.icon className="w-16 h-16 md:w-20 md:h-20 text-neutral-950 mb-10 md:mb-12 border border-neutral-100 p-4 rounded-full group-hover:bg-blue-50 group-hover:text-blue-700 transition-all" />
                <h4 className="font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none text-neutral-950 mb-5 md:mb-6">
                  <CountingNumber value={stat.value} />
                </h4 >
                <p className="text-neutral-600 text-base md:text-lg xl:text-xl font-medium uppercase tracking-widest leading-none group-hover:text-blue-700 transition-all">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-50 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-50 rounded-full blur-[100px] opacity-10"></div>
      </section>

      {/* 6. Testimonials Carousel Section */}
      <section className="py-24 md:py-32 lg:py-40 px-6 md:px-10 lg:px-16 bg-white overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto">
          <SectionHeadline title="Klienti. Důkaz naší síly." subtitle="Partnerství založené na důvěře" />
          
          <div className="relative group/carousel">
            <AnimatePresence mode="wait">
              <motion.div
                key={0}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12"
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="p-10 lg:p-12 border border-neutral-100 rounded-3xl bg-neutral-50 flex flex-col justify-between group-hover/card">
                    <div className="mb-10">
                      <div className="font-extrabold text-2xl md:text-3xl text-neutral-950 mb-10 uppercase tracking-tighter border border-neutral-200 p-3 rounded-lg bg-white inline-block">{testimonial.logo}</div>
                      <p className="text-neutral-700 text-lg md:text-xl font-normal leading-relaxed italic">{testimonial.text}</p>
                    </div>
                    <div className="border-t border-neutral-100 pt-8 mt-8">
                      <p className="text-neutral-950 font-bold text-lg">{testimonial.author}</p>
                      <p className="text-neutral-500 font-medium">Oficiální Reference</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <button className="absolute -left-12 top-1/2 -translate-y-1/2 w-16 h-16 bg-neutral-950 text-white rounded-full flex items-center justify-center border border-neutral-200 group-hover/carousel:opacity-100 opacity-0 group/carousel:left-12 transition-all hover:bg-neutral-800">
                <ChevronLeft className="w-8 h-8"/>
            </button>
             <button className="absolute -right-12 top-1/2 -translate-y-1/2 w-16 h-16 bg-neutral-950 text-white rounded-full flex items-center justify-center border border-neutral-200 group-hover/carousel:opacity-100 opacity-0 group/carousel:right-12 transition-all hover:bg-neutral-800">
                <ChevronRight className="w-8 h-8"/>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mt-20"
          >
            <a href="#references" className="inline-flex items-center gap-3 font-semibold text-neutral-950 border border-neutral-200 px-10 sm:px-12 py-5 sm:py-6 rounded-full hover:border-neutral-950 hover:text-neutral-950 transition-all text-lg group">
              Zobrazit Všechny Reference
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>


      {/* 7. Footer */}
      <footer className="py-20 px-6 md:px-10 lg:px-16 bg-neutral-950 text-neutral-100 mt-10 md:mt-16 rounded-t-[50px]">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20">
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between">
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-10 md:mb-12 border-b border-neutral-800 pb-8 md:pb-10">
                    <Box className="w-10 h-10 text-white" />
                    <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tighter text-white">AAA-RIVO</h2>
                </div>
                <p className="text-neutral-300 text-base md:text-lg xl:text-xl font-medium leading-relaxed mb-6">STĚHOVÁNÍ TĚŽKÝCH BŘEMEN A STROJŮ</p>
                <p className="text-neutral-400 text-base md:text-lg font-normal leading-relaxed">Česká jednička s dlouholetými zkušenostmi ve stěhování strojů, těžkých břemen, firem a domácností. Disposujeme adekvátní manipulační techniku a naším cílem je poskytovat co nejlepší profesionální služby v nejvyšší kvalitě.</p>
            </div>
            <p className="text-neutral-500 font-normal">Copyright © AAA-RIVO 2026. All rights reserved.</p>
          </div>

          <div className="col-span-1 lg:col-span-7 grid grid-cols-2 xl:grid-cols-3 gap-10 md:gap-14 border-l border-neutral-800 pl-10 md:pl-12 lg:pl-16">
            
            <div>
              <h5 className="font-bold text-xl text-white uppercase tracking-widest mb-10 border-b border-neutral-800 pb-6">Navigace</h5>
              <ul className="flex flex-col gap-4 text-neutral-300">
                {['Stěhování', 'Mapa stránek', 'Partnerské stránky', 'Nastavení cookies'].map((item, index) => (
                  <li key={index}><a href="#" className="font-medium hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 xl:col-span-1 border-t border-neutral-800 xl:border-none pt-10 xl:pt-0">
                <h5 className="font-bold text-xl text-white uppercase tracking-widest mb-10 border-b border-neutral-800 pb-6">Rychlý Kontakt</h5>
                <ul className="flex flex-col gap-8 md:gap-10 text-neutral-300">
                    <li className="flex items-start gap-4">
                        <MapPin className="w-6 h-6 md:w-7 md:h-7 text-neutral-400 mt-1"/>
                        <p className="text-base md:text-lg leading-relaxed"><span className="font-semibold text-neutral-100">AAA-RIVO</span><br/> Vidov 125<br/> České Budějovice</p>
                    </li>
                    <li className="flex items-center gap-4 hover:text-white group">
                         <a href="tel:+420602408667" className="inline-flex items-center gap-4 text-base md:text-lg font-medium">
                            <Phone className="w-6 h-6 md:w-7 md:h-7 text-blue-600 group-hover:scale-110 transition-transform"/>
                            (+420) 602 408 667
                        </a>
                    </li>
                    <li className="flex items-center gap-4 hover:text-white group">
                         <a href="mailto:vosika@aaarivo.cz" className="inline-flex items-center gap-4 text-base md:text-lg font-medium">
                            <Mail className="w-6 h-6 md:w-7 md:h-7 text-red-600 group-hover:scale-110 transition-transform"/>
                            vosika@aaarivo.cz
                        </a>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AAARIVOPage;