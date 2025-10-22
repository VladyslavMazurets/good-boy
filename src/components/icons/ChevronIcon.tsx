export default function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={5}
      viewBox="0 0 12 7"
      className={className}
    >
      <path
        d="m1 1 5 5 5-5"
        stroke="#4B5563"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
