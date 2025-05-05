import { Link } from "react-router-dom";

export default function IndexSchoolSection() {
  return (
    <section className="flex bg-secondary flex-col gap-4 justify-center items-center py-8 space-y-8 px-4 md:px-8 lg:px-[150px]">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">
        Our Programs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 justify-center items-center w-full rounded-lg overflow-hidden bg-[#FFFEFE] border-[#E5E7EB] border-[1px] hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src="/indexheroImage.jpeg"
              alt="program"
              className="w-full h-[144px] object-cover"
            />
            <div className="flex flex-col gap-2 p-4 w-full">
              <h2 className="text-base md:text-lg font-bold text-primary">
                {index === 0 && "TV Production & Broadcasting"}
                {index === 1 && "Radio Broadcasting & Presenting"}
                {index === 2 && "Media & Communication"}
                {index === 3 && "Digital Content Creation"}
              </h2>
              <p className="text-sm md:text-base text-heading">
                {index === 0 &&
                  "Master the art of television production, camera operation, and live broadcasting techniques."}
                {index === 1 &&
                  "Develop your voice and presentation skills for radio broadcasting and podcasting."}
                {index === 2 &&
                  "Learn effective communication strategies and media management skills."}
                {index === 3 &&
                  "Create engaging digital content for various media platforms and social media."}
              </p>
              <Link
                to="/courses"
                className="text-primary hover:text-primary-dark text-sm md:text-base font-medium"
              >
                View Courses →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
