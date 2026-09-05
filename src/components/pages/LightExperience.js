import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleStackIcon,
  CloudArrowUpIcon,
  CodeBracketIcon,
  CpuChipIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
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
    tags: ['LLMs', 'RAG', 'Agents'],
    visual: 'pachinko'
  },
  {
    number: '02',
    icon: CodeBracketIcon,
    title: 'Product engineering',
    description:
      'From the first architecture decision to a polished interface, we build the dependable software around the intelligence.',
    tags: ['Web', 'Mobile', 'APIs'],
    visual: 'builder'
  },
  {
    number: '03',
    icon: CircleStackIcon,
    title: 'Data foundations',
    description:
      'Clean pipelines, purposeful models, and observability that make AI useful beyond the prototype and trustworthy in production.',
    tags: ['Pipelines', 'Models', 'Analytics'],
    visual: 'pipeline'
  },
  {
    number: '04',
    icon: CloudArrowUpIcon,
    title: 'Launch & scale',
    description:
      'Production deployment, security, monitoring, and iteration—all handled as one continuous product practice.',
    tags: ['Cloud', 'MLOps', 'Security'],
    visual: 'deploy'
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
  {
    name: 'Skillocraft',
    description: 'Where skills meet profession.',
    logo: '/partners/skillocraft.svg',
    link: 'https://skillocraft.com',
    tileBg: '#ffffff',
    color: '#9a4e1e'
  },
  {
    name: 'Opro Maldives',
    description: 'Adding care to your property.',
    logo: '/partners/opro.jpg',
    link: 'https://opromaldives.com',
    tileBg: '#f7f6f2',
    color: '#35427c'
  },
  {
    name: 'Shapotools',
    description: 'Quality tools, built to perform.',
    logo: '/partners/shapotools.jpg',
    link: 'https://shapotools.com',
    tileBg: '#333333',
    color: '#333b47'
  },
  {
    name: 'Proofit',
    description: 'Smarter property inspections, proofed.',
    logo: '/partners/proofit.jpg',
    link: 'https://proofitcompany.com',
    tileBg: '#ffffff',
    color: '#9e5b1e'
  },
  {
    name: 'Okno Modhomes',
    description: 'Sustainable modular homes, delivered with precision.',
    logo: '/partners/okno.webp',
    link: 'https://www.oknomodhomes.com/',
    tileBg: '#111111',
    color: '#272727'
  },
  {
    name: 'Vivid Design Studio',
    description: 'Luxury residential and commercial architectural design.',
    logo: '/partners/vivid-design-studio.png',
    link: 'https://www.vividdesignstudio.com/',
    tileBg: '#1d1d1b',
    color: '#585752'
  },
  {
    name: 'Fanizm',
    description: 'Revolutionizing entertainment and fan engagement.',
    logo: '/partners/fanizm.jpg',
    link: 'https://fanizm.com',
    tileBg: '#1a1945',
    color: '#141133',
    cover: true
  },
  {
    name: 'Terracon India',
    description: "India's first nature-based solutions company.",
    logo: '/partners/terracon.jpg',
    link: 'https://www.terraconindia.com/',
    tileBg: '#ffffff',
    color: '#35602a',
    cover: true
  }
];

