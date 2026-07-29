import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoltIcon,
  CheckIcon,
  CircleStackIcon,
  CloudArrowUpIcon,
  CodeBracketIcon,
  CpuChipIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { articles } from '../../data/articles';
import { scrollToSection } from '../../utils/scrollUtils';
import './LightExperience.css';

const EASE = [0.22, 1, 0.36, 1];

const capabilities = [
  {
    number: '01',
    icon: CpuChipIcon,
    title: 'Applied AI systems',
    description:
      'Private copilots, retrieval systems, autonomous workflows, and decision engines shaped around the way your team actually works.',
    tags: ['LLMs', 'RAG', 'Agents']
  },
  {
    number: '02',
    icon: CodeBracketIcon,
    title: 'Product engineering',
    description:
      'From the first architecture decision to a polished interface, we build the dependable software around the intelligence.',
    tags: ['Web', 'Mobile', 'APIs']
  },
  {
    number: '03',
    icon: CircleStackIcon,
    title: 'Data foundations',
    description:
      'Clean pipelines, purposeful models, and observability that make AI useful beyond the prototype and trustworthy in production.',
    tags: ['Pipelines', 'Models', 'Analytics']
  },
  {
    number: '04',
    icon: CloudArrowUpIcon,
    title: 'Launch & scale',
    description:
      'Production deployment, security, monitoring, and iteration—all handled as one continuous product practice.',
    tags: ['Cloud', 'MLOps', 'Security']
  }
];

const solutions = [
  {
    id: 'support',
    label: 'Support copilot',
    kicker: 'Customer operations',
    title: 'Every answer grounded in your business.',
    description:
      'A secure support layer that searches your knowledge, understands context, and hands complex cases to people at exactly the right moment.',
    outcome: '42% faster resolution',
    stages: ['Ingest', 'Retrieve', 'Reason', 'Respond'],
    color: '#ff5b22'
  },
  {
    id: 'trading',
    label: 'Market intelligence',
    kicker: 'Financial systems',
    title: 'Signals that arrive before the noise.',
    description:
      'Bring fragmented market feeds, models, and risk logic into one fast, explainable operating surface built for real decisions.',
    outcome: '< 180ms signal path',
    stages: ['Stream', 'Score', 'Explain', 'Act'],
    color: '#1347e8'
  },
  {
    id: 'commerce',
    label: 'Commerce engine',
    kicker: 'Personalized growth',
    title: 'A storefront that learns what matters.',
    description:
      'Recommendations, guided selling, and lifecycle automation that adapt to intent without turning the customer journey into a black box.',
    outcome: '+28% conversion',
    stages: ['Observe', 'Predict', 'Compose', 'Learn'],
    color: '#ffc400'
  },
  {
    id: 'operations',
    label: 'Ops automation',
    kicker: 'Enterprise workflows',
    title: 'Turn the queue into a system.',
    description:
      'Connect legacy processes, documents, and approvals into resilient AI workflows with human review built into every critical step.',
    outcome: '18 hrs saved / week',
    stages: ['Capture', 'Classify', 'Route', 'Audit'],
    color: '#00a878'
  }
];

const partners = [
  'Terracon India',
  'Skillocraft',
  'Opro Maldives',
  'Shapotools',
  'Proofit',
  'Fanizm'
];

