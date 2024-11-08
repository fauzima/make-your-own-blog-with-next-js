"use client";
import { useState } from "react";
import { BsLink, BsCheck2 } from "react-icons/bs";
import { useCopyToClipboard } from "usehooks-ts";

export default function CopyButton({ slug }: { slug: string }) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <button
      className="active:scale-50 active:opacity-0 transition-transform ease-in-out duration-75"
      onClick={() => {
        copy(slug);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 5000);
      }}
      //   onMouseLeave={() => setCopied(false)}
    >
      {copied ? (
        <BsCheck2 className="text-green-500 hover:scale-50 hover:opacity-0 transition ease-in-out duration-150 delay-1000" />
      ) : (
        <BsLink className="hover:text-[#333] transition ease-in-out delay-[50ms] duration-150 hover:cursor-pointer" />
      )}
    </button>
  );
}

// navigator.clipboard.writeText(
//   `https://make-your-own-blog-with-next-js.vercel.app/post/${slug}`
// );