const caseStudies = [
  {
    client: 'Proofit',
    discipline: 'Digital experience · AI guidance',
    title: 'A calmer path from property doubt to booked inspection.',
    challenge:
      'Dense service categories and technical concerns made it difficult for homeowners to know the right next step.',
    result:
      'We shaped a responsive experience with guided service discovery, structured enquiry capture, and a concise AI assistant that can route serious property concerns toward an appointment.',
    image: '/visuals/case-proofit.jpg',
    imageAlt: 'A property inspector using a thermal camera inside a modern apartment.',
    logo: '/partners/proofit.jpg',
    logoBg: '#ffffff',
    logoAspect: '416 / 138',
    logoWidth: '174px',
    link: 'https://proofitcompany.com'
  },
  {
    client: 'Opro Maldives',
    discipline: 'Product strategy · Project control',
    title: 'One operating view for complex property projects.',
    challenge:
      'Budgets, milestones, procurement dates, and stakeholder updates were spread across separate files and working habits.',
    result:
      'We designed a governed project-control product that makes progress, cost variance, and decision points easier to understand while keeping each audience focused on the information it needs.',
    image: '/visuals/case-opro.jpg',
    imageAlt: 'An island property project model arranged with schedule and cost-control tools.',
    logo: '/partners/opro.jpg',
    logoBg: '#ffffff',
    logoAspect: '524 / 176',
    logoWidth: '174px',
    link: 'https://opromaldives.com'
  },
  {
    client: 'Okno Modhomes',
    discipline: 'Immersive web · 3D storytelling',
    title: 'Turning modular living into a place you can feel.',
    challenge:
      'A modular home is difficult to communicate through flat plans alone, especially when the promise is as much about landscape as structure.',
    result:
      'We built an immersive, scroll-led 3D experience that moves visitors from city noise toward the home, helping the brand express its design philosophy before the first sales conversation.',
    image: '/visuals/case-okno.jpg',
    imageAlt: 'A modern modular home resting beside a river in a mountain valley.',
    logo: '/partners/okno.webp',
    logoBg: '#111111',
    logoAspect: '800 / 226',
    logoWidth: '188px',
    link: 'https://www.oknomodhomes.com/'
  },
  {
    client: 'Shapotools',
    discipline: 'Workflow software · Offer operations',
    title: 'From workbook complexity to a guided offer flow.',
    challenge:
      'Product configuration, pricing rules, revisions, and offer documents lived in a dense legacy workbook that demanded specialist knowledge.',
    result:
      'We translated the core commercial journey into a clearer interface for configuring products, reviewing rule notices, managing revisions, and producing ready-to-share offers.',
    image: '/visuals/case-shapotools.jpg',
    imageAlt: 'Industrial pump components arranged in a precise offer-production workflow.',
    logo: '/partners/shapotools.jpg',
    logoBg: '#333333',
    logoAspect: '1086 / 150',
    logoWidth: '232px',
    link: 'https://shapotools.com'
  }
];

const ROBOT_WIDTH = 1342;
const ROBOT_HEIGHT = 1172;
const MAX_EYE_X = 40;
const MAX_EYE_Y = 27;

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const isBackgroundPixel = (red, green, blue) => {
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  return minimum >= 216 && maximum - minimum <= 14;
};

const removeConnectedCheckerboard = (imageData) => {
  const { data, width, height } = imageData;
  const pixelCount = width * height;
  const background = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let readIndex = 0;
  let writeIndex = 0;

  const enqueue = (x, y) => {
    const pixelIndex = y * width + x;
    if (background[pixelIndex]) return;

    const offset = pixelIndex * 4;
    if (!isBackgroundPixel(data[offset], data[offset + 1], data[offset + 2])) return;

    background[pixelIndex] = 1;
    queue[writeIndex] = pixelIndex;
    writeIndex += 1;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }

  for (let y = 1; y < height - 1; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (readIndex < writeIndex) {
    const pixelIndex = queue[readIndex];
    readIndex += 1;
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);

    if (x > 0) enqueue(x - 1, y);
    if (x + 1 < width) enqueue(x + 1, y);
    if (y > 0) enqueue(x, y - 1);
    if (y + 1 < height) enqueue(x, y + 1);
  }

  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    if (background[pixelIndex]) data[pixelIndex * 4 + 3] = 0;
  }

  return imageData;
};

