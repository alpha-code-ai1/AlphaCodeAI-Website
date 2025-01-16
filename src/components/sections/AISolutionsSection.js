import SolutionCard from '../ui/SolutionCard';

const AISolutionsSection = () => {
  const aiSolutions = [
    {
      title: "AI Music Generation",
      description: "Create unique musical compositions with our advanced AI algorithms.",
      image: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWU5YjVucXo1YnhiN2k0cmx1Ymxybmh5bWVkejc4Mmc5a28wc3g3MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xThuWi8B4lFXM6UDXW/giphy.webp",
      icon: "https://img.icons8.com/fluency/96/music.png"
    },
    {
      title: "AI Content Generation",
      description: "Generate high-quality content across various formats and languages.",
      image: "https://cdn.dribbble.com/users/3013345/screenshots/6479008/producing_content.gif",
      icon: "https://img.icons8.com/fluency/96/content.png"
    },
    {
      title: "AI-Driven Video Editing",
      description: "Automated video editing with intelligent content analysis.",
      image: "https://nonviolentcommunity.org/wp-content/uploads/2020/09/creating_video-1-min-300x225.gif",
      icon: "https://img.icons8.com/fluency/96/video-editing.png"
    },
    {
      title: "Personalized Learning",
      description: "AI-powered adaptive learning platforms for education.",
      image: "https://nearpod.com/blog/wp-content/uploads/2022/02/time-climb.gif",
      icon: "https://img.icons8.com/fluency/96/learning.png"
    },
    {
      title: "Medical AI Assistance",
      description: "Supporting healthcare professionals with AI-powered diagnostics.",
      image: "https://analyticsindiamag.com/wp-content/uploads/2018/11/race-AI-med-banner.gif",
      icon: "https://img.icons8.com/fluency/96/medical-doctor.png"
    },
    {
      title: "Smart City Solutions",
      description: "AI-powered urban management and optimization systems.",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTc2YzllYmQ0YzQ4OTc2YzllNjM4YzM1NDY0ZWJkNGM0ODk3NmM5ZSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/077i6AULCXc0FKTj9s/giphy.gif",
      icon: "https://img.icons8.com/fluency/96/city.png"
    },
    {
      title: "Predictive Maintenance",
      description: "AI systems for equipment monitoring and maintenance prediction.",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTc2YzllMjk0YjFkNjM4YzM1NDY0ZWJkNGM0ODk3NmM5ZWJkNGM0OCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l46Cy1rHbQ92uuLXa/giphy.gif",
      icon: "https://img.icons8.com/fluency/96/maintenance.png"
    },
    {
      title: "Fraud Detection",
      description: "Advanced AI algorithms for detecting and preventing fraud.",
      image: "https://i.imgur.com/a1fyRka.gif",
      icon: "https://img.icons8.com/fluency/96/fraud.png"
    }
  ];

  return (
    <div id="solutions" className="bg-primary/50 backdrop-blur-sm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">AI Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiSolutions.map((solution, index) => (
            <SolutionCard key={index} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AISolutionsSection; 