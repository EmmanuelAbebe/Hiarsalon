export default function About() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">About This App</h1>
        <p className="font-mono text-sm/6 text-center sm:text-left max-w-xl">
          This is a sample Next.js application demonstrating the use of the App
          Router and Tailwind CSS for styling. It includes multiple pages,
          including this About page, to showcase navigation and layout
          capabilities.
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
