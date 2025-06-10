// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 md:px-15 lg:px-30">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left lg:text-left">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-3xl md:text-2xl font-bold mb-1">
              Walkman<span className="inline-block w-2 h-2 ml-1 bg-amber-400 rounded-full"></span>
            </h4>
            <p className="mt-2 text-gray-300">Feel the Rhythm.</p>
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://www.facebook.com" 
                aria-label="Facebook" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a 
                href="https://x.com" 
                aria-label="Twitter" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a 
                href="https://instagram.com" 
                aria-label="Instagram" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#hero" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/profile" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link 
                  href="#hero" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Languages
                </Link>
              </li>
              <li>
                <Link 
                  href="#hero" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Devices
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Discover</h5>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#hero" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Podcasts
                </Link>
              </li>
              <li>
                <Link 
                  href="/library" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Playlists
                </Link>
              </li>
              <li>
                <Link 
                  href="#hero" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Audiobooks
                </Link>
              </li>
              <li>
                <Link 
                  href="#hero" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Liked Songs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Support</h5>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/profile" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link 
                  href="#hero" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="#hero" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Privacy & Social
                </Link>
              </li>
              <li>
                <Link 
                  href="#hero" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Explicit Content
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 Walkman. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link 
                href="#hero" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="#hero" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}