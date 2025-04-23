import HeroComponent from "../shared/HeroImageComponent";
import PrimaryLink from "../shared/PrimaryLink";

export default function HeroSection() {
  return (
    <HeroComponent image_url="/indexheroImage.jpeg" height={500}>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-7xl font-bold text-center bg-linear-gradient ">
          Master Your Craft <br /> at Enyimba Art School
        </h1>
        <p className="text-2xl text-heading text-center ">
          Africa's #1 Art School for Future Filmmakers, Sound Engineers & Visual{" "}
          <br /> Storytellers.
        </p>
        <PrimaryLink href="/courses">Explore Programs</PrimaryLink>
      </div>
    </HeroComponent>
  );
}
