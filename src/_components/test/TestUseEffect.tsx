"use client";
import React, { useEffect, useState } from "react";

function useTestWindowSize() {
  const [size, setSize] = useState(false);

  const handleResize = () => {
    if (window.innerWidth > 640) {
      if (!size) setSize(true);
    } else {
      if (size) setSize(false);
    }
  };

  useEffect(() => {
    console.log("child effect running");
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return size;
}

const TestUseEffect = () => {
  const size = useTestWindowSize();

  useEffect(() => {
    console.log("parent effect running");
  }, [size]);

  return <div>TestUseEffect</div>;
};

export default TestUseEffect;
