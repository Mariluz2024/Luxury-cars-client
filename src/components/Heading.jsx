import React from "react";

const Heading = () => {
  return (
    <div className="relative h-[500px] w-full">
      <img
        src="https://www.topgear.com/sites/default/files/news-listicle/image/2023/09/LEAD.jpg"
        alt="Luxury Cars"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default Heading;
