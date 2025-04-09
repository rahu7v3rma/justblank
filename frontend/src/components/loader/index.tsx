"use client";

import { memo, useContext } from "react";
import { LoaderContext } from "@/context/loader";
import Heading from "../heading";

const Loader = memo(() => {
  const { isOpen, loaderMessage } = useContext(LoaderContext);

  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center h-screen absolute z-50 top-0 left-0 w-full bg-white/50">
      <div className="flex flex-col gap-2 items-center bg-white">
        {loaderMessage && <Heading type="h3">{loaderMessage}</Heading>}
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin !opacity-100"></div>
      </div>
    </div>
  );
});

export default Loader;
