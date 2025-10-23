"use client";

import { useState } from "react";
import Image from "next/image";
import ChevronIcon from "./icons/ChevronIcon";

interface Country {
  code: "sk" | "cz";
  flag: string;
}

interface Props {
  value: "sk" | "cz";
  onChange: (value: "sk" | "cz") => void;
}

export default function PhoneCountrySelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const countries: Country[] = [
    {
      code: "sk",
      flag: "https://hatscripts.github.io/circle-flags/flags/sk.svg",
    },
    {
      code: "cz",
      flag: "https://hatscripts.github.io/circle-flags/flags/cz.svg",
    },
  ];

  const current = countries.find((c) => c.code === value)!;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border-gray-light bg-gray-light flex w-20 items-center rounded-lg border px-4 py-4.5"
      >
        <Image src={current.flag} width={20} height={20} alt={current.code} />
        <ChevronIcon
          className={`absolute top-1/2 right-5 h-2.5 w-2.5 -translate-y-1/2 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-gray-light absolute left-0 z-10 mt-1 w-full rounded-lg border bg-white shadow-lg">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                onChange(c.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-center gap-2 p-3 hover:bg-gray-100 ${
                c.code === value ? "bg-gray-50" : ""
              }`}
            >
              <Image src={c.flag} width={20} height={20} alt={c.code} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
