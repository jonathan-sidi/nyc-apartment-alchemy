import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Nav */}
          <div className="flex items-center space-x-10">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 text-primary font-heading font-bold text-xl">
              LocaleLens
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-accent font-medium">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-accent font-medium">About Us</Link>
              <Link to="/blog" className="text-gray-600 hover:text-accent font-medium">Blog</Link>
              <Link to="/contact" className="text-gray-600 hover:text-accent font-medium">Contact</Link>
              <Link to="/for-listers" className="text-gray-600 hover:text-accent font-medium">For Apartment Listers</Link>
            </nav>
          </div>

          {/* Right: Auth buttons (desktop only) */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Register</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
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
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["Home", "About Us", "Blog", "Contact", "For Apartment Listers"].map((text, index) => {
              const paths = ["/", "/about", "/blog", "/contact", "/for-listers"];
              return (
                <Link
                  key={text}
                  to={paths[index]}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-accent"
                  onClick={toggleMenu}
                >
                  {text}
                </Link>
              );
            })}
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" asChild className="w-full">
                <Link to="/auth/login" onClick={toggleMenu}>Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/auth/register" onClick={toggleMenu}>Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
