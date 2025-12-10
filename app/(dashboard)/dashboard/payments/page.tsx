import React from "react";

const PaymentsPage = () => {
  return (
    <>
      {/* PAYMENTS */}
      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">Payments List</h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Date range picker</li>
          <li>Table: date/time, client, amount, tip, method, status</li>
          <li>Totals: gross revenue, tips, transaction count</li>
          <li>Link to Square payment detail</li>
        </ul>
      </div>

      <div className="mb-6">
        <h1 className="mb-2 text-lg text-heading font-bold">
          Payment Detail Panel
        </h1>
        <ul className="max-w-md space-y-1 text-body list-disc list-inside">
          <li>Itemization</li>
          <li>Refund history</li>
        </ul>
      </div>
    </>
  );
};

export default PaymentsPage;
