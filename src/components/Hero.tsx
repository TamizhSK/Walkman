export default function Hero() {
  return (
    <header
      id="hero"
      className="relative text-white bg-no-repeat bg-cover py-70 md:py-84 lg:py-94"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025585/img1_dximlk.jpg')`,
        backgroundPosition: 'center left',
      }}
    >
      {/* Responsive backgroundPosition override */}
      <style>
        {`
          @media (min-width: 768px) {
            #hero {
              background-position: center right !important;
            }
          }
        `}
      </style>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-35 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
          One tap<br />for all your favourite music
        </h1>
      </div>
    </header>
  );
}
