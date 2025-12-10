import React from "react";

const ClientPage = () => {
  return (
    <>
      {/* CLIENTS */}
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Client List</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Search by name, phone, email</li>
          <li>Columns: name, last visit, total spend, no-show count</li>
          <li>Filters: new, high spenders, inactive</li>
        </ul>
      </div>
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Client Profile</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Name, phone, email, hidden Square ID</li>
          <li>Visit history with links</li>
          <li>Notes with add-note input</li>
          <li>Upcoming appointments</li>
          <li>Flags: no-show risk, pinned notes</li>
        </ul>
      </div>{" "}
    </>
  );
};

export default ClientPage;
