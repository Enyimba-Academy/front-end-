import PropTypes from "prop-types";

export default function HeroComponent({
  image_url,
  children,
  height,
  onClick,
}) {
  return (
    <div className="relative w-full px-5" onClick={onClick}>
      <div className="w-full" style={{ height: `${height}px` }}>
        <img
          src={image_url}
          alt="team"
          className="w-full h-full object-fill"
          style={{ height: `${height}px` }}
        />
      </div>

      <div className="absolute inset-0 flex flex-col gap-4 md:gap-6 p-4 md:p-0 bg-primary-light/75 rounded-lg text-white">
        <div className="pl-4 md:pl-[96px] pt-4 md:pt-[50px]">{children}</div>
      </div>
    </div>
  );
}

HeroComponent.propTypes = {
  image_url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
};

HeroComponent.defaultProps = {
  height: "500",
};
