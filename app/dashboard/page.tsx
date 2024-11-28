"use client";

import React, { useEffect, useState } from "react";
import SideBar from "./_components/Sidebar";
import Image from "next/image";
import downloadSvg from "../dashboard/_assets/Download.svg";
import ArrowDown from "../dashboard/_assets/ArrowDown.svg";
import cross from "../dashboard/_assets/cross.svg";
import search from "../dashboard/_assets/search_24px.svg";
import graph from "../dashboard/_assets/Graph.svg";
import ActivityGraph from "./_components/ActivityGraph";
import foodImage from "../dashboard/_assets/foodImage.png";

type People = {
  "All Users": string[];
  Managers: string[];
  Trainiers: string[];
};

type GroupNames = keyof People;

interface Metrics {
  active_users: {
    current: number;
    total: number;
  };
  questions_answered: number;
  average_session_length_seconds: number;
  starting_knowledge_percentage: number;
  current_knowledge_percentage: number;
}

interface MonthlyActivity {
  month: string;
  value: number;
}

interface Activity {
  monthly: MonthlyActivity[];
}

interface Topic {
  name: string;
  image: string;
  correct_percentage: number;
}

interface Topics {
  weakest: Topic[];
  strongest: Topic[];
}

interface UserLeaderboardEntry {
  name: string;
  image: string;
  points: number;
  accuracy_percentage: number;
  previous_accuracy_percentage: number;
}

interface GroupLeaderboardEntry {
  group_name: string;
  points_per_user: number;
  accuracy_percentage: number;
  previous_accuracy_percentage: number;
}

interface Data {
  metrics: Metrics;
  activity: Activity;
  topics: Topics;
  user_leaderboard: UserLeaderboardEntry[];
  groups_leaderboard: GroupLeaderboardEntry[];
  api_secret: string;
}

