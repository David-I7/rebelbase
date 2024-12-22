import React from "react";
import FullLogo from "../../_components/primitives/logo/FullLogo";
import NavBar from "./NavBar";

const Footer = () => {
  return (
    <footer className="bg-surface p-4 w-full relative">
      <div className="flex flex-col max-w-[600px] lg:max-w-[50%] relative z-10">
        <FullLogo />
        <div className="flex font-body-s mt-6 mb-16">
          <div className="flex-1 flex flex-col gap-3">
            <span className="pl-8">Search</span>
          </div>
          <div className="flex flex-col">
            <span className="pl-4">Links</span>
            <NavBar customClass="flex flex-col [@media(min-width:500px)]:flex-row" />
          </div>
        </div>
        <p
          suppressHydrationWarning
          className="font-body-xs text-on-surface-body-varient-low ml-8"
        >
          &copy; {new Date().getFullYear()} Rebelbase. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
