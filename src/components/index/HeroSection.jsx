import HeroComponent from "../shared/HeroImageComponent";
import PrimaryLink from "../shared/PrimaryLink";

export default function HeroSection() {
  return (
    <HeroComponent image_url="/hero.png" height={500}>
      <div className="flex flex-col gap-4 justify-center items-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center bg-linear-gradient">
          Launch Your Broadcasting Career <br /> at Enyimba TV & Radio Academy
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-heading text-center">
          Nigeria's Premier Academy for Future Broadcasters,{" "}
          <br className="hidden md:block" /> Radio Presenters & Media
          Professionals
        </p>
        <PrimaryLink to="/schools">Explore Programs</PrimaryLink>
      </div>
    </HeroComponent>
  );
}
