export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 flex h-full w-full flex-col gap-10 bg-red-500">
      {children}
    </section>
  );
}
