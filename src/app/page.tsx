
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import EraSection from '@/components/EraSection'
import AlbumMarquee from '@/components/AlbumMarquee'
import FeaturesBanner from '@/components/FeaturesBanner'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <EraSection />
      <AlbumMarquee />
      <div className="container mx-auto px-4 text-center py-8">
        <p className="text-2xl font-bold">And there's lot more.</p>
      </div>
      <FeaturesBanner />
    </>
  )
}