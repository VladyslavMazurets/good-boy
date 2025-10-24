interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  className?: string;
}

export default function Toast({ message, type }: ToastProps) {
  return (
    <div
      className={`fixed right-1 bottom-8 rounded-2xl px-6 py-3 text-sm md:right-5 md:px-9 md:py-6 md:text-base ${type === "success" ? "bg-green-100 text-green-800" : type === "error" ? "bg-red-200 text-red-800" : "bg-blue-100 text-blue-800"} shadow-xl`}
    >
      {message}
    </div>
  );
}
