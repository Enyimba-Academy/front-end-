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

import { ROLES } from "../constant/role";

export default function NavBar({ user }) {
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-primary transition-colors ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            Home
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
        {!user ? (
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/login"
              className="text-heading font-semibold text-xl hover:text-primary transition-colors"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
            >
              Apply Now
            </Link>
          </div>
        ) : user?.role === ROLES.STUDENT ? (
          <PrimaryLink to="/student-profile">Student Dashboard</PrimaryLink>
        ) : (
          <PrimaryLink to="/admin/dashboard">Admin Dashboard</PrimaryLink>
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

              <div className="w-full pt-4">
                {user && user?.role === ROLES.STUDENT ? (
                  <PrimaryLink to="/student-profile">
                    Student Dashboard
                  </PrimaryLink>
                ) : (
                  <Link
                    to="/register"
                    className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
                    onClick={toggleMenu}
                  >
                    Apply Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
