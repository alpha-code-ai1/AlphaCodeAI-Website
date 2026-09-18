import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import authorityPages from '../../data/authorityPages.json';
import SeoHead from '../ui/SeoHead';
import './AuthorityPage.css';

const normalizePath = (path) => (path.endsWith('/') ? path : `${path}/`);

const AuthorityPage = () => {
  const location = useLocation();
  const page = authorityPages.find((candidate) => candidate.path === normalizePath(location.pathname));

  if (!page) {
    return (
      <main className="authority-page authority-page--missing">
        <div className="authority-shell">
          <p className="authority-eyebrow">404 · Page not found</p>
          <h1>This page is not part of the system.</h1>
          <Link to="/">Return to AlphaCodeAI</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`authority-page authority-page--${page.kind}`}>
      <SeoHead page={page} />

      <header className="authority-hero">
        <div className="authority-hero__grid" aria-hidden="true" />
        <div className="authority-orbit authority-orbit--one" aria-hidden="true" />
        <div className="authority-orbit authority-orbit--two" aria-hidden="true" />
        <div className="authority-shell authority-hero__inner">
          <nav className="authority-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">AlphaCodeAI</Link>
            <span>/</span>
            <span>{page.kind === 'case-study' ? 'Case study' : 'AI services'}</span>
          </nav>
          <div className="authority-hero__copy">
            <p className="authority-eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="authority-hero__lede">{page.lede}</p>
            <div className="authority-hero__actions">
              <a href="mailto:aryanchandwani@gmail.com?subject=AlphaCodeAI%20project%20enquiry" className="authority-button authority-button--primary">
                Discuss a project <ArrowRightIcon aria-hidden="true" />
              </a>
              {page.externalUrl ? (
                <a href={page.externalUrl} target="_blank" rel="noreferrer" className="authority-button authority-button--secondary">
                  Visit the project <ArrowUpRightIcon aria-hidden="true" />
                </a>
              ) : (
                <a href="https://wa.me/918850313109" target="_blank" rel="noreferrer" className="authority-button authority-button--secondary">
                  WhatsApp us <ArrowUpRightIcon aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
          <aside className="authority-hero__signal">
            <span>AlphaCodeAI / {page.kind.replace('-', ' ')}</span>
            <strong>{page.promise}</strong>
            <i aria-hidden="true" />
            <small>Production-grade systems · Mumbai / Worldwide</small>
          </aside>
        </div>
      </header>

      {page.heroImage && (
        <div className="authority-shell authority-project-image">
          <img src={page.heroImage} alt={`${page.title} project view`} width="1536" height="1024" />
        </div>
      )}

      <section className="authority-service-nav" aria-label="Related capabilities">
        <div className="authority-shell">
          <span>Explore</span>
          <div>
            {page.services.map((service) => (
              <Link key={service.href} to={service.href}>{service.label}</Link>
            ))}
          </div>
        </div>
      </section>

      <div className="authority-shell authority-sections">
        {page.sections.map((section, index) => (
          <section className="authority-section" key={section.title}>
            <div className="authority-section__heading">
              <span>0{index + 1}</span>
              <div>
                <p className="authority-eyebrow">{section.kicker}</p>
                <h2>{section.title}</h2>
              </div>
            </div>
            <div className="authority-section__content">
              <p>{section.body}</p>
              <ul>
                {section.items.map((item) => (
                  <li key={item}><CheckIcon aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {page.proof.length > 0 && (
        <section className="authority-proof">
          <div className="authority-shell">
            <div className="authority-proof__intro">
              <p className="authority-eyebrow">Selected work</p>
              <h2>Evidence over adjectives.</h2>
              <p>Real operating problems shaped into products people can understand and use.</p>
            </div>
            <div className="authority-proof__grid">
              {page.proof.map((proof) => (
                <Link className="authority-proof-card" to={proof.href} key={proof.href}>
                  <img src={proof.image} alt="" loading="lazy" width="1536" height="1024" />
                  <span>{proof.client}</span>
                  <h3>{proof.title}</h3>
                  <b>Read case study <ArrowRightIcon aria-hidden="true" /></b>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="authority-faq">
        <div className="authority-shell authority-faq__grid">
          <div>
            <p className="authority-eyebrow">Common questions</p>
            <h2>Clear answers before we start.</h2>
          </div>
          <div className="authority-faq__list">
            {page.faqs.map((faq) => (
              <details key={faq.question} open={page.faqs.length <= 2}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="authority-cta">
        <div className="authority-shell authority-cta__inner">
          <p className="authority-eyebrow">Start with the real workflow</p>
          <h2>Bring us the complicated part.</h2>
          <p>Tell us what your team is trying to improve, what information is available and where the current process breaks.</p>
          <a href="mailto:aryanchandwani@gmail.com?subject=AlphaCodeAI%20project%20enquiry" className="authority-button authority-button--primary">
            aryanchandwani@gmail.com <ArrowUpRightIcon aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
};

export default AuthorityPage;
