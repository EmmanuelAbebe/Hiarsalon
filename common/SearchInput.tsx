import React from "react";
import Button from "./Button";

const SearchInput = () => {
  return (
    <form className="w-full">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full rounded-full p-3 ps-9 text-heading text-sm placeholder:text-body border border-gray-300"
          placeholder="Search"
          required
        />
        <Button
          label="Search"
          style={{
            // marginTop: "0px",
            position: "absolute",
            right: "4px",
            bottom: "4px",
            borderRadius: "9999px",
            padding: "9px 12px",
            // fontSize: "12px",
          }}
        />
      </div>
    </form>
  );
};

export default SearchInput;