const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-70px' }}
    transition={{ duration: 0.65, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionIntro = ({ index, eyebrow, title, copy }) => (
  <Reveal className="light-section-intro">
    <div className="light-section-intro__marker">
      <span>{index}</span>
      <span>{eyebrow}</span>
    </div>
    <h2>{title}</h2>
    <p>{copy}</p>
  </Reveal>
);

const LightExperience = () => {
  const [activeSolution, setActiveSolution] = useState(solutions[0]);

  return (
    <main className="light-experience">
      <section id="home" className="light-hero">
        <div className="light-hero__grid" aria-hidden="true" />
        <div className="light-shell light-hero__layout">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="light-hero__copy"
          >
            <div className="light-hero__eyebrow">
              <span className="light-pulse" />
              AI product studio · Mumbai / Worldwide
            </div>
            <h1>
              Software with
              <span>intelligence</span>
              built in.
            </h1>
            <p className="light-hero__lede">
              We turn ambitious briefs into production-ready AI products—strategy,
              experience, engineering, and deployment under one roof.
            </p>
            <div className="light-hero__actions">
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="light-button light-button--primary"
              >
                Start a project
                <ArrowUpRightIcon />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="light-text-link"
              >
                Explore our work
                <ArrowRightIcon />
              </button>
            </div>
            <div className="light-hero__proof" aria-label="Company highlights">
              <div>
                <strong>100+</strong>
                <span>AI products shipped</span>
              </div>
              <div>
                <strong>18</strong>
                <span>industries served</span>
              </div>
              <div>
                <strong>60+</strong>
                <span>partner brands</span>
              </div>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.96, rotate: 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: -0.75 }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="light-hero__visual"
          >
            <div className="light-hero__image-frame">
              <img
                src={`${process.env.PUBLIC_URL}/light-ai-machine.png`}
                alt="A modular cobalt and orange machine representing a production AI system"
                width="1536"
                height="1024"
              />
            </div>
            <figcaption>
              <span>System / 001</span>
              <span>Model → Logic → Product</span>
            </figcaption>
            <div className="light-hero__sticker">
              <BoltIcon />
              Built to ship
            </div>
          </motion.figure>
        </div>
        <div className="light-hero__rail" aria-label="Our process">
          <div className="light-shell">
            {['Discover deeply', 'Design clearly', 'Build rigorously', 'Ship confidently'].map(
              (item, index) => (
                <span key={item}>
                  <b>0{index + 1}</b>
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="light-partners" aria-label="Selected partners">
        <div className="light-shell">
          <p>Trusted by teams building what is next</p>
          <div>
            {partners.map((partner) => (
              <span key={partner}>{partner}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="light-section light-services">
        <div className="light-shell">
          <SectionIntro
            index="01"
            eyebrow="Capabilities"
            title="One team from first question to final release."
            copy="Good AI is not a feature bolted onto a product. It is a clear system of data, experience, engineering, and operations."
          />
          <div className="light-services__grid">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.number} delay={index * 0.06}>
                  <article className="light-capability">
                    <div className="light-capability__top">
                      <span>{item.number}</span>
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="light-capability__tags">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="solutions" className="light-section light-workbench">
        <div className="light-shell">
          <SectionIntro
            index="02"
            eyebrow="Solution workbench"
            title="Not demos. Durable systems with measurable jobs."
            copy="Explore the kinds of systems we assemble. Each one is designed around a real workflow, a clear control point, and an outcome you can track."
          />

          <div className="light-workbench__frame">
            <div className="light-workbench__tabs" role="tablist" aria-label="AI solution examples">
              {solutions.map((solution) => (
                <button
                  key={solution.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSolution.id === solution.id}
                  aria-controls="solution-panel"
                  onClick={() => setActiveSolution(solution)}
                  className={activeSolution.id === solution.id ? 'is-active' : ''}
                >
                  <span>{solution.label}</span>
                  <ArrowRightIcon />
                </button>
              ))}
            </div>

            <div id="solution-panel" role="tabpanel" className="light-workbench__panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSolution.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: EASE }}
                  className="light-solution"
                >
                  <div className="light-solution__copy">
                    <span className="light-solution__kicker">{activeSolution.kicker}</span>
                    <h3>{activeSolution.title}</h3>
                    <p>{activeSolution.description}</p>
                    <div
                      className="light-solution__outcome"
                      style={{ '--solution-color': activeSolution.color }}
                    >
                      <span>Typical outcome</span>
                      <strong>{activeSolution.outcome}</strong>
                    </div>
                  </div>

                  <div
                    className="light-solution__diagram"
                    style={{ '--solution-color': activeSolution.color }}
                    aria-label={`${activeSolution.label} workflow`}
                  >
                    <div className="light-solution__diagram-head">
                      <span>Live architecture</span>
                      <span className="light-status">
                        <i />
                        Production ready
                      </span>
                    </div>
                    <div className="light-pipeline">
                      {activeSolution.stages.map((stage, index) => (
                        <div className="light-pipeline__stage" key={stage}>
                          <span>0{index + 1}</span>
                          <strong>{stage}</strong>
                          <CheckIcon />
                        </div>
                      ))}
                    </div>
                    <div className="light-solution__meter">
                      <span>Human control</span>
                      <div>
                        <i />
                      </div>
                      <strong>Always on</strong>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="light-manifesto">
        <div className="light-shell light-manifesto__layout">
          <Reveal>
            <p className="light-manifesto__eyebrow">Our operating principle</p>
            <blockquote>
              “Intelligence is only useful when the{' '}
              <span>whole product earns trust.</span>”
            </blockquote>
          </Reveal>
          <Reveal delay={0.12} className="light-manifesto__checks">
            {[
              ['Clear before clever', 'We begin with the decision or task—not the model.'],
              ['Human where it matters', 'Critical workflows keep visible review and control.'],
              ['Production from day one', 'Security, latency, cost, and failure states are designed in.']
            ].map(([title, copy], index) => (
              <div key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="articles" className="light-section light-journal">
        <div className="light-shell">
          <SectionIntro
            index="03"
            eyebrow="Field notes"
            title="Ideas for teams building with intelligence."
            copy="Practical perspectives on technology, product craft, and the places where AI is already changing how work gets done."
          />
          <div className="light-journal__grid">
            {articles.slice(0, 3).map((article, index) => (
              <Reveal key={article.id} delay={index * 0.06}>
                <Link to={`/article/${article.id}`} className="light-article">
                  <div className="light-article__image">
                    <img
                      src={article.coverImage}
                      alt=""
                      loading="lazy"
                      width="640"
                      height="420"
                    />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="light-article__meta">
                    <span>{article.tags?.[0] || 'AI'}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <span className="light-article__link">
                    Read field note
                    <ArrowUpRightIcon />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="light-contact">
        <div className="light-shell light-contact__layout">
          <Reveal>
            <span className="light-contact__eyebrow">Have a complicated idea?</span>
            <h2>Good. We like those.</h2>
          </Reveal>
          <Reveal delay={0.1} className="light-contact__side">
            <p>
              Tell us what needs to change, what is getting in the way, or what you
              wish existed. We usually reply within one working day.
            </p>
            <a href="mailto:aryanchandwani@gmail.com" className="light-contact__email">
              <EnvelopeIcon />
              aryanchandwani@gmail.com
            </a>
            <a
              href="https://wa.me/918850313109"
              target="_blank"
              rel="noopener noreferrer"
              className="light-button light-button--ink"
            >
              Start on WhatsApp
              <ArrowUpRightIcon />
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="light-footer">
        <div className="light-shell">
          <div className="light-footer__brand">
            <img src={`${process.env.PUBLIC_URL}/alpha.png`} alt="" />
            <strong>
              Alpha<span>Code</span>AI
            </strong>
          </div>
          <p>Production-grade AI software for ambitious teams.</p>
          <div className="light-footer__links">
            <a href="https://www.linkedin.com/in/aryanchandwani/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:aryanchandwani@gmail.com">Email</a>
            <a href="https://wa.me/918850313109" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
          <span>© {new Date().getFullYear()} AlphaCodeAI</span>
        </div>
      </footer>
    </main>
  );
};

export default LightExperience;
