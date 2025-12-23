import React, { use } from "react";
import { useId } from "react";
function Select({ options, label, className, ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={` ${className} w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
