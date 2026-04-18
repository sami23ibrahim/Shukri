import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ScrollingCards({ speedSeconds = 36, title = "Tiefer eintauchen." }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, description, thumbnail_url")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (!error && data) setPosts(data);
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  const loop = [...posts, ...posts];

  return (
    <section className="py-24 sm:py-32 bg-white overflow-hidden">
      {title && (
        <div className="max-w-7xl mx-auto px-5 sm:px-10 mb-16 sm:mb-20">
          <h2
            className="text-[#43A9AB] font-black leading-[0.95] tracking-tighter"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
          >
            {title}
          </h2>
        </div>
      )}

      <div className="group relative w-full">
        <div
          className="flex gap-10 sm:gap-14 w-max"
          style={{ animation: `scrollingCardsLoop ${speedSeconds}s linear infinite` }}
        >
          {loop.map((post, i) => (
            <Link
              key={`${post.id}-${i}`}
              to={`/blog/${post.slug}`}
              className="shrink-0 w-[280px] sm:w-[320px] h-[380px] sm:h-[420px] rounded-2xl overflow-hidden shadow-md border border-[#515757]/10 bg-white flex flex-col no-underline hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-full h-44 sm:h-48 bg-[#e0f4f5] overflow-hidden">
                {post.thumbnail_url ? (
                  <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#43a9ab]/40">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg sm:text-xl font-bold text-[#515757] mb-2 leading-tight line-clamp-2">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-sm text-[#515757]/70 leading-relaxed line-clamp-3 flex-1">
                    {post.description}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-[#43a9ab] font-semibold text-sm mt-3">
                  Artikel lesen
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollingCardsLoop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .group:hover > div[style*="scrollingCardsLoop"] {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}
