"use client";

import React from "react";

export default function Contact() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            Click Me
          </button>
          <span>{count > 0 ? ` (clicked ${count} times)` : ""}</span>
        </div>

        <p className="font-mono text-sm/6 text-center sm:text-left max-w-xl">
          If you have any questions or would like to get in touch, please feel
          free to reach out via email at{" "}
          <a
            href="mailto:+13018935021"
            className="underline hover:text-foreground hover:underline-offset-4"
          >
            +1 (301) 893-5021
          </a>{" "}
          or call us at <a href="tel:+1234567890">+1 (234) 567-890</a>. We look
          forward to hearing from you!
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/next.svg"
            alt="Next.js logo"
            width={20}
            height={20}
            className="dark:invert"
          />
          Learn Next.js
        </a>
      </footer>
    </div>
  );
}
