import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { type ReactElement } from 'react';
import { type MouseEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis } from 'recharts';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

type Project = {
  id: string;
  number: string;
  category: string;
  title: string;
  outcome: string;
  problem: string;
  solution: string;
  impact: string;
  technology: string[];
  workflow: string[];
  context: string;
  learning: string;
  preview: 'tracker' | 'commission' | 'updates' | 'policy' | 'scraper' | 'duplicate' | 'expiry' | 'agent';
};

const projects: Project[] = [
  {
    id: 'tracker',
    number: '01',
    category: 'WORKFLOW AUTOMATION',
    title: 'From 2 Days of Manual Checking to ~30 Minutes',
    outcome: 'A checking workflow that turns large stakeholder trackers into validated, usable output.',
    problem: 'Commission trackers received from stakeholders required extensive manual checking and validation. A small batch of four trackers could take approximately two days to review.',
    solution: 'Built an automated tracker-checking system using Google Apps Script that processes commission tracker data, performs validation and checking logic, and reduces repetitive manual review.',
    impact: '~95%+ reduction in processing time (approx. derived from the stated time reduction)',
    technology: ['JavaScript', 'Google Apps Script', 'Google Sheets API / SpreadsheetApp', 'AI-assisted development'],
    workflow: ['Stakeholder Tracker', 'Automated Validation', 'Error Detection', 'Checked Output'],
    context: 'Large trackers had to be reviewed manually, consuming significant team capacity.',
    learning: 'A strong automation starts by making the existing checking logic explicit, then giving it a repeatable path through the data.',
    preview: 'tracker',
  },
  {
    id: 'new-commission',
    number: '02',
    category: 'PROCESS AUTOMATION',
    title: 'Bulk Commission Creation in Under 15 Minutes',
    outcome: 'A headed-browser workflow that replaces repetitive commission creation actions with one run.',
    problem: 'Creating large numbers of new commissions manually could take an agent anywhere from four hours to an entire working day.',
    solution: 'Built a Python-based automation workflow running locally with a headed browser using Puppeteer. The system automates repetitive browser-based commission creation tasks.',
    impact: '<15 min processing time',
    technology: ['Python', 'Puppeteer', 'Browser Automation', 'Local Hosting', 'AI-assisted development'],
    workflow: ['Input Tracker', 'Data Processing', 'Browser Automation', 'Commission Creation', 'Completion'],
    context: 'High-volume commission creation required repetitive manual browser actions.',
    learning: 'Browser automation is most useful when the process is stable enough to encode, while still leaving room for human review of exceptions.',
    preview: 'commission',
  },
  {
    id: 'commission-updates',
    number: '03',
    category: 'BROWSER AUTOMATION',
    title: 'Bulk Commission Updates Without Manual Repetition',
    outcome: 'Hundreds of property updates compressed into one automated browser workflow.',
    problem: 'Commission updates received from stakeholders required agents to repeatedly navigate systems and update large quantities of data manually.',
    solution: 'Developed a Python automation workflow using Puppeteer and a headed browser to automate repetitive commission update operations.',
    impact: '4–8+ Hours → <15 Minutes',
    technology: ['Python', 'Puppeteer', 'Browser Automation', 'Local Hosting'],
    workflow: ['Load Tracker', 'Run Automation', 'Browser Executes Workflow', 'Verify Completion'],
    context: 'Agents repeatedly opened properties, found commissions, updated values, saved, and repeated the same actions hundreds of times.',
    learning: 'The highest-leverage interface can sometimes be the workflow behind the interface: fewer repeated actions means more attention for quality and exceptions.',
    preview: 'updates',
  },
  {
    id: 'policy-tracker',
    number: '04',
    category: 'OPERATIONS PLATFORM',
    title: 'One Operating Dashboard for Organisation-Wide Policy Tracking',
    outcome: 'A centralised authenticated platform for policy progress, providers, properties, and summaries.',
    problem: 'Policy framing tasks across multiple stakeholders and properties were difficult to track centrally.',
    solution: 'Built a web-based policy tracking platform that provides organisation-wide visibility into policy progress, with login approval, property-level status, data import, progress monitoring, and dashboard analytics.',
    impact: 'A single view for policy progress and gaps',
    technology: ['JavaScript / Node.js', 'PostgreSQL', 'Supabase', 'Serverless APIs', 'Chart.js', 'JWT'],
    workflow: ['Frontend', 'Serverless API', 'Supabase PostgreSQL'],
    context: 'Policy progress was distributed across stakeholders and difficult to monitor.',
    learning: 'Operational visibility is a product decision: the right summary makes the next action easier to see.',
    preview: 'policy',
  },
  {
    id: 'policy-scraper',
    number: '05',
    category: 'AI × WEB AUTOMATION',
    title: 'Turn Manual Policy Research Into Structured Data',
    outcome: 'A resilient scraping and AI structuring flow for cancellation and payment policies.',
    problem: 'Student accommodation policy research required manually visiting websites, navigating subpages, and locating specific cancellation and payment policies.',
    solution: 'Built a policy scraping system capable of following required sub-links, extracting relevant website content, and using AI to structure policies into predefined categories. Fallbacks include direct website, Jina Reader, cached sources, and Wayback or search sources.',
    impact: 'Scraped text → validated policy categories',
    technology: ['TypeScript', 'React', 'Tailwind CSS', 'Express', 'Cheerio', 'Google Gemini AI', 'Zod'],
    workflow: ['Scraped Text', 'Gemini', 'Structured Categories', 'Validated Output'],
    context: 'Policy research was fragmented across websites, subpages, and inconsistent language.',
    learning: 'Domain intelligence matters as much as extraction: structured categories turn raw web content into an operationally useful record.',
    preview: 'scraper',
  },
  {
    id: 'duplicate',
    number: '06',
    category: 'DATA QUALITY AUTOMATION',
    title: 'Automated Detection of Duplicate Properties',
    outcome: 'Matching logic that surfaces duplicate property entries directly in Google Sheets.',
    problem: 'Duplicate property entries caused data inconsistencies and created operational inefficiencies during inventory management.',
    solution: 'Built an automated Google Sheets system using matching logic to identify duplicate properties and visually highlight them.',
    impact: 'Duplicate rows highlighted before they become a workflow problem',
    technology: ['JavaScript', 'Google Apps Script', 'SpreadsheetApp', 'Google Sheets'],
    workflow: ['Property Data', 'Matching Logic', 'Duplicate Detection', 'Visual Highlighting'],
    context: 'Inventory quality depended on finding similar property entries before they created downstream confusion.',
    learning: 'Data quality tools work best when the signal is put exactly where an operator already makes decisions.',
    preview: 'duplicate',
  },
  {
    id: 'expiry',
    number: '07',
    category: 'PROACTIVE AUTOMATION',
    title: 'Never Miss a Commission Expiry',
    outcome: 'Date logic that turns approaching expiry dates into timely email alerts.',
    problem: 'Missed commission expiry dates could create operational and revenue-related issues.',
    solution: 'Created an automation that monitors commission end dates and automatically sends email alerts for commissions approaching expiry.',
    impact: 'Alert threshold: 3 days before expiry',
    technology: ['Google Sheets', 'Google Apps Script', 'Email Notifications', 'Date Logic'],
    workflow: ['Today', '1 Day', '2 Days', '3 Days', 'Alert'],
    context: 'Expiry dates were easy to miss when they lived inside a larger tracker.',
    learning: 'Proactive automation is often simple date logic, made valuable by arriving at the right moment.',
    preview: 'expiry',
  },
  {
    id: 'agent',
    number: '08',
    category: 'AI AGENT / DATA INTELLIGENCE',
    title: 'Automated Multi-Source Data Verification',
    outcome: 'An early-stage n8n verification workflow for search, source collection, matching, and review.',
    problem: 'Verifying information across multiple sources was slow and inconsistent when performed manually.',
    solution: 'Built an n8n-powered intelligent verification agent that performs web searches, collects information, validates data, and applies matching logic. This is described as an early-stage intelligent data verification workflow rather than a fully autonomous AI system.',
    impact: 'Input → sources → validation → verified result',
    technology: ['n8n', 'AI APIs', 'Web Search', 'Data Matching', 'Automation'],
    workflow: ['Input', 'Google Search', 'Source Collection', 'AI Validation', 'Data Matching', 'Verified Result'],
    context: 'Multi-source verification needed a consistent first pass before human review.',
    learning: 'The useful promise of an AI agent is not autonomy for its own sake, but a clearer path from uncertainty to a verifiable result.',
    preview: 'agent',
  },
];

