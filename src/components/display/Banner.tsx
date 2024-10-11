"use client";

interface IBanner {
  title: string;
}

export default function Banner({ title }: IBanner) {
  return (
    <div>
      <h1 className="text-5xl font-bold text-white" dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
}
