import Slider from "../components/shared/Slider";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/camera.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Lets create Magic Together
          </h1>
          <p className="text-xl text-gray-700 max-w-md">
            How a Big Studio Became Africa's Creative Powerhouse
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Chat Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Live Chat"
                  className="h-20 w-20"
                />
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Live Chat</h3>
              <p className="text-gray-600">Chat with our AI assistant</p>
            </div>

            {/* Call Now Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Call Now"
                  className="h-20 w-20"
                />
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Call Now</h3>
              <p className="text-gray-600">+2349078647538</p>
            </div>

            {/* Visit Us Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Visit Us"
                  className="h-20 w-20"
                />
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Visit Us</h3>
              <p className="text-gray-600">Abia State</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
              Contact Us
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Your message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* The Fan Club Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12">The Fan Club</h2>

          <Slider />

          <div className="text-center mt-8">
            <p className="text-gray-700">
              Join 10k+ Creatives{" "}
              <span className="text-red-600">#EnyimbaCreates</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-primary-light">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-2">FAQs</h2>
          <p className="text-center text-gray-600 mb-12">The Director's Cut</p>

          <div className="max-w-2xl mx-auto space-y-4">
            <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
              <button className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-medium">
                  How to Audition: A Survival Guide
                </span>
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
              <button className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-medium">Equipment Access & Rules</span>
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
              <button className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-medium">Studio Booking Process</span>
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
