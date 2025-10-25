import ArrowIcon from "./icons/ArrowIcon";

type Props = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  style: "primary" | "secondary";
  disabled?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  style,
  type,
  showArrow = true,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group flex w-max items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium hover:cursor-pointer hover:opacity-95 disabled:cursor-not-allowed md:px-8 md:py-4.5 md:text-base ${style === "primary" ? "bg-primary text-white" : "bg-gray-light text-secondary"}`}
    >
      {style == "secondary" ? (
        <ArrowIcon className="text-secondary h-3 w-3 rotate-180 duration-200 ease-in-out group-hover:-translate-x-1 group-hover:scale-110" />
      ) : null}
      <span className="duration-200 ease-in-out group-hover:scale-105">
        {children}
      </span>
      {style == "primary" && showArrow ? (
        <ArrowIcon className="h-3 w-3 text-white duration-200 ease-in-out group-hover:translate-x-2 group-hover:scale-110" />
      ) : null}
    </button>
  );
}
