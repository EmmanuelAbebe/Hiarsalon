"use client";

import { useRouter } from "next/navigation";

export default function User({
  params,
}: {
  params: { userid: string; username: string };
}) {
  const { userid, username } = params;
  const user = { id: userid, name: username };

  const router = useRouter();

  const handleClick = () => {
    router.push(`/users/${user.id}`);
  };

  return (
    <li
      key={user.id}
      className="p-1 hover:underline hover:underline-offset-4 cursor-pointer"
      onClick={handleClick}
    >
      {user.name}
    </li>
  );
}
