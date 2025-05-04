import { Link } from "react-router-dom";
import PrimaryButton from "./shared/PrimaryButton";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-white border-t border-gray-200 px-4 md:px-8 lg:px-[150px] text-heading">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us Section */}
          <div>
            <div className="mb-4">
              <Link to="/">
                <img src="/logo.png" alt="Enyimba Logo" className="h-16 w-16" />
              </Link>
            </div>
            <h3 className="font-bold text-xl md:text-2xl mb-4">Contact Us</h3>
            <p className="font-normal mb-2">Enyimba TV & Radio Academy</p>
            <p className="font-normal mb-2">
              No. 7 Oron Street, Aba,
              <br />
              G.R.A
              <br />
              Abia State.
            </p>
            <p className="font-normal mb-1">Phone: (234) 123-4567</p>
            <p className="font-normal">Email: info@enyimbaacademy.com</p>

            <div className="mt-6 flex flex-col gap-4">
              <h3 className="font-bold text-xl md:text-2xl">Follow Us</h3>
              <div className="flex gap-4">
                <Link to="#" className="hover:text-primary transition-colors">
                  <Facebook size={20} />
                </Link>
                <Link to="#" className="hover:text-primary transition-colors">
                  <Twitter size={20} />
                </Link>
                <Link to="#" className="hover:text-primary transition-colors">
                  <Instagram size={20} />
                </Link>
                <Link to="#" className="hover:text-primary transition-colors">
                  <Youtube size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-bold text-xl md:text-2xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="font-normal hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="font-normal hover:text-primary transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-normal hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-normal hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs Section */}
          <div>
            <h3 className="font-bold text-xl md:text-2xl mb-4">Our Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/programs/tv-production"
                  className="font-normal hover:text-primary transition-colors"
                >
                  TV Production & Broadcasting
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/radio-broadcasting"
                  className="font-normal hover:text-primary transition-colors"
                >
                  Radio Broadcasting & Presenting
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/media-communication"
                  className="font-normal hover:text-primary transition-colors"
                >
                  Media & Communication
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/digital-content"
                  className="font-normal hover:text-primary transition-colors"
                >
                  Digital Content Creation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources and Newsletter Section */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/student-portal"
                    className="font-normal hover:text-primary transition-colors"
                  >
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/radio"
                    className="font-normal hover:text-primary transition-colors"
                  >
                    Radio Station
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tv"
                    className="font-normal hover:text-primary transition-colors"
                  >
                    TV Station
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl md:text-2xl mb-4">Newsletter</h3>
              <p className="font-normal mb-3">
                Get broadcasting tips and updates
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <PrimaryButton className="w-full">Subscribe</PrimaryButton>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Enyimba TV & Radio Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
