"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const useChapterData = (slug) => {
  const { data: session } = useSession();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/content/?slug=${slug}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        const data = await res.json();
        const less = data.length > 0 ? data[0] : null;
        setLesson(less);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (session && slug) {
      fetchData();
    }
  }, [session, slug]);

  return { lesson, error, loading };
};

export default useChapterData;
