"use client";

import { useState } from "react";

interface CustomCheckboxProps {
  label: string;
  onChange?: (checked: boolean) => void;
}

export default function CustomCheckbox({
  label,
  onChange,
}: CustomCheckboxProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <label className="relative flex cursor-pointer items-center gap-2 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="peer checked:border-primary checked:bg-primary/15 h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all"
      />
      <span className="text-primary absolute top-1.5 left-[5.5px] opacity-0 peer-checked:opacity-100">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1L3.5 6.5L1 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-secondary text-sm font-medium">{label}</span>
    </label>
  );
}
