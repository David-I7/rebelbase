import React from "react";

const AboutAccordion = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-6">
      <div className="h-60 relative overflow-hidden transition-section">
        {children}
      </div>
    </div>
  );
};

export default AboutAccordion;
