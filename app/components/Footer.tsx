import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t m-4 p-4">
      <div className="flex flex-wrap justify-center gap-[60px] p-4">
        <div className="flex flex-col gap-2 basis-[270px]  grow p-7">
          <h3 className="text-xl font-bold mb-4">Address</h3>
          <Link
            href="/address"
            className="h-[200px] p-4 border hover:underline hover:underline-offset-4 transition-all duration-700 flex items-center justify-center"
          >
            <span className="text-center">map</span>
          </Link>
          <p>address here</p>
        </div>

        <div className="flex flex-col gap-2 basis-[270px] grow p-7">
          <h3 className="text-xl font-bold mb-4">Open Hours</h3>
          <ul>
            <li className="flex justify-between">
              <span>Monday</span>
              <span>9:00 AM - 9:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Tuesday</span>
              <span>9:00 AM - 9:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Wednesday</span>
              <span>9:00 AM - 9:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Thursday</span>
              <span>9:00 AM - 9:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Friday</span>
              <span>9:00 AM - 9:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span>9:00 AM - 9:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-rose-600">Closed</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2 basis-[270px] grow p-7">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>

          <div className="text-gray-600 flex flex-1 flex-col gap-2">
            <Link
              href="/about"
              className="hover:underline hover:underline-offset-4 transition-all duration-700"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:underline hover:underline-offset-4 transition-all duration-700"
            >
              Contact
            </Link>
            <Link
              href="/stylists"
              className="hover:underline hover:underline-offset-4 transition-all duration-700"
            >
              Our Team
            </Link>
            <Link
              href="/stylists"
              className="hover:underline hover:underline-offset-4 transition-all duration-700"
            >
              Terms and Services
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
