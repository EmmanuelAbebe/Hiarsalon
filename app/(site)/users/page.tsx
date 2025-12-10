import User from "./User";

export default async function Users() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] pb-20 gap-16 sm:p-20">
      <h1 className="font-bold text-2xl">Users Page</h1>
      <ul>
        {users.map((user: { id: number; name: string }) => (
          <User
            key={user.id}
            params={{
              userid: user.id.toString(),
              username: user.name,
            }}
          />
        ))}
      </ul>
    </div>
  );
}
