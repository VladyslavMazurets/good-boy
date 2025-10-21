type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <h1 className="mb-6 text-5xl/[115%] font-bold -tracking-[0.3px] text-black">
      {title}
    </h1>
  );
}
