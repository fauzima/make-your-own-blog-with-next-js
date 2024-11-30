"use-client";
import { extractColors } from "extract-colors";
import { Lato, Tinos } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: "700",
});

const tinos = Tinos({
  subsets: ["latin"],
  weight: "700",
});

export default function BlogHeader({
  params,
}: {
  params: {
    title: string;
    category: string;
    opener: string;
    thumbnail: string;
  };
}) {

  return (
    <div className="flex flex-col gap-4 bg-neutral-400 px-4 pb-5 pt-20 transition-colors duration-1000 dark:bg-neutral-700 sm:px-8">
      <p className={`${lato.className} hover:cursor-pointer hover:underline`}>
        {params.category}
      </p>
      <h1 className={`${tinos.className} text-4xl lg:text-5xl`}>
        {params.title}
      </h1>
      <p>{params.opener}</p>
    </div>
  );
}
