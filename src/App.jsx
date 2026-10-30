import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, AtSign,
  Code2, Github, Globe2, Layers3, Linkedin, Menu, MoveUpRight,
  Sparkles, X, Download, Mail, MapPin, MousePointer2, Terminal,
  Workflow, Zap
} from "lucide-react";

const projects = [
  {
    number: "01",
    name: "ResumeCraff",
    category: "PRODUCT DESIGN · WEB APP",
    description: "A clean, accessible resume-building experience designed to help people present their skills with clarity and confidence.",
    stack: ["React", "Firebase", "JavaScript"],
    url: "https://resumecraff.com",
    label: "Explore product",
    visual: "resume",
    accent: "mint"
  },
  {
    number: "02",
    name: "Next IT-BD",
    category: "WEB STUDIO · DIGITAL SERVICES",
    description: "A digital studio concept focused on practical websites, thoughtful interfaces and useful online experiences.",
    stack: ["HTML", "CSS", "JavaScript", "Firebase"],
    url: "https://nextit-bd.web.app",
    label: "Visit website",
    visual: "studio",
    accent: "violet"
  },
  {
    number: "03",
    name: "Bangladesh Visit",
    category: "CULTURE · TRAVEL PLATFORM",
    description: "A visual guide to Bangladesh for curious travellers, bringing destinations, heritage and local culture together.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://github.com/md-yasin-code",
    label: "View on GitHub",
    visual: "travel",
    accent: "amber"
  },
  {
    number: "04",
    name: "German Visual Dictionary",
    category: "LEARNING · EDITORIAL DESIGN",
    description: "A visual vocabulary project connecting German words with clear English and Bengali meanings.",
    stack: ["Research", "Visual design", "Language"],
    url: "https://github.com/md-yasin-code",
    label: "View on GitHub",
    visual: "dictionary",
    accent: "blue"
  }
];

const skills = [
  { name: "HTML & CSS", level: "Building", icon: Code2 },
  { name: "JavaScript", level: "Building", icon: Terminal },
  { name: "React", level: "Building", icon: Layers3 },
  { name: "Firebase", level: "Working with", icon: Workflow },
  { name: "Git & GitHub", level: "Working with", icon: Github },
  { name: "Three.js / WebGL", level: "Exploring", icon: Globe2 }
];

