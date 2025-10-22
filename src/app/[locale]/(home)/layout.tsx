import Footer from "@/components/Footer";
import Image from "next/image";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full items-start justify-center gap-20 py-5 pr-5 pl-20">
      <div className="w-[49.11%]">
        {" "}
        {children}
        <Footer />
      </div>
      <div>
        <Image
          src="/images/puppy.webp"
          alt="Puppy Image"
          width={602}
          height={984}
          className="rounded-[20px]"
          priority
        />
      </div>
    </div>
  );
}