const InteractiveRobot = () => {
  const mascotRef = useRef(null);
  const canvasRef = useRef(null);
  const eyesRef = useRef(null);
  const mouthRef = useRef(null);

  useEffect(() => {
    const mascot = mascotRef.current;
    const canvas = canvasRef.current;
    const eyes = eyesRef.current;
    const mouth = mouthRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motion = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      frame: 0,
      mouthTimer: 0,
      readyTimer: 0,
      lastInput: 'pointer',
      reduceMotion: reduceMotionQuery.matches
    };
    const loadingStartedAt = window.performance.now();

    const image = new Image();
    image.decoding = 'async';
    image.addEventListener('load', () => {
      canvas.width = ROBOT_WIDTH;
      canvas.height = ROBOT_HEIGHT;
      context.drawImage(image, 0, 0, ROBOT_WIDTH, ROBOT_HEIGHT);
      const imageData = context.getImageData(0, 0, ROBOT_WIDTH, ROBOT_HEIGHT);
      context.putImageData(removeConnectedCheckerboard(imageData), 0, 0);
      const remainingLoadTime = Math.max(
        0,
        650 - (window.performance.now() - loadingStartedAt)
      );
      motion.readyTimer = window.setTimeout(() => {
        mascot.classList.add('is-ready');
        mascot.setAttribute('aria-busy', 'false');
      }, remainingLoadTime);
    });
    image.src = `${process.env.PUBLIC_URL}/robot-mascot-source.png`;

    const renderGaze = () => {
      motion.frame = 0;
      const easing = motion.reduceMotion ? 1 : 0.18;
      motion.currentX += (motion.targetX - motion.currentX) * easing;
      motion.currentY += (motion.targetY - motion.currentY) * easing;
      eyes.style.transform = `translate(${motion.currentX}px, ${motion.currentY}px)`;
      mouth.style.transform = `translate(${motion.currentX * 0.34}px, ${
        motion.currentY * 0.22
      }px)`;

      if (
        Math.abs(motion.currentX - motion.targetX) > 0.08 ||
        Math.abs(motion.currentY - motion.targetY) > 0.08
      ) {
        motion.frame = window.requestAnimationFrame(renderGaze);
      }
    };

    const queueGaze = () => {
      if (!motion.frame) motion.frame = window.requestAnimationFrame(renderGaze);
    };

    const pointAt = (clientX, clientY, inputType = 'pointer') => {
      const bounds = mascot.getBoundingClientRect();
      const centerX = bounds.left + bounds.width * 0.5;
      const centerY = bounds.top + bounds.height * 0.35;
      const normalizedX = clamp(
        (clientX - centerX) / (window.innerWidth * 0.45),
        -1,
        1
      );
      const normalizedY = clamp(
        (clientY - centerY) / (window.innerHeight * 0.45),
        -1,
        1
      );
      const inputScale = inputType === 'touch' ? 1.5 : 1;
      const motionScale = (motion.reduceMotion ? 0.45 : 1) * inputScale;
      motion.targetX = normalizedX * MAX_EYE_X * motionScale;
      motion.targetY = normalizedY * MAX_EYE_Y * motionScale;
      queueGaze();
    };

    const centerGaze = () => {
      motion.targetX = 0;
      motion.targetY = 0;
      queueGaze();
    };

    const reactToClick = () => {
      mascot.classList.add('is-clicked');
      window.clearTimeout(motion.mouthTimer);
      motion.mouthTimer = window.setTimeout(
        () => mascot.classList.remove('is-clicked'),
        motion.reduceMotion ? 300 : 900
      );
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      motion.lastInput = 'pointer';
      pointAt(event.clientX, event.clientY);
    };
    const handleTouchPoint = (event) => {
      const touch = event.touches?.[0] || event.changedTouches?.[0];
      if (!touch) return;
      motion.lastInput = 'touch';
      pointAt(touch.clientX, touch.clientY, 'touch');
    };
    const handleTouchEnd = (event) => handleTouchPoint(event);
    const handlePointerLeave = () => {
      if (motion.lastInput !== 'touch') centerGaze();
    };
    const handleKeyDown = (event) => {
      const keyMovement = {
        ArrowLeft: [-8, 0],
        ArrowRight: [8, 0],
        ArrowUp: [0, -6],
        ArrowDown: [0, 6]
      };

      if (event.key === 'Escape') {
        event.preventDefault();
        centerGaze();
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        reactToClick();
        return;
      }

      if (!(event.key in keyMovement)) return;
      event.preventDefault();
      motion.lastInput = 'keyboard';
      const [deltaX, deltaY] = keyMovement[event.key];
      motion.targetX = clamp(motion.targetX + deltaX, -MAX_EYE_X, MAX_EYE_X);
      motion.targetY = clamp(motion.targetY + deltaY, -MAX_EYE_Y, MAX_EYE_Y);
      queueGaze();
    };

    const handleMotionPreference = (event) => {
      motion.reduceMotion = event.matches;
      centerGaze();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchPoint, { passive: true });
    window.addEventListener('touchmove', handleTouchPoint, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    mascot.addEventListener('click', reactToClick);
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    mascot.addEventListener('keydown', handleKeyDown);
    reduceMotionQuery.addEventListener('change', handleMotionPreference);
    queueGaze();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchPoint);
      window.removeEventListener('touchmove', handleTouchPoint);
      window.removeEventListener('touchend', handleTouchEnd);
      mascot.removeEventListener('click', reactToClick);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      mascot.removeEventListener('keydown', handleKeyDown);
      reduceMotionQuery.removeEventListener('change', handleMotionPreference);
      window.cancelAnimationFrame(motion.frame);
      window.clearTimeout(motion.mouthTimer);
      window.clearTimeout(motion.readyTimer);
    };
  }, []);

  return (
    <div
      id="interactive-mascot"
      ref={mascotRef}
      className="light-mascot"
      role="img"
      tabIndex="0"
      aria-busy="true"
      aria-label="Friendly AlphaCodeAI robot whose eyes and smile follow your pointer or touch. Activate the robot to see its surprised expression."
    >
      <div className="light-mascot__loader" aria-hidden="true">
        <span>Loading mascot</span>
        <div className="light-mascot__loader-track">
          <span className="light-mascot__loader-fill" />
        </div>
      </div>
      <canvas ref={canvasRef} className="light-mascot__art" aria-hidden="true" />
      <svg
        className="light-mascot__face"
        viewBox="0 0 1342 1172"
        aria-hidden="true"
      >
        <defs>
          <filter id="light-eye-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g ref={eyesRef} className="light-mascot__eyes" filter="url(#light-eye-glow)">
          <g className="light-mascot__round-eyes">
            <circle cx="565" cy="404" r="48" />
            <circle cx="782" cy="404" r="48" />
          </g>
          <g className="light-mascot__x-eyes">
            <path d="M 529 368 L 601 440 M 601 368 L 529 440" />
            <path d="M 746 368 L 818 440 M 818 368 L 746 440" />
          </g>
        </g>
        <g ref={mouthRef} className="light-mascot__mouth" filter="url(#light-eye-glow)">
          <path className="light-mascot__smile" d="M 623 494 Q 673 535 723 494" />
          <circle className="light-mascot__ooh" cx="673" cy="507" r="23" />
        </g>
      </svg>
    </div>
  );
};

