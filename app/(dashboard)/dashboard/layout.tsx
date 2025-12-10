// app/(dashboard)/layout.tsx
import Image from "next/image";
import type { ReactNode } from "react";

import Link from "next/link";

function DashboardMenuItem({ label, href }: { label: string; href: string }) {
  return (
    <li className="mb-2">
      <Link
        href={`/dashboard${href}`}
        className="text-black hover:bg-blue-600 hover:text-white hover:font-bold w-full block p-2 rounded"
      >
        {label}
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
    <div className="min-h-screen flex">
      <aside className="w-40 p-4">
        <Link
          href="/"
          className="my-auto flex flex-row justify-center border border-r-8"
        >
          <Image src="/logo.jpg" width={60} height={60} className="" alt="" />
        </Link>

        <nav className="py-4">
          <ul>
            <DashboardMenuItem label="Dashboard" href="/" />
            <DashboardMenuItem label="Calander" href="/calander" />
            <DashboardMenuItem label="Clients" href="/clients" />
            <DashboardMenuItem label="Services" href="/serivces" />
            <DashboardMenuItem label="payments" href="/payments" />
            <DashboardMenuItem label="Settings" href="/settings" />
            <button className="text-white bg-blue-500 font-bold text-sm p-2 rounded-md w-full mt-4 hover:bg-blue-700">
              Logout
            </button>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 px-10 p-6 m-2">{children}</main>
    </div>
  );
}
