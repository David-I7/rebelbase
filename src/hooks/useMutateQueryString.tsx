"use client";
import { useEffect } from "react";

const useMutateQueryString = (queryString: string) => {
  useEffect(() => {
    window.history.replaceState(null, "", queryString);
  }, [queryString]);
};

export default useMutateQueryString;
