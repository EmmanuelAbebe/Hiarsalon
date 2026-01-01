// app/(dashboard)/layout.tsx
import Image from "next/image";
import type { ReactNode } from "react";

import Link from "next/link";
import DashboardClientProviders from "../DashboardClientProviders";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { GiOfficeChair } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import {
  MdDashboard,
  MdHomeRepairService,
  MdOutlinePayment,
} from "react-icons/md";
import Button from "@/common/Button";

function DashboardMenuItem({
  label,
  icon,
  href,
}: {
  label: string;
  icon: ReactNode;
  href: string;
}) {
  return (
    <li className="mb-2">
      <Link
        href={`/dashboard${href}`}
        className="text-gray-800 font-bold hover:bg-blue-500 hover:text-white hover:font-bold w-full p-2 rounded flex items-center gap-2"
      >
        {icon}
        <p className="p-1">{label}</p>
      </Link>
    </li>
  );
}

export default function DashboardGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-50 p-3 shrink-0">
        <Link
          href="/"
          className="my-auto flex flex-row justify-center border border-r-8"
        >
          <Image src="/logo.jpg" width={60} height={60} className="" alt="" />
        </Link>

        <nav className="py-4 mt-4">
          <ul className="flex flex-col p-2">
            <DashboardMenuItem
              label="Dashboard"
              href="/"
              icon={<MdDashboard />}
            />
            <DashboardMenuItem
              label="Calander"
              href="/calander"
              icon={<FaCalendar />}
            />
            <DashboardMenuItem
              label="Clients"
              href="/clients"
              icon={<BsFillPeopleFill />}
            />
            <DashboardMenuItem
              label="Services"
              href="/serivces"
              icon={<MdHomeRepairService />}
            />
            <DashboardMenuItem
              label="payments"
              href="/payments"
              icon={<MdOutlinePayment />}
            />
            <DashboardMenuItem
              label="Settings"
              href="/settings"
              icon={<IoMdSettings />}
            />
            <Button
              label={
                <>
                  <LuLogOut />
                  <p>Logout</p>
                </>
              }
              className="text-white bg-blue-500 font-bold text-sm p-2 rounded-md w-full mt-4 hover:bg-blue-400 flex items-center gap-2"
            />
          </ul>
        </nav>
      </aside>
      <main className="min-h-0 overflow-y-auto flex-1">
        <div className="container mx-auto px-4">
          <DashboardClientProviders>{children}</DashboardClientProviders>
        </div>
      </main>
    </div>
  );
}
