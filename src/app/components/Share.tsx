import Link from "next/link";
import { IconType } from "react-icons";
import { BsFacebook, BsLinkedin, BsTwitterX, BsWhatsapp } from "react-icons/bs";
import CopyButton from "./CopyButon";

interface IShare {
  Icon: IconType;
  link: string;
  style: string;
}

const share: IShare[] = [
  {
    Icon: BsFacebook,
    link: "https://fb.com/sharer/sharer.php?u=",
    style:
      "hover:text-[#4267B2] transition ease-in-out delay-[50ms] duration-150 active:scale-95",
  },
  {
    Icon: BsLinkedin,
    link: "https://linkedin.com/sharing/share-offsite/?url=",
    style:
      "hover:text-[#0072b1] transition ease-in-out delay-[50ms] duration-150 active:scale-95",
  },
  {
    Icon: BsWhatsapp,
    link: "https://wa.me/?text=",
    style:
      "hover:text-[#25D366] transition ease-in-out delay-[50ms] duration-150 active:scale-95",
  },
  {
    Icon: BsTwitterX,
    link: "https://x.com/intent/tweet?url=",
    style:
      "hover:text-[#555] transition ease-in-out delay-[50ms] duration-150 active:scale-95",
  },
];

export default function ShareSection({ slug }: { slug: string }) {
  return (
    <div className="inline-flex items-center">
      <div className="font-bold text-xl mr-5">Share :</div>
      <div className="inline-flex gap-5 text-xl">
        <CopyButton slug={slug} />
        {share.map((item, idx) => {
          return (
            <Link
              target="_blank"
              href={`${item.link}https://make-your-own-blog-with-next-js.vercel.app/post/${slug}`}
              key={idx}
              className={`${item.style}`}
            >
              <item.Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
