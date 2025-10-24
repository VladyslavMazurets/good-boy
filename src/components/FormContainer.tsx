export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 flex h-full w-full flex-col gap-5 lg:gap-10">
      {children}
    </div>
  );
}
