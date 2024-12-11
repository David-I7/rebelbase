"use client";

import useMutateQueryString from "@/hooks/useMutateQueryString";

const MutateQueryString = ({ qs }: { qs: string }) => {
  useMutateQueryString(qs);

  return null;
};

export default MutateQueryString;
