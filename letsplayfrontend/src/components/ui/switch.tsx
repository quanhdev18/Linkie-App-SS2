import React from "react";

export const Switch = ({ checked, onCheckedChange }) => (
  <button
    onClick={() => onCheckedChange(!checked)}
    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
      checked ? "bg-yellow-400" : "bg-gray-300"
    }`}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
        checked ? "translate-x-6" : ""
      }`}
    />
  </button>
);
