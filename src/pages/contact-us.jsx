import Slider from "../components/shared/Slider";
import { useState } from "react";
import { MessageCircle, Phone, MapPin } from "lucide-react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I apply for the broadcasting courses?",
      answer:
        "You can apply for our broadcasting courses by visiting our website and clicking on the 'Enroll Now' button. You'll need to fill out an application form and submit the required documents. Our admissions team will review your application and get back to you within 48 hours.",
    },
    {
      question: "What are the prerequisites for joining the courses?",
      answer:
        "For the Beginner Certificate, no prior experience is required. For Intermediate and Advanced courses, you'll need to complete the previous level or demonstrate equivalent experience. All applicants should have a passion for broadcasting and media.",
    },
    {
      question: "What equipment do I need for the courses?",
      answer:
        "For the Beginner Certificate, we provide all necessary equipment during class sessions. For Intermediate and Advanced levels, we recommend having a basic recording device (smartphone or camera) for practice outside class. Our studio facilities are available for student use during designated hours.",
    },
    {
      question: "What is the class schedule like?",
      answer:
        "Our courses are designed to be flexible. Beginner Certificate runs for 1 month with classes 3 times a week. Intermediate Certificate is 2 months with 4 classes per week. Advanced Certificate is 4 months with 5 classes per week. We offer both morning and evening sessions to accommodate different schedules.",
    },
    {
      question: "Do you offer financial aid or payment plans?",
      answer:
        "Yes, we offer flexible payment plans for all our courses. You can pay in installments over the duration of your course. We also have a limited number of scholarships available for exceptional candidates. Contact our admissions office for more details.",
    },
    {
      question: "What kind of certification will I receive?",
      answer:
        "Upon successful completion of each course, you'll receive a professional certificate from Enyimba TV & Radio Academy. Our certificates are recognized by major broadcasting organizations in Nigeria and can help you secure positions in the industry.",
    },
    {
      question: "Do you offer job placement assistance?",
      answer:
        "Yes, we have a dedicated career services team that helps our graduates find opportunities in the broadcasting industry. We maintain partnerships with various media organizations and regularly host job fairs and networking events.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative w-full min-h-[500px] h-[70vh] bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Lets create Magic Together
          </h1>
          <p className="text-xl text-white max-w-md">
            How a Big Studio Became Africa's Creative Powerhouse
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Chat Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <MessageCircle className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Live Chat</h3>
              <p className="text-gray-600">Chat with our AI assistant</p>
            </div>

            {/* Call Now Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Phone className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Call Now</h3>
              <p className="text-gray-600">+2349078647538</p>
            </div>

            {/* Visit Us Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-red-600" />
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
      {/* <section className="py-16 bg-white">
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
      </section> */}

      {/* FAQs Section */}
      <section className="py-16 bg-primary-light">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-2">FAQs</h2>
          <p className="text-center text-gray-600 mb-12">The Director's Cut</p>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md overflow-hidden bg-white"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-red-600 transform transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
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
                {openFaq === index && (
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
