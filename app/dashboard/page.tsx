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
import thomsan from "../dashboard/_assets/Thomas.svg";
import Topics from "./_components/Topics";

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
  image?: string;
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
  const [sideBarVisible, setSideBarVisible] = useState(false);
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

  const handleDownloadContent = async () => {
    try {
      const response = await fetch(
        "https://testd5-img.azurewebsites.net/api/imgdownload",
        {
          method:"POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            api: data.api_secret,
          }),
          mode:"cors"
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { filename, base64_string } = data;

        const binaryData = atob(base64_string);
        const arrayBuffer = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          arrayBuffer[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: "image/jpg" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename; 
        a.click();

        URL.revokeObjectURL(url);
      }else{
        alert("Couldn't Download the content")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="flex">
        <div
          className={`sidebar w-full md:w-[20%] md:block ${
            sideBarVisible ? "" : "hidden w-0"
          }`}
        >
          <SideBar setVisible={setSideBarVisible} />
        </div>

        <div className="main_components w-full md:block md:w-[80%] bg-[#F9F9F9] p-5">
          <div className="flex items-center justify-between p-6 border-b border-[#0000001A]">
            <p className="font-bold text-2xl">Reports</p>
            <div
              className="cursor-pointer flex items-center gap-1"
              onClick={() => handleDownloadContent()}
            >
              <Image src={downloadSvg} alt="download" />
              <p className="text-[#4D4D4D] text-sm font-semibold">Download</p>
            </div>
          </div>

          <div className="dataModification_Options block md:flex w-full space-y-4 md:space-y-0 md:gap-4 mt-5">
            {/* TimeFrame */}
            <div className="bg-white rounded-xl p-3 w-full h-fit relative">
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

              {/* Dropdown with absolute positioning */}
              {timeFrameVisible && (
                <div className="absolute left-0 right-0 top-full z-50 bg-white shadow-lg rounded-b-xl overflow-hidden">
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
              )}
            </div>
            {/* TimeFrame */}
            {/* People */}
            <div className="bg-[#FFFFFF] rounded-xl p-3 w-full h-fit z-[999999] relative">
              <div className="border-b border-[#0000001A] flex items-center justify-between pb-3">
                <p>
                  People: <span className="font-bold">All</span>
                </p>
                <p
                  className="text-[#000000B2] font-medium cursor-pointer"
                  onClick={() => setPeopleVisible(!peopleVisible)}
                >
                  clear
                </p>
              </div>

              {peopleVisible && (
                <div className="selected_group_people p-2 absolute left-0 right-0 top-full z-50 bg-white shadow-lg rounded-b-xl overflow-hidden">
                  {selectedGroup && (
                    <div className="bg-[#F0F0F0] rounded-xl py-1 px-2 flex items-center gap-2 w-fit">
                      <p className="font-bold">{selectedGroup}</p>
                      <Image src={cross} alt="cross" />
                    </div>
                  )}

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
                          <p className="border-[2px] border-[#00000033] w-5 h-5 rounded-full flex items-center justify-center">
                            {selectedGroup == name && (
                              <p className=" bg-[#1B59F8] w-3 h-3 rounded-full"></p>
                            )}
                          </p>
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
                      <div className=" flex items-center gap-2 pb-2" key={item}>
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
            <div className=" bg-[#FFFFFF] rounded-xl p-3 w-full h-fit z-[999999] relative">
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
            <div className="metric grid md:grid-cols-3 grid-cols-1 md:gap-3 w-full md:w-[50%] md:p-3 space-y-4 md:space-y-0">
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

            <div className=" activity bg-white rounded-xl md:w-[50%] w-full p-4">
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

          <div className="block w-full md:flex p-4 mt-3 md:gap-6 space-y-4 md:space-y-0">
            <Topics
              title="Weakest Topics"
              topics={data.topics?.weakest || []}
            />
            <Topics
              title="Strongest Topics"
              topics={data.topics?.strongest || []}
            />
          </div>

          <div className="p-4 mt-3 block md:flex w-full md:gap-6 space-y-4 md:space-y-0">
            <div className=" bg-white p-2 rounded-xl w-full">
              <p className=" text-[#00000080] font-semibold pb-5">
                User Leaderboard
              </p>
              <div className=" space-y-4">
                {data.user_leaderboard?.map((user) => (
                  <>
                    <div className=" flex items-center gap-2">
                      <Image src={thomsan} alt="thomsan" />
                      <div>
                        <p className=" font-semibold font-sans">{user.name}</p>
                        <p className=" text-[#00000080] font-medium font-serif">
                          {user.points} Points -{" "}
                          <span>
                            {user.previous_accuracy_percentage}% Correct
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="bg-white p-2 rounded-xl w-full">
              <p className=" text-[#00000080] font-semibold pb-5">
                Groups Leaderboard
              </p>
              <div className=" space-y-4">
                {data.groups_leaderboard?.map((user) => (
                  <>
                    <div className="">
                      <div>
                        <p className=" font-semibold font-sans">
                          {user.group_name}
                        </p>
                        <p className=" text-[#00000080] font-medium font-serif">
                          {user.points_per_user} Points /
                          <span>
                            {user.previous_accuracy_percentage}% Correct
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!sideBarVisible && (
        <div
          className="fixed md:hidden rounded-full bottom-0 m-3 flex items-center justify-center bg-green-500 px-7 py-5"
          onClick={() => setSideBarVisible(true)}
        >
          <p className=" font-bold font-serif text-white text-xl">S</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
