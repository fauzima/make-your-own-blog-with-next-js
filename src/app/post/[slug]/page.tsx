import Recs from "@/app/components/Recs";
import ShareSection from "@/app/components/Share";
import { getBlogRecs, getBlogs, getBlogSlug } from "@/app/libs/blog";
import { IBlog } from "@/app/types/blog";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
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

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog: IBlog = await getBlogSlug(params.slug);
  const blogNe: IBlog[] = await getBlogRecs(params.slug);
  const options: Options = {
    renderNode: {
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal mx-6">{children}</ol>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="my-4">{children}</p>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="font-bold text-xl">{children}</h3>
      ),
    },
  };
  return (
    <div className="flex flex-col items-center mt-32 lg:max-w-screen-lg mx-auto p-5">
      <header className="mb-4 lg:mb-6">
        <h1 className="mb-4 text-3xl font-bold leading-tight lg:mb-6 lg:text-4xl">
          {blog.fields.title}
        </h1>
        <hr />
        <div className="flex items-center my-6">
          <div className="inline-flex flex-nowrap items-center mr-3 text-sm w-full">
            <Image
              className="mr-4 w-16 h-16 rounded-full"
              width={64}
              height={64}
              src={`https:${blog.fields.author.fields.avatar.fields.file.url}`}
              alt="avatar"
            />
            <address>
              <span className="text-base text-gray-500">written by </span>
              <span className="text-base font-bold">
                {blog.fields.author.fields.name}
              </span>
              <p className="text-base text-gray-500">
                {blog.fields.author.fields.email}
              </p>
              <p className="text-base text-gray-500">on {blog.fields.date}</p>
            </address>
          </div>
          <div className="text-right gap-1 flex place-self-start">
            <span className="text-base text-gray-500">category</span>
            <span className="text-base text-gray-500">:</span>
            <span className="text-base font-bold">{blog.fields.category}</span>
          </div>
        </div>
        <hr />
      </header>
      <main className="mb-4 lg:mb-6 flex flex-col items-center">
        <Image
          className="mb-6"
          width={1500}
          height={1000}
          src={`https:${blog.fields.thumbnail.fields.file.url}`}
          alt={`${blog.fields.slug}`}
        />
        <div className="text-justify mb-3">
          {documentToReactComponents(blog.fields.content, options)}
        </div>
        <hr className="w-full my-3"/>
        <ShareSection slug={blog.fields.slug} />
        <hr className="w-full my-3"/>
        <div className="font-bold text-3xl mt-3 mb-6">
          More blog posts
        </div>
        <Recs blogs={blogNe} />
      </main>
    </div>
  );
}
