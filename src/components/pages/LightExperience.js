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
    visual: 'sorter'
  },
  {
    number: '03',
    icon: CircleStackIcon,
    title: 'Data foundations',
    description:
      'Clean pipelines, purposeful models, and observability that make AI useful beyond the prototype and trustworthy in production.',
    tags: ['Pipelines', 'Models', 'Analytics'],
    visual: 'knob'
  },
  {
    number: '04',
    icon: CloudArrowUpIcon,
    title: 'Launch & scale',
    description:
      'Production deployment, security, monitoring, and iteration—all handled as one continuous product practice.',
    tags: ['Cloud', 'MLOps', 'Security'],
    visual: 'claw'
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
  const [speech, setSpeech] = useState('DONT CLICK ME >.<');
  const [mood, setMood] = useState('warning');

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
      mascot.classList.add('is-dead');
      setSpeech('I AM DEAD');
      setMood('dead');
      window.clearTimeout(motion.mouthTimer);
      motion.mouthTimer = window.setTimeout(() => {
        mascot.classList.remove('is-dead');
        setSpeech('HEHE JUST KIDDING');
        setMood('kidding');
      }, 3000);
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
      aria-label="Friendly AlphaCodeAI robot whose eyes and smile follow your pointer or touch. Activate the robot to play dead."
    >
      <div
        className={`light-mascot__speech light-mascot__speech--${mood}`}
        role="status"
        aria-live="polite"
      >
        {speech}
      </div>
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
          <g className="light-mascot__dead-mouth">
            <path d="M 621 503 Q 673 522 725 503" />
            <path className="light-mascot__tongue" d="M 650 513 L 696 513 L 696 544 Q 673 565 650 544 Z" />
          </g>
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

const prepareCanvas = (canvas) => {
  const context = canvas?.getContext('2d');
  if (!context || typeof context.clearRect !== 'function') return null;
  const bounds = canvas.getBoundingClientRect();
  const width = Math.max(280, Math.round(bounds.width || 460));
  const height = Math.max(210, Math.round(bounds.height || 300));
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { context, width, height };
};

const PachinkoCapability = () => {
  const canvasRef = useRef(null);
  const dropRef = useRef(() => {});
  const [result, setResult] = useState('Ready for a live request');

  useEffect(() => {
    const canvas = canvasRef.current;
    const board = prepareCanvas(canvas);
    if (!board) return undefined;
    const { context, width, height } = board;
    const bins = ['RAG', 'LLM', 'Agent'];
    const pins = [];
    const rows = 6;
    const columns = 7;
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        pins.push({
          x: ((column + 1) * width) / (columns + 1) + (row % 2 ? width / 18 : 0),
          y: 48 + row * ((height - 116) / rows)
        });
      }
    }

    let balls = [];
    const basketColors = ['#70e6ff', '#ffc400', '#ff5b22'];
    const basketHits = [0, 0, 0];
    const basketLights = [0, 0, 0];
    let frame = 0;
    let previousTime = window.performance.now();
    let active = true;

    const drop = () => {
      if (balls.length >= 24) balls.shift();
      balls.push({
        x: width * (0.38 + Math.random() * 0.24),
        y: 22,
        vx: (Math.random() - 0.5) * 58,
        vy: 24,
        radius: 7,
        color: basketColors[Math.floor(Math.random() * basketColors.length)]
      });
      setResult(`${balls.length} request${balls.length === 1 ? '' : 's'} in flight`);
    };
    dropRef.current = drop;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#101728';
      context.fillRect(0, 0, width, height);
      context.strokeStyle = 'rgba(112, 230, 255, 0.18)';
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 28) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      pins.forEach((pin) => {
        context.beginPath();
        context.arc(pin.x, pin.y, 4, 0, Math.PI * 2);
        context.fillStyle = '#fffdf7';
        context.shadowColor = '#70e6ff';
        context.shadowBlur = 8;
        context.fill();
      });
      context.shadowBlur = 0;
      bins.forEach((bin, index) => {
        const binWidth = width / 3;
        const isLit = window.performance.now() < basketLights[index];
        context.fillStyle = isLit ? basketColors[index] : 'rgba(255,255,255,0.08)';
        context.fillRect(index * binWidth + 3, height - 38, binWidth - 6, 35);
        context.fillStyle = isLit ? '#101728' : basketColors[index];
        context.font = '700 10px Space Grotesk, sans-serif';
        context.textAlign = 'center';
        context.fillText(
          `${bin.toUpperCase()} · ${basketHits[index]}`,
          index * binWidth + binWidth / 2,
          height - 16
        );
      });
      balls.forEach((ball) => {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fillStyle = ball.color;
        context.shadowColor = ball.color;
        context.shadowBlur = 12;
        context.fill();
        context.shadowBlur = 0;
      });
    };

    const tick = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.032);
      previousTime = time;
      const landed = [];
      balls.forEach((ball) => {
        ball.vy += 330 * delta;
        ball.x += ball.vx * delta;
        ball.y += ball.vy * delta;
        if (ball.x < ball.radius || ball.x > width - ball.radius) {
          ball.x = clamp(ball.x, ball.radius, width - ball.radius);
          ball.vx *= -0.82;
        }
        pins.forEach((pin) => {
          const dx = ball.x - pin.x;
          const dy = ball.y - pin.y;
          const distance = Math.hypot(dx, dy) || 1;
          const minimum = ball.radius + 4;
          if (distance >= minimum) return;
          const nx = dx / distance;
          const ny = dy / distance;
          ball.x += nx * (minimum - distance);
          ball.y += ny * (minimum - distance);
          const impact = ball.vx * nx + ball.vy * ny;
          if (impact < 0) {
            ball.vx -= 1.72 * impact * nx;
            ball.vy -= 1.72 * impact * ny;
            ball.vx += (Math.random() - 0.5) * 54;
          }
        });
        if (ball.y >= height - 38) {
          const binIndex = clamp(Math.floor(ball.x / (width / 3)), 0, 2);
          basketHits[binIndex] += 1;
          basketLights[binIndex] = time + 650;
          landed.push(ball);
          setResult(
            `Routed to ${bins[binIndex]} · ${Math.round(38 + Math.random() * 72)}ms`
          );
        }
      });
      if (landed.length) balls = balls.filter((ball) => !landed.includes(ball));
      draw();
      if (active) frame = window.requestAnimationFrame(tick);
    };

    drop();
    frame = window.requestAnimationFrame(tick);
    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="light-capability-sim light-capability-sim--pachinko">
      <div className="light-capability-sim__head">
        <b>Inference pachinko</b><span>Multi-ball physics</span>
      </div>
      <canvas
        ref={canvasRef}
        onClick={() => dropRef.current()}
        aria-label="Pachinko routing simulation. Activate to drop a randomized request."
        role="button"
        tabIndex="0"
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            dropRef.current();
          }
        }}
      />
      <div className="light-capability-sim__result" aria-live="polite">
        <span>{result}</span>
        <button type="button" onClick={() => dropRef.current()}>Add ball</button>
      </div>
    </div>
  );
};

