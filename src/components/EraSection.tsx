import { AuroraText } from "./magicui/aurora-text";

export default function EraSection() {
  return (
    <section className="py-6 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-[8vw] sm:text-4xl md:text-5xl font-bold leading-tight mb-2">
          From 80's and 90's
        </h2>
        <div className="text-[6vw] sm:text-xl md:text-2xl lg:text-3xl my-2">to</div>
        <AuroraText className="text-[8vw] sm:text-3xl md:text-5xl lg:text-6xl font-black leading-snug ">
          billboard 100
        </AuroraText>
      </div>
    </section>
  );
}
