import Button from "@/common/Button";
import SearchInput from "@/common/SearchInput";
import React from "react";
import { FaCalendar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoPeople } from "react-icons/io5";

const ClientPage = () => {
  return (
    <div className="h-full min-h-0 flex flex-col gap-4 py-16">
      {/* CLIENTS */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <IoPeople />
          <div className="text-2xl font-bold text-gray-900">Client List</div>
        </div>

        <div className="flex gap-2">
          <Button
            label={
              <span className="flex items-center gap-2">
                <IoMdAdd /> <p>New</p>
              </span>
            }
          />
        </div>
      </div>
      <div className="mb-6">
        <h1 className="mb-2 text-2xl text-heading font-bold">Client List</h1>
        <SearchInput />
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
    </div>
  );
};

export default ClientPage;
