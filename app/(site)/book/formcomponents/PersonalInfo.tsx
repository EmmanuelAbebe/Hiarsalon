import React from "react";
import Field from "./Field";

function PersonalInfo() {
  return (
    <div className="space-y-4">
      <Field id="name" name="name" label="Full name" required />
      <Field id="phone" name="phone" type="tel" label="Phone *" required />
    </div>
  );
}

export default PersonalInfo;