function WebGLScene() {
  const mountRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      host.classList.add("webgl-unavailable");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(2.05, 2);
    const wire = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: 0xb8ff6a, wireframe: true, transparent: true, opacity: 0.25 })
    );
    group.add(wire);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.93, 2),
      new THREE.MeshBasicMaterial({ color: 0x9cff57, transparent: true, opacity: 0.035 })
    );
    group.add(core);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xd8ffbd, transparent: true, opacity: 0.28 });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.006, 8, 180), ringMaterial);
    ringA.rotation.set(0.95, 0.35, 0.3);
    group.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.95, 0.004, 8, 180), ringMaterial.clone());
    ringB.material.opacity = 0.16;
    ringB.rotation.set(1.4, -0.55, 0.8);
    group.add(ringB);

    const count = window.innerWidth < 700 ? 420 : 850;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.1 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xb8ff8b, size: 0.018, transparent: true, opacity: 0.7, sizeAttenuation: true })
    );
    scene.add(particles);

    const pointer = { x: 0, y: 0 };
    const onPointer = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.35;
    };
    host.addEventListener("pointermove", onPointer);

    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", resize);

    let frame;
    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      if (!reduceMotion) {
        group.rotation.y = t * 0.085 + pointer.x;
        group.rotation.x = Math.sin(t * 0.16) * 0.12 + pointer.y;
        ringA.rotation.z = t * 0.035;
        ringB.rotation.y = -t * 0.025;
        particles.rotation.y = t * 0.012;
      }
      renderer.render(scene, camera);
      if (!reduceMotion) frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onPointer);
      geometry.dispose();
      particleGeometry.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, [reduceMotion]);

  return <div className="webgl-stage" ref={mountRef} aria-hidden="true"><div className="webgl-fallback" /></div>;
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectVisual({ type }) {
  return (
    <div className={`project-visual visual-${type}`}>
      <div className="visual-topline"><span>SELECTED WORK</span><span>2025 — 2026</span></div>
      {type === "resume" && <div className="resume-mock"><div className="mock-sidebar"><i /><i /><i /><i /></div><div className="mock-page"><b /><span /><span /><div /><div /><div /></div><div className="mock-orbit">R.</div></div>}
      {type === "studio" && <div className="studio-mock"><span>MAKE IT</span><strong>MATTER<span>.</span></strong><small>Digital experiences with purpose.</small><div className="studio-orb" /></div>}
      {type === "travel" && <div className="travel-mock"><div className="travel-sun" /><div className="travel-hill hill-one" /><div className="travel-hill hill-two" /><span>DISCOVER<br />BANGLADESH</span></div>}
      {type === "dictionary" && <div className="dictionary-mock"><small>WORTSCHATZ / 001</small><strong>die<br/>Zukunft</strong><span>future · ভবিষ্যৎ</span><div className="dict-lines" /></div>}
      <div className="visual-index">0{projects.findIndex(p => p.visual === type) + 1} / 04</div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["About", "Work", "Stack", "Contact"];

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Mohammad Yasin home"><span className="brand-mark">Y.</span><span>MOHAMMAD YASIN<small>INDEPENDENT DEVELOPER</small></span></a>
        <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
          {navItems.map((item) => <button key={item} onClick={() => goTo(item.toLowerCase())}>{item}</button>)}
          <a className="nav-availability" href="mailto:resumecraff@gmail.com"><span /> Available for opportunities</a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> DESIGN-MINDED WEB DEVELOPER <span className="eyebrow-dot">✳</span> BANGLADESH</div>
            <h1>Building digital<br/>things with <em>purpose.</em></h1>
            <p className="hero-lede">I’m Mohammad Yasin — an independent developer crafting thoughtful websites and useful digital experiences, one detail at a time.</p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => goTo("work")}>Explore my work <ArrowUpRight size={17}/></button>
              <a className="button-quiet" href="mailto:resumecraff@gmail.com">Let’s talk <ArrowDownRight size={17}/></a>
            </div>
            <div className="hero-meta"><span><MapPin size={14}/> Based in Bangladesh</span><span><span className="live-dot" /> Open to opportunities</span></div>
          </div>
          <div className="hero-art"><div className="art-label label-top">FIG. 01 <span>INTERACTIVE STUDY</span></div><WebGLScene/><div className="art-caption"><span>REAL-TIME WEBGL</span><span>THREE.JS / 001</span></div><div className="art-cross cross-a">+</div><div className="art-cross cross-b">+</div></div>
          <button className="scroll-cue" onClick={() => goTo("about")}><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></button>
          <div className="hero-side-note">INDEPENDENT BY NATURE · CURIOUS BY DESIGN</div>
        </section>

        <section className="intro-section section-wrap" id="about">
          <Reveal><div className="section-kicker"><span>01 / A LITTLE INTRO</span><span>THE PERSON BEHIND THE PIXELS</span></div></Reveal>
          <div className="intro-grid">
            <Reveal><h2>Curiosity first.<br/><span>Craft always.</span></h2></Reveal>
            <Reveal delay={0.12}><div className="intro-copy"><p className="intro-lead">I believe the web should feel as good as it works.</p><p>I’m an accounting student with a growing focus on front-end development. I enjoy turning ideas into clear, responsive interfaces, learning how products work, and improving the small details that make a digital experience feel considered.</p><p>My approach is practical: stay curious, build consistently, and keep learning through real projects.</p><a className="text-link" href="https://github.com/md-yasin-code" target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={16}/></a></div></Reveal>
          </div>
        </section>

        <section className="work-section section-wrap" id="work">
          <Reveal><div className="section-kicker"><span>02 / SELECTED WORK</span><span>A FEW THINGS I’VE PUT INTO THE WORLD</span></div><div className="work-heading"><h2>Selected <em>projects.</em></h2><p>Experiments, products and ideas — built with care and a healthy amount of curiosity.</p></div></Reveal>
          <div className="project-grid">
            {projects.map((project, index) => (
              <Reveal key={project.number} delay={index % 2 ? 0.12 : 0}>
                <article className={`project-card accent-${project.accent}`}>
                  <a className="project-image-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ProjectVisual type={project.visual}/><span className="project-open"><ArrowUpRight size={20}/></span></a>
                  <div className="project-info"><div className="project-meta"><span>{project.number} / 04</span><span>{project.category}</span></div><div className="project-title-row"><h3>{project.name}</h3><a href={project.url} target="_blank" rel="noreferrer" aria-label={project.label}><MoveUpRight size={20}/></a></div><p>{project.description}</p><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="principles-section section-wrap">
          <Reveal><div className="section-kicker"><span>03 / HOW I THINK</span><span>GOOD WORK IS NEVER AN ACCIDENT</span></div><div className="principles-grid"><h2>Make it useful.<br/><em>Make it memorable.</em></h2><div className="principle-list"><div><span>01</span><strong>Clarity over clutter</strong><p>Every element should have a reason to be there.</p></div><div><span>02</span><strong>Details matter</strong><p>Thoughtful spacing, motion and responsive behaviour add up.</p></div><div><span>03</span><strong>Always learning</strong><p>Build, test, reflect, and make the next version better.</p></div></div></div></Reveal>
        </section>

        <section className="stack-section section-wrap" id="stack">
          <Reveal><div className="section-kicker"><span>04 / TOOLS & TECHNOLOGIES</span><span>MY CURRENT TOOLKIT</span></div><div className="stack-heading"><h2>The tools behind<br/><em>the ideas.</em></h2><p>A practical toolkit that keeps evolving as I learn and build.</p></div></Reveal>
          <div className="skills-grid">{skills.map((skill, i) => { const Icon = skill.icon; return <Reveal key={skill.name} delay={i * 0.05}><div className="skill-card"><div className="skill-icon"><Icon size={19}/></div><div><strong>{skill.name}</strong><span>{skill.level}</span></div><ArrowUpRight className="skill-arrow" size={16}/></div></Reveal>; })}</div>
          <div className="learning-note"><Sparkles size={16}/><span>Currently exploring creative development, Three.js and real-time 3D on the web.</span></div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <Reveal><div className="section-kicker"><span>05 / START A CONVERSATION</span><span>GOOD THINGS BEGIN WITH HELLO</span></div><div className="contact-panel"><div className="contact-orbit"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="orbit-core"><AtSign size={28}/></div></div><div className="contact-copy"><span className="contact-overline">HAVE A PROJECT OR AN IDEA?</span><h2>Let’s make<br/><em>something matter.</em></h2><p>I’m always happy to connect, exchange ideas and explore meaningful opportunities.</p><a className="button-primary contact-button" href="mailto:resumecraff@gmail.com">Say hello <ArrowUpRight size={17}/></a></div><div className="contact-decoration">OPEN<br/>TO WHAT’S<br/>NEXT<span>↗</span></div></div></Reveal>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="footer-brand" href="#home">Y.</a><p>Designed with intent. Built with curiosity.<br/><span>© {year} Mohammad Yasin. All rights reserved.</span></p><div className="footer-links"><a href="https://github.com/md-yasin-code" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a><a href="mailto:resumecraff@gmail.com" aria-label="Email"><Mail size={18}/></a><a href="#home" aria-label="Back to top"><ArrowUpRight size={18}/></a></div>
      </footer>
    </div>
  );
}

export default App;
