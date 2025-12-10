import React from "react";

const CalanderPage = () => {
  return (
    <>
      {/* CALENDAR */}
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Calendar Views</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Week view</li>
          <li>Day view</li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">
          Calendar Elements
        </h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Timeline with appointments</li>
          <li>Appointment card: client, service, duration, status</li>
          <li>Create/Edit modal: client, service, time, duration, notes</li>
          <li>Filters: stylist, service</li>
          <li>Blocked time from business hours + time off</li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">
          Calendar Internal State
        </h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Store appointment status locally</li>
          <li>Push create/update/delete to Square</li>
        </ul>
      </div>
    </>
  );
};

export default CalanderPage;