type ChartDatum = { name: string; value: number; label: string };

const trackerChartData: ChartDatum[] = [
  { name: 'Before', value: 960, label: '~2 Days' },
  { name: 'After', value: 30, label: '30 Min' },
];

const commissionChartData: ChartDatum[] = [
  { name: 'Before', value: 480, label: 'Up to 1 Day' },
  { name: 'After', value: 15, label: '<15 Min' },
];

const policyChartData: ChartDatum[] = [
  { name: 'Completed', value: 62, label: '62%' },
  { name: 'In Progress', value: 24, label: '24%' },
  { name: 'Flagged', value: 14, label: '14%' },
];

function MiniBarChart({ data }: { data: ChartDatum[] }) {
  return <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} margin={{ top: 18, right: 4, bottom: 0, left: 4 }} barCategoryGap="30%">
      <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 9, fontFamily: 'var(--app-font-mono)', fill: '#4c6b62' }} />
      <Bar dataKey="value" radius={[2, 2, 0, 0]} isAnimationActive={false}>
        {data.map((entry, index) => <Cell key={entry.name} fill={index % 2 === 0 ? '#4d8c84' : '#d0925d'} />)}
        <LabelList dataKey="label" position="top" style={{ fontFamily: 'var(--app-font-mono)', fontSize: 9, fill: '#173b38' }} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>;
}

