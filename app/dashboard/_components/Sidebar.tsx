import Image from "next/image";
import React from "react";
import Logo from "../_assets/logo.svg";
import navi from "../_assets/navi.svg";
import bulb from "../_assets/bulb.svg";
import userPic from "../_assets/userpic.png";

const SideBar = () => {
  return (
    <div className="bg-white md:block hidden">
      <div className="flex flex-col items-center justify-between h-full p-3">
        <div className="flex flex-col w-full">
          <div className="logo p-3">
            <Image src={Logo} alt="logo" className=" block" />
          </div>

          <div className="navigations space-y-6 w-full p-3 cursor-pointer">
            <div className="report flex items-center px-4 py-3 bg-[#1B59F81A] rounded-lg font-mono font-medium ">
              <Image src={navi} alt="navi" />
              <p>Reports</p>
            </div>
            <div className="report flex items-center px-4 py-3 bg-[#1B59F81A] rounded-lg font-mono font-medium">
              <Image src={navi} alt="navi" />
              <p>Reports</p>
            </div>
            <div className="report flex items-center px-4 py-3 bg-[#1B59F81A] rounded-lg font-mono font-medium">
              <Image src={navi} alt="navi" />
              <p>Reports</p>
            </div>
            <div className="report flex items-center px-4 py-3 bg-[#1B59F81A] rounded-lg font-mono font-medium">
              <Image src={navi} alt="navi" />
              <p>Reports</p>
            </div>
          </div>

          <div className="support p-3 mt-4 w-full cursor-pointer">
            <p className=" font-mono font-semibold text-[#00000080] pb-4">
              Support
            </p>
            <div className=" space-y-6">
              <div className="get_started flex items-center gap-2">
                <Image src={bulb} alt="bulb" />
                <p className=" font-mono text-[#000000B2] font-medium">
                  Get Started
                </p>
              </div>
              <div className="setting flex items-center gap-2">
                <Image src={bulb} alt="bulb" />
                <p className=" font-mono text-[#000000B2] font-medium">
                  Setting
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="user w-full p-4 border-t border-[#E5E5E5] ">
            <Image src={userPic} alt="userPic" className="mb-2 mt-4"/>
            <div>
                <p className="font-mono font-bold text-sm">Sam Wheeler</p>
                <p className="text-[#00000080]">samwheeler@example.com</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
