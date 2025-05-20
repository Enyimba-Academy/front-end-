import { Trophy } from "lucide-react";
import HeroSection from "../components/index/HeroSection";

import StudioShowCard from "../components/index/StudioShowCard";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCourses, useSchools } from "../hooks/usePublic.hook";
import SCHOOLS from "../constant/school";
import { ImageUrl } from "@/api/api";

export default function Index() {
  const { data: courses, isLoading } = useCourses();
  const { data: schools, isLoading: isSchoolsLoading } = useSchools();
  const [timeLeft, setTimeLeft] = useState({
    days: 27,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  console.log(schools);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = { ...prevTime };

        if (newTime.seconds > 0) {
          newTime.seconds--;
        } else {
          newTime.seconds = 59;
          if (newTime.minutes > 0) {
            newTime.minutes--;
          } else {
            newTime.minutes = 59;
            if (newTime.hours > 0) {
              newTime.hours--;
            } else {
              newTime.hours = 23;
              if (newTime.days > 0) {
                newTime.days--;
              }
            }
          }
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen w-full">
      <HeroSection />

      {/* Programs Section */}
      <section className="py-16 bg-primary-light px-4 md:px-8 lg:px-[150px]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Schools</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {schools?.map((school, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={SCHOOLS[index] || `${ImageUrl}${school?.image}`}
                  alt={school?.name}
                  className="w-full h-48 "
                />
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-4 flex-col">
                    <h3 className="font-bold text-xl">{school?.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{school?.description}</p>
                </div>
                <div className="p-6">
                  <a
                    href={`/courses/${school?.slug}`}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 text-center block w-full"
                  >
                    View Courses
                  </a>
                </div>
              </div>
            ))}
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

      {/* <section className="flex flex-col gap-8 py-8 px-4 md:px-8 lg:px-[150px] bg-secondary space-y-8">
        <h1 className="text-heading font-bold text-3xl md:text-4xl text-center">
          Our Alumni Success Stories
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <ReviewCard key={index} />
          ))}
        </div>
      </section> */}

      <section className="px-4 md:px-8 lg:px-[150px] bg-primary-light space-y-11 py-10">
        <h1 className="text-heading font-bold text-3xl md:text-4xl">
          Our State-of-the-Art Studio
        </h1>
        <StudioShowCard />
      </section>

      <section className="px-4 md:px-8 lg:px-[150px] bg-primary-light space-y-11 py-10">
        <div className="flex flex-col gap-4 rounded-2xl p-4 bg-gradient-to-r from-[#C80000] to-[#FF4500] py-10">
          <h1 className="text-white font-bold text-3xl md:text-4xl text-center">
            Admission is Open
          </h1>
          <div className="flex gap-4 justify-center flex-wrap">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="flex flex-col items-center justify-center rounded-lg bg-white/70 px-6 py-4 min-w-[100px] transform hover:scale-105 transition-transform duration-300"
              >
                <p className="text-white font-bold text-3xl md:text-4xl animate-pulse">
                  {value.toString().padStart(2, "0")}
                </p>
                <p className="text-white font-normal text-base md:text-lg capitalize">
                  {unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