function Preview({ type }: { type: Project['preview'] }): ReactElement {
  if (type === 'tracker') {
    return <div className="preview" data-testid="preview-tracker"><div className="preview-head"><span>TRACKER / CHECK</span><span>RUN 04</span></div><div className="preview-body"><div className="workflow"><div className="workflow-node">STAKEHOLDER<br />TRACKER</div><i className="workflow-line" /><div className="workflow-node">VALIDATION<br />LOGIC</div><i className="workflow-line" /><div className="workflow-node">CHECKED<br />OUTPUT</div></div><div className="bars"><MiniBarChart data={trackerChartData} /></div></div></div>;
  }
  if (type === 'commission') {
    return <div className="preview" data-testid="preview-commission"><div className="preview-head"><span>BROWSER / AUTOMATION</span><span className="scrape-dot" />LIVE RUN</div><div className="preview-body"><div className="screen-lines"><i style={{ '--w': '89%' } as CSSProperties} /><i style={{ '--w': '72%' } as CSSProperties} /><i style={{ '--w': '94%' } as CSSProperties} /><i style={{ '--w': '54%' } as CSSProperties} /><i style={{ '--w': '81%' } as CSSProperties} /></div><div className="bars"><MiniBarChart data={commissionChartData} /></div></div></div>;
  }
  if (type === 'updates') {
    return <div className="preview" data-testid="preview-updates"><div className="preview-head"><span>COMMISSION / UPDATE</span><span>01 → 248</span></div><div className="preview-body"><div className="split-preview"><div><strong>MANUAL PROCESS</strong>Open property<br />Find commission<br />Update value<br />Save<br />Repeat</div><div><strong>AUTOMATED PROCESS</strong>Load tracker<br />Run automation<br />Browser executes<br />Verify completion</div></div></div></div>;
  }
  if (type === 'policy') {
    return <div className="preview" data-testid="preview-policy"><div className="preview-head"><span>POLICY / OVERVIEW</span><span>ORGANISATION</span></div><div className="preview-body"><div className="bars"><MiniBarChart data={policyChartData} /></div><div className="screen-lines"><i style={{ '--w': '32%' } as CSSProperties} /><i style={{ '--w': '61%' } as CSSProperties} /><i style={{ '--w': '43%' } as CSSProperties} /></div></div></div>;
  }
  if (type === 'scraper') {
    return <div className="preview" data-testid="preview-scraper"><div className="preview-head"><span>POLICY / EXTRACT</span><span>GEMINI</span></div><div className="preview-body"><div className="scrape-preview"><div className="scrape-source">/accommodation<br /><br />cooling_off_period<br />no_visa_no_pay<br />security_deposit<br />early_termination</div><div className="scrape-result"><b>STRUCTURED OUTPUT</b><span className="scrape-dot" />Cancellation<br /><span className="scrape-dot" />Payment<br /><span className="scrape-dot" />Validated categories</div></div></div></div>;
  }
  if (type === 'duplicate') {
    return <div className="preview" data-testid="preview-duplicate"><div className="preview-head"><span>SHEET / MATCHING</span><span>4 DUPLICATES</span></div><div className="preview-body"><div className="screen-lines"><i style={{ '--w': '91%' } as CSSProperties} /><i style={{ '--w': '75%' } as CSSProperties} /><i style={{ '--w': '92%', background: '#d0925d' } as CSSProperties} /><i style={{ '--w': '84%' } as CSSProperties} /><i style={{ '--w': '92%', background: '#d0925d' } as CSSProperties} /><i style={{ '--w': '68%' } as CSSProperties} /></div></div></div>;
  }
  if (type === 'expiry') {
    return <div className="preview" data-testid="preview-expiry"><div className="preview-head"><span>COMMISSION / EXPIRY</span><span>EMAIL QUEUE</span></div><div className="preview-body"><div className="workflow"><div className="workflow-node">TODAY</div><i className="workflow-line" /><div className="workflow-node">+1 DAY</div><i className="workflow-line" /><div className="workflow-node">+3 DAYS</div><i className="workflow-line" /><div className="workflow-node">ALERT</div></div></div></div>;
  }
  return <div className="preview" data-testid="preview-agent"><div className="preview-head"><span>VERIFY / SOURCES</span><span>EARLY STAGE</span></div><div className="preview-body"><div className="workflow"><div className="workflow-node">GOOGLE<br />SEARCH</div><i className="workflow-line" /><div className="workflow-node">AI<br />VALIDATION</div><i className="workflow-line" /><div className="workflow-node">VERIFIED<br />RESULT</div></div></div></div>;
}

