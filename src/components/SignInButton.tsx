import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: "700",
});

export default function SignInButton() {
  return (
    <button
      className={`${lato.className} inline-flex size-fit items-center rounded-full bg-neutral-200 px-5 pb-[2px] text-base text-neutral-800 ring ring-neutral-700 transition-colors hover:bg-white dark:bg-neutral-800 dark:text-neutral-200 dark:ring-neutral-300 dark:hover:bg-neutral-700`}
    >
      Sign in
    </button>
  );
}
