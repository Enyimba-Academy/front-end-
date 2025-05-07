import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, Home, User, LogOut, Bell } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function StudentNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="Enyimba Academy"
              />
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/student-dashboard"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-red-600"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/my-courses"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                My Courses
              </Link>
              <Link
                to="/student-profile"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-red-600 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/student-dashboard"
              className="flex items-center px-3 py-2 text-base font-medium text-red-600 border-l-4 border-red-600 bg-red-50"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/my-courses"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300"
            >
              <BookOpen className="w-5 h-5 mr-3" />
              My Courses
            </Link>
            <Link
              to="/student-profile"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300"
            >
              <User className="w-5 h-5 mr-3" />
              Profile
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.email}
                </div>
              </div>
              <button className="ml-auto flex-shrink-0 p-1 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
