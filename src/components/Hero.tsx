export default function Hero() {
  return (
    <header
      className="relative text-white py-16 md:py-54 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025585/img1_dximlk.jpg')`,
      }}
    >
      {/* Gradient overlay at bottom only */}
      <div className="absolute bottom-0 left-0 right-0 h-35 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          One tap<br />for all your favourite music
        </h1>
      </div>
    </header>
  );
}
