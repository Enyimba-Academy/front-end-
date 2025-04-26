import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import PrimaryLink from "./shared/PrimaryLink";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b border-b-gray-200">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[150px] py-3 relative">
        {/* Logo */}
        <div className="w-12 h-12 sm:w-16 sm:h-16">
          <Link to="/">
            <img src="/logo.png" alt="logo" className="w-full h-full" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-20"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-heading" />
          ) : (
            <Menu className="h-6 w-6 text-heading" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 text-heading font-semibold text-xl">
          <Link to="/" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/schools" className="hover:text-primary transition-colors">
            Schools
          </Link>
          <Link
            to="/contact-us"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="text-heading font-semibold text-xl hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-heading font-semibold text-xl hover:text-primary transition-colors"
          >
            Sign up
          </Link>
          <Link
            to="/onboarding"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
          >
            Enroll Now
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-10 lg:hidden pt-20 px-4">
            <div className="flex flex-col items-center gap-6 text-heading font-semibold text-xl">
              <Link
                to="/"
                className="w-full text-center py-3 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className="w-full text-center py-3 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="w-full text-center py-3 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="w-full h-px bg-gray-200 my-2"></div>
              <Link
                to="/login"
                className="w-full text-center py-3 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-3 hover:bg-gray-100 rounded-md"
                onClick={toggleMenu}
              >
                Sign up
              </Link>
              <div className="w-full pt-4">
                <Link
                  to="/onboarding"
                  className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
                  onClick={toggleMenu}
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
