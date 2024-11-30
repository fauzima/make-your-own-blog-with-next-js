"use client";
import { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function Bookmark() {
  const [isBookmarked, setBookmark] = useState<boolean>(false);
  const bookmarkButton = () => {
    setBookmark(!isBookmarked);
  };
  return (
    <button onClick={bookmarkButton}>
      {isBookmarked ? (
        <BsBookmarkFill className="transition duration-1000 hover:text-[#555] dark:hover:text-neutral-400 hover:delay-[50ms] hover:duration-150" />
      ) : (
        <BsBookmark className="transition duration-1000 hover:text-[#555] dark:hover:text-neutral-400 hover:delay-[50ms] hover:duration-150" />
      )}
    </button>
  );
}
