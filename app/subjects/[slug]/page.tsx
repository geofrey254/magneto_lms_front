import Link from "next/link";
import { FaCertificate } from "react-icons/fa6";

type Chapter = {
  id: number;
  title: string;
  description: string;
  slug: string;
  form: { id: number; name: string } | null;
  subject: { id: number; title: string } | null;
};

type Params = {
  params: { slug: string };
};

// Dynamic page component for subject chapters
const SubjectChapters = async ({ params }: Params) => {
  const { slug } = params;

  try {
    const chaptersResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chapters?subject=${slug}`
    );
    if (!chaptersResponse.ok) {
      throw new Error("Failed to fetch chapters");
    }

    const chaptersData = await chaptersResponse.json();
    const chapters: Chapter[] = chaptersData.results;

    const sortedChapters = chapters.sort((a, b) => {
      const titleA = a.title?.toLowerCase() || "";
      const titleB = b.title?.toLowerCase() || "";
      return titleA.localeCompare(titleB);
    });

    return (
      <section className="w-full py-16">
        <div className="">
          <div>
            {/* Header Section */}
            <div className="bg-[#350203] courses w-full max-w-full py-8 px-4 md:py-12 md:px-20 grid grid-cols-6 justify-between items-center">
              <div className="text-content col-start-1 col-end-3">
                <nav className="w-full max-w-4xl text-base mb-4 text-white rounded-xl font-light">
                  <Link href="/">Home</Link>
                  <span className="mx-2">/{"/"}</span>
                  <Link href="/subjects">Subject</Link>
                  <span className="mx-2">/{"/"}</span>
                  <Link href="/" className="text-[#f8d6b6] font-medium">
                    {slug}
                  </Link>
                </nav>
                <div>
                  <h3 className="text-white text-3xl md:text-5xl text-nowrap font-light uppercase">
                    {slug}
                  </h3>
                </div>
              </div>
              <div className="image-content col-end-9 col-span-3 flex items-center gap-0 md:gap-12">
                <FaCertificate
                  className="text-[#f8d6b6] w-6/12 md:w-full"
                  size={100}
                />
              </div>
            </div>

            {/* Chapters Section */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-0 pt-8 px-8 md:px-0">
              {sortedChapters.map((chap) => (
                <div
                  key={chap.id}
                  className="border flex flex-col gap-4 border-[#350203] shadow rounded-md p-4 md:p-8 max-w-sm w-full mx-auto"
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
                      href={`/topics/${chap.slug}`}
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
  } catch {
    return <div>Error loading chapters. Please try again later.</div>;
  }
};

export default SubjectChapters;

// Generate static params for dynamic routes
export async function generateStaticParams() {
  try {
    const subsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects`
    );
    if (!subsResponse.ok) {
      throw new Error("Failed to fetch subjects");
    }

    const subs = await subsResponse.json();
    return subs.map((sub: { slug: string }) => ({
      slug: sub.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
