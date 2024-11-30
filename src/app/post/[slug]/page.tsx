import CopyButton from "@/components/CopyButton";
import Icons from "@/components/Icons";
import LocalTime from "@/components/localTime";
import { getBlogs, getBlogSlug } from "@/libs/blog";
import { IBlog } from "@/types/blog";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { Lato, Tinos } from "next/font/google";
import Image from "next/image";

export const generateStaticParams = async () => {
  const blogs: IBlog[] = await getBlogs();
  return blogs.map((item) => ({
    slug: item.fields.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog: IBlog = await getBlogSlug(params.slug);
  return {
    title: blog.fields.title,
    describe: blog.fields.title,
    authors: blog.fields.author.fields.name,
    openGraph: {
      images: [`https:${blog.fields.thumbnail.fields.file.url}`],
    },
  };
}

const lato = Lato({
  subsets: ["latin"],
  weight: "700",
});

const tinos = Tinos({
  subsets: ["latin"],
  weight: "700",
});

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: IBlog = await getBlogSlug(params.slug);
  const options: Options = {
    renderNode: {
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="mx-6 list-decimal">{children}</ol>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="my-4">{children}</p>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-xl font-bold">{children}</h3>
      ),
    },
  };
  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="flex flex-col text-lg">
        <div className="flex flex-col gap-4 bg-neutral-400 px-3 pb-5 pt-20 transition-colors dark:bg-neutral-700 sm:px-8">
          <p
            className={`${lato.className} hover:cursor-pointer hover:underline`}
          >
            {data.fields.category}
          </p>
          <h1 className={`${tinos.className} text-4xl lg:text-5xl`}>
            {data.fields.title}
          </h1>
          <p>{data.fields.summary}</p>
        </div>
        <div className="flex flex-col gap-4 bg-neutral-300 px-3 py-5 transition-colors dark:bg-neutral-900 sm:px-8">
          <div className="flex items-center gap-3">
            <Image
              priority
              className="size-10 rounded-full bg-neutral-500 hover:cursor-pointer"
              src={`https:${data.fields.author.fields.avatar.fields.file.url}`}
              alt="avatar"
              height={75}
              width={75}
            />
            <div>
              <div>
                <span>written by </span>
                <span
                  className={`${tinos.className} hover:cursor-pointer hover:underline`}
                >
                  {data.fields.author.fields.name}
                </span>
              </div>
              <p className="hover:cursor-pointer hover:underline">
                {data.fields.author.fields.email}
              </p>
            </div>
          </div>
          <hr className="border-neutral-400 transition-colors dark:border-neutral-700" />
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Icons slug={data.fields.slug} />
              <CopyButton slug={data.fields.slug} />
            </div>
            <p className="text-sm">
              <LocalTime time={data.sys.createdAt} />
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-neutral-100 px-3 py-5 transition-colors dark:bg-neutral-950 sm:px-8 sm:py-8">
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-500">
            <Image
              className="h-full w-full rounded-t object-cover object-center transition-transform group-hover:scale-110"
              src={`https:${data.fields.thumbnail.fields.file.url}`}
              priority
              sizes="(min-height: 384px)"
              width={1500}
              height={500}
              alt={`${data.fields.slug}`}
            />
          </div>
          <div className="pt-4">
            {documentToReactComponents(data.fields.content, options)}
          </div>
        </div>
      </div>
    </div>
  );
}
