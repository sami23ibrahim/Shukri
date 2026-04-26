import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../supabaseClient";
import ShadowHtml from "../Components/ShadowHtml";
import Seo from "../Components/Seo";

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (!error && data) setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-start">
        <div className="w-8 h-8 border-2 border-[#43a9ab]/30 border-t-[#43a9ab] rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 px-4 text-center">
        <h1 className="text-2xl font-light text-[#515757] mb-4">
          Beitrag nicht gefunden
        </h1>
        <Link
          to="/blog"
          className="text-[#43a9ab] hover:underline text-sm no-underline"
        >
          &larr; Zurück zum Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <Seo
        path={`/blog/${post.slug}`}
        title={post.title}
        description={post.description || post.title}
        image={post.thumbnail_url}
        type="article"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description || post.title,
            image: post.thumbnail_url ? [post.thumbnail_url] : undefined,
            datePublished: post.created_at,
            dateModified: post.updated_at || post.created_at,
            author: { "@type": "Person", name: "Dr. Shukri Jarmoukli" },
            publisher: {
              "@type": "Organization",
              name: "ViveCura",
              logo: { "@type": "ImageObject", url: "https://vivecura.com/Assets/logo6.png" },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://vivecura.com/blog/${post.slug}`,
            },
          })}
        </script>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#515757]/50 hover:text-[#43a9ab] transition-colors duration-300 no-underline"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zum Blog
        </Link>
      </div>

      <ShadowHtml html={post.html_content} />

      <div className="bg-[#f7f9f9] py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-[#515757] mb-4">
            Haben Sie Fragen oder möchten einen Termin?
          </h2>
          <p className="text-[#515757]/70 mb-8 text-base">
            Wir beraten Sie gerne persönlich in unserer Praxis.
          </p>
          <a
            href="https://www.doctolib.de/arzt/berlin/shukri-jarmoukli/booking/new-patient?specialityId=1286&speciality_ids%5B%5D=1286&source=profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#43a9ab] hover:bg-[#3a9496] text-white px-8 py-3 rounded-lg text-base font-medium transition-colors duration-300 no-underline"
          >
            Termin vereinbaren
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
