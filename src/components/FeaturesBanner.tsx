// components/FeaturesBanner.tsx
export default function FeaturesBanner() {
    return (
      <div className="py-8 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <p className="text-lg md:text-xl font-medium">High Quality music</p>
            <p className="text-lg md:text-xl font-medium">Seamless Audio</p>
            <p className="text-lg md:text-xl font-medium">Millions of songs</p>
          </div>
        </div>
      </div>
    );
  }