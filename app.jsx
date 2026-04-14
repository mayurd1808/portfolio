import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Download, 
  Code, 
  Database, 
  Cpu, 
  Globe, 
  ChevronRight, 
  Menu, 
  X, 
  Moon, 
  Sun,
  Shield,
  Plane,
  MessageSquare,
  Award,
  BookOpen,
  Briefcase,
  Terminal,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// --- Theme & Configuration ---
const USER_DATA = {
  name: "Mayur Deshmukh",
  firstName: "Mayur",
  lastName: "Deshmukh",
  title: "Full-Stack Engineer & AI Enthusiast",
  tagline: "Building scalable backend architectures and intelligent user experiences.",
  summary: "Computer Science Engineering student specializing in Java ecosystems and Python-based AI models. I bridge the gap between complex backend logic and seamless frontend interactions.",
  email: "mayur.d1808@gmail.com",
  linkedin: "https://www.linkedin.com/in/mayur-deshmukh-55080232a/",
  github: "https://github.com/",
};

const SKILLS = [
  { category: "Languages", items: ["Python", "Java", "JavaScript", "C++"], color: "indigo" },
  { category: "Backend", items: ["Spring Boot", "Node.js", "REST APIs"], color: "emerald" },
  { category: "AI / ML", items: ["Machine Learning", "NLP", "LLM Integration"], color: "rose" },
  { category: "Cloud & DB", items: ["Firebase", "MongoDB", "MySQL", "AWS"], color: "amber" }
];

const PROJECTS = [
  {
    title: "Smart Discussion Forum",
    description: "A full-stack ecosystem with automated AI moderation. Uses NLP to analyze sentiment and filter toxicity in real-time.",
    tech: ["React", "Node.js", "MongoDB", "TensorFlow.js"],
    icon: <MessageSquare className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-600",
    featured: true
  },
  {
    title: "Travel Itinerary Planner",
    description: "Intelligent route optimization and budget tracking for personalized travel experiences.",
    tech: ["Java", "Spring Boot", "MySQL"],
    icon: <Plane className="w-6 h-6" />,
    gradient: "from-emerald-400 to-cyan-500",
    featured: true
  },
  {
    title: "Women Safety App",
    description: "Critical safety tool with real-time location streaming and instant emergency SOS triggers.",
    tech: ["Python", "Firebase", "Google Maps API"],
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-rose-400 to-orange-500",
    featured: false
  }
];

// --- Sub-components ---

const BackgroundEffect = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]"></div>
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
  </div>
);