const SORTER_TYPES = [
  { key: 'ui', label: 'UI', color: '#1347e8', top: '20%' },
  { key: 'api', label: 'API', color: '#ff5b22', top: '50%' },
  { key: 'data', label: 'DATA', color: '#ffc400', top: '80%' }
];

const SorterCapability = () => {
  const timersRef = useRef([]);
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({ ui: 0, api: 0, data: 0 });
  const [activeGate, setActiveGate] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => () => timersRef.current.forEach(window.clearTimeout), []);

  const schedule = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  };

  const runBatch = () => {
    if (running) return;
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
    setItems([]);
    setCounts({ ui: 0, api: 0, data: 0 });
    setRunning(true);

    Array.from({ length: 9 }, (_, index) => {
      const type = SORTER_TYPES[Math.floor(Math.random() * SORTER_TYPES.length)];
      const id = `${Date.now()}-${index}`;
      schedule(() => {
        setItems((current) => [...current, { id, type }]);
        schedule(() => setActiveGate(type.key), 470);
        schedule(() => {
          setCounts((current) => ({ ...current, [type.key]: current[type.key] + 1 }));
          setItems((current) => current.filter((item) => item.id !== id));
          if (index === 8) {
            setActiveGate('');
            setRunning(false);
          }
        }, 1120);
      }, index * 440);
      return id;
    });
  };

  return (
    <div className="light-capability-sim light-capability-sim--sorter">
      <div className="light-capability-sim__head">
        <b>Automatic sorter</b><span>{running ? 'Batch running' : 'Gate routing'}</span>
      </div>
      <div className="light-sorter-map" aria-hidden="true">
        <svg viewBox="0 0 460 190" preserveAspectRatio="none">
          <path d="M18 95 H202" />
          <path d="M202 95 L398 38" />
          <path d="M202 95 H398" />
          <path d="M202 95 L398 152" />
        </svg>
        <div className={`light-sorter-scanner${activeGate ? ' is-reading' : ''}`}>SCAN</div>
        {SORTER_TYPES.map((type, index) => (
          <div
            className={`light-sorter-gate light-sorter-gate--${index}${activeGate === type.key ? ' is-open' : ''}`}
            key={type.key}
            style={{ '--sort-color': type.color }}
          >
            <i />
          </div>
        ))}
        {SORTER_TYPES.map((type) => (
          <div
            className={`light-sorter-bin${activeGate === type.key ? ' is-active' : ''}`}
            key={type.key}
            style={{ '--sort-color': type.color, top: type.top, color: type.key === 'ui' ? '#fff' : '#101728' }}
          >
            {type.label}
          </div>
        ))}
        {items.map(({ id, type }) => (
          <motion.i
            className="light-sorter-item"
            key={id}
            style={{ '--sort-color': type.color }}
            initial={{ left: '4%', top: '50%', scale: 0.65, opacity: 0 }}
            animate={{
              left: ['4%', '44%', '88%'],
              top: ['50%', '50%', type.top],
              scale: [0.65, 1, 0.75],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="light-sorter-result" aria-live="polite">
        {SORTER_TYPES.map((type) => (
          <div key={type.key} style={{ '--sort-color': type.color }}>
            <strong>{counts[type.key]}</strong><span>{type.label}</span>
          </div>
        ))}
      </div>
      <button className="light-sim-action" type="button" onClick={runBatch} disabled={running}>
        {running ? 'Sorting…' : 'Sort random batch'}
      </button>
    </div>
  );
};

const KnobCapability = () => {
  const [temperature, setTemperature] = useState(46);
  const [result, setResult] = useState({ label: 'Balanced', confidence: 91, latency: 164 });
  const runInference = () => {
    const randomness = () => Math.random() - 0.5;
    const confidence = clamp(Math.round(97 - Math.abs(temperature - 42) * 0.22 + randomness() * 8), 68, 99);
    const latency = clamp(Math.round(224 - temperature * 0.86 + randomness() * 38), 92, 260);
    const labels = temperature < 34 ? ['Precise', 'Grounded'] : temperature > 68 ? ['Exploratory', 'Creative'] : ['Balanced', 'Adaptive'];
    setResult({
      label: labels[Math.floor(Math.random() * labels.length)],
      confidence,
      latency
    });
  };
  const angle = -135 + temperature * 2.7;

  return (
    <div className="light-capability-sim light-capability-sim--knob">
      <div className="light-capability-sim__head"><b>Model tuner</b><span>Temperature {temperature}</span></div>
      <div className="light-knob-control">
        <label htmlFor="model-temperature">Turn to tune</label>
        <div className="light-knob" style={{ '--knob-angle': `${angle}deg` }}>
          <i aria-hidden="true" />
          <input
            id="model-temperature"
            type="range"
            min="0"
            max="100"
            value={temperature}
            onChange={(event) => setTemperature(Number(event.target.value))}
            aria-label="Model temperature"
          />
        </div>
        <div className="light-knob-scale"><span>Precise</span><span>Creative</span></div>
      </div>
      <div className="light-knob-result" aria-live="polite">
        <div><span>Profile</span><strong>{result.label}</strong></div>
        <div><span>Confidence</span><strong>{result.confidence}%</strong></div>
        <div><span>Latency</span><strong>{result.latency}ms</strong></div>
      </div>
      <button className="light-sim-action" type="button" onClick={runInference}>Run inference</button>
    </div>
  );
};

const CLAW_PRIZE_TYPES = [
  { label: 'SHIP', color: '#1347e8' },
  { label: 'SCALE', color: '#ff5b22' },
  { label: 'OBS', color: '#ffc400' },
  { label: 'SAFE', color: '#70e6ff' },
  { label: 'ITERATE', color: '#00a878' }
];

const createClawPrize = (index, x) => ({
  id: `${Date.now()}-${index}-${Math.random()}`,
  x,
  ...CLAW_PRIZE_TYPES[index % CLAW_PRIZE_TYPES.length]
});

const ClawCapability = () => {
  const timersRef = useRef([]);
  const [clawX, setClawX] = useState(50);
  const [phase, setPhase] = useState('idle');
  const [result, setResult] = useState('Aim over a release, then drop');
  const [wins, setWins] = useState(0);
  const [caughtPrize, setCaughtPrize] = useState(null);
  const [prizes, setPrizes] = useState(() =>
    [17, 33, 50, 68, 84].map((x, index) => createClawPrize(index, x))
  );

  useEffect(() => () => timersRef.current.forEach(window.clearTimeout), []);

  const schedule = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  };

  const moveClaw = (direction) => {
    if (phase !== 'idle') return;
    setClawX((current) => clamp(current + direction * 11, 10, 90));
    setResult(direction < 0 ? 'Claw moving left' : 'Claw moving right');
  };

  const dropClaw = () => {
    if (phase !== 'idle') return;
    setPhase('dropping');
    setResult('Claw descending…');

    schedule(() => {
      const nearest = prizes.reduce((best, prize) => (
        !best || Math.abs(prize.x - clawX) < Math.abs(best.x - clawX) ? prize : best
      ), null);
      const distance = nearest ? Math.abs(nearest.x - clawX) : 100;
      const catchChance = distance < 7 ? 0.86 : distance < 14 ? 0.58 : 0.12;
      const caught = nearest && Math.random() < catchChance ? nearest : null;

      if (caught) {
        setCaughtPrize(caught);
        setPrizes((current) => current.filter((prize) => prize.id !== caught.id));
        setResult(`Closing on ${caught.label}…`);
      } else {
        setResult('Claw closing…');
      }
      setPhase('grabbing');

      schedule(() => {
        setPhase('rising');
        setResult(caught ? `Lifting ${caught.label}…` : 'Missed—reposition and try again');

        schedule(() => {
          setPhase('idle');
          if (caught) {
            setWins((current) => current + 1);
            setResult(`Caught ${caught.label}`);
            setPrizes((current) => {
              const typeIndex = Math.floor(Math.random() * CLAW_PRIZE_TYPES.length);
              const replacement = createClawPrize(typeIndex, 14 + Math.random() * 72);
              return [...current, replacement];
            });
          }
          setCaughtPrize(null);
        }, 680);
      }, 190);
    }, 540);
  };

  return (
    <div className="light-capability-sim light-capability-sim--claw">
      <div className="light-capability-sim__head"><b>Release claw</b><span>{wins} catches</span></div>
      <div className="light-claw-machine" aria-hidden="true">
        <div className="light-claw-machine__rail" style={{ '--claw-x': `${clawX}%` }}><i /></div>
        <div
          className={`light-claw light-claw--${phase}`}
          style={{ '--claw-x': `${clawX}%` }}
        >
          <i className="light-claw__cable" />
          <div className="light-claw__grip">
            <span /><span />
            {caughtPrize && (
              <i
                className="light-claw__caught"
                style={{ '--prize-color': caughtPrize.color }}
              />
            )}
          </div>
        </div>
        <div className="light-claw-prizes">
          {prizes.map((prize, index) => (
            <i
              key={prize.id}
              style={{ '--prize-x': `${prize.x}%`, '--prize-color': prize.color, '--prize-tilt': `${index % 2 ? 7 : -6}deg` }}
            >
              <span>{prize.label}</span>
            </i>
          ))}
        </div>
      </div>
      <div className="light-claw-result" aria-live="polite">
        <span>{result}</span><strong>{wins} secured</strong>
      </div>
      <div className="light-claw-controls">
        <button type="button" onClick={() => moveClaw(-1)} disabled={phase !== 'idle'} aria-label="Move claw left">
          <ChevronLeftIcon aria-hidden="true" />
        </button>
        <button type="button" onClick={dropClaw} disabled={phase !== 'idle'}>Drop claw</button>
        <button type="button" onClick={() => moveClaw(1)} disabled={phase !== 'idle'} aria-label="Move claw right">
          <ChevronRightIcon aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const CapabilityInteractive = ({ type }) => {
  if (type === 'pachinko') return <PachinkoCapability />;
  if (type === 'sorter') return <SorterCapability />;
  if (type === 'knob') return <KnobCapability />;
  return <ClawCapability />;
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
