import React from "react";
import FullLogo from "../../_components/primitives/logo/FullLogo";
import FooterNav from "./FooterNav";
import FooterAccordions from "./FooterAccordions";

const Footer = () => {
  return (
    <footer className="bg-surface w-full relative">
      <div className="mx-4 md:mx-8 flex flex-col sm:flex-row mb-16 gap-4 sm:gap-28">
        <div className="flex flex-col max-w-[600px] lg:max-w-[50%] relative z-10 ">
          <FullLogo />
          <p className="font-body-s max-w-lg text-pretty mt-4">
            RebelBase serves as a hub for gaming enthusiasts, offering
            personalized recommendations, trending titles, and curated lists
            across various genres and platforms.
          </p>
        </div>
        <FooterAccordions />
        <FooterNav />
      </div>

      <p
        suppressHydrationWarning
        className="font-body-xs h-14 bg-surface-container-high text-on-surface-heading-varient grid place-content-center"
      >
        &copy; {new Date().getFullYear()} RebelBase. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
