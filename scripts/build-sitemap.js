const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://zevrlfpyyndwjnlpidkx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpldnJsZnB5eW5kd2pubHBpZGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODA2MTUsImV4cCI6MjA5MDg1NjYxNX0.upwfBBFCmlLp9Q-gXjgG89WCXkqqG3hutGiuisyV3CI";
const SITE = "https://vivecura.com";
const OUT = path.join(__dirname, "..", "public", "sitemap.xml");

const STATIC_ROUTES = [
  { loc: "/",                      changefreq: "weekly",  priority: "1.0" },
  { loc: "/ueber-mich",            changefreq: "monthly", priority: "0.8" },
  { loc: "/spezielle-therapien",   changefreq: "monthly", priority: "0.8" },
  { loc: "/diagnostik",            changefreq: "monthly", priority: "0.8" },
  { loc: "/praevention-longevity", changefreq: "monthly", priority: "0.8" },
  { loc: "/psychotherapie",        changefreq: "monthly", priority: "0.8" },
  { loc: "/koerperliche-symptome", changefreq: "monthly", priority: "0.7" },
  { loc: "/infusions",             changefreq: "monthly", priority: "0.7" },
  { loc: "/ketamin",               changefreq: "monthly", priority: "0.7" },
  { loc: "/beratung",              changefreq: "monthly", priority: "0.7" },
  { loc: "/mentoring",             changefreq: "monthly", priority: "0.7" },
  { loc: "/mein-buch",             changefreq: "monthly", priority: "0.6" },
  { loc: "/experience",            changefreq: "monthly", priority: "0.6" },
  { loc: "/blog",                  changefreq: "weekly",  priority: "0.8" },
  { loc: "/rechtliches",           changefreq: "yearly",  priority: "0.3" },
];

function urlEntry({ loc, changefreq, priority, lastmod }) {
  return [
    "  <url>",
    `    <loc>${SITE}${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].filter(Boolean).join("\n");
}

(async () => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, created_at")
      .eq("published", true);

    if (error) throw error;

    const blogEntries = (data || []).map((p) => ({
      loc: `/blog/${p.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: (p.updated_at || p.created_at || "").slice(0, 10),
    }));

    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      [...STATIC_ROUTES, ...blogEntries].map(urlEntry).join("\n") +
      `\n</urlset>\n`;

    fs.writeFileSync(OUT, xml, "utf8");
    console.log(`[sitemap] wrote ${blogEntries.length} blog entries + ${STATIC_ROUTES.length} static routes`);
  } catch (err) {
    console.warn("[sitemap] generation failed, keeping existing public/sitemap.xml:", err.message);
    process.exit(0);
  }
})();
