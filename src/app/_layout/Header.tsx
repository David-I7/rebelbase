import LogoType from "../../_components/logo/LogoType";
import FullLogo from "../../_components/logo/FullLogo";
import NavBar from "./NavBar";
import FullScreenDialogMenu from "./menu/FullScreenDialogMenu";
import FullScreenDialogSearch from "./FullScreenDialogSearch";
import { SearchContextProvider } from "./context/SearchContext";

const Header = () => {
  return (
    <header className="flex relative items-center justify-between  md:justify-normal h-20 px-4 lg:px-8 bg-surface">
      <div className="md:flex-initial">
        <LogoType responsive={true} />
        <FullLogo responsive={true} />
      </div>
      <div className="-order-1 sm:order-none sm:flex-1 flex justify-end">
        <FullScreenDialogMenu />
        <div className="hidden sm:block">
          <NavBar customClass="flex items-center" />
        </div>
      </div>
      <SearchContextProvider>
        <FullScreenDialogSearch />
      </SearchContextProvider>
    </header>
  );
};

export default Header;
