export default function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 18 22"
    >
      <path
        d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21c4-4 8-7.582 8-12A8 8 0 1 0 1 9c0 4.418 4 8 8 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
