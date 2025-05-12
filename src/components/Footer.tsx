// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              Walkman<span className="inline-block w-2 h-2 ml-1 bg-orange-500 rounded-full"></span>
            </h4>
            <p className="mt-2 text-gray-300">Your gateway to high-quality music and podcasts.</p>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.facebook.com/Spotify/" aria-label="Facebook" className="text-gray-300 hover:text-white">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/Spotify/" aria-label="Twitter" className="text-gray-300 hover:text-white">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="https://instagram.com/Spotify/" aria-label="Instagram" className="text-gray-300 hover:text-white">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white">About</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">My Profile</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Languages</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Devices</Link></li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Discover</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white">Podcasts</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Playlists</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Audiobooks</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Liked Songs</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Support</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white">Account</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Plans & Pricing</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Privacy & Social</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Explicit Content</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2023 Walkman. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              <Link href="#" className="text-gray-300 hover:text-white">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}