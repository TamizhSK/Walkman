export default function FeaturesBanner() {
  return (
    <div className="py-2 md:py-8 bg-black text-white">
      <div className="container mx-auto px-4 lg:px-13">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-center">
          <div className="p-4">
            <p className="text-2xl md:text-3xl font-extrabold inline-block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              High Quality Music
            </p>
          </div>
          
          <div className="p-4">
            <p className="text-2xl md:text-3xl font-extrabold inline-block bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent">
              Seamless Audio
            </p>
          </div>
          
          <div className="p-4">
            <p className="text-2xl md:text-3xl font-extrabold inline-block bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Millions of Songs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}