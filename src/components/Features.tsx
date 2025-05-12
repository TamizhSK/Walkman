import Image from 'next/image';

export default function Features() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="px-4">
        <div className="max-w-6xl mx-auto bg-white/10 border border-white/30 rounded-xl backdrop-blur-md p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image Section */}
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden mx-auto max-w-[600px] w-full">
                <Image
                  src="https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025585/img2_a5k4s1.jpg"
                  alt="Walkman device"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="md:w-1/2">
              <p className="text-xl md:text-2xl leading-relaxed">
                The Sony Walkman revolutionized the way people enjoyed music on-the-go.
                With its sleek design and compact size, music lovers could carry their entire
                music library in their pocket!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
