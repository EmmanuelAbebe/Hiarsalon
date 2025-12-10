import React from "react";
import Field from "./Field";

function DateTime() {
  return (
    <div className="space-y-4">
      <Field id="date" name="date" type="date" label="Preferred date" />
      <Field id="time" name="time" type="time" label="Preferred time" />
    </div>
  );
}

export default DateTime;
