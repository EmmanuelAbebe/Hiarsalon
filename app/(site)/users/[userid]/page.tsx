import { notFound } from "next/navigation";

async function fetchUserData(userid: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userid}`
  );
  if (!res.ok) notFound();
  return res.json();
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ userid: string }>;
}) {
  const { userid } = await params;
  const user = await fetchUserData(userid);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <p className="text-lg font-bold p-2 m-1 border transition-all duration-500 hover:text-xl cursor-pointer">
        {user.name}
      </p>
      <div className="display: flex; flex-direction: column; gap: 8px; font-mono text-sm">
        <div className="grid grid-cols-2 gap-4">
          <span className="font-bold text-end"> Email</span>{" "}
          <span>{user.email}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <span className="font-bold text-end"> Phone</span>{" "}
          <span>{user.phone}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <span className="font-bold text-end"> Website</span>{" "}
          <span>{user.website}</span>
        </div>
      </div>
    </div>
  );
}
