import Link from "next/link";

export default function Header() {
  return (
    <div className="h-16 content-center fixed bg-black w-full z-50">
      <div className="mx-auto flex justify-center gap-5 text-white max-w-screen-xl ">
        <Link href={"/"}>Home</Link>
      </div>
    </div>
  );
}
