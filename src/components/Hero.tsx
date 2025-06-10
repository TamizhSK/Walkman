"use client";
import { TextAnimate } from '../components/magicui/text-animate';

export default function Hero() {
  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header
      id="hero"
      className="relative text-white bg-no-repeat bg-cover py-70 md:py-84 lg:py-94"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025585/img1_dximlk.jpg')`,
        backgroundPosition: 'center left',
      }}
    >
      {/* Use CSS module or Tailwind instead of styled-jsx */}
      <style jsx>{`
        @media (min-width: 768px) {
          #hero {
            background-position: center right !important;
          }
        }
      `}</style>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-35 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-center">
        <div 
          onClick={handleScrollToFeatures}
          className="cursor-pointer"
        >
          <TextAnimate
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
            animation="blurInUp"
            by="word"
            delay={0.2}
            duration={0.8}
          >
            One tap
for all your favourite music
          </TextAnimate>
        </div>
      </div>
    </header>
  );
}
