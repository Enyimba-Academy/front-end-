import { Link } from "react-router-dom";
import PrimaryButton from "./shared/PrimaryButton";
export default function Footer() {
  return (
    <footer className="w-full py-8 bg-white border-t border-gray-200 px-[150px] text-heading">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Us Section */}
          <div>
            <div className="mb-4">
              <Link href="/">
                <img src="/logo.png" alt="Enyimba Logo" className="h-16 w-16" />
              </Link>
            </div>
            <h3 className=" font-bold text-2xl mb-4">Contact Us</h3>
            <p className=" font-normal mb-2">
              Enyimba Television Radio and Limited
            </p>
            <p className="font-normal mb-2">
              No. 7 Oron Street, Aba,
              <br />
              G.R.A
              <br />
              Abia State.
            </p>
            <p className="font-normal mb-1">Phone: (234) 123-4567</p>
            <p className="font-normal">Email: info@enyimba.edu</p>

            <div className="mt-6 flex gap-4 items-center ">
              <h3 className="font-bold text-2xl mb-3">Follow Us</h3>
              <div className="flex space-x-4 items-center">
                <Link to="#" className=" hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link to="#" className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link to="#" className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-youtube"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-bold text-2xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="font-normal hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" className="font-normal hover:text-gray-900">
                  Schools
                </Link>
              </li>
              <li>
                <Link to="#" className="font-normal hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="font-normal hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Schools Section */}
          <div>
            <h3 className="font-bold text-2xl mb-4">Schools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="font-normal hover:text-gray-900">
                  Cinematography
                </Link>
              </li>
              <li>
                <Link to="#" className="font-normal hover:text-gray-900">
                  Sound Engineering
                </Link>
              </li>
              <li>
                <Link to="#" className="font-normal hover:text-gray-900">
                  Visual Effects
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources and Newsletter Section */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-2xl mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="font-normal hover:text-gray-900">
                    Student Portal
                  </Link>
                </li>
                <li>
                  <Link to="#" className="font-normal hover:text-gray-900">
                    Radio website
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-4">Newsletter</h3>
              <p className="font-normal mb-3">Get free filmmaking tips</p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <PrimaryButton className="w-full">Subscribe</PrimaryButton>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            {new Date().getFullYear()} Enyimba. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
