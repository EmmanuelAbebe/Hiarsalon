import React from "react";

const SettingsPage = () => {
  return (
    <>
      {/* SETTINGS */}
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Business Hours</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Days open</li>
          <li>Start/end times</li>
          <li>Breaks</li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Time Off</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Blocked days</li>
          <li>Recurring closures</li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Booking Rules</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Minimum notice</li>
          <li>Maximum advance booking</li>
          <li>Contact requirements</li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Notifications</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Toggle stubs</li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Integrations</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Square connection status</li>
          <li>Re-sync controls</li>
        </ul>
      </div>
    </>
  );
};

export default SettingsPage;
