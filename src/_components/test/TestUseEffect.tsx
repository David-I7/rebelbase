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
  const [state, setState] = useState<boolean>(false);

  const toggle = () => {
    setState(!state);
  };

  console.log("parent rendering");

  useEffect(() => {
    console.log("parent effect running");
  });

  return <Child toggleParent={toggle} />;
};

export default TestUseEffect;

function Child({ toggleParent }: { toggleParent: () => void }) {
  const [state, setState] = useState<boolean>(false);

  const toggle = () => {
    setState(!state);
  };

  console.log("child rendering");

  useEffect(() => {
    console.log("child effect running");
  });
  return (
    <button
      onClick={() => {
        toggle();
        toggleParent();
      }}
    >
      toggle child
    </button>
  );
}
