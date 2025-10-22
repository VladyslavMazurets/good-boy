import ArrowIcon from "./icons/ArrowIcon";

type Props = {
  children: React.ReactNode;
  type: "primary" | "secondary";
  onClick?: () => void;
};

export default function Button({ children, type, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex w-max items-center gap-2 rounded-lg px-8 py-4.5 text-base font-medium hover:cursor-pointer hover:opacity-80 ${type === "primary" ? "bg-primary text-white" : "bg-gray-light text-secondary"}`}
    >
      {type == "secondary" ? (
        <ArrowIcon className="text-secondary h-3 w-3 rotate-180" />
      ) : null}
      {children}
      {type == "primary" ? <ArrowIcon className="h-3 w-3 text-white" /> : null}
    </button>
  );
}
