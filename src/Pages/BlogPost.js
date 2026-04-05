import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iframeHeight, setIframeHeight] = useState(600);
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (!error && data) {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  // Listen for height messages from the iframe
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === "vivecura-blog-resize") {
        setIframeHeight(e.data.height + 20);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const getIframeContent = (htmlContent) => {
    // Measure the actual content height by finding the bottommost element,
    // then report once. No ResizeObserver to avoid infinite loops.
    const resizeScript = `<script>
      (function() {
        function sendHeight() {
          var elems = document.body.getElementsByTagName('*');
          var maxBottom = 0;
          for (var i = 0; i < elems.length; i++) {
            var rect = elems[i].getBoundingClientRect();
            var bottom = rect.top + rect.height;
            if (bottom > maxBottom) maxBottom = bottom;
          }
          var h = Math.ceil(Math.max(maxBottom, document.body.scrollHeight));
          window.parent.postMessage({ type: 'vivecura-blog-resize', height: h }, '*');
        }
        window.addEventListener('load', function() {
          setTimeout(sendHeight, 200);
          setTimeout(sendHeight, 1000);
        });
        window.addEventListener('resize', function() {
          setTimeout(sendHeight, 100);
        });
      })();
    </script>`;

    // Just inject the script, don't modify styles or wrap in extra divs
    if (htmlContent.includes("</body>")) {
      return htmlContent.replace("</body>", resizeScript + "</body>");
    }

    return `<!DOCTYPE html>
<html>
<head><meta name="viewport" content="width=device-width, initial-scale=1"><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;">${htmlContent}${resizeScript}</body>
</html>`;
  };

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
      {/* Back button */}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Zurück zum Blog
        </Link>
      </div>

      {/* Blog content rendered in sandboxed iframe */}
      <iframe
        ref={iframeRef}
        srcDoc={getIframeContent(post.html_content)}
        title={post.title}
        className="w-full border-0"
        style={{ height: `${iframeHeight}px`, minHeight: "400px" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}

export default BlogPost;
