import React from "react";

function Field(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }
) {
  const { id, label, className, ...rest } = props;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className={
          "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 " +
          (className ?? "")
        }
      />
    </div>
  );
}

export default Field;
