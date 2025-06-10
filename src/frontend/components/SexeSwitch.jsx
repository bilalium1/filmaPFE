// GenderToggle.jsx
import { useState } from "react";

export default function GenderToggle({isMale, setIsMale}) {

  return (
    <div className="flex items-center space-x-4 bg-gray-900 p-4 rounded-lg shadow-md text-white w-fit mx-auto mt-10">
      <span className="text-sm font-medium">{isMale ? "Male" : "Female"}</span>
      <button
        onClick={() => setIsMale(!isMale)}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
          isMale ? "bg-blue-600" : "bg-pink-500"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            isMale ? "translate-x-1" : "translate-x-7"
          }`}
        />
      </button>
    </div>
  );
}
