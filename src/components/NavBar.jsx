import { useState } from "react";
import {
  ArrowBigDownDash,
  ArrowDown,
  Menu,
  MoveDown,
  Settings,
  X,
  User,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PrimaryLink from "./shared/PrimaryLink";

import { ROLES } from "../constant/role";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

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
            to="/schools"
            className={({ isActive }) =>
              `hover:text-primary transition-colors ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            Schools
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
        ) : (
          <div className="hidden lg:flex items-center gap-4">
            {user?.role === ROLES.STUDENT ? (
              <PrimaryLink
                to="/student-profile"
                className="flex items-center gap-2"
              >
                <User size={20} />
                Student Dashboard
              </PrimaryLink>
            ) : (
              <PrimaryLink
                to="/admin/dashboard"
                className="flex items-center gap-2"
              >
                <User size={20} />
                Admin Dashboard
              </PrimaryLink>
            )}
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
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
                to="/schools"
                className={({ isActive }) =>
                  `w-full text-center py-3 hover:bg-gray-100 rounded-md ${
                    isActive ? "text-primary bg-gray-100" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                Schools
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
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center py-3 hover:bg-gray-100 rounded-md"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center py-3 bg-red-600 text-white hover:bg-red-700 rounded-md"
                    onClick={toggleMenu}
                  >
                    Apply Now
                  </Link>
                </>
              ) : (
                <>
                  {user?.role === ROLES.STUDENT ? (
                    <PrimaryLink
                      to="/student-profile"
                      className="w-full text-center py-3 hover:bg-gray-100 rounded-md"
                      onClick={toggleMenu}
                    >
                      Student Dashboard
                    </PrimaryLink>
                  ) : (
                    <PrimaryLink
                      to="/admin/dashboard"
                      className="w-full text-center py-3 hover:bg-gray-100 rounded-md"
                      onClick={toggleMenu}
                    >
                      Admin Dashboard
                    </PrimaryLink>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="w-full text-center py-3 text-red-600 hover:bg-red-50 rounded-md font-semibold"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
