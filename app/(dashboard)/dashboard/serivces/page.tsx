import React from "react";

const ServicesPage = () => {
  return (
    <>
      {/* SERVICES */}
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Service List</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Name, duration, price</li>
          <li>Active/Inactive toggle</li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Service Editor</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Name</li>
          <li>Description</li>
          <li>Duration</li>
          <li>Price</li>
          <li>Square catalog mapping</li>
          <li>Internal category</li>
        </ul>
      </div>
    </>
  );
};

export default ServicesPage;
