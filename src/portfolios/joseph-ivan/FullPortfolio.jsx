import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

// Import images
import profileImg from './images/profile.jpg';
import heroMockupImg from './images/hero-mockup.png';
import ecotradeLandingImg from './images/ecotrade_landing.png';
import dealogikalImg from './images/dealogikal.png';
import knotticalImg from './images/knottical.png';

const projects = [
  {
    id: 'ecotrade',
    title: 'EcoTrade: Digital Barter Platform',
    image: ecotradeLandingImg,
    description: 'Developing a community-based barter system designed for residents of Mandaue and Lapu-Lapu City to facilitate non-monetary exchanges and sustainable local trading.',
    categories: ['uiux', 'web'],
    tags: ['UI/UX Design', 'Software Development', 'Sustainability'],
    details: {
      title: "EcoTrade Platform",
      problem: "Waste and lack of monetary resources in local communities in Cebu.",
      solution: "A digital barter system using non-monetary exchanges for sustainable local trading.",
      tools: ["Figma", "React", "Node.js", "MongoDB"],
      description: "This project focused on creating a sustainable trading ecosystem for residents in Cebu, enabling them to trade direct goods and services transparently.",
      actions: [
        { text: "View Figma Case Study", url: "https://www.figma.com", icon: "figma" },
        { text: "View Repository", url: "https://github.com/jpq03/Joseph-Portfolio", icon: "github" }
      ]
    }
  },
  {
    id: 'dealogikal',
    title: 'Dealogikal',
    image: dealogikalImg,
    description: 'Dealogikal elevates the supply chain by automating the procurement process through a transparent and competitive online marketplace.',
    categories: ['uiux'],
    tags: ['E-commerce website'],
    details: {
      title: "Dealogikal Marketplace",
      problem: "Opaque and inefficient procurement processes in supply chains.",
      solution: "Automated competitive online marketplace for transparent bidding and vendor selection.",
      tools: ["UI/UX Design", "Information Architecture", "Interactive Prototyping"],
      description: "Streamlining how businesses source products through automated competition, clean documentation dashboards, and simplified approval workflows.",
      actions: [
        { text: "Explore Prototype", url: "https://www.figma.com", icon: "figma" },
        { text: "Visit Marketplace", url: "https://www.dealogikal.com", icon: "external" }
      ]
    }
  },
  {
    id: 'knottical',
    title: 'Knottical Power Energy',
    image: knotticalImg,
    description: 'Modernize financial document intelligence in one clean flow for the fuel distribution sector.',
    categories: ['web', 'ai'],
    tags: ['Dashboard', 'AI Integration', 'Web App'],
    details: {
      title: "Knottical Dashboard",
      problem: "Complex financial document management and manual invoice processing in fuel distribution.",
      solution: "AI-integrated document intelligence dashboard for real-time compliance and processing.",
      tools: ["Dashboard UI", "AI Integrations", "Data Visualization", "Figma"],
      description: "Modernizing financial workflows for the energy sector with a clean, responsive, and secure cloud dashboard that parses PDFs instantly.",
      actions: [
        { text: "Explore Dashboard Prototype", url: "https://www.figma.com", icon: "figma" },
        { text: "View Repository", url: "https://github.com/jpq03/Joseph-Portfolio", icon: "github" }
      ]
    }
  }
];

