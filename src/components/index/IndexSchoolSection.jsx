import { Link } from "react-router";

export default function IndexSchoolSection() {
  return (
    <section className="flex bg-secondary flex-col gap-4 justify-center items-center py-8 space-y-8">
      <h1 className="text-3xl font-bold text-primary">Schools</h1>
      <div className="flex gap-8 justify-center items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 justify-center items-center w-[240px] rounded-lg  overflow-hidden bg-[#FFFEFE] border-[#E5E7EB] border-[1px]"
          >
            <img
              src="/indexheroImage.jpeg"
              alt="school"
              className="w-full h-[144px] object-cover"
            />
            <div className="flex flex-col gap-2 p-4">
              <h2 className="text-[18px] font-bold text-primary">
                Photography & Cinematography
              </h2>
              <p className="text-[12px] text-heading">
                Learn the art of photography and cinematography from the best in
                the industry.
              </p>
              <Link href="/courses"> view courses -&gt;</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
