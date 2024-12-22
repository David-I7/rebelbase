import Logo from "./Logo";
import LogoType from "./LogoType";

type FullLogoProps = {
  responsive?: boolean;
  style?: React.CSSProperties;
};

const FullLogo = ({ responsive = false, style }: FullLogoProps) => {
  const consitionalStyles = responsive ? "hidden lg:flex" : "flex";

  return (
    <div style={style} className={`${consitionalStyles} items-center gap-2`}>
      <Logo />
      <LogoType />
    </div>
  );
};

export default FullLogo;
