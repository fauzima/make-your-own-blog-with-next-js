"use client";
import { useState } from "react";
import { BsLink, BsCheck2 } from "react-icons/bs";
import { useCopyToClipboard } from "usehooks-ts";

export default function CopyButton({ slug }: { slug: string }) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <button
      className=""
      onClick={() => {
        copy(slug);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
      //   onMouseLeave={() => setCopied(false)}
    >
      {copied ? (
        <BsCheck2 className="text-green-500" />
      ) : (
        <BsLink className="hover:text-[#333] transition ease-in-out delay-[50ms] duration-150 hover:cursor-pointer active:scale-95" />
      )}
    </button>
  );
}

// navigator.clipboard.writeText(
//   `https://make-your-own-blog-with-next-js.vercel.app/post/${slug}`
// );
