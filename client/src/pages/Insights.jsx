import React from "react";
import city from "../assets/city.png";

const Stats = () => {
  return (
    <div className="px-20 py-10">
      <div className="grid lg:grid-flow-col text-center gap-8">
        <div className="relative h-[200px] flex items-center justify-center border shadow-md p-4">
          <div
            style={{
              backgroundImage: `url(${city})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: "0.5",
            }}
            className="absolute inset-0"
          />
          <div className="relative z-10 text-red-600">
            <p className="text-2xl">Unresolved</p>
            <p className="text-6xl">10</p>
          </div>
        </div>
        <div className="relative h-[200px] flex items-center justify-center border shadow-md p-4">
          <div
            style={{
              backgroundImage: `url(${city})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: "0.5",
            }}
            className="absolute inset-0"
          />
          <div className="relative z-10 text-green-600">
            <p className="text-2xl">Resolved</p>
            <p className="text-6xl">23</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
