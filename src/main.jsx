import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Layers3,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';
import './styles.css';

const projects = [
  {
    title: 'Billet Doux',
    category: 'Visual Branding',
    year: 'Brand Experience',
    image: '/assets/billet-doux-visual.png',
    tags: ['Brand Identity', 'Packaging', 'Artisanal Curation'],
    palette: ['#AF887C', '#C2C0AA', '#D9BEB0', '#E6E6D9', '#C2A68A', '#5F5847'],
    description:
      'An artisanal crochet brand shaped as a warm, premium lifestyle identity. The project elevates handcrafted gifts into a cohesive brand system across logo, packaging, social touchpoints, and typography.',
  },
  {
    title: 'Toast Jam Factory',
    category: 'Visual Branding',
    year: 'Multi-Touchpoint Design',
    image: '/assets/toast-jam-visual.png',
    tags: ['Editorial Menu', 'Packaging', 'Social Media'],
    palette: ['#111111', '#F6F2EA', '#8D2B22', '#0D735E'],
    description:
      'A contemporary take on the traditional kopi tiam experience, balancing nostalgic character with clean layouts for menus, packaging, and digital campaign pieces.',
  },
  {
    title: 'The Golden Saffron',
    category: 'Editorial & Collateral',
    year: 'Print Production',
    image: '/assets/golden-saffron-visual.png',
    tags: ['Menu Design', 'Brand Collateral', 'Large Format'],
    palette: ['#3D2018', '#8B1E37', '#D5A13A', '#F2E6D2'],
    description:
      'A premium dining collateral system for Indian and Chinese cuisine volumes, designed with regal tones, readable structure, and polished print execution.',
  },
  {
    title: 'Chinese New Year Festive',
    category: 'Marketing & Digital',
    year: 'Environmental Graphics',
    image: '/assets/cny-overview-visual.png',
    secondaryImage: '/assets/cny-collateral-visual.png',
    tags: ['Integrated Campaign', 'Environmental Graphics', 'Social Media'],
    palette: ['#A31318', '#D44E2E', '#F3C156', '#F0E2DD'],
    description:
      'A retail festive campaign connecting digital promotions with physical spaces through posters, glass lobby treatments, backdrops, and customer service touchpoints.',
  },
];

const filters = ['All', 'Visual Branding', 'Editorial & Collateral', 'Marketing & Digital'];

function App() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.16 },
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeFilter]);

  const selectNeighbor = (direction) => {
    const index = projects.findIndex((project) => project.title === selectedProject.title);
    const nextIndex = (index + direction + projects.length) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  return (
    <>
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Back to top">
          GK
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Work
          </a>
          <a href="#expertise" onClick={() => setMenuOpen(false)}>
            Expertise
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
        <button className="icon-button mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy reveal">
            <span className="eyebrow"><Sparkles size={16} /> Senior Graphic Designer</span>
            <h1>Giovany Kantoro</h1>
            <p>
              High-impact visual branding, editorial systems, and integrated marketing collaterals shaped with strategy,
              craft, and AI-integrated agility.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#work">
                View Portfolio <ArrowUpRight size={18} />
              </a>
              <a className="secondary-action" href="/giovany-kantoro-portfolio.pdf" download>
                <Download size={18} /> Download PDF
              </a>
            </div>
          </div>
          <div className="hero-art reveal">
            <img src="/assets/hero-overview.png" alt="Giovany Kantoro portfolio overview" />
          </div>
        </section>

        <section className="stats-band reveal" aria-label="Portfolio highlights">
          <div>
            <strong>15+</strong>
            <span>Years Experience</span>
          </div>
          <div>
            <strong>Brand</strong>
            <span>Identity & Guidelines</span>
          </div>
          <div>
            <strong>Print</strong>
            <span>Menu, Signage, Banners</span>
          </div>
          <div>
            <strong>Digital</strong>
            <span>Campaigns & Social Ads</span>
          </div>
        </section>

        <section className="section-shell" id="work">
          <div className="section-heading reveal">
            <span className="eyebrow"><Layers3 size={16} /> Selected Work</span>
            <h2>Portfolio pieces with brand systems, campaigns, and polished production.</h2>
          </div>

          <div className="filter-row reveal" role="list" aria-label="Project filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? 'filter-pill active' : 'filter-pill'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <button className="project-image-button" onClick={() => setSelectedProject(project)}>
                  <img src={project.image} alt={`${project.title} portfolio spread`} />
                  <span><Eye size={18} /> Open Detail</span>
                </button>
                <div className="project-card-copy">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-panel reveal" aria-live="polite">
          <div className="feature-copy">
            <span className="eyebrow"><BadgeCheck size={16} /> Featured Project</span>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <div className="palette-row" aria-label="Project color palette">
              {selectedProject.palette.map((color) => (
                <span key={color} style={{ backgroundColor: color }} title={color} />
              ))}
            </div>
            <div className="feature-controls">
              <button className="icon-button" onClick={() => selectNeighbor(-1)} aria-label="Previous project">
                <ChevronLeft size={20} />
              </button>
              <button className="icon-button" onClick={() => selectNeighbor(1)} aria-label="Next project">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="feature-visual">
            <img src={selectedProject.secondaryImage || selectedProject.image} alt={`${selectedProject.title} detail`} />
          </div>
        </section>

        <section className="expertise section-shell" id="expertise">
          <div className="section-heading reveal">
            <span className="eyebrow">Expertise & Skills</span>
            <h2>Strategic design support from identity to final production.</h2>
          </div>
          <div className="expertise-grid">
            {[
              ['Visual Branding & Identity', 'Brand strategy, logo systems, corporate identity, and brand guidelines.'],
              ['Marketing & Digital Collaterals', 'Seasonal campaigns, social media sets, digital ads, and promotional tools.'],
              ['Editorial & Print Production', 'Menus, invitations, brochures, environmental graphics, signage, and large-scale banners.'],
            ].map(([title, copy]) => (
              <article className="expertise-item reveal" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-band reveal" id="contact">
          <div>
            <span className="eyebrow">Available For</span>
            <h2>Brand identity, campaign visuals, editorial design, and production-ready collateral.</h2>
          </div>
          <a className="primary-action" href="mailto:hello@example.com">
            Start a Project <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
