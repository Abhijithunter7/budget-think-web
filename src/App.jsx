import React, { useEffect, useRef, useState } from 'react';
import { Download, Scroll, Atom, FlaskConical, X, Calendar, MapPin, AlertCircle, CheckCircle, Star } from 'lucide-react';

// --- NEURAL BACKGROUND COMPONENT ---
const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    // Mouse state
    let mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#39ff14' : '#00f3ff'; // Neon Green or Blue
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * 3;
          const directionY = forceDirectionY * force * 3;

          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (width * height) / 15000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;

          if (distance < (width / 7) * (height / 7)) {
            const opacityValue = 1 - distance / 20000;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-60 bg-[#050505]" />;
};

// --- DATA ---
const conferences = [
  {
    id: 1,
    title: "ICICV 2026",
    shortDate: "June 28-29",
    location: "Manipal Univ. Jaipur",
    badge: "Immediate Action",
    badgeColor: "text-red-400 border-red-400 bg-red-900/20",
    description: "Focuses on Computational Intelligence & Vision. Ideal for early feedback.",
    fullDetails: {
      about: "The 6th International Conference on Innovations in Computational Intelligence and Computer Vision (ICICV-2026) aims to bring together researchers to exchange results on Computer Vision.",
      relevance: "High Relevance. Your topic 'Budget Think' aligns perfectly with the 'Computational Intelligence' and 'Vision' tracks.",
      deadline: "Check Website (Likely Closing Soon)",
      format: "Springer Template (6-8 pages)",
      indexing: "Scopus (Expected)",
      website: "icicv.com" // Placeholder
    }
  },
  {
    id: 2,
    title: "IEEE INDICON",
    shortDate: "Dec 26-27",
    location: "TBD (Major Metro)",
    badge: "Recommended",
    badgeColor: "text-green-400 border-green-400 bg-green-900/20",
    description: "Flagship IEEE India event. Submission window aligns with dissertation.",
    fullDetails: {
      about: "INDICON is the annual flagship conference of the IEEE India Council. It covers the entire spectrum of Computer Science and Engineering.",
      relevance: "Excellent for Master's research. The 'AI & Data Science' track is the target.",
      deadline: "May - July 2026",
      format: "IEEE Double Column (Standard)",
      indexing: "IEEE Xplore & Scopus",
      website: "indicon.org" // Placeholder
    }
  },
  {
    id: 3,
    title: "CODS-COMAD",
    shortDate: "Aug '26 (Sub)",
    location: "ACM India",
    badge: "Premier Tier",
    badgeColor: "text-cyan-400 border-cyan-400 bg-cyan-900/20",
    description: "Top-tier Data Science venue. High impact reach goal.",
    fullDetails: {
      about: "The Joint International Conference on Data Science & Management of Data is a premier forum for researchers in India.",
      relevance: "Reach Goal. If your 'Budget Think' results show >60% efficiency gain, submit here.",
      deadline: "August 2026 (for Jan 2027 Conf)",
      format: "ACM Standard Template",
      indexing: "ACM Digital Library",
      website: "cods-comad.in" // Placeholder
    }
  }
];

const journals = [
  {
    title: "Sadhana",
    publisher: "Springer / Indian Academy of Sciences",
    desc: "SCIE & Scopus Indexed. Best for deep technical engineering details.",
    icon: <Scroll className="w-12 h-12 text-cyan-400 mb-4" />
  },
  {
    title: "Journal of IISc",
    publisher: "Springer / IISc Bangalore",
    desc: "Prestigious multidisciplinary journal. Look for AI special issues.",
    icon: <Atom className="w-12 h-12 text-cyan-400 mb-4" />
  },
  {
    title: "Current Science",
    publisher: "Current Science Association",
    desc: "Fast-track review options available. Broad scientific readership.",
    icon: <FlaskConical className="w-12 h-12 text-cyan-400 mb-4" />
  }
];

// --- MAIN APP ---
export default function App() {
  const [selectedConf, setSelectedConf] = useState(null);

  return (
    <div className="text-slate-200 font-sans h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide">
      <NeuralBackground />

      {/* --- PAGE 1: HERO --- */}
      <section className="h-screen w-screen snap-start flex items-center justify-center p-8 relative perspective-1000">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 max-w-4xl w-full shadow-2xl hover:shadow-[0_0_50px_rgba(0,243,255,0.2)] transition-all duration-500">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-400 to-green-400 bg-clip-text text-transparent animate-gradient-x uppercase tracking-tighter">
              Budget Think
            </h1>
            <p className="text-xl md:text-2xl text-green-400 tracking-widest font-light">
              A Controllable Selective Reasoning Framework
            </p>
            <p className="text-sm text-slate-400 mt-2">for Efficient Vision-Language Models</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-8">
            <div>
              <label className="text-cyan-400 text-xs uppercase tracking-wider block mb-1">Researcher</label>
              <div className="text-xl font-bold">Abhijit Raul</div>
              <span className="text-sm text-slate-500">Seat No: 24P0620001</span>
            </div>
            <div>
              <label className="text-cyan-400 text-xs uppercase tracking-wider block mb-1">Under Guidance Of</label>
              <div className="text-xl font-bold">Dr. Pradnya Bhagat</div>
            </div>
            <div className="md:col-span-2 mt-4 pt-4 border-t border-white/5">
              <label className="text-cyan-400 text-xs uppercase tracking-wider block mb-1">Affiliation</label>
              <div className="text-lg">Discipline of Computer Science and Technology</div>
              <div className="text-lg text-cyan-300">Goa Business School, Goa University</div>
              <div className="text-sm text-slate-500 mt-1">Academic Year: 2025–2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PAGE 2: ROADMAP --- */}
      <section className="h-screen w-screen snap-start flex items-center justify-center p-8">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 text-left">
            <h2 className="text-5xl font-bold mb-6 uppercase leading-tight">
              The 2026 <br /> <span className="text-green-400">Trajectory</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              The objective is to secure a publication before the end of the 2026 academic cycle.
              We target one immediate conference for quick feedback and a prestigious reach goal for the final dissertation defense.
            </p>
          </div>

          <div className="flex-1 relative pl-8 border-l-4 border-l-cyan-900/50">
            {/* Timeline Line gradient overlay */}
            <div className="absolute left-[-4px] top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-cyan-400 to-transparent rounded-full"></div>
            
            <div className="space-y-12">
              {[
                { date: "FEB 2026 (NOW)", title: "Analysis & Prep", desc: "Conceptualization Report & Abstract drafting." },
                { date: "JUNE 2026", title: "ICICV-2026", desc: "Target Conference (Jaipur). Early feedback mechanism." },
                { date: "AUG 2026", title: "CODS-COMAD Submission", desc: "The 'Reach' Goal. Premier Data Science venue." },
                { date: "DEC 2026", title: "IEEE INDICON", desc: "The 'Safe' Goal. Flagship India Council conference." }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[43px] top-1 w-4 h-4 bg-black border-2 border-green-400 rounded-full shadow-[0_0_10px_#39ff14] group-hover:bg-green-400 transition-colors"></div>
                  <span className="text-cyan-400 font-bold text-sm block mb-1">{item.date}</span>
                  <h3 className="text-xl font-bold uppercase">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PAGE 3: CONFERENCES --- */}
      <section className="h-screen w-screen snap-start flex flex-col items-center justify-center p-8 text-center relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 uppercase">
          Target <span className="text-cyan-400">Conferences</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
          {conferences.map((conf) => (
            <div 
              key={conf.id}
              onClick={() => setSelectedConf(conf)}
              className="flex-1 bg-gradient-to-br from-white/5 to-black border border-white/10 rounded-2xl p-8 cursor-pointer group hover:flex-[1.5] transition-all duration-500 relative overflow-hidden text-left hover:border-green-400/50 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]"
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 border ${conf.badgeColor}`}>
                {conf.badge}
              </div>
              <h3 className="text-3xl font-bold mb-2 uppercase font-mono">{conf.title}</h3>
              <div className="text-2xl font-bold mb-4">{conf.shortDate}</div>
              <div className="text-slate-400 text-sm mb-6 flex items-center gap-2">
                 <MapPin size={14}/> {conf.location}
              </div>
              <p className="text-slate-300 text-sm border-t border-white/10 pt-4">
                {conf.description}
              </p>
              <div className="mt-6 text-cyan-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                Click for details <Star size={14}/>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-slate-500 text-sm animate-bounce">
          Select a card to view submission details
        </div>
      </section>

      {/* --- PAGE 4: JOURNALS --- */}
      <section className="h-screen w-screen snap-start flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 uppercase">
          Journal <span className="text-fuchsia-400">Alternatives</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {journals.map((journal, idx) => (
            <div key={idx} className="bg-black/80 border border-white/10 p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-300 relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <div className="relative z-10">
                 {journal.icon}
                 <h3 className="text-2xl font-bold mb-2 uppercase">{journal.title}</h3>
                 <p className="text-slate-400 text-sm mb-4">{journal.publisher}</p>
                 <p className="text-slate-300 leading-relaxed">{journal.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PAGE 5: FOOTER --- */}
      <section className="h-screen w-screen snap-start flex items-center justify-center p-8">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-12 text-center max-w-2xl w-full shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Thank you</h2>
          <p className="text-lg text-slate-300 mb-8">
            "Civilization advances by extending the number of important operations which we can perform without thinking about them." 
            — Alfred North Whitehead (Mathematician & Philosopher)
          </p>
          <button className="bg-green-400 hover:bg-white text-black font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-300 flex items-center gap-3 mx-auto text-lg">
            🎯 <Download size={20} />
          </button>
          <div className="mt-12 text-slate-600 text-sm">
            &copy; 2026 Abhijit Rul | Goa University
          </div>
        </div>
      </section>

      {/* --- MODAL FOR CONFERENCE DETAILS --- */}
      {selectedConf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111] border border-white/20 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setSelectedConf(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
            >
              <X size={24} />
            </button>
            
            <div className="p-8">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 border ${selectedConf.badgeColor}`}>
                {selectedConf.badge}
              </div>
              <h2 className="text-4xl font-bold mb-1 uppercase font-mono text-white">{selectedConf.title}</h2>
              <div className="text-xl text-slate-400 mb-6">{selectedConf.shortDate} • {selectedConf.location}</div>
              
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl border-l-4 border-cyan-400">
                  <h4 className="text-cyan-400 text-sm font-bold uppercase mb-1 flex items-center gap-2"><CheckCircle size={14}/> About the Venue</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedConf.fullDetails.about}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="text-green-400 text-sm font-bold uppercase mb-1 flex items-center gap-2"><Star size={14}/> Relevance</h4>
                    <p className="text-slate-300 text-xs">{selectedConf.fullDetails.relevance}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl">
                    <h4 className="text-red-400 text-sm font-bold uppercase mb-1 flex items-center gap-2"><AlertCircle size={14}/> Deadline</h4>
                    <p className="text-slate-300 text-xs">{selectedConf.fullDetails.deadline}</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                   <div>
                      <h4 className="text-slate-400 text-xs font-bold uppercase mb-1">Format</h4>
                      <div className="text-white text-sm">{selectedConf.fullDetails.format}</div>
                   </div>
                   <div className="text-right">
                      <h4 className="text-slate-400 text-xs font-bold uppercase mb-1">Indexing</h4>
                      <div className="text-white text-sm">{selectedConf.fullDetails.indexing}</div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white/5 border-t border-white/10 flex justify-end">
               <button onClick={() => setSelectedConf(null)} className="px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-slate-200 transition-colors text-sm">
                 Close Details
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
