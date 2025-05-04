import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="px-4 md:px-8 lg:px-[150px] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Enyimba TV & Radio Academy</h3>
            <p className="text-sm text-white/80">
              Nigeria's Premier Academy for Future Broadcasters, Radio
              Presenters & Media Professionals
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-primary-light transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-primary-light transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-primary-light transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-primary-light transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary-light transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="hover:text-primary-light transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary-light transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary-light transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Our Programs</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  to="/courses/tv-production"
                  className="hover:text-primary-light transition-colors"
                >
                  TV Production & Broadcasting
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/radio-broadcasting"
                  className="hover:text-primary-light transition-colors"
                >
                  Radio Broadcasting & Presenting
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/media-communication"
                  className="hover:text-primary-light transition-colors"
                >
                  Media & Communication
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/digital-content"
                  className="hover:text-primary-light transition-colors"
                >
                  Digital Content Creation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a
                  href="tel:+2341234567890"
                  className="hover:text-primary-light transition-colors"
                >
                  +234 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a
                  href="mailto:info@enyimbaacademy.com"
                  className="hover:text-primary-light transition-colors"
                >
                  info@enyimbaacademy.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>123 Broadcasting Street, Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Enyimba TV & Radio Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
