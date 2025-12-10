import React from "react";

const page = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">
          Today’s Appointments:
        </h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li className=" list-item">
            Time, client, service, duration, status
          </li>
          <li> Status buttons: check-in, complete, no-show</li>
        </ul>
      </div>
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Revenue Today</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li> Total revenue, total tips, number of transactions</li>
        </ul>
      </div>
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Quick Stats</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li> Upcoming appointments count</li>
          <li> Gaps in schedule</li>
          <li> Cancellations</li>
        </ul>
      </div>
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Alerts</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li> Last-minute cancellations</li>
          <li> Overlaps detected</li>
          <li> Cancellations</li>
        </ul>
      </div>
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Quick Actions</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li> Create appointment</li>
          <li> Add client note </li>
          <li> Cancellations</li>
        </ul>
      </div>
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Integrations</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li> Square Appointments API</li>
          <li> Square Payments API</li>
        </ul>
      </div>
    </>
  );
};

export default page;
