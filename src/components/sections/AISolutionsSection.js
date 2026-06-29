import {
  DocumentTextIcon,
  FilmIcon,
  AcademicCapIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import SolutionCard from '../ui/SolutionCard';
import SectionHeading from '../ui/SectionHeading';

const g = {
  violet: 'linear-gradient(135deg,#8B5CF6,#6366F1)',
  cyan: 'linear-gradient(135deg,#22D3EE,#3B82F6)',
  indigo: 'linear-gradient(135deg,#6366F1,#22D3EE)',
  fuchsia: 'linear-gradient(135deg,#E879F9,#8B5CF6)'
};

const aiSolutions = [
  {
    title: 'AI Content Generation',
    description: 'Generate high-quality content across formats and languages, on brand.',
    icon: DocumentTextIcon,
    gradient: g.cyan
  },
  {
    title: 'AI-Driven Video Editing',
    description: 'Automated editing with intelligent scene and content analysis.',
    icon: FilmIcon,
    gradient: g.indigo
  },
  {
    title: 'Personalized Learning',
    description: 'Adaptive learning platforms that tailor pace and path to each learner.',
    icon: AcademicCapIcon,
    gradient: g.fuchsia
  },
  {
    title: 'Medical AI Assistance',
    description: 'Supporting clinicians with AI-powered triage and diagnostic insights.',
    icon: HeartIcon,
    gradient: g.violet
  }
];

const AISolutionsSection = () => {
  return (
    <section id="solutions" className="relative overflow-hidden bg-canvas-soft py-24">
      {/* Subtle section glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-radial-glow opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Where AI delivers"
          title="AI solutions across"
          highlight="industries"
          subtitle="Applied AI for real domains — media, content, education, and healthcare."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiSolutions.map((solution, index) => (
            <SolutionCard key={solution.title} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISolutionsSection;
