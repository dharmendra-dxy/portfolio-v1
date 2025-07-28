import React from "react";

const Container = ({children, classname} : {children: React.ReactNode, classname?: string}) => {
  return(
    <div className={`${classname} max-w-4xl p-8 mx-auto space-y-12`}>
        {children}
    </div>
  )
};

export default Container;
