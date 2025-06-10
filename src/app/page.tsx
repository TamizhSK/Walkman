import Hero from '@/components/Hero'
import Features from '@/components/Features'
import EraSection from '@/components/EraSection'
import AlbumMarquee from '@/components/AlbumMarquee'
import FeaturesBanner from '@/components/FeaturesBanner'

export default function Home() {
  return (
    <>
      <Hero/>
      <Features/>
      <EraSection/>
      <AlbumMarquee/>
      <div className="container mx-auto px-4 text-center py-8">
        <p className="text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold">And there's lot more.</p>
      </div>
      <FeaturesBanner/>
    </>
  )
}