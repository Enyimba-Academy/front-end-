import { useState } from "react";
import {
  ArrowBigDownDash,
  ArrowDown,
  Menu,
  MoveDown,
  Settings,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import PrimaryLink from "./shared/PrimaryLink";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-primary transition-colors ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/photography"
            className={({ isActive }) =>
              `hover:text-primary transition-colors ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `hover:text-primary transition-colors ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Desktop Action Buttons */}
        {!isAuthenticated ? (
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
              Apply Now
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-4">
            <Settings className="h-6 w-6 text-heading cursor-pointer" />
            <img
              class="inline-block size-10 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <MoveDown className="h-6 w-6 text-heading cursor-pointer" />
          </div>
        )}
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-10 lg:hidden pt-20 px-4">
            <div className="flex flex-col items-center gap-6 text-heading font-semibold text-xl">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `w-full text-center py-3 hover:bg-gray-100 rounded-md ${
                    isActive ? "text-primary bg-gray-100" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/photography"
                className={({ isActive }) =>
                  `w-full text-center py-3 hover:bg-gray-100 rounded-md ${
                    isActive ? "text-primary bg-gray-100" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                Courses
              </NavLink>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  `w-full text-center py-3 hover:bg-gray-100 rounded-md ${
                    isActive ? "text-primary bg-gray-100" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                Contact
              </NavLink>
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
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
