import React from "react";

const page = () => {
  return (
    <>
      {/* STAFF (OPTIONAL) */}
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Staff</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Staff list: name, role</li>
          <li>Working hours per staff</li>
          <li>Service assignments</li>
          <li>Calendar filter by staff</li>
          <li>Revenue attribution</li>
        </ul>
      </div>
    </>
  );
};

export default page;