const partnerLogoSource = (logo) =>
  logo.startsWith('http') ? logo : `${process.env.PUBLIC_URL}${logo}`;

const partnerAnchor = (name) =>
  `client-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

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

const PachinkoCapability = () => {
  const routes = [
    { label: 'RAG', x: '-34%' },
    { label: 'LLM', x: '0%' },
    { label: 'Agent', x: '34%' }
  ];
  const [run, setRun] = useState(0);
  const route = routes[run % routes.length];

  return (
    <button
      type="button"
      className="light-capability-play light-capability-play--pachinko"
      onClick={() => setRun((current) => current + 1)}
      aria-label={`Route another AI request. Current destination: ${route.label}.`}
    >
      <span className="light-capability-play__head">
        <b>Live request</b>
        <span>Tap to route</span>
      </span>
      <span className="light-pachinko" aria-hidden="true">
        <i
          key={run}
          className="light-pachinko__ball"
          style={{ '--pachinko-x': route.x }}
        />
        <span className="light-pachinko__pins">
          {Array.from({ length: 18 }, (_, index) => (
            <i key={index} />
          ))}
        </span>
        <span className="light-pachinko__routes">
          {routes.map((item) => (
            <b className={item.label === route.label ? 'is-active' : ''} key={item.label}>
              {item.label}
            </b>
          ))}
        </span>
      </span>
    </button>
  );
};

const BuilderCapability = () => {
  const modules = ['Interface', 'API', 'Logic', 'Mobile'];
  const [activeModules, setActiveModules] = useState([0, 2]);
  const toggleModule = (index) => {
    setActiveModules((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  return (
    <div className="light-capability-play light-capability-play--builder">
      <span className="light-capability-play__head">
        <b>Product composer</b>
        <span>{activeModules.length} connected</span>
      </span>
      <div className="light-builder" role="group" aria-label="Choose product modules">
        {modules.map((module, index) => (
          <button
            type="button"
            className={activeModules.includes(index) ? 'is-active' : ''}
            aria-pressed={activeModules.includes(index)}
            onClick={() => toggleModule(index)}
            key={module}
          >
            <i aria-hidden="true" />
            <span>0{index + 1}</span>
            <b>{module}</b>
          </button>
        ))}
      </div>
      <div className="light-builder__status" aria-live="polite">
        <span>{activeModules.length === 4 ? 'Ready to ship' : 'Select modules'}</span>
        <i style={{ '--builder-progress': `${activeModules.length * 25}%` }} />
      </div>
    </div>
  );
};

const PipelineCapability = () => {
  const stages = ['Collect', 'Clean', 'Model', 'Observe'];
  const [activeStage, setActiveStage] = useState(1);

  return (
    <div className="light-capability-play light-capability-play--pipeline">
      <span className="light-capability-play__head">
        <b>Signal pipeline</b>
        <span>Stage 0{activeStage + 1}</span>
      </span>
      <div className="light-data-pipeline" role="group" aria-label="Inspect data pipeline stages">
        {stages.map((stage, index) => (
          <button
            type="button"
            className={index <= activeStage ? 'is-active' : ''}
            aria-pressed={index === activeStage}
            onClick={() => setActiveStage(index)}
            key={stage}
          >
            <i aria-hidden="true" />
            <span>0{index + 1}</span>
            <b>{stage}</b>
          </button>
        ))}
      </div>
      <div className="light-data-pipeline__readout" aria-live="polite">
        <span>Quality</span>
        <strong>{[72, 88, 94, 99][activeStage]}%</strong>
        <i style={{ '--pipeline-progress': `${(activeStage + 1) * 25}%` }} />
      </div>
    </div>
  );
};

const DeployCapability = () => {
  const [liveNodes, setLiveNodes] = useState(3);
  const scaleDeployment = () =>
    setLiveNodes((current) => (current === 9 ? 3 : current + 3));

  return (
    <div className="light-capability-play light-capability-play--deploy">
      <span className="light-capability-play__head">
        <b>Release control</b>
        <span className="light-deploy__live"><i /> Live</span>
      </span>
      <div className="light-deploy__nodes" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <i className={index < liveNodes ? 'is-active' : ''} key={index} />
        ))}
      </div>
      <div className="light-deploy__footer" aria-live="polite">
        <span><strong>{liveNodes}</strong> healthy nodes</span>
        <button type="button" onClick={scaleDeployment}>
          {liveNodes === 9 ? 'Reset' : 'Scale +3'}
          <ArrowRightIcon aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const CapabilityInteractive = ({ type }) => {
  if (type === 'pachinko') return <PachinkoCapability />;
  if (type === 'builder') return <BuilderCapability />;
  if (type === 'pipeline') return <PipelineCapability />;
  return <DeployCapability />;
};

const PartnerCarousel = () => {
  const trackRef = useRef(null);

  const move = (direction) => {
    const track = trackRef.current;
    const firstSlide = track?.querySelector('.light-partner-slide');
    if (!track || !firstSlide) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = firstSlide.getBoundingClientRect().width + gap;
    const maximum = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft >= maximum - 2;

    if (direction < 0 && atStart) {
      track.scrollTo({ left: maximum, behavior: 'smooth' });
      return;
    }

    if (direction > 0 && atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <div className="light-partners__carousel" aria-roledescription="carousel">
      <div className="light-partners__controls">
        <span>Drag or swipe to explore</span>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Previous clients">
            <ChevronLeftIcon aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next clients">
            <ChevronRightIcon aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="light-partners__track"
        role="region"
        aria-label="Selected clients"
        tabIndex="0"
      >
        {partners.map((partner) => (
          <div className="light-partner-slide" key={partner.name}>
            <a
              id={partnerAnchor(partner.name)}
              className="light-partner-card"
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${partner.name}`}
              style={{ '--partner-color': partner.color }}
            >
              <div
                className={`light-partner-card__image${
                  partner.cover ? ' light-partner-card__image--cover' : ''
                }`}
                style={{ backgroundColor: partner.tileBg }}
              >
                <img
                  src={partnerLogoSource(partner.logo)}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  width="480"
                  height="300"
                />
              </div>
              <div className="light-partner-card__body">
                <div>
                  <h3>{partner.name}</h3>
                  <p>{partner.description}</p>
                </div>
                <ArrowUpRightIcon aria-hidden="true" />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

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

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="light-hero__visual"
          >
            <InteractiveRobot />
          </motion.div>
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

      <section id="partners" className="light-partners" aria-labelledby="light-partners-title">
        <div className="light-shell light-partners__inner">
          <Reveal className="light-partners__heading">
            <span>00 / Selected partners</span>
            <h2 id="light-partners-title">
              Trusted by teams <em>building what is next.</em>
            </h2>
            <p>
              Strategy, product, and engineering partnerships across climate,
              education, property, commerce, and entertainment.
            </p>
          </Reveal>

          <PartnerCarousel />
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
          <Reveal className="light-editorial-visual light-editorial-visual--services">
            <img
              src={`${process.env.PUBLIC_URL}/visuals/capabilities-workbench.jpg`}
              alt="A modular cobalt and orange AI production system connected by amber data pathways."
              loading="lazy"
              width="1536"
              height="1024"
            />
            <span>From signal to shipped system</span>
          </Reveal>
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
                    <div className="light-capability__interactive">
                      <CapabilityInteractive type={item.visual} />
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

      <section id="principles" className="light-manifesto">
        <div className="light-shell light-manifesto__layout">
          <Reveal className="light-manifesto__quote">
            <p className="light-manifesto__eyebrow">Our operating principle</p>
            <blockquote>
              “Intelligence is only useful when the{' '}
              <span>whole product earns trust.</span>”
            </blockquote>
          </Reveal>
          <Reveal delay={0.08} className="light-manifesto__visual">
            <img
              src={`${process.env.PUBLIC_URL}/visuals/trust-core.jpg`}
              alt="A glowing intelligence core protected by glass, with three visible human-control levers."
              loading="lazy"
              width="1536"
              height="1024"
            />
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

      <section id="case-studies" className="light-section light-cases">
        <div className="light-shell">
          <SectionIntro
            index="03"
            eyebrow="Selected case studies"
            title="Real work. Clear problems. Useful outcomes."
            copy="A closer look at how we turn complicated workflows and ambitious ideas into products people can understand and use. Sensitive implementation details stay private."
          />
          <div className="light-cases__grid">
            {caseStudies.map((study, index) => (
              <Reveal key={study.client} delay={index * 0.06}>
                <article className="light-case-study">
                  <div className="light-case-study__image">
                    <img
                      src={`${process.env.PUBLIC_URL}${study.image}`}
                      alt={study.imageAlt}
                      loading="lazy"
                      width="1536"
                      height="1024"
                    />
                    <div
                      className="light-case-study__logo"
                      style={{
                        backgroundColor: study.logoBg,
                        '--case-logo-aspect': study.logoAspect,
                        '--case-logo-width': study.logoWidth
                      }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}${study.logo}`}
                        alt={`${study.client} logo`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="light-case-study__body">
                    <div className="light-case-study__meta">
                      <span>{study.client}</span>
                      <span>{study.discipline}</span>
                    </div>
                    <h3>{study.title}</h3>
                    <dl>
                      <div>
                        <dt>The challenge</dt>
                        <dd>{study.challenge}</dd>
                      </div>
                      <div>
                        <dt>What we changed</dt>
                        <dd>{study.result}</dd>
                      </div>
                    </dl>
                    <a
                      href={study.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="light-case-study__link"
                    >
                      Visit {study.client}
                      <ArrowUpRightIcon aria-hidden="true" />
                    </a>
                  </div>
                </article>
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
            <div className="light-contact__visual">
              <img
                src={`${process.env.PUBLIC_URL}/visuals/project-launch.jpg`}
                alt="A finished cobalt and orange AI product module ready to launch on a blueprint table."
                loading="lazy"
                width="1536"
                height="1024"
              />
            </div>
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
              className="light-button light-button--ink light-button--whatsapp"
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
