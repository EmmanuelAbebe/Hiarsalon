import React from "react";

function Services() {
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-gray-200"
        />
        Service A
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-gray-200"
        />
        Service B
      </label>
    </div>
  );
}

export default Services;
