export default function TestimonialCard() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col ">
        {/* Profile Image - using regular img tag instead of Next Image */}
        <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
          <img
            src="/indexheroImage.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Testimonial Quote */}
        <p className="text-heading  mb-4">
          "Enyimba changed my life! Now I'm working as a cinematographer for
          major productions."
        </p>

        {/* Name */}
        <h3 className="text-primary font-bold ">Sarah Johnson</h3>

        {/* Class */}
        <p className="text-[#9CA3AF] text-sm">Class of 2024</p>
      </div>
    </div>
  );
}
