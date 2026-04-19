import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ArrowUpRight, Github, Users, Linkedin, Star, GitFork } from 'lucide-react';
import { Geometry } from './components/Geometry';
import { GeometryType } from './types';
import { siteConfig } from './siteConfig';

// Fetch and display live GitHub repository stats
const RepoStats: React.FC<{ url: string }> = ({ url }) => {
  const [stats, setStats] = useState<{ stars: number; forks: number } | null>(null);

  useEffect(() => {
    // Extract owner and repo, ignore subdirectories like /tree/master/...
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match || url.includes('/tree/')) return;
    
    const owner = match[1];
    const repo = match[2];
    
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setStats({ stars: data.stargazers_count, forks: data.forks_count });
        }
      })
      .catch(err => console.error("Failed to fetch repo stats:", err));
  }, [url]);

  if (!stats) return null;

  return (
    <div className="flex items-center gap-4 ml-6 pl-6 border-l border-black/10 group-hover:border-white/20 transition-colors">
      <div className="flex items-center gap-1.5 mono text-[11px] text-black/50 group-hover:text-white/70 transition-colors font-bold">
        <Star size={12} className="text-[#10b981]" /> {stats.stars}
      </div>
      <div className="flex items-center gap-1.5 mono text-[11px] text-black/50 group-hover:text-white/70 transition-colors font-bold">
        <GitFork size={12} className="text-[#10b981]" /> {stats.forks}
      </div>
    </div>
  );
};

// Fetch and display ChronalLabs GitHub org stats
const OrgStats: React.FC = () => {
  const [orgData, setOrgData] = useState<{ public_repos: number } | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/ChronalLabs')
      .then(res => res.json())
      .then(data => {
        if (data.public_repos !== undefined) {
          setOrgData({ public_repos: data.public_repos });
        }
      })
      .catch(err => console.error("Failed to fetch org stats:", err));
  }, []);

  if (!orgData) return null;

  return (
    <p className="pl-4 border-l border-white/5 hover:border-[#10b981]/30 transition-all">
      PUBLIC_REPOS: {orgData.public_repos}
    </p>
  );
};

