```react
import React, { useState, useEffect } from 'react';
import { 
  User, Briefcase, Award, Mail, Phone, MapPin, ExternalLink, 
  Github, Linkedin, Twitter, Sparkles, Send, Star, ChevronLeft, 
  ChevronRight, Globe, Monitor, Code, ShieldCheck, GraduationCap, 
  Download, Menu, X, ArrowUpRight, Check, CheckCircle2, Copy, MessageSquare, Plus, BookOpen, Layers
} from 'lucide-react';

export default function App() {
  // Navigation & UI States
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Typewriter Effect Variables
  const roles = ["Accounting Student", "Web Developer", "Tech Enthusiast", "Digital Innovator"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  // Typewriter effect logic
  useEffect(() => {
    let timer;
    const handleType = () => {
      const fullWord = roles[wordIndex];
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);
        if (currentText === fullWord) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);
        if (currentText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed]);

  // Scroll and active section handler
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('resumecraff@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 5000);
    }
  };

  // Real Projects Data from User Profile
  const projects = [
    {
      id: "portfolio",
      title: "Premium Portfolio Website",
      category: "web",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      description: "৩-লেয়ার থ্রি.জেএস স্টার ফিল্ড ব্যাকগ্রাউন্ড, গ্লাসমরফিক ইউআই এবং জিএসএপি স্ক্রল এনিমেশন সমৃদ্ধ অত্যন্ত দৃষ্টিনন্দন পোর্টফোলিও ওয়েবসাইট।",
      subtitle: "Personal Branding & Showcase",
      overview: "রিয়েল-টাইম মাউস প্যারালাক্স এবং সিঙ্কড স্ক্রলিং এনিমেশন দ্বারা তৈরি একটি অসাধারণ ডিজিটাল ব্র্যান্ডিং হাব। ব্যবহারকারী-বান্ধব এবং মোবাইল রেসপন্সিভ লেআউট নিশ্চিত করা হয়েছে।",
      features: [
        "৩-লেয়ার থ্রি.জেএস স্পেকট্রাল স্টার ফিল্ড এনিমেশন",
        "পিক্সেল-পারফেক্ট মডার্ন গ্লাসমরফিজম কার্ড আর্কিটেকচার",
        "টাইপরাইটার ডাইনামিক হিরো এনিমেশন",
        "লাইভ স্ট্যাটস কাউন্টার এবং কাস্টম ডায়ালগ বক্স",
        "১০০% এসইও অপ্টিমাইজড ও রেসপন্সিভ স্ট্রাকচার"
      ],
      tech: ["HTML5", "CSS3", "Three.js", "GSAP", "JavaScript ES6+"],
      status: "Live",
      year: "2026",
      liveLink: "https://nextit-bd.web.app/"
    },
    {
      id: "resume",
      title: "Professional Resume Builder",
      category: "app",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
      description: "রিয়েল-টাইম লাইভ প্রিভিউ, ড্র্যাগ অ্যান্ড ড্রপ পজিশনিং এবং ওয়ান-ক্লিক পিডিএফ এক্সপোর্ট সহ প্রফেশনাল রিঅ্যাক্ট ওয়েব অ্যাপ্লিকেশন।",
      subtitle: "Interactive Document Generator",
      overview: "ব্যবহারকারীরা বিভিন্ন প্রফেশনাল টেমপ্লেট ব্যবহার করে সহজেই নিজেদের সিভি বা রেজুমে তৈরি করতে পারবেন এবং ড্র্যাগ অ্যান্ড ড্রপ ফিচার দিয়ে ইচ্ছামতো সেকশন সাজাতে পারবেন।",
      features: [
        "একাধিক মডার্ন এবং মিনিমাল রেজুমে টেমপ্লেটস",
        "টাইপ করার সাথে সাথে ইনস্ট্যান্ট লাইভ প্রিভিউ",
        "সহজ পিডিএফ ফাইল জেনারেটর ইঞ্জিন",
        "ফায়ারবেস ডেটাবেস সিঙ্ক সুবিধা",
        "রিয়েল-টাইম ড্র্যাগ অ্যান্ড ড্রপ রি-অর্ডারিং"
      ],
      tech: ["React.js", "Firebase Auth", "Tailwind CSS", "jspdf", "Dnd-kit"],
      status: "In Progress",
      year: "2026",
      liveLink: "#"
    },
    {
      id: "dashboard",
      title: "Real-Time Admin Dashboard",
      category: "app",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      description: "ফায়ারবেস রিয়েল-টাইম ডেটাবেস, চার্ট এনালাইটিক্স এবং সুরক্ষিত রোল-বেসড অথেনটিকেশন সমৃদ্ধ ড্যাশবোর্ড প্যানেল।",
      subtitle: "Firebase Real-Time Analytics Panel",
      overview: "ক্লায়েন্ট এবং ডেটা সংগ্রহের জন্য একটি মডার্ন এনালাইটিক্যাল হাব যেখানে চার্টের মাধ্যমে লাইভ ডেটা প্রগ্রেস উপস্থাপন করা হয় এবং ডেটা আপলোড-ডিলিট করার সম্পূর্ণ CRUD অ্যাক্সেস থাকে।",
      features: [
        "রিয়েল-টাইম ফায়ারস্টোর ডাটাবেস কোলাবোরেশন",
        "ইন্টারেক্টিভ চার্টস লাইব্রেরি (Chart.js)",
        "রোল-বেসড অ্যাডমিন ও ভিউয়ার কন্ট্রোল সিস্টেম",
        "সহজ সিএসভি/পিডিএফ ফাইল ডাউনলোড সুবিধা",
        "ডার্ক মোড লাক্সারি ইউজার ইন্টারফেস"
      ],
      tech: ["React", "Firebase Firestore", "Chart.js", "REST APIs", "Tailwind CSS"],
      status: "Completed",
      year: "2025",
      liveLink: "#"
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-[#03020a] text-slate-100 min-h-screen font-sans selection:bg-[#4f8eff] selection:text-white overflow-x-hidden relative">
      
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#4f8eff]/10 blur-[130px] top-[-100px] left-[-100px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#a259ff]/10 blur-[130px] bottom-[100px] right-[-100px] animate-pulse delay-1000" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-20" />
      </div>

      {/* Top Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[4px] bg-gradient-to-r from-[#4f8eff] to-[#a259ff] z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* HEADER & MENU */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#03020a]/80 backdrop-blur-2xl border-b border-slate-900/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div onClick={() => scrollToSection('home')} className="cursor-pointer flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4f8eff] to-[#a259ff] flex items-center justify-center font-extrabold text-white text-lg shadow-lg shadow-[#4f8eff]/20 group-hover:scale-105 transition-transform duration-300">
              Y
            </div>
            <div className="text-left">
              <span className="font-extrabold text-white tracking-wide text-lg block group-hover:text-[#4f8eff] transition-colors">
                M. YASIN<span className="text-[#4f8eff]">.</span>
              </span>
              <span className="text-slate-500 text-[9px] tracking-widest font-mono uppercase block -mt-1">Accounting & Web Dev</span>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Myself' },
              { id: 'skills', label: 'Expertise' },
              { id: 'projects', label: 'My Works' },
              { id: 'certifications', label: 'Certificates' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-[13px] font-bold tracking-widest uppercase transition-all duration-300 relative py-2 ${
                  activeSection === item.id ? 'text-[#4f8eff]' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#4f8eff] to-[#a259ff] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Download CV Actions */}
          <div className="hidden lg:block">
            <button 
              onClick={() => alert("CV ফাইলটি খুব দ্রুত যুক্ত করা হবে!")}
              className="px-6 py-3 rounded-xl bg-[#0a0e1e] border border-slate-800 hover:border-[#4f8eff]/50 hover:bg-[#4f8eff]/10 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-[#4f8eff]" />
              <span>Download CV</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-24 left-0 w-full bg-[#03020a]/95 backdrop-blur-3xl border-b border-slate-900/80 py-6 px-6 flex flex-col space-y-4 shadow-2xl text-left">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Myself' },
              { id: 'skills', label: 'Expertise' },
              { id: 'projects', label: 'My Works' },
              { id: 'certifications', label: 'Certificates' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeSection === item.id ? 'text-[#4f8eff]' : 'text-slate-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 1. CINEMATIC HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#4f8eff]/10 border border-[#4f8eff]/30 text-xs font-mono text-[#4f8eff] shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold tracking-wider uppercase">Open to Collaboration & Opportunities</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#a0c8ff]">
                Mohammad Yasin
              </h1>
              
              {/* Typewriter Rotator */}
              <h2 className="text-xl sm:text-3xl font-semibold uppercase text-slate-400">
                A Passionate <span className="text-[#4f8eff] border-r-2 border-[#4f8eff] pr-1 animate-pulse">{currentText}</span>
              </h2>
            </div>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              জাতীয় বিশ্ববিদ্যালয় বাংলাদেশের একজন অ্যাকাউন্টিং (BBS Honours) শিক্ষার্থী, যিনি ব্যবসা ও ফিনান্সিয়াল জ্ঞানের পাশাপাশি আধুনিক ওয়েব টেকনোলজি ও ডিজিটাল ইনোভেশন চর্চা করতে পছন্দ করেন।
            </p>

            {/* Interactive Stats Panel */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-slate-900/65 max-w-2xl">
              <div className="border-l-2 border-[#4f8eff]/40 pl-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">২০+</span>
                <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">প্রজেক্ট সম্পন্ন</span>
              </div>
              <div className="border-l-2 border-[#4f8eff]/40 pl-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#4f8eff] block">১০+</span>
                <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">সার্টিফিকেশন</span>
              </div>
              <div className="border-l-2 border-[#4f8eff]/40 pl-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#a259ff] block">১st</span>
                <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">Year at NU</span>
              </div>
              <div className="border-l-2 border-[#4f8eff]/40 pl-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">২৪/৭</span>
                <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">সাপোর্ট ও রেসপন্স</span>
              </div>
            </div>

            {/* Action Buttons & Social Links */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#1d4e9e] to-[#4f8eff] hover:from-[#4f8eff] hover:to-[#4f8eff]/80 text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#4f8eff]/25 flex items-center justify-center space-x-2 group"
              >
                <span>Get In Touch</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0a0e1e] border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center"
              >
                View My Works
              </button>

              {/* Minimalist Tech Profiles */}
              <div className="flex items-center space-x-3 pt-2 sm:pt-0 pl-0 sm:pl-4">
                <a href="https://github.com/md-yasin-code" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-[#4f8eff]/50 transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#4f8eff] hover:border-[#4f8eff]/50 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Hero Premium Side Image with layer decorations */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-80 h-80 sm:w-[350px] sm:h-[450px]">
              
              {/* Back ambient glowing rings */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4f8eff]/10 to-[#a259ff]/10 rounded-2xl blur-xl opacity-30 animate-pulse" />
              <div className="absolute inset-0 border-2 border-[#4f8eff]/20 translate-x-4 translate-y-4 rounded-2xl -z-10 animate-pulse" />

              {/* Main image container */}
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" 
                  alt="Mohammad Yasin Portrait" 
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:scale-105 transition-all duration-1000"
                />

                {/* Glassmorphic Badge Layer */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#03020a]/90 backdrop-blur-md border border-slate-800/80 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-white text-sm font-bold block">মোহাম্মদ ইয়াসিন</span>
                    <span className="text-[#4f8eff] text-[10px] tracking-wider font-mono">NU Accounting & Dev Architect</span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-[#4f8eff]/10 flex items-center justify-center border border-[#4f8eff]/20">
                    <Sparkles className="w-4 h-4 text-[#4f8eff] animate-spin" style={{ animationDuration: '6s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section id="about" className="py-28 bg-[#03020a]/50 border-t border-slate-900/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-left space-y-4 mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4f8eff] block">Who I Am</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">About Myself</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Story Card */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-slate-900/30 border border-slate-850 text-left space-y-6">
              <div className="flex items-center space-x-3 text-slate-500 pb-4 border-b border-slate-800">
                <User className="w-5 h-5 text-[#4f8eff]" />
                <h3 className="text-lg font-bold text-white">My Story</h3>
              </div>
              
              <p className="text-slate-300 leading-relaxed text-base">
                হ্যালো! আমি মোহাম্মদ ইয়াসিন। আমি জাতীয় বিশ্ববিদ্যালয় বাংলাদেশের অধীনে বিবিএস (অনার্স) প্রথম বর্ষের একজন অ্যাকাউন্টিং শিক্ষার্থী। পড়াশোনার পাশাপাশি প্রযুক্তির প্রতি তীব্র ভালোবাসা থেকে আমি নিজেকে একজন ওয়েব ডেভেলপার এবং টেক এন্থুসিয়াস্ট হিসেবে গড়ে তুলেছি।
              </p>
              
              <p className="text-slate-400 leading-relaxed text-sm">
                আমি প্রতিনিয়ত নতুন স্কিল শিখতে এবং বিভিন্ন বাস্তবমুখী সমস্যা সমাধানের মাধ্যমে নিজেকে সমৃদ্ধ করছি। অ্যাকাউন্টিংয়ের ফিনান্সিয়াল সেন্স এবং কোডিংয়ের লজিক্যাল চিন্তা-ভাবনার চমৎকার মেলবন্ধনের মাধ্যমে আমি ইউনিক ও কার্যকরী ডিজিটাল সলিউশন তৈরি করতে প্রতিশ্রুতিবদ্ধ।
              </p>

              {/* National University Highlight */}
              <div className="p-5 rounded-xl bg-[#0a0e1e] border border-slate-800/80 flex items-start space-x-4">
                <GraduationCap className="w-8 h-8 text-[#4f8eff] flex-shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">Bachelor of Business Studies (Honours)</h4>
                  <p className="text-[#4f8eff] text-xs font-mono">National University Bangladesh · 1st Year (Expected 2025–2026)</p>
                  <p className="text-slate-400 text-xs mt-1">কোর সাবজেক্টস: ফিনান্সিয়াল অ্যাকাউন্টিং, কস্ট অ্যাকাউন্টিং, ট্যাক্সেশন, বিজনেজ কমিউনিকেশন।</p>
                </div>
              </div>
            </div>

            {/* Personal Details Panel */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-slate-900/30 border border-slate-850 text-left space-y-6">
              <div className="flex items-center space-x-3 text-slate-500 pb-4 border-b border-slate-800">
                <Layers className="w-5 h-5 text-[#a259ff]" />
                <h3 className="text-lg font-bold text-white">Personal Details</h3>
              </div>
              
              <ul className="space-y-4">
                {[
                  { label: "Full Name", val: "Mohammad Yasin" },
                  { label: "Degree", val: "BBS (Honours) - Accounting" },
                  { label: "Location", val: "Dhaka-1333, Bangladesh" },
                  { label: "Email", val: "resumecraff@gmail.com" },
                  { label: "Phone", val: "+880 1892757931" },
                  { label: "Languages", val: "Bengali, English" }
                ].map((item, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm border-b border-slate-900 pb-2">
                    <span className="text-[#4f8eff] font-mono text-xs uppercase tracking-wider">{item.label}</span>
                    <span className="text-slate-300 font-semibold mt-1 sm:mt-0">{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 3. EXPERTISE & SKILLS SECTION */}
      <section id="skills" className="py-28 bg-[#03020a] border-t border-slate-900/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4f8eff] block">What I Know</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Expertise & Skills</h2>
            <p className="text-slate-400">
              অ্যাকাউন্টিং ও ফিনান্সিয়াল দক্ষতা এবং আধুনিক ফ্রন্টএন্ড কোডিং আর্কিটেকচারের চমৎকার সুষম সমন্বয়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Accounting */}
            <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-900 hover:border-slate-850 transition-all duration-300 text-left space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-900">
                <BookOpen className="w-5 h-5 text-[#4f8eff]" />
                <h3 className="text-lg font-bold text-white">Accounting Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Financial Accounting", "Ledger & Journal", "Cost Accounting", 
                  "Taxation Basics", "Auditing", "Financial Statement", 
                  "Managerial Accounting", "Business Communication"
                ].map((s, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-full bg-[#4f8eff]/5 border border-[#4f8eff]/15 text-slate-300 text-xs font-medium hover:border-[#4f8eff]/30 transition-all">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Tech Skills */}
            <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-900 hover:border-slate-850 transition-all duration-300 text-left space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-900">
                <Code className="w-5 h-5 text-[#a259ff]" />
                <h3 className="text-lg font-bold text-white">Technical Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "HTML5 & CSS3", "JavaScript ES6+", "Bootstrap 5", "Firebase", 
                  "React (Basics)", "Responsive Design", "Three.js", "GSAP", 
                  "Git & GitHub", "REST APIs"
                ].map((s, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-full bg-[#a259ff]/5 border border-[#a259ff]/15 text-slate-300 text-xs font-medium hover:border-[#a259ff]/30 transition-all">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 3: Professional Soft Skills */}
            <div className="p-8 rounded-2xl bg-slate-900/20 border border-slate-900 hover:border-slate-850 transition-all duration-300 text-left space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-900">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Professional Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Communication", "Problem Solving", "Team Collaboration", 
                  "Time Management", "Leadership", "Critical Thinking", 
                  "Project Planning", "Research & Analysis"
                ].map((s, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-full bg-emerald-400/5 border border-emerald-400/15 text-slate-300 text-xs font-medium hover:border-emerald-400/30 transition-all">
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Info & Objectives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
            <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-850 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-[#4f8eff]" />
                <span>Experience Journey</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                বর্তমানে আমি সেলফ-লার্নিং, পার্সোনাল প্রজেক্ট এবং কন্টিনিউয়াস প্রফেশনাল ডেভেলপমেন্টের মাধ্যমে আমার বাস্তবিক টেক ও অ্যাকাউন্টিং জ্ঞানকে বৃদ্ধি করছি। ফ্রিল্যান্সিং বা ইন্টার্নশিপের নতুন সুযোগের জন্য আমি সদা প্রস্তুত।
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-850 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#a259ff]" />
                <span>Career Objectives</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                আমার প্রধান লক্ষ্য হলো অ্যাকাউন্টিং এর স্বচ্ছ প্রাতিষ্ঠানিক জ্ঞান এবং আইটি টেকনোলজির সমন্বয়ে বিজনেজ অটোমেশন নিশ্চিত করা। আমি ফিনান্সিয়াল টেকনোলজি (Fintech) এবং ডাটা এনালাইটিক্স নিয়ে কাজ করতে অত্যন্ত আগ্রহী।
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PREMIUM PROJECTS GALLERY */}
      <section id="projects" className="py-28 bg-[#03020a]/50 border-t border-slate-900/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="text-left space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4f8eff] block">What I've Built</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Latest Projects <span className="text-[#4f8eff] font-mono text-xl sm:text-2xl font-bold">(২০+)</span></h2>
            </div>

            {/* Filter Switches */}
            <div className="flex flex-wrap gap-2.5 bg-slate-900/80 p-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'web', label: 'Web Design' },
                { id: 'app', label: 'Applications' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-[#4f8eff] text-white shadow-lg shadow-[#4f8eff]/15'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p) => (
              <div 
                key={p.id}
                className="group relative rounded-2xl bg-slate-900 border border-slate-900 overflow-hidden hover:border-[#4f8eff]/40 transition-all duration-500 shadow-2xl flex flex-col justify-between text-left"
              >
                {/* Cover visual with hover scale */}
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded bg-[#4f8eff] text-white font-mono text-[10px] uppercase tracking-wider">
                    {p.category}
                  </div>
                </div>

                {/* Info and tech stack list */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#4f8eff] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2">
                      {p.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="bg-[#a259ff]/10 border border-[#a259ff]/20 rounded px-2 py-0.5 text-[10px] text-slate-300 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-950 flex items-center justify-between">
                    {/* Quick View Button */}
                    <button 
                      onClick={() => setSelectedProject(p)}
                      className="px-4 py-2 rounded-lg bg-[#4f8eff]/10 border border-[#4f8eff]/30 hover:bg-[#4f8eff]/20 hover:border-[#4f8eff] text-[#4f8eff] text-xs font-bold transition-all"
                    >
                      Quick View
                    </button>
                    
                    {p.liveLink !== "#" && (
                      <a 
                        href={p.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Quick Achievements Summary under Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
            <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-850 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Star className="w-5 h-5 text-[#4f8eff]" />
                <span>My Achievements</span>
              </h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>২০টির বেশি ব্যক্তিগত ডাইনামিক ওয়েব প্রজেক্ট সম্পন্ন</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>১০টির বেশি ভেরিফাইড ইন্টারন্যাশনাল কোর্স সার্টিফিকেট</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>ক্রমাগত আধুনিক টেকনোলজির বাস্তব প্রয়োগ বৃদ্ধি</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-850 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#a259ff]" />
                <span>Testimonials & Mentor Sayings</span>
              </h3>
              <p className="text-slate-400 text-sm italic leading-relaxed">
                "Mohammad Yasin demonstrates strong dedication to learning and continuous improvement. Highly professional, responsible, and committed to delivering quality work."
              </p>
              <span className="text-[#a259ff] text-xs font-mono block">— Academic Mentor & Colleague</span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. VETTED CERTIFICATIONS & ACCOLADES */}
      <section id="certifications" className="py-28 bg-[#03020a] border-t border-slate-900/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4f8eff] block">Proven Knowledge</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Certifications & Accolades</h2>
            <p className="text-slate-400">
              আন্তর্জাতিক পর্যায়ের বিভিন্ন প্রতিষ্ঠান থেকে অর্জিত সম্মানজনক সার্টিফিকেটসমূহ।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Introduction to Financial Accounting",
                org: "Coursera",
                desc: "ব্যবসায়িক লেনদেন রেকর্ড করা, অ্যাকাউন্ট প্রস্তুত করা এবং বিভিন্ন ফিনান্সিয়াল রিপোর্ট বিশ্লেষণের একাডেমিক স্বীকৃতি।"
              },
              {
                title: "Digital Skills: Web Design & Development",
                org: "Google / Coursera",
                desc: "ইউআই/ইউএক্স ডিজাইনের মৌলিক নীতি, রেসপন্সিভ লেআউট প্রোটোটাইপ এবং আধুনিক ফ্রন্টএন্ড স্ট্রাকচার ডেভেলপমেন্ট।"
              },
              {
                title: "Climate Change International Legal Regime",
                org: "UNITAR / UNEP",
                desc: "জলবায়ু পরিবর্তন মোকাবেলায় আন্তর্জাতিক আইন, প্যারিস চুক্তি এবং গ্লোবাল কমপ্লায়েন্স সম্পর্কে বিশদ জ্ঞান অর্জন।"
              },
              {
                title: "Net Zero 101: What, Why & How",
                org: "UNU-IAS",
                desc: "পরিবেশবান্ধব টেকসই উন্নয়ন নীতি, কার্বন নিঃসরণ হ্রাস এবং গ্রিন বিজনেস আর্কিটেকচারের উপর বিশ্বমানের কোর্স।"
              },
              {
                title: "Convention on Transboundary Air Pollution",
                org: "UNECE",
                desc: "আন্তর্জাতিক পরিবেশ সংরক্ষণ নীতি এবং বায়ু দূষণ রোধে সীমানা অতিক্রমকারী কনভেনশনের বিশদ পর্যালোচনা।"
              },
              {
                title: "Sustainable Development Goals (SDGs)",
                org: "SDG Academy",
                desc: "ইউনাইটেড নেশনস নির্ধারিত ১৭টি টেকসই উন্নয়ন লক্ষ্যমাত্রা বাস্তবায়নে বাস্তবমুখী পরিকল্পনা এবং কর্মপদ্ধতি বিশ্লেষণ।"
              }
            ].map((cert, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 transition-all duration-300 text-left space-y-4 relative group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#4f8eff]/10 flex items-center justify-center border border-[#4f8eff]/20">
                  <Award className="w-5 h-5 text-[#4f8eff]" />
                </div>
                <div>
                  <span className="text-[#4f8eff] text-xs font-mono font-bold block">{cert.org}</span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-[#4f8eff] transition-colors">
                    {cert.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <span className="text-slate-500 font-mono text-xs block">+ ৪টি অতিরিক্ত সার্টিফিকেট মডিউল এবং প্রফেশনাল ট্রেনিং রানিং রয়েছে</span>
          </div>

        </div>
      </section>

      {/* 6. CONTACT ME WITH INTERACTIVE FORM & MAP */}
      <section id="contact" className="py-28 bg-[#03020a]/50 border-t border-slate-900/80 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#4f8eff] block">Let's Connect</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Get in Touch</h2>
            <p className="text-slate-400">
              যেকোনো প্রজেক্টের আলোচনা, পরামর্শ বা আইডিয়া নিয়ে সরাসরি বার্তা পাঠান।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
            
            {/* Details Left Panel */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {[
                { icon: <MapPin className="w-5 h-5 text-white" />, title: "Location", val: "Dhaka-1333, Bangladesh" },
                { icon: <Phone className="w-5 h-5 text-white" />, title: "Phone", val: "+880 1892757931" },
                { icon: <Mail className="w-5 h-5 text-white" />, title: "Email", val: "resumecraff@gmail.com" }
              ].map((c, i) => (
                <div key={i} className="flex items-center space-x-5 p-5 rounded-xl bg-slate-900 border border-slate-850">
                  <div className="w-12 h-12 rounded bg-[#4f8eff] flex items-center justify-center flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-xs font-mono block uppercase tracking-wider mb-1">{c.title}</h4>
                    <span className="text-white text-sm font-semibold">{c.val}</span>
                  </div>
                </div>
              ))}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={copyEmailToClipboard}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#4f8eff] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
                >
                  <Copy className="w-4 h-4 text-[#4f8eff]" />
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>
                
                <a
                  href="mailto:resumecraff@gmail.com"
                  className="px-6 py-3.5 rounded-xl bg-[#4f8eff] hover:bg-[#4f8eff]/90 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>

            {/* Email Form */}
            <div className="lg:col-span-7 p-8 rounded-2xl bg-slate-900 border border-slate-900 text-left relative overflow-hidden">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white">বার্তাটি সফলভাবে পাঠানো হয়েছে!</h4>
                  <p className="text-slate-400 text-sm max-w-sm">
                    আপনার বার্তার জন্য ধন্যবাদ। মোহাম্মদ ইয়াসিন খুব দ্রুত আপনার সাথে যোগাযোগ করবেন।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3.5 rounded bg-slate-950 border border-slate-800 text-slate-100 text-xs font-semibold tracking-wider uppercase transition-colors outline-none focus:border-[#4f8eff]"
                      placeholder="Your Name"
                    />
                    <input 
                      type="email" 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3.5 rounded bg-slate-950 border border-slate-800 text-slate-100 text-xs font-semibold tracking-wider uppercase transition-colors outline-none focus:border-[#4f8eff]"
                      placeholder="Your Email"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3.5 rounded bg-slate-950 border border-slate-800 text-slate-100 text-xs font-semibold tracking-wider uppercase transition-colors outline-none focus:border-[#4f8eff]"
                      placeholder="Your Phone"
                    />
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3.5 rounded bg-slate-950 border border-slate-800 text-slate-100 text-xs font-semibold tracking-wider uppercase transition-colors outline-none focus:border-[#4f8eff]"
                      placeholder="Your Subject"
                    />
                  </div>

                  <textarea 
                    rows={5}
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3.5 rounded bg-slate-950 border border-slate-800 text-slate-100 text-xs font-semibold tracking-wider uppercase transition-colors outline-none focus:border-[#4f8eff] resize-none"
                    placeholder="Start writing message here"
                  />

                  <button 
                    type="submit"
                    className="w-full py-4 rounded bg-[#4f8eff] hover:bg-[#4f8eff]/90 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Submit Now</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Fully Integrated Google Map Component */}
          <div className="mt-16 rounded-2xl overflow-hidden border border-slate-900 shadow-2xl h-80 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.88253546324!2d90.26379826216589!3d23.780919352725377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1720157387794!5m2!1sen!2sbd" 
              className="w-full h-full grayscale opacity-40 hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }}
              allowFullScreen="" 
              loading="lazy"
              title="Yasin Location Map"
            />
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#03020a] border-t border-slate-900/80 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="text-white font-extrabold text-lg block">M. YASIN<span className="text-[#4f8eff]">.</span></span>
            <span className="text-slate-500 text-xs">© ২০২৬ সর্বস্বত্ব সংরক্ষিত। Mohammad Yasin</span>
          </div>

          <div className="flex space-x-6 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors">Works</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT BUTTON WITH PULSE */}
      <div className="fixed bottom-6 right-6 z-50 group flex items-center">
        <span className="bg-slate-950/90 text-[#22c55e] border border-[#22c55e]/25 text-xs font-semibold px-3 py-1.5 rounded-lg mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
        <a 
          href="https://wa.me/8801892757931"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 duration-300"
        >
          {/* Animated rings */}
          <span className="absolute inset-0 rounded-full border-2 border-emerald-500/50 animate-ping" />
          <MessageSquare className="w-6 h-6" />
        </a>
      </div>

      {/* MODAL SYSTEM FOR PROJECT DETAILS */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#03020a]/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl w-full text-left relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-extrabold text-white mt-4">{selectedProject.title}</h3>
            <span className="text-[#4f8eff] text-xs font-mono block uppercase tracking-wider mt-1">{selectedProject.subtitle}</span>
            
            <div className="flex space-x-2 my-4">
              <span className="px-3 py-1 rounded-full bg-[#4f8eff]/10 border border-[#4f8eff]/30 text-[#4f8eff] text-[10px] uppercase font-bold tracking-wider">
                {selectedProject.status}
              </span>
              <span className="text-slate-500 text-xs font-mono self-center">{selectedProject.year}</span>
            </div>

            <div className="border-t border-slate-800 my-4" />

            <h4 className="text-[#4f8eff] text-xs font-mono uppercase tracking-wider mb-2">Overview</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">{selectedProject.overview}</p>

            <h4 className="text-[#4f8eff] text-xs font-mono uppercase tracking-wider mb-2">Key Features</h4>
            <ul className="space-y-2 mb-6">
              {selectedProject.features.map((f, i) => (
                <li key={i} className="flex items-start text-slate-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-[#4f8eff] text-xs font-mono uppercase tracking-wider mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 rounded bg-[#a259ff]/10 border border-[#a259ff]/20 text-slate-200 text-xs font-mono">
                  {t}
                </span>
              ))}
            </div>

            {selectedProject.liveLink !== "#" && (
              <a 
                href={selectedProject.liveLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-xl bg-[#4f8eff] hover:bg-[#4f8eff]/90 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Launch Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

```
