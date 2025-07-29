import React from "react";

const Badge = ({url, title}: {url: string, title:string}) => {
  return(
    <span className="inline-flex items-center gap-2 rounded-md bg-zinc-800 px-2 py-0.5 text-white font-medium border border-zinc-700 hover:bg-zinc-700/70 duration-100 transition-colors cursor-pointer text-sm md:text-base">
    {url && <img src={url} alt={title} className="h-4 w-4" /> }
    {title}
  </span>
  );
};

export default Badge;