// Status Tag Component with Border Drawing Animation
const StatusTag: React.FC<{ status: string; isVisible: boolean; index: number }> = ({ status, isVisible, index }) => {
  return (
    <div
      className={`relative px-4 py-1 flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDelay: `${600 + index * 100}ms` }}
    >
      <div
        className="absolute inset-0 border border-[#10b981] transition-all duration-1000 ease-out-expo"
        style={{
          clipPath: isVisible ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          transitionDelay: `${700 + index * 100}ms`
        }}
      />
      <span className="mono text-[10px] font-black text-[#10b981] tracking-widest uppercase leading-none">
        {status}
      </span>
      {status === 'ACTIVE' && (
        <div className="absolute -top-1 -right-1 w-1 h-1 bg-[#10b981] animate-pulse" />
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('01');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isStripHovered, setIsStripHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hero Animation States
  const [isHeroTitleHovered, setIsHeroTitleHovered] = useState(false);
  const [isHeroSubtitleHovered, setIsHeroSubtitleHovered] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const [marqueeOffset, setMarqueeOffset] = useState(0);
  const autoScrollPos = useRef(0);
  const lastScrollY = useRef(0);
  const requestRef = useRef<number>(null);

  const [impactVisible, setImpactVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [peopleVisible, setPeopleVisible] = useState(false);
  const [contributeVisible, setContributeVisible] = useState(false);

  // Interaction States
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const toggleMenu = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');

      if (targetId === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80; // Offset for fixed header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
      if (isMenuOpen) setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

    const animate = (timestamp: number) => {
      // Rotation logic for the square background geometry
      const currentScroll = window.scrollY;
      const scrollDiff = Math.abs(currentScroll - lastScrollY.current);
      const baseRotationSpeed = 0.3;
      const scrollRotationMultiplier = scrollDiff * 0.4;
      const hoverRotationMultiplier = isHeroTitleHovered ? 4 : 0;

      setRotationAngle(prev => (prev + baseRotationSpeed + scrollRotationMultiplier + hoverRotationMultiplier) % 360);

      // Marquee Logic (Horizontal System Strip)
      if (!isStripHovered) {
        const baseSpeed = 0.5;
        const scrollDelta = currentScroll - lastScrollY.current;
        const scrollFactor = 0.35;

        autoScrollPos.current -= (baseSpeed + (scrollDelta * scrollFactor));
        setMarqueeOffset(autoScrollPos.current % 4000);
      }

      lastScrollY.current = currentScroll;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const index = entry.target.getAttribute('data-index');
          if (index) setActiveSection(index);

          if (entry.target.id === 'impact') setImpactVisible(true);
          if (entry.target.id === 'about') setAboutVisible(true);
          if (entry.target.id === 'projects') setProjectsVisible(true);
          if (entry.target.id === 'people') setPeopleVisible(true);
          if (entry.target.id === 'contribute') setContributeVisible(true);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('section').forEach(sec => sectionObserver.observe(sec));
    document.querySelectorAll('.reveal').forEach(el => sectionObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearInterval(timer);
    };
  }, [isStripHovered, isHeroTitleHovered]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  // System Geometry Reactive Calculation
  const getShapeReactiveStyle = (baseX: number, baseY: number, sensitivity: number = 10) => {
    const dx = (mousePos.x - window.innerWidth / 2) / (window.innerWidth / 2);
    const dy = (mousePos.y - window.innerHeight / 2) / (window.innerHeight / 2);
    return {
      transform: `translate(calc(${dx * sensitivity}px), calc(${dy * sensitivity}px))`,
      transition: 'transform 0.4s ease-out'
    };
  };

  const getParallaxStyle = (factor: number) => {
    return {
      transform: `translateY(${scrollY * factor}px)`,
      transition: 'transform 0.1s linear'
    };
  };

  const navLinks = [
    { label: 'HOME', href: '#', id: '01' },
    { label: 'ABOUT', href: '#about', id: '02' },
    { label: 'IMPACT', href: '#impact', id: '03' },
    { label: 'PHILOSOPHY', href: '#philosophy', id: '04' },
    { label: 'PROJECTS', href: '#projects', id: '06' },
    { label: 'PEOPLE', href: '#people', id: '08' },
    { label: 'CONTRIBUTE', href: '#contribute', id: '09' },
  ];

  const founderAvatar = siteConfig.TEAM.CORE.github
    ? `${siteConfig.TEAM.CORE.github}.png`
    : 'https://github.com/Manan-Chawla.png';

  const orgGitHub = "https://github.com/ChronalLabs";
  const mainRepoGitHub = "https://github.com/ChronalLabs/ChronOS";

  // Unified Section Layout Class for consistent alignment
  const sectionLayout = "w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10";

  // Split title text for animation
  const splitWords = (text: string) => text.split(' ').filter(w => w !== '');

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white selection:bg-[#10b981]/10 selection:text-[#10b981]">

      {/* Narrative Progress Sidebar */}
      <div className="hidden lg:block narrative-rail">
        <div className="narrative-progress" style={{ height: `${scrollProgress}%` }} />
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 mono text-[8px] font-black opacity-20">CHAPT_0{activeSection}</div>
      </div>

      {/* SYSTEM DIAGRAM BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* FAINT DOTTED GRID BACKGROUND */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Viewport & System Markers */}
        <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-black/10" />
        <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-black/10" />
        <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-black/10" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-black/10" />
        
        {/* System "Live" texts */}
        <div className="absolute top-10 right-14 mono text-[9px] text-black/30 font-bold tracking-widest hidden md:block">
          [SYS_ACTIVE] {time}
        </div>
        <div className="absolute bottom-10 left-12 mono text-[9px] text-black/20 font-bold tracking-widest">
          x: {mousePos.x.toString().padStart(4, '0')} y: {mousePos.y.toString().padStart(4, '0')}
        </div>

        <div className="absolute top-[25%] left-[8%] opacity-[0.03] flex flex-col items-center gap-12" style={getShapeReactiveStyle(0, 0, 8)}>
          {/* Square: rotates slowly, faster on scroll, faster on hover */}
          <div
            className="w-[100px] h-[100px] border border-black transition-transform duration-150"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          />
          {/* Line: expands on scroll or subtitle hover */}
          <div
            className="h-[1.5px] bg-black transition-all duration-700"
            style={{
              opacity: 0.5,
              width: isHeroSubtitleHovered ? '220px' : `${80 + scrollY * 0.15}px`,
              maxWidth: '350px'
            }}
          />
        </div>

        <div className="absolute top-[20%] right-[10%] opacity-[0.05] flex flex-col items-center gap-16" style={getShapeReactiveStyle(0, 0, 12)}>
          {/* Circle: pulses subtly, reacts strongly to hero text hover */}
          <div
            className={`w-[120px] h-[120px] border border-black rounded-full transition-all duration-1000 ${isHeroTitleHovered ? 'scale-150 border-[#10b981] opacity-60' : 'scale-100 animate-pulse-node'}`}
          />
          <div className="w-[80px] h-[80px] animate-slow-rotate-reverse">
            <Geometry type={GeometryType.TRIANGLE} style={{ width: '100%', height: '100%', position: 'relative' }} />
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.01]">
          <div className="grid grid-cols-8 gap-10">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-black rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 w-full z-[160] px-6 py-6 md:px-12 lg:px-20 flex justify-between items-center transition-all duration-[1200ms] ease-out-expo ${scrollY > 100 && !isMenuOpen ? 'bg-white/95 backdrop-blur-2xl border-b border-black/5 py-4 lg:py-5 shadow-sm' : 'bg-transparent'}`}>
        <div className="flex items-center">
          <a href="#" onClick={(e) => handleSmoothScroll(e, '#')} className="flex items-center gap-3 md:gap-4 group leading-none">
            <span className={`text-xl md:text-2xl font-[900] tracking-[-0.08em] uppercase transition-all duration-500 pb-1 leading-none ${isMenuOpen ? 'text-white' : 'text-black'}`}>
              {siteConfig.BRAND.NAME}
            </span>
            <span className={`text-lg md:text-xl transition-all duration-1000 ${isMenuOpen ? 'text-white' : 'text-black hover:text-[#10b981]'}`}>■</span>
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-12 h-full">
          <div className="flex items-center gap-8 mono text-[10px] tracking-[0.4em] font-black uppercase leading-none">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative py-1 transition-all duration-500 ${activeSection === link.id ? 'text-[#10b981]' : 'text-gray-300 hover:text-[#10b981]'}`}
              >
                {link.label}
                <span className={`absolute -bottom-3 left-0 h-[1.5px] bg-[#10b981] transition-all duration-700 ${activeSection === link.id ? 'w-4' : 'w-0'}`} />
              </a>
            ))}
          </div>
          <div className={`mono text-[9px] tracking-widest opacity-40 flex gap-4 transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-black font-bold'}`}>
            <span>{time}</span>
          </div>
        </div>

        <button onClick={toggleMenu} className={`lg:hidden mono text-[9px] tracking-[0.2em] border px-6 py-3 transition-all duration-500 relative z-[170] font-black backdrop-blur-md ${isMenuOpen ? 'bg-white text-black border-white' : 'bg-white/95 text-black border-black/10'}`}>
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[155] bg-[#050505] transition-all duration-[1200ms] ease-out-expo ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="h-full flex flex-col items-center justify-center p-8 text-white relative z-10">
          <div className="mono text-[10px] tracking-[0.6em] text-[#10b981] mb-12 opacity-60">/ SYSTEM_NAV_MENU</div>
          <div className="flex flex-col gap-6 md:gap-8 w-full max-w-xs">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="group flex items-center justify-between border-b border-white/5 pb-4 transition-all hover:translate-x-3"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-center gap-6">
                  <span className="mono text-[10px] opacity-20 font-black">{link.id}</span>
                  <span className="text-3xl md:text-4xl font-black uppercase tracking-tighter group-hover:text-[#10b981] transition-colors">
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-all text-[#10b981]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section data-index="01" id="home" className="reveal relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 overflow-visible">
        <div
          className={`${sectionLayout} flex flex-col items-center text-center`}
          style={{
            transform: `scale(${Math.max(0.95, 1 - scrollY / 4000)}) translateY(${scrollY * 0.1}px)`,
            transition: 'transform 0.1s linear'
          }}
        >
          <div className="reveal-mask mb-6">
            <span className="reveal-item mono text-[11px] md:text-[12px] tracking-[0.4em] uppercase text-black opacity-[0.4] font-black border border-black/15 px-5 py-1.5 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#10b981] animate-pulse rounded-full" />
              / {siteConfig.HERO.LABEL}
            </span>
          </div>
          <div
            className="reveal-mask mb-4"
            onMouseEnter={() => setIsHeroSubtitleHovered(true)}
            onMouseLeave={() => setIsHeroSubtitleHovered(false)}
          >
            <span className="reveal-item text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#10b981] font-black">{siteConfig.HERO.TAGLINE}</span>
          </div>

          <div
            className="relative mt-2 mb-8 group cursor-default"
            onMouseEnter={() => setIsHeroTitleHovered(true)}
            onMouseLeave={() => setIsHeroTitleHovered(false)}
          >
            <h1 className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-[900] tracking-[-0.06em] leading-[0.82] flex flex-col items-center uppercase">
              <div className="flex gap-[0.2em] reveal-mask overflow-visible py-1">
                {splitWords(siteConfig.HERO.TITLE_LINE_1).map((word, i) => (
                  <span
                    key={i}
                    className="reveal-item block group-hover:text-[#10b981] transition-colors duration-500"
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </div>
              <div className="flex gap-[0.2em] reveal-mask overflow-visible text-black/95 py-1">
                {splitWords(siteConfig.HERO.TITLE_LINE_2).map((word, i) => (
                  <span
                    key={i}
                    className="reveal-item block"
                    style={{ transitionDelay: `${(splitWords(siteConfig.HERO.TITLE_LINE_1).length + i) * 120}ms` }}
                  >
                    {word}
                  </span>
                ))}
                <span className="cursor-blink text-[#10b981] reveal-item" style={{ transitionDelay: `${(splitWords(siteConfig.HERO.TITLE_LINE_1).length + splitWords(siteConfig.HERO.TITLE_LINE_2).length) * 120}ms` }}>_</span>
              </div>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8 w-full sm:w-auto mt-6 stagger-child stagger-delay-4">
            <a
              href={mainRepoGitHub}
              target="_blank"
              rel="noreferrer"
              className="btn-system-cmd group relative bg-black text-white px-10 py-5 text-[11px] mono font-black tracking-[0.3em] uppercase flex items-center justify-center gap-4 transition-all shadow-lg hover:bg-[#10b981] hover:-translate-y-1 active:translate-y-0"
            >
              <div className="system-btn-corner corner-tl" />
              <div className="system-btn-corner corner-tr" />
              <div className="system-btn-corner corner-bl" />
              <div className="system-btn-corner corner-br" />
              ACCESS_CIVIC_MODULES <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
          
          <div className="mt-14 reveal-mask opacity-80 stagger-child stagger-delay-5">
            <div className="reveal-item flex items-center gap-3">
              <span className="mono text-[9px] font-bold uppercase text-black/40 tracking-[0.2em]">UNDER THE</span>
              <a href="https://byteedu.co.in/" target="_blank" rel="noreferrer" className="flex items-center gap-2 group/hero-byte hover:-translate-y-[1px] transition-transform">
                <img src="/byteedu.png" alt="ByteEdu" className="h-3 w-auto opacity-50 grayscale group-hover/hero-byte:grayscale-0 group-hover/hero-byte:opacity-100 transition-all duration-300" />
                <span className="mono text-[10px] font-black uppercase text-black/60 tracking-[0.1em] group-hover/hero-byte:text-black transition-colors">ByteEdu</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SYSTEM STRIP */}
      <div
        className="w-full bg-[#0b0b0b] h-10 overflow-hidden border-t border-[#10b981]/40 z-50 relative cursor-pointer"
        onMouseEnter={() => setIsStripHovered(true)}
        onMouseLeave={() => setIsStripHovered(false)}
      >
        <div
          className="flex items-center whitespace-nowrap will-change-transform h-full"
          style={{ transform: `translateX(${marqueeOffset}px)` }}
        >
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {siteConfig.HERO.KEYWORDS.map((word, j) => (
                <React.Fragment key={j}>
                  <span
                    className="mono text-[11px] text-[#f2f2f2] tracking-[1.5px] uppercase px-10 block font-medium hover:text-[#10b981] transition-colors duration-300 ease-out"
                  >
                    {word}
                  </span>
                  <div className="relative w-1.5 h-1.5 mx-2">
                    <div className="absolute inset-0 bg-[#10b981] opacity-60 animate-pulse" />
                    <div className="absolute inset-0 border border-[#10b981] animate-ping opacity-20" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section data-index="02" id="about" className="pt-24 md:pt-32 pb-24 md:pb-32 relative overflow-hidden bg-white border-t border-black/5">
        <div className="section-num" style={{ ...getParallaxStyle(0.04), opacity: aboutVisible ? 0.015 : 0 }}>02</div>
        <div className={`${sectionLayout} flex flex-col items-center text-center`}>
          <div className="stagger-child">
            <h2 className="text-sm md:text-base mono tracking-[0.4em] uppercase text-[#10b981] mb-10 font-black leading-none">{siteConfig.ABOUT.LABEL}</h2>
            <p className={`text-3xl md:text-4xl lg:text-5xl font-[100] leading-[1.1] tracking-tight mb-12 md:mb-16 manifesto-reveal transition-all duration-[1500ms] ease-out-expo ${aboutVisible ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-12 blur-sm'}`}>
              {siteConfig.ABOUT.MANIFESTO}
            </p>
          </div>
          <p className="max-w-3xl text-gray-500 text-lg md:text-xl font-light leading-relaxed mb-16 stagger-child stagger-delay-2 mx-auto">
            {siteConfig.ABOUT.DESCRIPTION}
          </p>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section data-index="03" id="impact" className="pt-24 pb-32 bg-white relative overflow-hidden border-t border-black/5">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] pattern-strip z-0" />
        <div className="section-num" style={{ ...getParallaxStyle(0.06), opacity: impactVisible ? 0.012 : 0 }}>03</div>
        <div className={sectionLayout}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 border-b border-black/5 pb-12">
            <div className="flex-1 stagger-child">
              <span className="mono text-[10px] tracking-[0.6em] uppercase text-[#10b981] font-black mb-6 block leading-none">
                {siteConfig.IMPACT.LABEL}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                {siteConfig.IMPACT.HEADLINE.split(' ')[0]}<br />
                <span className="text-gray-200">{siteConfig.IMPACT.HEADLINE.split(' ')[1]}</span>
              </h2>
            </div>
            <div className="lg:w-[400px] lg:pt-16 stagger-child stagger-delay-1">
              <p className="text-base md:text-lg font-light text-gray-400 leading-relaxed mb-10">
                {siteConfig.IMPACT.DESCRIPTION}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="space-y-1 stagger-child stagger-delay-2">
              <span className="mono text-[9px] tracking-[0.5em] uppercase text-gray-300 font-black mb-8 block">[ SYSTEM_STATUS ]</span>
              {siteConfig.IMPACT.SYSTEMS.map((sys, idx) => (
                <div
                  key={sys.name}
                  className={`group/module flex items-center justify-between py-5 border-b border-black/5 transition-all duration-1000 hover:pl-3 ${impactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  <div className="flex items-center gap-6">
                    <span className="mono text-[10px] opacity-15 font-black">0{idx + 1}</span>
                    <span className="mono text-base md:text-lg font-black tracking-widest uppercase group-hover/module:text-[#10b981] transition-all">
                      {sys.name}
                    </span>
                  </div>
                  <StatusTag status={sys.status} isVisible={impactVisible} index={idx} />
                </div>
              ))}
            </div>
            <div className="lg:pl-12 stagger-child stagger-delay-3 border-l border-black/5 lg:pt-8">
              <span className="mono text-[9px] tracking-[0.5em] uppercase text-gray-300 font-black mb-10 block">[ CIVIC_VALUE_CREATED_ ]</span>
              <div className="space-y-8">
                {siteConfig.IMPACT.NARRATIVE.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6 group/narrative transition-all duration-500 hover:translate-x-2">
                    <div className="w-1.5 h-1.5 mt-2 border border-[#10b981]/30 group-hover/narrative:bg-[#10b981] transition-all" />
                    <p className="text-lg md:text-xl font-light text-gray-400 leading-tight group-hover/narrative:text-black transition-all">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section data-index="04" id="philosophy" className="py-24 bg-white relative overflow-hidden border-t border-black/5">
        <div className={sectionLayout}>
          <div className="mb-12 stagger-child">
            <h3 className="text-xs md:text-sm mono tracking-[0.4em] uppercase text-gray-400 font-black mb-4 leading-none">/ CIVIC_FRAMEWORK_{siteConfig.BRAND.VERSION}</h3>
          </div>
          <div className="flex flex-col">
            {siteConfig.PHILOSOPHY.map((item, i) => (
              <div
                key={item.id}
                className={`group/principle relative py-10 border-t border-black/5 flex flex-col md:flex-row items-start gap-6 md:gap-12 transition-all duration-1000 hover:translate-x-4 reveal stagger-child`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-6 w-full md:w-1/4">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <Geometry
                      type={item.type}
                      className="text-[#10b981] group-hover/principle:rotate-[45deg] group-hover/principle:scale-110 transition-all duration-1000 ease-out-expo"
                      opacity={0.8}
                      style={{ width: '100%', height: '100%', position: 'relative' }}
                    />
                  </div>
                  <span className="mono text-[10px] font-black text-[#10b981] tracking-[0.4em]">{item.id}</span>
                </div>
                <div className="flex-1 max-w-2xl">
                  <h4 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2 group-hover/principle:text-[#10b981] transition-colors duration-500">
                    {item.title}
                  </h4>
                  <p className="text-base md:text-lg font-light text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section data-index="06" id="projects" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-black/5">
        <div className="section-num" style={{ ...getParallaxStyle(0.1), opacity: projectsVisible ? 0.015 : 0 }}>06</div>
        <div className={sectionLayout}>
          <div className="flex flex-col lg:flex-row gap-12 lg:items-start border-b border-black/5 pb-12 mb-12">
            <div className="flex-1 stagger-child relative">
              <div className="lg:pl-8">
                <h2 className="text-[10px] md:text-xs mono tracking-[0.6em] uppercase text-gray-300 mb-6 font-black flex items-center gap-3">
                  SYSTEM_ARCHIVE_LOG <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                </h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                  <span className="block opacity-25">CORE</span>
                  <span className="block text-black hover:text-[#10b981] transition-colors">RESEARCH</span>
                </h3>
              </div>
            </div>
            <div className="w-full lg:w-[400px] lg:pt-12 stagger-child stagger-delay-1 border-l border-black/5 lg:pl-10">
              <p className="text-base md:text-lg font-light text-gray-500 leading-relaxed">
                Technical documentation of open-source prototypes designed to decentralize information access.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {siteConfig.PROJECTS.map((project, i) => (
              <div
                key={project.id}
                className="project-block group relative reveal bg-gray-50 flex flex-col h-full border border-black/5 hover:border-[#10b981] hover:bg-black transition-all duration-700 ease-out-expo overflow-hidden"
              >
                <div className="p-8 md:p-10 flex flex-col flex-1 relative z-10">
                  <span className="mono text-2xl font-[900] opacity-15 group-hover:text-[#10b981] group-hover:opacity-100 transition-all duration-700 leading-none mb-6 block">{project.index}</span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-[1.1] group-hover:text-[#10b981] transition-colors duration-500 mb-6">{project.title}</h3>
                  <p className="text-base font-light text-gray-500 leading-relaxed mb-10 group-hover:text-gray-300 flex-grow">{project.description}</p>
                  
                  <div className="mt-auto flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, tid) => (
                        <span key={tid} className="text-[10px] mono tracking-widest uppercase bg-black/[0.03] text-black/60 px-3 py-1.5 group-hover:bg-white/10 group-hover:text-white/80 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-black/5 group-hover:border-white/10 transition-colors">
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 mono text-[10px] font-black tracking-[0.4em] uppercase text-black group-hover:text-white hover:!text-[#10b981] transition-colors leading-none">
                        <Github size={14} /> REPO <ArrowUpRight size={12} />
                      </a>
                      <RepoStats url={project.github} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PEOPLE SECTION */}
      <section data-index="08" id="people" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-black/5">
        <div className="section-num" style={{ ...getParallaxStyle(0.05), opacity: peopleVisible ? 0.015 : 0 }}>08</div>
        <div className={sectionLayout}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 border-b border-black/5 pb-12">
            <div className="stagger-child">
              <h2 className="text-[10px] md:text-xs mono tracking-[0.6em] uppercase text-gray-400 mb-6 font-black flex items-center gap-2 leading-none">
                <Users size={12} className="text-[#10b981]" /> / CONTRIBUTORS_INDEX
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                PEOPLE<br /><span className="text-[#10b981]">NETWORK_</span>
              </h3>
            </div>
            <div className="lg:w-[350px] lg:pt-16 stagger-child stagger-delay-1">
              <p className="text-lg font-light text-gray-400 leading-relaxed">
                An open network of developers and researchers collaborating on public infrastructure.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center mb-24 reveal group/founder">
            <div className="relative mb-8 group/avatar">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-black/5 group-hover/founder:border-[#10b981]/30 p-2 overflow-hidden bg-white transition-all duration-700">
                <img
                  src={founderAvatar}
                  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.01]"
                  alt={siteConfig.TEAM.CORE.name}
                />
              </div>
              <div className="absolute -inset-3 border border-dashed border-[#10b981]/20 rounded-full animate-slow-rotate pointer-events-none opacity-0 group-hover/founder:opacity-100 transition-opacity duration-700" />
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-none mb-2 group-hover/founder:text-[#10b981] transition-colors">{siteConfig.TEAM.CORE.name}</h3>
            <p className="mono text-[10px] tracking-[0.4em] text-[#10b981] font-black uppercase mb-8">{siteConfig.TEAM.CORE.role}</p>
            <div className="flex gap-8">
              <a href={siteConfig.TEAM.CORE.linkedin} target="_blank" rel="noreferrer" className="text-black/20 hover:text-[#10b981] transition-colors"><Linkedin size={20} /></a>
              <a href={siteConfig.TEAM.CORE.github} target="_blank" rel="noreferrer" className="text-black/20 hover:text-[#10b981] transition-colors"><Github size={20} /></a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-x-10 gap-y-10 sm:gap-y-12">
            {siteConfig.TEAM.CONTRIBUTORS.map((member, idx) => (
              <div
                key={member.id}
                className={`group/member reveal stagger-child p-5 sm:p-6 md:p-8 border-t border-black/5 transition-all duration-500 ease-out hover:border-[#10b981] hover:bg-gray-900 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] hover:-translate-y-1 sm:hover:-translate-y-2`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="mono text-[9px] font-black opacity-15 group-hover/member:opacity-40 group-hover/member:text-white transition-all">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex gap-3 opacity-0 group-hover/member:opacity-100 transition-all duration-500">
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-black/30 group-hover/member:text-white/40 hover:!text-[#10b981] transition-colors">
                      <Linkedin size={14} />
                    </a>
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noreferrer" className="text-black/30 group-hover/member:text-white/40 hover:!text-[#10b981] transition-colors">
                        <Github size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mb-6 w-16 h-16 rounded-full border border-black/5 group-hover/member:border-[#10b981]/30 p-1 overflow-hidden bg-white transition-all duration-500">
                  {member.github ? (
                    <img
                      src={`${member.github}.png`}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover grayscale group-hover/member:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center group-hover/member:bg-gray-800 transition-colors">
                      <Users size={24} className="text-black/10 group-hover/member:text-[#10b981]/50" />
                    </div>
                  )}
                </div>

                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover/member:text-[#10b981] transition-colors">
                  {member.name}
                </h4>
                <div className="mt-6 w-6 h-[1.5px] bg-black/5 group-hover/member:w-full group-hover/member:bg-[#10b981] transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRIBUTE SECTION */}
      <section data-index="09" id="contribute" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-black/5">
        <div className="absolute top-[20%] right-[5%] opacity-[0.02] pointer-events-none" style={getShapeReactiveStyle(0, 0, 5)}>
          <Geometry type={GeometryType.SCHEMATIC} style={{ width: '200px', height: '200px' }} />
        </div>

        <div className={sectionLayout}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 md:mb-20">
            <div className="lg:col-span-5 flex flex-col justify-end stagger-child">
              <span className="mono text-[11px] tracking-[0.4em] uppercase text-black opacity-[0.3] font-black mb-6 block leading-none">
                / CONTRIBUTION_INTERFACE
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-black">
                CONTRIBUTE<br />TO THE<br />SYSTEM<span className="cursor-blink text-[#10b981]">_</span>
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-end lg:pl-10 stagger-child stagger-delay-1">
              <p className="text-lg md:text-xl font-light text-gray-500 leading-relaxed max-w-xl">
                ChronalLabs invites contributors to shape tools, research, and interfaces. We are building civic systems in public. <span className="text-black font-medium">You can help shape them.</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col border-t border-black/5">
            {siteConfig.CONTRIBUTE_PROTOCOLS.map((module, idx) => (
              <a
                key={module.number}
                href={module.href}
                onClick={(e) => handleSmoothScroll(e, module.href)}
                className="group/module flex flex-col xl:flex-row items-start xl:items-center justify-between py-10 md:py-12 border-b border-black/5 transition-all duration-700 hover:bg-black/[0.01] hover:pl-0 sm:hover:pl-4 reveal"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-12 flex-1">
                  <span className="mono text-xl md:text-2xl font-[900] opacity-10 group-hover/module:opacity-100 group-hover/module:text-[#10b981] transition-all leading-none">
                    {module.number}
                  </span>
                  <div className="flex flex-col gap-2 max-w-xl">
                    <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase group-hover/module:text-black transition-colors break-words break-all sm:break-normal">
                      {module.title}
                    </h3>
                    <p className="text-sm sm:text-base font-light text-gray-400 group-hover/module:text-gray-600 leading-snug">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 xl:mt-0 flex items-center gap-3 mono text-[10px] font-black tracking-[0.4em] uppercase text-black/20 group-hover/module:text-[#10b981] transition-all leading-none ml-0 sm:ml-16 xl:ml-0">
                  {module.actionLabel} <ArrowUpRight size={14} />
                </div>
              </a>
            ))}
          </div>

          {/* JOIN NOW FORM */}
          <div className="mt-24 md:mt-32 max-w-4xl mx-auto bg-gray-50 p-8 md:p-12 border border-black/5 reveal">
            <div className="flex flex-col mb-12">
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9] text-black mb-2">
                  JOIN NOW
               </h2>
               <h3 className="text-lg md:text-xl font-light text-[#10b981] uppercase tracking-widest">
                  APPLY NOW
               </h3>
            </div>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">Full Name *</label>
                 <input type="text" required className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors" />
              </div>
              <div className="flex flex-col">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">Email Address *</label>
                 <input type="email" required className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors" />
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">Phone Number * <span className="text-[10px] sm:text-xs font-normal text-gray-500 normal-case ml-1 hidden sm:inline">Include country code (e.g., +91 for India)</span></label>
                 <div className="text-[10px] font-normal text-gray-500 normal-case mb-1 sm:hidden">Include country code (e.g., +91 for India)</div>
                 <input type="tel" required className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors" />
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">Location (City, Country) * <span className="text-[10px] sm:text-xs font-normal text-gray-500 normal-case ml-1 hidden sm:inline">e.g., Mumbai, India</span></label>
                 <div className="text-[10px] font-normal text-gray-500 normal-case mb-1 sm:hidden">e.g., Mumbai, India</div>
                 <input type="text" required className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors" />
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">Position Interested In *</label>
                 <select required defaultValue="" className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors rounded-none appearance-none">
                    <option value="" disabled>Select a position...</option>
                    <option value="developer">Developer</option>
                    <option value="researcher">Researcher</option>
                    <option value="designer">Designer</option>
                    <option value="other">Other</option>
                 </select>
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">Highest Education Level *</label>
                 <select required defaultValue="" className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors rounded-none appearance-none">
                    <option value="" disabled>Select...</option>
                    <option value="highschool">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                 </select>
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">Domain of Expertise * <span className="text-[10px] sm:text-xs font-normal text-gray-500 normal-case ml-1 hidden sm:inline">e.g., Mathematics, Computer Science, Finance</span></label>
                 <div className="text-[10px] font-normal text-gray-500 normal-case mb-1 sm:hidden">e.g., Mathematics, Computer Science, Finance</div>
                 <input type="text" required className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors" />
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">Relevant Experience *</label>
                 <textarea required rows={4} placeholder="Tell us about your background, expertise, and why you're a good fit..." className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors resize-none"></textarea>
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">Hours Available Per Week *</label>
                 <select required defaultValue="" className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors rounded-none appearance-none">
                    <option value="" disabled>Select availability...</option>
                    <option value="0-10">0-10 hours</option>
                    <option value="10-20">10-20 hours</option>
                    <option value="20-40">20-40 hours</option>
                    <option value="40+">40+ hours</option>
                 </select>
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">LinkedIn Profile</label>
                 <div className="text-[10px] sm:text-xs font-normal text-gray-500 normal-case mb-1">https://linkedin.com/in/yourprofile</div>
                 <input type="url" className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors" />
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">GitHub / Portfolio (Optional)</label>
                 <div className="text-[10px] sm:text-xs font-normal text-gray-500 normal-case mb-1">https://github.com/yourusername</div>
                 <input type="url" className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors" />
              </div>
              <div className="flex flex-col md:col-span-2">
                 <label className="text-sm font-bold uppercase tracking-wider mb-2">How did you hear about us?</label>
                 <select defaultValue="" className="border-b border-black/20 py-3 bg-transparent outline-none focus:border-[#10b981] transition-colors rounded-none appearance-none">
                    <option value="" disabled>Select...</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="github">GitHub</option>
                    <option value="friend">Friend / Colleague</option>
                    <option value="other">Other</option>
                 </select>
              </div>
              
              <div className="md:col-span-2 mt-8">
                 <button type="submit" className="w-full bg-black text-white font-bold uppercase tracking-[0.2em] py-5 hover:bg-[#10b981] transition-colors duration-500 cursor-pointer border-none shadow-none">
                    Submit Application
                 </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-[#050505] pt-12 pb-8 overflow-hidden min-h-[360px] group border-t border-white/5">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 footer-grid"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'gridMove 40s linear infinite'
          }}
        />

        {/* NETWORK NODES */}
        <div className="absolute bottom-12 left-[10%] hidden md:flex gap-6 z-[1] items-center footer-nodes">
          <div className="absolute left-[-280px] top-1/2 w-[250px] h-[0.5px] bg-white opacity-[0.05]" />
          {[1, 2, 3].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-white rounded-full group-hover:bg-[#10b981] transition-colors duration-1000"
              style={{ animation: 'pulseNode 4s ease-in-out infinite', animationDelay: `${i * 0.6}s` }}
            />
          ))}
          <div className="absolute right-[-280px] top-1/2 w-[250px] h-[0.5px] bg-white opacity-[0.05]" />
        </div>

        {/* CORE ROTATING ELEMENT */}
        <div className="absolute right-12 bottom-12 pointer-events-none z-[2] hidden md:block footer-core">
          <div className="w-10 h-10 border border-white/5 flex items-center justify-center animate-slow-rotate" style={{ animationDuration: '60s' }}>
            <div className="w-2 h-2 bg-[#10b981]/40 rounded-sm" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-[5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 text-white">
          <div className="flex flex-col">
            <span className="mono text-[10px] tracking-[0.5em] font-black text-white/60 mb-6 block uppercase leading-none">/ SYSTEM_STATUS</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none mb-4 group-hover:text-[#10b981] transition-all duration-700">
              {siteConfig.BRAND.NAME}_
            </h2>
            <p className="text-[10px] mono tracking-[0.2em] text-white/40 font-black uppercase">Open Civic Systems Lab</p>
          </div>
          <div className="flex flex-col">
            <span className="mono text-[10px] tracking-[0.4em] font-black text-white/60 mb-6 block uppercase leading-none">SYSTEM_LINKS</span>
            <ul className="space-y-2">
              {['GITHUB', 'LINKEDIN', 'PROJECTS', 'ABOUT'].map((link, idx) => (
                <li key={link}>
                  <a
                    href={link === 'GITHUB' ? orgGitHub : link === 'LINKEDIN' ? siteConfig.TEAM.CORE.linkedin : link === 'PROJECTS' ? '#projects' : '#about'}
                    onClick={(e) => handleSmoothScroll(e, link === 'GITHUB' ? orgGitHub : link === 'LINKEDIN' ? siteConfig.TEAM.CORE.linkedin : link === 'PROJECTS' ? '#projects' : '#about')}
                    target={idx < 2 ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="group/flink flex items-center gap-4 mono text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-[#10b981] transition-all hover:translate-x-2"
                  >
                    <span className="opacity-10 text-[9px]">0{idx + 1}</span> {link} <ArrowUpRight size={10} className="opacity-0 group-hover/flink:opacity-100 transition-all -translate-x-1 group-hover/flink:translate-x-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <span className="mono text-[10px] tracking-[0.4em] font-black text-white/60 mb-6 block uppercase leading-none">SYSTEM_ACTIVITY</span>
            <div className="space-y-3 mono text-[10px] font-black tracking-widest text-white/40 uppercase">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                <span>NODE_ACTIVITY: LIVE</span>
              </div>
              <p className="pl-4 border-l border-white/5 hover:border-[#10b981]/30 transition-all">MODULES: ACTIVE</p>
              <OrgStats />
              <p className="pl-4 border-l border-white/5 hover:border-[#10b981]/30 transition-all">STATUS: ONLINE</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-12 md:mt-16 pt-6 border-t border-white/5 relative z-[5] flex flex-col xl:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-6 mono text-[9px] font-black uppercase text-white/20 tracking-[0.25em]">
            <a href="https://byteedu.co.in/" target="_blank" rel="noreferrer" className="flex items-center gap-3 group/byteedu cursor-pointer">
              <img src="/byteedu.png" alt="ByteEdu" className="h-4 w-auto opacity-70 grayscale group-hover/byteedu:grayscale-0 group-hover/byteedu:opacity-100 transition-all duration-300" />
              <span className="text-white/50 group-hover/byteedu:text-white transition-colors">© 2026 ByteEdu Learning Platform. All rights reserved.</span>
            </a>
            <span className="hidden xl:block opacity-10">•</span>
            <span>{siteConfig.BRAND.VERSION}</span>
            <span className="hidden md:block opacity-10">•</span>
            <span>{siteConfig.BRAND.GEO}</span>
            <span className="hidden md:block opacity-10">•</span>            <a href="https://github.com/ChronalLabs/.github/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">CODE OF CONDUCT</a>
            <span className="hidden md:block opacity-10">â€¢</span>
            <a href="https://github.com/ChronalLabs/.github/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">CONTRIBUTING</a>
            <span className="hidden md:block opacity-10">â€¢</span>            <span>OS CORE</span>
          </div>

          <div className="flex items-center gap-6 mono text-[10px] font-black uppercase tracking-tighter text-white/20">
            <span>SIGNAL_SYNC</span>
            <div className="flex gap-1.5 h-3.5 items-end">
              <div className="w-0.5 h-full bg-[#10b981] animate-pulse" />
              <div className="w-0.5 h-[60%] bg-[#10b981] animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-0.5 h-[30%] bg-[#10b981] animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
          @keyframes pulseNode {
            0%, 100% { opacity: 0.15; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.15); }
          }
          .footer-grid {
             mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          }
        `}} />
      </footer>
    </main>
  );
};

export default App;