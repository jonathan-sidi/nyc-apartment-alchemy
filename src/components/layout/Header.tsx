
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-primary font-heading font-bold text-xl">
                NYC Apartment Alchemy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className="text-gray-600 hover:text-accent font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-accent font-medium">
              About Us
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-accent font-medium">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-accent font-medium">
              Contact
            </Link>
            <Link to="/for-listers" className="text-gray-600 hover:text-accent font-medium">
              For Apartment Listers
            </Link>
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Register</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link
              to="/for-listers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent"
              onClick={toggleMenu}
            >
              For Apartment Listers
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/auth/login" onClick={toggleMenu}>
                  Sign In
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/auth/register" onClick={toggleMenu}>
                  Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
