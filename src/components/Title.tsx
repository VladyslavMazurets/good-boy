type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <h1 className="text-3xl/[115%] font-bold -tracking-[0.3px] text-black md:text-5xl/[115%]">
      {title}
    </h1>
  );
}