function ProjectRow({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
    onOpen(project);
  };
  return <article className="project-row" data-testid={`project-${project.id}`}>
    <div className="project-number">{project.number}</div>
    <div className="project-info">
      <div className="eyebrow">{project.category}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-outcome">{project.outcome}</p>
      <div className="tag-line">{project.technology.slice(0, 3).map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
      <button className="project-open" onClick={handleOpen} data-testid={`button-open-${project.id}`} aria-label={`Open case study: ${project.title}`}>Read case study <ArrowUpRight size={14} strokeWidth={1.5} /></button>
    </div>
    <div className="preview-wrap"><Preview type={project.preview} /></div>
  </article>;
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, []);
  return <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title" data-testid={`case-study-${project.id}`}>
    <div className="case-top"><div className="container case-top-inner"><span className="brand">HIMANSHU <span>/</span> CASE STUDY</span><button className="close-case" onClick={onClose} data-testid="button-close-case"><X size={16} /> Close</button></div></div>
    <div className="case-hero"><div className="container"><div className="eyebrow">{project.number} — {project.category}</div><h1 id="case-title">{project.title}</h1><p>{project.outcome}</p></div></div>
    <div className="case-content"><div className="container case-layout">
      <div className="case-meta-list">
        <div><span>Impact</span><strong>{project.impact}</strong></div>
        <div><span>Built with</span><strong>{project.technology[0]}</strong></div>
        <div><span>Format</span><strong>Operational case study</strong></div>
      </div>
      <div>
        <div className="case-block"><h2>01 — Context</h2><p>{project.context}</p></div>
        <div className="case-block"><h2>02 — Problem</h2><p>{project.problem}</p></div>
        <div className="case-block"><h2>03 — Solution</h2><p>{project.solution}</p></div>
        <div className="case-block"><h2>04 — Technology</h2><div className="case-tech">{project.technology.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
        <div className="case-block"><h2>05 — Workflow</h2><div className="case-flow">{project.workflow.map((step, index) => <span key={step}>{step}</span>).reduce<ReactNode[]>((acc, item, index, array) => index < array.length - 1 ? [...acc, item, <i key={`line-${index}`} />] : [...acc, item], [])}</div></div>
        <div className="case-block"><h2>06 — Impact</h2><p className="case-impact">{project.impact}</p><p>Where an impact percentage is shown as approximate, it is derived from the stated time reduction rather than presented as an official measured metric.</p></div>
        <div className="case-block"><h2>07 — Key Learning</h2><p>{project.learning}</p></div>
      </div>
    </div></div>
  </div>;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header className={`site-nav${scrolled ? ' scrolled' : ''}`}><div className="container nav-inner">
    <a className="brand" href="#top" data-testid="link-brand">HIMANSHU SHARMA</a>
    <nav className="nav-links" aria-label="Primary navigation">
      <a className="nav-link" href="#work" data-testid="link-work">Work</a>
      <a className="nav-link" href="#about" data-testid="link-about">About</a>
      <a className="nav-link" href="#contact" data-testid="link-contact">Contact</a>
    </nav>
  </div></header>;
}

function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  return <main className="portfolio" id="top">
    <Nav />
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-side"><div className="eyebrow">Ecommerce / Automation / AI</div><span className="vertical-label mono">Operational systems, made clearer</span></div>
        <div className="hero-copy">
          <h1 className="hero-title" id="hero-title">I turn repetitive ecommerce work into <em>systems.</em></h1>
          <div className="hero-subgrid"><p>Catalog operations × AI automation × process design</p><div className="hero-meta"><div><span>3+</span><br />years experience</div><div><span>1,500+</span><br />listings optimized</div><div><span>85%</span><br />manual workload reduction</div></div></div>
        </div>
      </div>
      <div className="scroll-cue mono"><i /> Scroll to inspect the work</div>
    </section>

    <section className="section" id="about" aria-labelledby="about-title"><div className="container">
      <div className="section-heading"><div className="eyebrow">01 / Position</div><div className="section-index mono">Between operations and technology</div></div>
      <div className="intro-grid"><div><h2 className="intro-statement" id="about-title">I sit between <em>operations</em> and technology.</h2><div className="intro-copy"><p>My work starts with repetitive operational problems — checking trackers, creating commissions, updating data, researching policies, detecting duplicates, and verifying information.</p><p>I map the process, find the bottleneck, and build an automation around it.</p></div></div><div className="word-stack"><span>OPERATIONS</span><span>AUTOMATION</span><span>INTELLIGENCE</span></div></div>
    </div></section>

    <section className="section work-section" id="work" aria-labelledby="work-title"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">02 / Selected work</div><h2 className="section-title" id="work-title">The case-study archive.</h2></div><div className="section-index mono">Five systems in the main flow</div></div>
      <div className="project-list">{projects.slice(0, 5).map((project) => <ProjectRow project={project} onOpen={setActiveProject} key={project.id} />)}</div>
      <div className="experiments"><div className="section-heading"><div className="eyebrow">More experiments</div><div className="section-index mono">06—08 / Supporting systems</div></div><div className="experiment-list">{projects.slice(5).map((project) => <button className="experiment" onClick={() => setActiveProject(project)} key={project.id} data-testid={`button-experiment-${project.id}`}><div className="eyebrow">{project.number} / {project.category}</div><h3>{project.title}</h3><p>{project.outcome}</p></button>)}</div></div>
    </div></section>

    <section className="impact" aria-labelledby="impact-title"><div className="container"><div className="section-heading"><h2 className="section-title" id="impact-title">The Impact of Automation</h2><div className="mono">Real outcomes, clearly framed</div></div><div className="impact-grid"><div className="impact-item"><strong>85%</strong><span>Manual workload reduction</span></div><div className="impact-item"><strong>1,500+</strong><span>Listings improved</span></div><div className="impact-item"><strong>2 days → 30 min</strong><span>Tracker checking</span></div><div className="impact-item"><strong>Hours → &lt;15 min</strong><span>Bulk commission workflows</span></div></div><p className="impact-note">Automation is not about replacing the process. It is about removing repetitive work so people can focus on decisions, quality and exceptions.</p></div></section>

    <section className="section process-section" aria-labelledby="process-title"><div className="container"><div className="section-heading"><div className="eyebrow">03 / Method</div><h2 className="section-title" id="process-title">How I build automation.</h2></div><div className="process-line">{[['01', 'Find the Bottleneck', 'Identify repetitive, high-volume work.'], ['02', 'Map the Process', 'Break the operation into inputs, decisions and outputs.'], ['03', 'Build the Workflow', 'Use scripts, APIs, AI models or browser automation.'], ['04', 'Validate', 'Test edge cases, exceptions and output quality.'], ['05', 'Operationalise', 'Make the workflow usable by the team and document it.']].map(([number, title, copy]) => <div className="process-step" key={number}><div className="eyebrow">{number}</div><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>

    <section className="section" aria-labelledby="toolkit-title"><div className="container"><div className="section-heading"><div className="eyebrow">04 / Toolkit</div><h2 className="section-title" id="toolkit-title">My toolkit.</h2></div><div className="toolkit-grid">{[['Ecommerce', ['Catalog Management', 'PDP Optimization', 'Listing Content', 'Inventory Management', 'Pricing Accuracy', 'Commission Management', 'Data QA', 'Catalog Hygiene']], ['Automation', ['Google Apps Script', 'Python', 'JavaScript', 'TypeScript', 'Node.js', 'Puppeteer', 'n8n', 'Browser Automation']], ['AI', ['LLM Workflows', 'Prompt Engineering', 'Google Gemini', 'AI-assisted Automation', 'Data Extraction', 'AI Agents']], ['Data / Platforms', ['Google Sheets', 'PostgreSQL', 'Supabase', 'REST APIs', 'Chart.js', 'Git']]].map(([group, skills]) => <div className="tool-group" key={group as string}><h3>{group as string}</h3><div className="tool-pills">{(skills as string[]).map((skill) => <span className="tool-pill" key={skill}>{skill}</span>)}</div></div>)}</div></div></section>

    <section className="section" id="experience" aria-labelledby="experience-title"><div className="container"><div className="section-heading"><div className="eyebrow">05 / Experience</div><h2 className="section-title" id="experience-title">Where the work lives.</h2></div><div className="timeline"><div className="timeline-item"><div className="timeline-date mono">DEC 2023 — PRESENT</div><div><h3 className="timeline-role">Catalog Management Executive</h3><p className="timeline-company">Amber Student</p><ul className="timeline-bullets"><li>Improved content quality across 1,500+ listings</li><li>Added images, videos, amenities, VR tours and FAQs</li><li>Reduced manual workload by 85% using AI-driven automation</li><li>Coordinated promotional campaigns</li><li>Managed stakeholder portfolios and audited pricing, descriptions and media</li><li>Led a team as sublead, documented automation workflows and trained team members</li></ul></div></div><div className="timeline-item"><div className="timeline-date mono">JUN 2023 — DEC 2023</div><div><h3 className="timeline-role">Catalog Management Intern</h3><p className="timeline-company">Amber Student</p><ul className="timeline-bullets"><li>Created and maintained property listings</li><li>Drafted product descriptions and sourced images</li><li>Maintained pricing and inventory records</li><li>Supported commission updates and promotional offers</li></ul></div></div></div></div></section>

    <section className="section" aria-labelledby="education-title"><div className="container"><div className="section-heading"><div className="eyebrow">06 / Education</div><h2 className="section-title" id="education-title">The foundations.</h2></div><div className="education-grid"><div className="edu-card"><div className="mono">2020 — 2023</div><h3>Bachelor of Science — Mathematics</h3><p>R.S.S. (P.G.) College, Hapur</p></div><div className="edu-card"><div className="mono">2021 — 2022</div><h3>Diploma in Information Technology</h3><p>Lal Bahadur Shastri Computer Institute, Hapur</p></div></div><div className="edu-tags"><span className="tag">Mathematics</span><span className="tag">Technology</span><span className="tag">Operations</span></div></div></section>

    <section className="section" aria-labelledby="different-title"><div className="container"><div className="section-heading"><div className="eyebrow">07 / Point of view</div><div className="mono">The operating principle</div></div><h2 className="intro-statement" id="different-title">I don't start with technology. I start with the <em>operational problem.</em></h2><div className="intro-copy"><p>Many automation projects start with a tool. My approach starts with:</p><p className="mono" style={{ color: 'hsl(var(--primary))' }}>Process → Bottleneck → Logic → Automation → Validation → Impact</p></div></div></section>

    <section className="contact" id="contact" aria-labelledby="contact-title"><div className="container"><div className="eyebrow">08 / Contact</div><h2 className="contact-title" id="contact-title">Have a repetitive workflow that should be <em>automated?</em></h2><p className="contact-copy">Let's turn manual operational work into a scalable system.</p><div className="contact-actions"><a className="contact-button primary" href="https://www.linkedin.com/in/himanshu-sharma-814785250" target="_blank" rel="noreferrer" data-testid="link-linkedin">LinkedIn <ArrowUpRight size={13} /></a><a className="contact-button" href="mailto:hs1385944@gmail.com" data-testid="link-email">Email <ArrowUpRight size={13} /></a><a className="contact-button" href="/resume.pdf" download="Himanshu-Sharma-Resume.pdf" data-testid="link-resume">View Resume ↓</a></div><div className="contact-details"><div><span className="mono">Email</span><br /><a href="mailto:hs1385944@gmail.com">hs1385944@gmail.com</a></div><div><span className="mono">Based in</span><br />Uttar Pradesh, India · 8650226021</div></div></div></section>
    <footer className="site-footer"><div className="container"><div className="footer-rule" /><div className="footer-row"><div>© 2026 Himanshu Sharma. Built around real-world automation and ecommerce operations.</div><nav aria-label="Footer navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Contact</a><a href="https://www.linkedin.com/in/himanshu-sharma-814785250" target="_blank" rel="noreferrer">LinkedIn ↗</a></nav></div></div></footer>
    {activeProject ? <CaseStudy project={activeProject} onClose={() => setActiveProject(null)} /> : null}
  </main>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;