import React from "react";

const Card = ({ children }: React.PropsWithChildren<object>) => {
  return <div className="mb-2 p-4 bg-white rounded-lg">{children}</div>;
};

export default Card;
