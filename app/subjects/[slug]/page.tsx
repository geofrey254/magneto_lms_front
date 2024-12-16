import Link from "next/link";
import { Chapter, Subject } from "@/types/types";

// Dynamic page component for subject chapters
const SubjectChapters = async ({ params }: Subject) => {
  const { slug } = await params;

  const chapters: Chapter[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chapters?subject=${slug}`
  ).then((res) => res.json());

  const sortedChapters = chapters.sort((a, b) => {
    const titleA = a.title?.toLowerCase() || "";
    const titleB = b.title?.toLowerCase() || "";
    return titleA.localeCompare(titleB);
  });

  return (
    <section className="w-full flex justify-center px-4 py-20">
      <div className="container">
        <div>
          <div className="text-center p-8">
            <h1 className="text-xl font-bold">
              Topics for Subject:{" "}
              <span className="text-2xl uppercase">{slug}</span>
            </h1>
          </div>
          <div>
            {sortedChapters.map((chap) => (
              <div
                key={chap.id}
                className="border flex flex-col gap-4 border-[#350203] shadow rounded-md p-8 max-w-sm w-full mx-auto"
              >
                <div className="flex gap-4 text-xs">
                  <span className="text-black bg-[#f8d6b6] p-2 rounded-2xl">
                    {chap.form?.name ?? "Class Not Assigned"}
                  </span>
                  <span className="text-black bg-[#f8d6b6] p-2 rounded-2xl">
                    {chap.subject?.title ?? "Subject Not Assigned"}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-black">{chap.title}</h2>
                <p className="text-gray-600 text-sm">{chap.description}</p>

                <div className="flex items-center">
                  <Link
                    href={`/Lessons/${chap.slug}`}
                    className="bg-[#350203] hover:bg-[#f8d6b6] flex items-center justify-center rounded-2xl px-4 py-1 text-sm text-[#f8d6b6] hover:text-[#350203] text-center"
                  >
                    Start
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectChapters;

export async function generateStaticParams() {
  const subs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects`).then(
    (res) => res.json()
  );

  return subs.map((sub: { slug: string }) => ({
    slug: sub.slug,
  }));
}
