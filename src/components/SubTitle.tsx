export default function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold text-black md:text-base">{children}</p>
  );
}
