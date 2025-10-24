import Image from "next/image";

import Footer from "@/components/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col px-5 lg:flex-row lg:gap-10 lg:py-5 lg:pr-5 lg:pl-5 xl:gap-20 xl:pl-20">
      <div className="flex w-full flex-col lg:w-[49.11%]">
        {children}
        <Footer />
      </div>

      <div className="hidden lg:flex lg:w-[50.89%]">
        <div className="relative flex-1 xl:max-h-[984px] 2xl:max-h-[1025px]">
          <Image
            src="/images/puppy.webp"
            alt="Puppy Image"
            fill
            className="rounded-[20px] object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
