import React from "react";
import Button from "../Navbar/Button";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <div className="bg-[#FFFAE9] p-2 md:p-10">
      <div className=" flex flex-col md:flex-row md:justify-between">
        <div className="flex-col justify-center space-y-3 items-center px-4 md:px-0 order-4 md:order-1">
          <img
            className="w-32 cursor-pointer "
            src="/images/Logo.svg"
            alt="Logo"
          />
          <p className="text-[#666270] text-xl max-w-sm hover:text-gray-500  pt-3  ">
            Building a next-generation collaborative platform to connect
            renters, homeowners, and agents.
          </p>
          <div className="flex flex-col md:flex-row">
            <input
              type="text"
              placeholder="Enter your email"
              className="border border-[#D6D4DD] rounded-md placeholder:bg-transparent  max-w-xs mr-4 w-64 p-2 mb-2 md:mb-0"
            />
            <Button buttonText="Send" />
          </div>
        </div>
        <div className="md:flex md:justify-center order-1 md:order-2">
          <ul className="flex flex-col  px-2 pt-4 pb-2 ">
            <HashLink to="/">
              <li className="text-[#000] font-bold text-xl  hover:text-gray-500  pt-3 ">
                Dwelling
              </li>
            </HashLink>
            <HashLink to="/">
              <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
                Find my home
              </li>
            </HashLink>
            <HashLink to="/">
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Homeowners
            </li>
            </HashLink>
            <HashLink to="/">
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3">
              Community
            </li>
            </HashLink>
            <HashLink to="/">
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Review
            </li>
            </HashLink>
          </ul>
        </div>

        <div className="md:flex md:justify-center order-2 md:order-3">
          <ul className="flex flex-col  px-2 pt-4 pb-2">
          <HashLink to="/">
            <li className="text-[#000] font-bold text-xl  hover:text-gray-500  pt-3 ">
              Company
            </li>
            </HashLink>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Features
            </li>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Articles
            </li>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Press
            </li>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Refer
            </li>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Careers
            </li>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Api documentation
            </li>
          </ul>
        </div>
        <div className="md:flex md:justify-center order-3 md:order-4">
          <ul className="flex flex-col  px-2 pt-4 pb-2">
            <li className="text-[#000] font-bold text-xl  hover:text-gray-500  pt-3 ">
              Support
            </li>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              contact
            </li>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Privacy
            </li>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              Terms
            </li>
            <li className="text-[#666270] text-xl  hover:text-gray-500  pt-3 ">
              FAQ
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-300 my-4" />
      <div className="md:flex md:justify-between items-center md:py-2 px-4">
        <div className="flex m-0 p-0">
          <img
            src="/images/fb.svg"
            alt="facebook"
            className="w-8 mr-4 cursor-pointer"
          />
          <img
            src="/images/ln.svg"
            alt="facebook"
            className="w-8 mr-4 cursor-pointer"
          />
          <img
            src="/images/twt.svg"
            alt="facebook"
            className="w-8 mr-4 cursor-pointer"
          />
        </div>
        <h1 className="text-[#000] font-extrabold text-xl  hover:text-gray-500  pt-4 ">
          Copyright @Raja 2023
        </h1>
      </div>
    </div>
  );
};

export default Footer;
