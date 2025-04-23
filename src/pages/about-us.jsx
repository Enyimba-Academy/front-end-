import HeroComponent from "../components/shared/HeroImageComponent";
import PrimaryLink from "../components/shared/PrimaryLink";
import Slider from "../components/shared/Slider";

export default function AboutUs() {
  return (
    <div>
      <HeroComponent image_url={"/abouthero.jpeg"}>
        <div className="flex flex-col gap-4 pl-[40px]">
          <h1 className="text-heading text-7xl font-bold">
            From Passion to Legacy
          </h1>
          <p className="text-body text-3xl text-heading">
            How a Big Studio Became Africa's Creative <br />
            Powerhouse
          </p>
        </div>
      </HeroComponent>
      <main className="">
        {/* Quote Section */}
        <section className="py-12 px-[50px] lg:px-[150px] text-center text-heading">
          <div className="max-w-3xl mx-auto ">
            <h2 className="text-3xl font-bold mb-4 flex justify-center">
              <span className="text-5xl leading-none">"</span>
            </h2>
            <p className="text-2xl md:text-xl  mb-4">
              The creative industry isn't about what you know, it's about how
              you learn and how fast you adapt. We're not teaching you theory,
              we're teaching you how to create.
            </p>
            <p className=" italic">- Idris Elba</p>
          </div>
        </section>

        {/* Profile Section */}
        <section className="py-10 md:py-16 px-[50px] lg:px-[150px] text-heading bg-secondary">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=300&width=300"
                alt="Idris M. Boggle with camera"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Idris M. Boggle
              </h2>
              <p className=" mb-4">
                I've been a creative for over 15 years now. In that time I've
                worked with some of the biggest brands in the world. I've
                directed commercials, music videos, and even a feature film. But
                my true calling is teaching others how to find their creative
                voice.
              </p>
              <p className=" mb-6">
                At our school, we don't just teach you theory. We show you how
                to create, how to think, and most importantly, how to adapt to
                an ever-changing creative landscape.
              </p>
              <button className="inline-flex items-center text-red-600 font-medium">
                <span className="mr-2">Learn more about Idris</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Management Section */}
        <section className="py-10 md:py-16 px-[50px] lg:px-[150px] text-heading">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            The Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Management Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=100&width=100"
                alt="David Anderson"
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-red-600 mb-1">
                David Anderson
              </h3>
              <p className="text-sm">CEO</p>
            </div>

            {/* Management Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=100&width=100"
                alt="Sarah Owusu"
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-red-600 mb-1">
                Sarah Owusu
              </h3>
              <p className="text-gray-500 text-sm">Head of Design</p>
            </div>

            {/* Management Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=100&width=100"
                alt="Michael Chen"
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-red-600 mb-1">
                Michael Chen
              </h3>
              <p className="text-gray-500 text-sm">Creative Director</p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-10 md:py-16  -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-[150px]">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Value 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                  <path d="M9 18h6"></path>
                  <path d="M10 22h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Courage</h3>
              <p className="text-gray-600">
                Daring to push boundaries and take creative risks
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Constantly evolving and embracing new ideas
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Building supportive networks for creative growth
              </p>
            </div>
          </div>
        </section>

        {/* We Don't Teach Art Section */}
        <section className="py-10 md:py-16 px-[50px] lg:px-[150px] text-heading  bg-primary-light">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                We Don't Teach Art.
                <br />
                We Unleash It.
              </h2>
              <p className="text-gray-700 mb-6">
                Our approach is different. We don't believe in rigid structures
                and outdated methodologies. We believe in unlocking your
                potential and giving you the tools to express yourself in ways
                you never thought possible.
              </p>
              <PrimaryLink href="/pricing">Explore Programs</PrimaryLink>
            </div>
            <div className="w-full md:w-1/2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=400&width=500"
                alt="Art studio space"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Student Spotlight Section */}
        <section className="py-10 md:py-16 text-heading">
          <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center">
            Student Spotlight
          </h2>
          <Slider />
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 text-center bg-primary-light text-heading">
          <h2 className="text-5xl md:text-4xl font-bold mb-4">
            Your Story Starts Here
          </h2>
          <p className="text-2xl  mb-6 max-w-2xl mx-auto">
            Apply Now • Fall 2025 Applications Closing Soon
          </p>
          <PrimaryLink href="/apply">Start Now</PrimaryLink>
        </section>
      </main>
    </div>
  );
}
