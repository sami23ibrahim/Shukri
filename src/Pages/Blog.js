import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, description, thumbnail_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-wide text-[#515757] mb-2">
            Blog
          </h1>
          <div className="w-12 h-[2px] bg-[#43a9ab]/40 mb-3" />
          <p className="text-[#515757]/50 text-sm">
            Aktuelle Beiträge &amp; Einblicke
          </p>
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#43a9ab]/30 border-t-[#43a9ab] rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-[#515757]/40 py-20 text-sm">
            Noch keine Beiträge vorhanden.
          </p>
        ) : (
          /* Blog cards grid */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block no-underline opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${i * 80}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="overflow-hidden rounded-lg border border-gray-100 hover:border-[#43a9ab]/20 transition-all duration-500 hover:shadow-md hover:shadow-[#43a9ab]/5">
                  {/* Thumbnail */}
                  {post.thumbnail_url ? (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#43a9ab]/10 to-[#43a9ab]/5 flex items-center justify-center">
                      <span className="text-[#43a9ab]/30 text-3xl font-light">
                        {post.title?.[0] || "B"}
                      </span>
                    </div>
                  )}

                  {/* Card body */}
                  <div className="p-3">
                    <p className="text-[10px] text-[#43a9ab] font-medium tracking-wider uppercase mb-1">
                      {new Date(post.created_at).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="text-sm font-medium text-[#515757] group-hover:text-[#43a9ab] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
