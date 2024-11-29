import React from "react";
import Image from "next/image";
import foodImage from "../_assets/foodImage.png";

interface topicProps {
  name: string;
  correct_percentage: number;
}
const Topics = ({ title, topics }: { title: string; topics: topicProps[] }) => {
  return (
    <div className="bg-white p-3 md:w-[50%] w-full">
      <p className=" text-[#00000080] font-semibold pb-5">{title}</p>
      {topics.map((topic) => (
        <div key={topic.name} className="flex items-center gap-4">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={foodImage}
              alt={topic.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{topic.name}</p>
              <span className="text-sm text-gray-400">
                {topic.correct_percentage}% Correct
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-red-100">
              <div
                className={`h-full rounded-full ${title == "Strongest Topics" ? "bg-[linear-gradient(270deg,#2FEA9B_15.5%,#7FDD53_85.5%)]" : "bg-[linear-gradient(143deg,#FFBF1A_5.36%,#FF4080_94.64%)]"} `}
                style={{ width: `${topic.correct_percentage}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Topics;
