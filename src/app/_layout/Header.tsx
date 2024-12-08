import { MdSearch, MdMenu } from "react-icons/md";
import LogoType from "../../_components/logo/LogoType";
import FullLogo from "../../_components/logo/FullLogo";
import IconTarget from "../../_components/buttons/IconTarget";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import FullScreenDialogMenu from "./menu/FullScreenDialogMenu";

const Header = () => {
  return (
    <header className="flex relative items-center justify-between  md:justify-between h-20 px-4 lg:px-8 bg-surface">
      <div className="md:flex-initial">
        <LogoType responsive={true} />
        <FullLogo responsive={true} />
      </div>
      <div className="-order-1 sm:order-2">
        <FullScreenDialogMenu />
        <NavBar customClass="flex items-center" responsive={true} />
      </div>
      <div className="sm:flex-1 max-w-[600px]">
        <IconTarget customClass="text-on-surface-heading-varient ml-4 sm:hidden rounded-full hover:bg-surface-container-normal transition-colors">
          <MdSearch size={24} />
        </IconTarget>
        <SearchBar responsive={true} />
      </div>
    </header>
  );
};

export default Header;