const SectionHeader = ({ title, subtitle, align = 'left' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4"
    >
      <Sparkles size={14} />
      {subtitle}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="group relative h-full flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
  >
    <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />
    <div className="p-8 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-lg shadow-indigo-500/20`}>
          {project.icon}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button aria-label="Github" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white transition-colors"><Github size={18}/></button>
          <button aria-label="Demo" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white transition-colors"><ExternalLink size={18}/></button>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        {project.tech.map((t, i) => (
          <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full group-hover:bg-indigo-500/10 group-hover:text-indigo-600 transition-colors">
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Main Application ---

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 transition-colors duration-500">
        <BackgroundEffect />
        
        {/* Progress Bar */}
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[100] origin-left" style={{ scaleX }} />

        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className={`flex justify-between items-center rounded-2xl transition-all duration-500 ${scrolled ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 px-6 py-3 shadow-xl shadow-black/5' : 'px-0'}`}>
              <div className="text-2xl font-black flex items-center gap-2 group cursor-default">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform">MD</div>
                <span className="hidden sm:block tracking-tighter">Mayur.<span className="text-indigo-600">D</span></span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-8 mr-4">
                  {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase()}`}
                      className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                    </a>
                  ))}
                </div>
                <div className="flex items-center gap-2 pl-6 border-l border-slate-200 dark:border-slate-800">
                  <button 
                    onClick={() => setIsDark(!isDark)}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-indigo-500/20 transition-all"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                  <a href="#contact" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25">
                    Let's Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main>
          <section className="relative min-h-screen flex items-center pt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest"
                >
                  <Terminal size={14} /> Available for 2025 Internships
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
                >
                  Crafting <span className="text-indigo-600">Digital</span> Intelligence.
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-slate-600 dark:text-slate-400 max-w-xl font-medium leading-relaxed"
                >
                  {USER_DATA.tagline} {USER_DATA.summary}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <a href="#projects" className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center gap-3 transition-all hover:gap-5 shadow-2xl shadow-indigo-600/30">
                    View My Work <ArrowRight size={20} />
                  </a>
                  <button className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    <Download size={20} /> Resume
                  </button>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.5 }}
                   className="flex items-center gap-6 pt-8 text-slate-400"
                >
                  <a href={USER_DATA.github} className="hover:text-indigo-600 transition-colors"><Github size={24}/></a>
                  <a href={USER_DATA.linkedin} className="hover:text-indigo-600 transition-colors"><Linkedin size={24}/></a>
                  <a href={`mailto:${USER_DATA.email}`} className="hover:text-indigo-600 transition-colors"><Mail size={24}/></a>
                </motion.div>
              </div>

              {/* Aesthetic Element: Floating Skills Circle */}
              <div className="hidden lg:block lg:col-span-5 relative h-[500px]">
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    y: [0, -20, 0]
                  }}
                  transition={{ 
                    rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 border-2 border-dashed border-indigo-500/20 rounded-full flex items-center justify-center"
                >
                  <div className="w-64 h-64 bg-indigo-600/10 rounded-full flex items-center justify-center backdrop-blur-3xl border border-indigo-500/20 shadow-inner">
                    <Sparkles className="w-16 h-16 text-indigo-600" />
                  </div>
                  
                  {/* Floating Skill Bubbles */}
                  {['Java', 'Python', 'React', 'Spring', 'AI'].map((skill, idx) => (
                    <div 
                      key={skill}
                      className="absolute p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 font-bold text-xs"
                      style={{
                        top: `${50 + 40 * Math.sin(idx * 72 * (Math.PI / 180))}%`,
                        left: `${50 + 40 * Math.cos(idx * 72 * (Math.PI / 180))}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Experience Timeline Section */}
          <section id="experience" className="py-32 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="Professional Journey" subtitle="Career Timeline" align="center" />
              
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-600 to-transparent opacity-20 hidden md:block" />
                
                <div className="space-y-24">
                  {[
                    { 
                      role: "Java Full Stack Intern", 
                      company: "HCLTech", 
                      date: "June 2025 - Aug 2025", 
                      desc: "Engineered web-based travel platforms using Spring Boot and secure RESTful architectures.",
                      side: 'left'
                    },
                    { 
                      role: "Full Stack Developer Intern", 
                      company: "Innovation Hub, Nashik", 
                      date: "July 2022 - Aug 2022", 
                      desc: "Collaborated on MERN stack applications, optimizing frontend performance and UI responsiveness.",
                      side: 'right'
                    }
                  ].map((exp, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: exp.side === 'left' ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`relative flex items-center flex-col md:flex-row ${exp.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                    >
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-500/20 z-10" />
                      
                      <div className="w-full md:w-1/2 p-4">
                        <div className={`p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm ${exp.side === 'left' ? 'md:mr-12' : 'md:ml-12'}`}>
                          <span className="text-xs font-black text-indigo-600 uppercase mb-2 block tracking-widest">{exp.date}</span>
                          <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                          <p className="text-slate-500 font-medium mb-4">{exp.company}</p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
                        </div>
                      </div>
                      <div className="w-1/2 hidden md:block" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Bento-style Projects Grid */}
          <section id="projects" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="Selected Works" subtitle="Portfolio Projects" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* Technical Arsenal */}
          <section id="skills" className="py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeader title="Tech Arsenal" subtitle="Skills & Tools" align="center" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SKILLS.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center group hover:border-indigo-500 transition-colors"
                  >
                    <div className="text-sm font-black text-indigo-600 uppercase mb-6 tracking-tighter">{skill.category}</div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {skill.items.map((item) => (
                        <div key={item} className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-bold group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 transition-colors">
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-32 bg-indigo-600 text-white relative overflow-hidden">
             {/* Decorative Background for Contact */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-[100px]" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">Ready to start a <span className="text-indigo-200">conversation?</span></h2>
                <p className="text-xl text-indigo-100 mb-12 font-medium">Currently seeking opportunities where I can contribute to high-impact software solutions and AI integration.</p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href={`mailto:${USER_DATA.email}`} className="w-full sm:w-auto px-12 py-5 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl">
                    Say Hello
                  </a>
                  <a href={https://www.linkedin.com/in/mayur-deshmukh-55080232a/} className="w-full sm:w-auto px-12 py-5 bg-indigo-500 text-white border-2 border-indigo-400 rounded-2xl font-black text-lg hover:bg-indigo-400 transition-colors">
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 font-bold text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs">MD</div>
              <span>Mayur Deshmukh &copy; {new Date().getFullYear()}</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Resume</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Source</a>
            </div>
            <div className="flex gap-4">
               <a href={USER_DATA.github} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"><Github size={18}/></a>
               <a href={USER_DATA.linkedin} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"><Linkedin size={18}/></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
