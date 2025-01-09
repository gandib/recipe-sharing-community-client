"use client";

import Image from "next/image";

const HomePageTimeCard = () => {
  const date = new Date().toDateString().split(" ");
  return (
    <div className="w-full h-[300px] sticky top-20">
      <Image
        src={"/assests/nature.jpg"}
        width={500}
        height={500}
        alt="Time with nature"
        className="h-full rounded opacity-20"
      />
      {/* <div className="bg-gray-700 w-full h-[300px] mt-[-300px] rounded-lg opacity-70"></div> */}
      <div className=" w-full h-[300px] mt-[-300px] flex flex-col justify-center items-center">
        <p className="text-secondary-600 text-4xl font-bold pb-4">
          {new Date().getHours()}:
          {new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : new Date().getMinutes()}
        </p>
        <p className="text-2xl font-bold py-2">
          {date[0]}, {date[1]} {date[2]}
        </p>
        <p className="text-2xl font-bold">{date[3]}</p>
      </div>
    </div>
  );
};

export default HomePageTimeCard;
