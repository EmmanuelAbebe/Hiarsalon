import Link from "next/link";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="p-2 sticky top-0 z-50 bg-white">
      <nav className="flex justify-between">
        <Link href="/" className="my-auto flex flex-row gap-2 ">
          <Image src="/logo.jpg" width={60} height={60} className="" alt="" />
          <p className="my-auto font-corinthia text-4xl">Marta Habtu</p>
        </Link>
        <div className="flex gap-3 items-baseline">
          <Link
            href="/services"
            className=" hover:underline hover:underline-offset-4 transition-all duration-700 my-auto"
          >
            Services
          </Link>
          <Link
            href="/gallary"
            className=" hover:underline hover:underline-offset-4 transition-all duration-700 my-auto"
          >
            Gallary
          </Link>
          <Link
            href="/book"
            className=" hover:underline hover:underline-offset-4 transition-all duration-700 my-auto"
          >
            Book
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
