// components/Features.tsx
import Image from 'next/image';

export default function Features() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden">
              <Image 
                src="/home/img2.jpg" 
                alt="Walkman device" 
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <p className="text-xl md:text-2xl leading-relaxed">
              The Sony Walkman revolutionized the way people enjoyed music on-the-go.
              With its sleek design and compact size, music lovers could carry their entire
              music library in their pocket!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}