import Image from "next/image";
import { getBlogs } from "./libs/blog";
import { IBlog } from "./types/blog";
import Link from "next/link";

export default async function Home() {
  const data: IBlog[] = await getBlogs();
  return (
    <div className="mt-16 md: max-w-[838px] xl:max-w-screen-xl mx-auto p-5">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data.map((item, idx) => {
          return (
            <div
              key={idx}
              className="group flex flex-col mx-auto w-[384px] bg-white border border-gray-200 rounded-lg shadow transition ease-in-out duration-150 hover:bg-gray-100"
            >
              <div className="w-full h-256 rounded-t-lg overflow-hidden">
                <div
                  className={`w-full h-full transition ease-in-out delay-150 group-hover:scale-110`}
                >
                  <Link href={`/post/${item.fields.slug}`}>
                    <Image
                      className="rounded-t-lg"
                      src={`https:${item.fields.thumbnail.fields.file.url}`}
                      priority
                      sizes="(min-height: 384px)"
                      width={500}
                      height={500}
                      alt={`${item.fields.slug}`}
                    />
                  </Link>
                </div>
              </div>
              <Link
                href={`/post/${item.fields.slug}`}
                className="px-5 pt-5 text-2xl font-bold tracking-tight text-gray-900 transition ease-in-out duration-150 hover:text-blue-600"
              >
                {item.fields.title}
              </Link>
              <div className="px-5 pb-5 place-items-end">
                <hr className="mt-5" />
                <div className="ml-1 my-4 font-normal text-gray-700 ">
                  <div>
                    <span className="font-bold text-gray-900">
                      {item.fields.category}
                    </span>
                    <span>
                      <i> • posted on {item.fields.date}</i>
                    </span>
                  </div>
                  <i>
                    written by {item.fields.author.fields.name} (
                    {item.fields.author.fields.email})
                  </i>
                </div>
                <Link
                  href={`/post/${item.fields.slug}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-bold text-center text-white shadow-lg bg-blue-700 rounded-lg hover:bg-blue-600 hover:cursor-pointer active:scale-[.98] transition ease-in-out"
                >
                  Read article
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