const DashboardPage = () => {
  const [timeFrame, setTimeFrame] = useState("This Month");
  const time = ["Last 7 Days", "This Month", "This Year", "Custom"];
  const [timeFrameVisible, setTimeFrameVisible] = useState(false);
  const [peopleVisible, setPeopleVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupNames>("All Users");
  const [data, setData] = useState<Partial<Data>>({});
  const people: People = {
    "All Users": [
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Eve",
      "Frank",
      "Grace",
      "Hannah",
      "Ivy",
      "Jack",
      "Kate",
    ],
    Managers: ["Alice", "David", "Grace", "Jack"],
    Trainiers: ["Bob", "Charlie", "Hannah", "Ivy"],
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      const response = await fetch("/api/data");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="sidebar w-[20%]">
          <SideBar />
        </div>

        <div className="main_components w-[80%] bg-[#F9F9F9] p-5">
          <div className="flex items-center justify-between p-6 border-b border-[#0000001A]">
            <p className="font-bold text-2xl">Reports</p>
            <div className="cursor-pointer flex items-center gap-1">
              <Image src={downloadSvg} alt="download" />
              <p className="text-[#4D4D4D] text-sm font-semibold">Download</p>
            </div>
          </div>

          <div className="dataModification_Options md:flex w-full md:gap-4 mt-5">
            {/* TimeFrame */}
            <div className="bg-white rounded-xl p-3 w-full h-fit">
              <div className="border-b border-[#0000001A] flex items-center justify-between pb-3">
                <p>
                  Timeframe: <span className="font-bold">{timeFrame}</span>
                </p>
                <Image
                  src={ArrowDown}
                  alt="arrow"
                  onClick={() => setTimeFrameVisible(!timeFrameVisible)}
                  className="cursor-pointer"
                />
              </div>

              {/* Animated dropdown with smooth transition */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  timeFrameVisible
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3 p-2 cursor-pointer">
                  {time.map((item, index) => (
                    <p
                      key={index}
                      className={`font-mono ${
                        timeFrame === item
                          ? "bg-[#F2F7FF] rounded-lg p-2 font-bold"
                          : "p-2"
                      }`}
                      onClick={() => {
                        setTimeFrame(item);
                        setTimeFrameVisible(false);
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {/* TimeFrame */}

            {/* People */}
            <div className="bg-[#FFFFFF] rounded-xl p-3 w-full">
              <div className="border-b border-[#0000001A] flex items-center justify-between pb-3">
                <p>
                  People: <span className="font-bold">{timeFrame}</span>
                </p>
                <p
                  className="text-[#000000B2] font-medium cursor-pointer"
                  onClick={() => setPeopleVisible(!peopleVisible)}
                >
                  clear
                </p>
              </div>

              {peopleVisible && (
                <div className="selected_group_people p-2">
                  <div className="bg-[#F0F0F0] rounded-xl py-1 px-2 flex items-center gap-2 w-fit">
                    <p className="font-bold">Managers</p>
                    <Image src={cross} alt="cross" />
                  </div>

                  <div className="serach p-3 flex items-center">
                    <Image src={search} alt="search" />
                    <input
                      type="text"
                      placeholder="search"
                      className="border-b border-[#0000001A] p-2 w-full outline-none"
                    />
                  </div>
                  <div className="group_name pb-4">
                    <p className="uppercase text-[#00000033] font-bold text-xs">
                      Groups
                    </p>
                    {(Object.keys(people) as Array<keyof People>).map(
                      (name) => (
                        <div
                          key={name}
                          className="flex items-center gap-2"
                          onClick={() => setSelectedGroup(name as GroupNames)}
                        >
                          <p className="border-[2px] border-[#00000033] w-5 h-5 rounded-full"></p>
                          <p className="font-bold">{name}</p>
                          <p className="text-[#00000033]">
                            {people[name].length}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                  <div className="user_name pt-3 border-t border-[#00000033] h-32 overflow-y-auto">
                    <p className=" uppercase text-[#00000033] font-bold text-xs pb-2">
                      users
                    </p>
                    {people[selectedGroup].map((item) => (
                      <div className=" flex items-center gap-2 pb-2">
                        <p className="border-[2px] border-[#00000033] w-5 h-5 rounded-full"></p>
                        <p key={item}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* People */}

            {/* Topic */}
            <div className=" bg-[#FFFFFF] rounded-xl p-3 w-full h-fit">
              <div className=" flex items-center justify-between">
                <p>
                  Topic: <span className=" font-bold">All</span>
                </p>
                <Image src={ArrowDown} alt="arrow" />
              </div>
            </div>
            {/* Topic */}
          </div>

          <div className="block md:flex pt-5 ">
            <div className="metric grid md:grid-cols-3 grid-cols-1 md:gap-3 w-full md:w-[50%] md:p-3">
              <div className=" bg-white rounded-xl w-full p-5 h-[153px]">
                <p className=" text-[#000000B2]">Active Users</p>
                <p className=" font-bold text-2xl pt-3">
                  {data.metrics?.active_users?.current || "N/A"}/
                  {data.metrics?.active_users?.total || "N/A"}
                </p>
              </div>
              <div className=" bg-white rounded-xl w-full p-4 h-[153px]">
                <p className=" text-[#000000B2]">Questions Answered</p>
                <p className=" font-bold text-2xl pt-3">
                  {data.metrics?.questions_answered}
                </p>
              </div>
              <div className=" bg-white rounded-xl w-full p-5 h-[153px]">
                <p className=" text-[#000000B2]">Av. Session Length</p>
                <p className=" font-bold text-2xl pt-3">
                  {data.metrics?.average_session_length_seconds || "N/A"}
                </p>
              </div>

              <div className=" bg-white rounded-xl w-full p-5 space-y-2 h-[153px]">
                <p className=" text-[#000000B2]">Starting Knowledge</p>
                <p className=" font-bold text-2xl pt-3">
                  {data.metrics?.starting_knowledge_percentage || "N/A"} %
                </p>
                <Image src={graph} alt="graph" className=" w-full" />
              </div>
              <div className=" bg-white rounded-xl w-full p-5 space-y-2 h-[153px]">
                <p className=" text-[#000000B2]">Current Knowledge</p>
                <p className=" font-bold text-2xl pt-3">
                  {data.metrics?.current_knowledge_percentage || "N/A"} %
                </p>
                <Image src={graph} alt="graph" className=" w-full" />
              </div>
              <div className=" bg-white rounded-xl w-full p-5 space-y-2 h-[153px]">
                <p className=" text-[#000000B2]">Knowledge Gain</p>
                <p className=" font-bold text-2xl pt-3">+34 %</p>
                <Image src={graph} alt="graph" className=" w-full" />
              </div>
            </div>

            <div className=" activity bg-white rounded-xl w-[50%] p-4">
              <div>
                <p className=" text-[#4D4D4D] font-medium">Activity</p>
              </div>

              <div className=" graph w-full">
                <ActivityGraph
                  chartData={data.activity?.monthly as MonthlyActivity[]}
                />
              </div>
            </div>
          </div>

          <div className=" flex p-4 mt-3 gap-6">
            <div className=" weakest bg-white p-3 w-[50%]">
              <p className=" text-[#00000080] font-semibold pb-5">Weakest Topics </p>
              {data.topics?.weakest.map((topic) => (
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
                        className="h-full rounded-full bg-[linear-gradient(143deg,#FFBF1A_5.36%,#FF4080_94.64%)]"
                        style={{ width: `${topic.correct_percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" strongest bg-white p-3 w-[50%]">
            <p className=" text-[#00000080] font-semibold pb-5">Strongest Topics</p>
              {data.topics?.strongest.map((topic) => (
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
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-green-100">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(270deg,#2FEA9B_15.5%,#7FDD53_85.5%)]"
                        style={{ width: `${topic.correct_percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
