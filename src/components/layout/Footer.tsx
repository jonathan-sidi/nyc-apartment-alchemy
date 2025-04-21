
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">LocaleLens</h3>
            <p className="text-sm text-gray-300">
              Finding your perfect NYC apartment using advanced semantic search technology.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-gray-300 hover:text-accent">
                  Search Apartments
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-sm text-gray-300 hover:text-accent">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/for-listers" className="text-sm text-gray-300 hover:text-accent">
                  For Apartment Listers
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-300 hover:text-accent">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact</h4>
            <address className="not-italic text-sm text-gray-300">
              <p>488 7th Avenue, Apt 4F</p>
              <p>New York, NY 10018</p>
              <p className="mt-2">charles.hu@stern.nyu.edu</p>
              <p>(212) 555-1234</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} LocaleLens. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-accent">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-gray-400 hover:text-accent">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