export default function JosephIvanPortfolio() {
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // States
  const [theme, setTheme] = useState(() => localStorage.getItem('joseph-theme') || 'dark');
  const [menuActive, setMenuActive] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Hero Mockup Swticher
  const [activeImgKey, setActiveImgKey] = useState('overview');
  const [heroImageSrc, setHeroImageSrc] = useState(heroMockupImg);
  const [heroFade, setHeroFade] = useState(false);

  // Back to top
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Chatbot state
  const [chatbotActive, setChatbotActive] = useState(false);
  const [chatbotInput, setChatbotInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Joseph's AI assistant. How can I help you today?", sender: 'bot' }
  ]);

  // Custom cursor
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isCursorHovered, setIsCursorHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Scoped Custom Cursor mouse over tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .project-card, .theme-switch, .suggestion-chip, .switcher-btn, .filter-btn');
      if (target) {
        setIsCursorHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .project-card, .theme-switch, .suggestion-chip, .switcher-btn, .filter-btn');
      if (target) {
        setIsCursorHovered(false);
      }
    };

    container.addEventListener('mouseover', handleMouseOver);
    container.addEventListener('mouseout', handleMouseOut);

    return () => {
      container.removeEventListener('mouseover', handleMouseOver);
      container.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Window Resize (Mobile Mode detection) and mouse movement
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Intersection Observer for active section scrolling and animation reveal
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'skills', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(`joseph-${id}`)).filter(Boolean);

    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace('joseph-', '');
          setActiveSection(sectionId);
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => activeObserver.observe(section));

    // Scroll reveal animation
    const revealEls = document.querySelectorAll('.joseph-portfolio-container .reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  // Back to top scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard Navigation Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey) {
        const key = e.key.toUpperCase();
        const routes = { H: 'home', A: 'about', P: 'projects', S: 'skills', C: 'contact' };
        if (routes[key]) {
          e.preventDefault();
          const target = document.getElementById(`joseph-${routes[key]}`);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Chatbot Auto Scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Theme Toggler
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('joseph-theme', nextTheme);
  };

  // Nav scroll click helper
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuActive(false);
    const element = document.getElementById(`joseph-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero Switcher helper
  const handleSwitcherClick = (key, image) => {
    if (activeImgKey === key) return;
    setHeroFade(true);
    setTimeout(() => {
      setActiveImgKey(key);
      setHeroImageSrc(image);
      setHeroFade(false);
    }, 250);
  };

  // Magnetic Button Effect
  const handleButtonMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    btn.style.transition = 'transform 0.1s ease-out';
  };

  const handleButtonMouseLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = 'translate(0px, 0px)';
    btn.style.transition = 'all 0.3s ease';
  };

  // Chatbot helper
  const handleChatSend = async (overrideText) => {
    const text = typeof overrideText === 'string' ? overrideText : chatbotInput.trim();
    if (!text) return;

    if (typeof overrideText !== 'string') {
      setChatbotInput('');
    }

    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setIsTyping(true);

    try {
      const response = await fetch("https://joseph.quisidojoseph24.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) throw new Error("Worker error");
      const data = await response.json();

      setIsTyping(false);
      setMessages(prev => [...prev, { text: data.response || "I'm thinking, but my words got stuck. Try asking again!", sender: 'bot' }]);
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: "I'm currently resting my circuits. Please email Joseph directly or try again later!", sender: 'bot' }]);
    }
  };

  // Filter project logic
  const filteredProjects = projects.filter(proj => filter === 'all' || proj.categories.includes(filter));

  return (
    <div 
      ref={containerRef}
      className={`joseph-portfolio-container ${!isMobile ? 'custom-cursor-active' : ''}`}
      data-theme={theme}
    >
      {/* Custom Cursor elements */}
      {!isMobile && (
        <>
          <div 
            className="cursor-dot" 
            style={{ left: cursorPos.x, top: cursorPos.y, transform: isCursorHovered ? 'translate(-50%, -50%) scale(0.5)' : 'translate(-50%, -50%) scale(1)' }}
          />
          <div 
            className={`cursor-outline ${isCursorHovered ? 'cursor-hover' : ''}`} 
            style={{ left: cursorPos.x, top: cursorPos.y }}
          />
        </>
      )}


      {/* Hero Section */}
      <section id="joseph-home" className="hero reveal active">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Hi, I'm Joseph Ivan P. Quisido Jr.</h1>
            <p className="tagline">UI/UX Designer | Digital Product Design Enthusiast</p>
            <p className="hero-description">Crafting beautiful and intuitive user experiences that solve real problems</p>
            <div className="hero-buttons">
              <a 
                href="#projects" 
                className="btn btn-primary"
                onClick={(e) => handleNavClick(e, 'projects')}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="btn btn-secondary"
                onClick={(e) => handleNavClick(e, 'contact')}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
              >
                Get In Touch
              </a>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="mockup-container">
              <img 
                id="hero-display-img" 
                src={heroImageSrc} 
                alt="UI Mockup Composition" 
                style={{ opacity: heroFade ? 0.2 : 1, transform: heroFade ? 'scale(0.96)' : 'scale(1)' }}
              />
              <div className="mockup-switcher">
                <button 
                  className={`switcher-btn ${activeImgKey === 'overview' ? 'active' : ''}`}
                  onClick={() => handleSwitcherClick('overview', heroMockupImg)}
                >
                  Overview
                </button>
                <button 
                  className={`switcher-btn ${activeImgKey === 'ecotrade' ? 'active' : ''}`}
                  onClick={() => handleSwitcherClick('ecotrade', ecotradeLandingImg)}
                >
                  EcoTrade
                </button>
                <button 
                  className={`switcher-btn ${activeImgKey === 'dealogikal' ? 'active' : ''}`}
                  onClick={() => handleSwitcherClick('dealogikal', dealogikalImg)}
                >
                  Dealogikal
                </button>
                <button 
                  className={`switcher-btn ${activeImgKey === 'knottical' ? 'active' : ''}`}
                  onClick={() => handleSwitcherClick('knottical', knotticalImg)}
                >
                  Knottical
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="joseph-about" className="about reveal">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-image">
              <img src={profileImg} alt="Joseph Quisido Profile Picture" />
            </div>
            <div className="about-text">
              <p>I'm a fresh UI/UX designer passionate about creating meaningful digital experiences. With a strong foundation in design principles and user research, I focus on building interfaces that are not only beautiful but also highly functional.</p>
              <p>My journey into design started with a curiosity about how things work and a desire to make them work better. Today, I'm dedicated to solving design challenges through user-centered thinking and creative problem-solving.</p>
              <p>I am a proud graduate of the <strong>University Of Cebu Lapu Lapu and Mandaue</strong>, where I developed my strong foundation in digital product design.</p>
              
              <div className="about-stats">
                <div className="stat">
                  <h3>3</h3>
                  <p>Projects</p>
                </div>
                <div className="stat">
                  <h3>2</h3>
                  <p>Clients</p>
                </div>
                <div className="stat">
                  <h3>1+</h3>
                  <p>Year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="joseph-projects" className="projects reveal">
        <div className="container">
          <h2>Featured Projects</h2>
          
          <div className="project-filters">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Projects</button>
            <button className={`filter-btn ${filter === 'uiux' ? 'active' : ''}`} onClick={() => setFilter('uiux')}>UI/UX Design</button>
            <button className={`filter-btn ${filter === 'web' ? 'active' : ''}`} onClick={() => setFilter('web')}>Web Apps</button>
            <button className={`filter-btn ${filter === 'ai' ? 'active' : ''}`} onClick={() => setFilter('ai')}>AI Integration</button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map(project => (
              <article key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} className="project-thumbnail" />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="joseph-skills" className="skills reveal">
        <div className="container">
          <h2>My Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Design Tools</h3>
              <ul>
                <li>Figma</li>
                <li>Adobe XD</li>
                <li>Sketch</li>
                <li>Protopie</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Design Skills</h3>
              <ul>
                <li>User Research</li>
                <li>Wireframing</li>
                <li>Prototyping</li>
                <li>Visual Design</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Technical Skills</h3>
              <ul>
                <li>HTML/CSS</li>
                <li>JavaScript</li>
                <li>Responsive Design</li>
                <li>Web Design</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Soft Skills</h3>
              <ul>
                <li>Problem Solving</li>
                <li>Communication</li>
                <li>Collaboration</li>
                <li>Critical Thinking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="joseph-contact" className="contact reveal">
        <div className="container">
          <h2>Get In Touch</h2>
          <p className="contact-intro">Have a project in mind? Let's create something amazing together!</p>

          <div className="contact-content">
            <form action="https://formspree.io/f/mqenolvg" method="POST" className="contact-form">
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
              >
                Send Message
              </button>
            </form>

            <div className="contact-info">
              <div className="info-item">
                <h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg> 
                  Email
                </h4>
                <p><a href="mailto:Quisidojoseph23@gmail.com">Quisidojoseph23@gmail.com</a></p>
              </div>
              
              <div className="info-item">
                <h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg> 
                  Phone
                </h4>
                <p><a href="tel:+639956705968">09956705968</a></p>
              </div>

              <div className="info-item">
                <h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg> 
                  Location
                </h4>
                <p><a href="https://www.google.com/maps/search/?api=1&query=Pusok+Lapu+Lapu+City+Cebu" target="_blank" rel="noopener noreferrer">Pusok Lapu Lapu City Cebu</a></p>
              </div>

              <div className="social-links">
                <h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg> 
                  Follow Me
                </h4>
                <div className="socials">
                  <a href="https://www.linkedin.com/in/joseph-ivan-quisido-571815363" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://www.instagram.com/josephquisido" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Joseph Quisido. All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <div className="chatbot-widget">
        <button className="chatbot-toggle" onClick={() => setChatbotActive(!chatbotActive)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <div className={`chatbot-container ${chatbotActive ? 'active' : ''}`}>
          <div className="chatbot-header">
            <h3>AI Assistant</h3>
            <button id="close-chatbot" onClick={() => setChatbotActive(false)}>&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-suggestions">
            {['Skills', 'Projects', 'Process', 'Contact'].map(chip => (
              <button key={chip} className="suggestion-chip" onClick={() => handleChatSend(chip)}>{chip}</button>
            ))}
          </div>
          <div className="chatbot-input">
            <input 
              type="text" 
              value={chatbotInput} 
              onChange={(e) => setChatbotInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
              placeholder="Ask me something..." 
            />
            <button id="chatbot-send-btn" onClick={() => handleChatSend()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button className={`back-to-top ${showBackToTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to Top">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal active" onClick={(e) => e.target.classList.contains('modal') && setSelectedProject(null)}>
          <div className="modal-content">
            <button className="close-modal" onClick={() => setSelectedProject(null)}>&times;</button>
            <div className="modal-header">
              <h2>{selectedProject.details.title}</h2>
            </div>
            <div className="modal-grid">
              <div className="modal-left">
                <h4>The Problem</h4>
                <p>{selectedProject.details.problem}</p>
                <br />
                <h4>The Solution</h4>
                <p>{selectedProject.details.solution}</p>
              </div>
              <div className="modal-right">
                <h4>Key Tools</h4>
                <div className="project-tags">
                  {selectedProject.details.tools.map((tool, idx) => (
                    <span key={idx} className="tag">{tool}</span>
                  ))}
                </div>
                <br />
                <h4>Overview</h4>
                <p>{selectedProject.details.description}</p>
              </div>
            </div>
            <div className="modal-footer-actions">
              {selectedProject.details.actions.map((act, idx) => {
                let svgIcon = '';
                if (act.icon === 'figma') {
                  svgIcon = <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path><path d="M12 2v20"></path></svg>;
                } else if (act.icon === 'github') {
                  svgIcon = <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
                } else {
                  svgIcon = <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
                }
                return (
                  <a 
                    key={idx} 
                    href={act.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary modal-action-btn"
                  >
                    {svgIcon} {act.text}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
