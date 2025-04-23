import { Trophy } from "lucide-react";
import HeroSection from "../components/index/HeroSection";
import IndexSchoolSection from "../components/index/IndexSchoolSection";
import ReviewCard from "../components/index/ReviewCard";
import StudioShowCard from "../components/index/StudioShowCard";
export default function Index() {
  return (
    <main className="flex flex-col min-h-screen w-full ">
      <HeroSection />
      <IndexSchoolSection />
      <section className="flex  gap-12  py-8  px-[150px]">
        <img
          src="/indexheroImage.jpeg"
          alt="hero"
          className="w-[592px] h-[600px] rounded-lg"
        />
        <div className="flex flex-col gap-4 w-full self-center space-y-8">
          <h1 className="text-heading font-bold text-4xl">
            Why Choose Enyimba?
          </h1>
          <div className="flex flex-col gap-4">
            {/* Job Placement */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-primary-extra-light flex gap-4 items-center p-4 rounded-lg w-full"
              >
                <Trophy size={30} className="text-primary" />
                <div className="flex flex-col text-heading">
                  <p className="font-bold text-2xl">98% Job Placement</p>
                  <p className="font-normal ">Within 6 months of graduation</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-8 py-8 px-[150px] bg-secondary space-y-8">
        <h1 className="text-heading font-bold text-4xl text-center">
          Student Success Stories
        </h1>
        <div className="flex lg:flex-row flex-col  gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <ReviewCard key={index} />
          ))}
        </div>
      </section>
      <section className="px-[150px] bg-primary-light space-y-11 py-10">
        <h1 className="text-heading font-bold text-4xl ">
          Experience Our Studio
        </h1>
        <StudioShowCard />
      </section>
      <section className="px-[150px] bg-primary-light space-y-11 py-10">
        <div className="flex flex-col gap-4 rounded-2xl p-4 bg-gradient-to-r from-[#C80000] to-[#FF4500] py-10">
          <h1 className="text-white font-bold text-4xl text-center">
            Your Future in Frame. One Click Away.
          </h1>
          <div className="flex gap-4 justify-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex  justify-center items-center rounded-lg bg-white/70 px-8 py-4"
              >
                <div className="flex flex-col ">
                  <p className="text-white font-bold text-2xl">27</p>
                  <p className="text-white font-normal text-lg">Day</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-[440px] border-primary-extra-light border-2 p-4 rounded-full"
            />
            <button className="bg-white text-primary font-bold px-4 py-2 rounded-full w-[440px]">
              Lock Your Spot
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
