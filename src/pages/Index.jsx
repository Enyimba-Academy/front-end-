import { Trophy } from "lucide-react";
import HeroSection from "../components/index/HeroSection";
import ReviewCard from "../components/index/ReviewCard";
import StudioShowCard from "../components/index/StudioShowCard";

export default function Index() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      <HeroSection />

      {/* Programs Section */}
      <section className="py-16 bg-primary-light px-4 md:px-8 lg:px-[150px]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Courses</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="/pick.png"
                alt="Professional Photography"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">
                    Professional Photography
                  </h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4">
                  Master the art of professional photography with
                  industry-standard equipment and techniques.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/course"
                    className="text-red-600 font-medium hover:underline"
                  >
                    Learn more
                  </a>
                  <span className="text-sm text-gray-500">12 weeks</span>
                </div>
              </div>
              <div className="p-6 flex justify-between">
                <a
                  href="/course"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Enroll Now
                </a>
                <a
                  href="/course"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Download Syllabus
                </a>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="/pick2.png"
                alt="Cinematography"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">Cinematography</h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4">
                  Learn the art of visual storytelling through motion
                  picturesBroadcasting Certificate and advanced filming
                  techniques.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/course"
                    className="text-red-600 font-medium hover:underline"
                  >
                    Learn more
                  </a>
                  <span className="text-sm text-gray-500">16 weeks</span>
                </div>
              </div>
              <div className="p-6 flex justify-between">
                <a
                  href="/course"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Enroll Now
                </a>
                <a
                  href="/course"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Download Syllabus
                </a>
              </div>
            </div>

            {/* Course 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="/pick3.jpg"
                alt="Broadcasting Certificate"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">
                    Broadcasting Certificate
                  </h3>
                  <div className="w-3 h-3 rounded-full bg-red-600"></div>
                </div>
                <p className="text-gray-600 mb-4">
                  Build practical broadcasting skills and media literacy for
                  aspiring professionals and media enthusiasts.
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/course"
                    className="text-red-600 font-medium hover:underline"
                  >
                    Learn more
                  </a>
                  <span className="text-sm text-gray-500">1-4 months</span>
                </div>
              </div>
              <div className="p-6 flex justify-between">
                <a
                  href="/course"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Enroll Now
                </a>
                <a
                  href="/course"
                  className="text-gray-700 px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Download Syllabus
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-12 py-8 px-4 md:px-8 lg:px-[150px]">
        <img
          src="/hero.png"
          alt="hero"
          className="w-full lg:w-[592px] h-[400px] lg:h-[600px] rounded-lg object-cover"
        />
        <div className="flex flex-col gap-4 w-full self-center space-y-8">
          <h1 className="text-heading font-bold text-3xl md:text-4xl">
            Why Choose Enyimba TV & Radio Academy?
          </h1>
          <div className="flex flex-col gap-4">
            {/* Features */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-primary-extra-light flex gap-4 items-center p-4 rounded-lg w-full"
              >
                <Trophy size={30} className="text-primary" />
                <div className="flex flex-col text-heading">
                  <p className="font-bold text-xl md:text-2xl">
                    Professional Training
                  </p>
                  <p className="font-normal">
                    Hands-on experience with industry-standard equipment
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 py-8 px-4 md:px-8 lg:px-[150px] bg-secondary space-y-8">
        <h1 className="text-heading font-bold text-3xl md:text-4xl text-center">
          Our Alumni Success Stories
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <ReviewCard key={index} />
          ))}
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-[150px] bg-primary-light space-y-11 py-10">
        <h1 className="text-heading font-bold text-3xl md:text-4xl">
          Our State-of-the-Art Studio
        </h1>
        <StudioShowCard />
      </section>

      <section className="px-4 md:px-8 lg:px-[150px] bg-primary-light space-y-11 py-10">
        <div className="flex flex-col gap-4 rounded-2xl p-4 bg-gradient-to-r from-[#C80000] to-[#FF4500] py-10">
          <h1 className="text-white font-bold text-3xl md:text-4xl text-center">
            Start Your Broadcasting Journey Today
          </h1>
          <div className="flex gap-4 justify-center flex-wrap">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex justify-center items-center rounded-lg bg-white/70 px-4 md:px-8 py-4"
              >
                <div className="flex flex-col">
                  <p className="text-white font-bold text-xl md:text-2xl">27</p>
                  <p className="text-white font-normal text-base md:text-lg">
                    Day
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full md:w-[440px] border-primary-extra-light border-2 p-4 rounded-full"
            />
            <button className="bg-white text-primary font-bold px-4 py-2 rounded-full w-full md:w-[440px]">
              Enroll Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
