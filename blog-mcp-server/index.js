import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// ── Supabase client (uses service role key to bypass RLS) ──
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ── Helper: generate URL-friendly slug from title ──
function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Create a new MCP server instance with all tools registered ──
function createBlogServer() {
  const server = new McpServer({
    name: "vivecura-blog",
    version: "1.0.0",
  });

  // ══════════════════════════════════════════════
  //  TOOL: publish_blog_post
  // ══════════════════════════════════════════════
  server.tool(
    "publish_blog_post",
    `Publish a new blog post to the ViveCura website.

IMPORTANT WORKFLOW: ALWAYS show the user a preview of the HTML as an artifact FIRST. Only call this tool AFTER the user has approved the design.

HTML RULES:
- Must be a COMPLETE, self-contained HTML page with ALL styles inlined (no external CSS links).
- Each blog post should have its own unique design, layout, colors, fonts, and animations.
- Include <!DOCTYPE html>, <html>, <head>, and <body> tags.
- Make the design responsive (mobile-friendly).
- Keep the HTML concise and under 10KB. Avoid excessive repetition in CSS.
- Use Google Fonts via @import if needed, but all other styles must be inline.`,
    {
      title: z.string().describe("The blog post title"),
      description: z
        .string()
        .optional()
        .describe("Short description for the blog card preview (1-2 sentences)"),
      html_content: z
        .string()
        .describe(
          "Complete, self-contained HTML page with inline styles. Must include <!DOCTYPE html> and be fully responsive."
        ),
      thumbnail_url: z
        .string()
        .optional()
        .describe("URL for the thumbnail image shown on the blog listing page"),
      slug: z
        .string()
        .optional()
        .describe("URL-friendly slug (e.g. 'teeth-whitening'). Auto-generated from title if omitted."),
      language: z
        .enum(["de", "en"])
        .optional()
        .describe("Language of the post. Defaults to 'de' (German)."),
    },
    async ({ title, description, html_content, thumbnail_url, slug, language }) => {
      const finalSlug = slug || toSlug(title);

      const { data, error } = await supabase
        .from("blog_posts")
        .insert({
          title,
          slug: finalSlug,
          description: description || "",
          html_content,
          thumbnail_url: thumbnail_url || null,
          language: language || "de",
          published: false,
        })
        .select()
        .single();

      if (error) {
        return {
          content: [{ type: "text", text: `Error publishing post: ${error.message}` }],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Blog post saved as draft!\n\nTitle: ${data.title}\nSlug: ${data.slug}\nURL: /blog/${data.slug}\nStatus: Draft (unpublished)\n\nThe admin can preview, edit, and publish it from the admin dashboard.`,
          },
        ],
      };
    }
  );

  // ══════════════════════════════════════════════
  //  TOOL: list_blog_posts
  // ══════════════════════════════════════════════
  server.tool(
    "list_blog_posts",
    "List all blog posts on the ViveCura website.",
    {
      include_unpublished: z
        .boolean()
        .optional()
        .describe("Include unpublished/draft posts. Defaults to false."),
    },
    async ({ include_unpublished }) => {
      let query = supabase
        .from("blog_posts")
        .select("id, title, slug, description, published, language, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (!include_unpublished) {
        query = query.eq("published", true);
      }

      const { data, error } = await query;

      if (error) {
        return {
          content: [{ type: "text", text: `Error listing posts: ${error.message}` }],
        };
      }

      if (!data || data.length === 0) {
        return { content: [{ type: "text", text: "No blog posts found." }] };
      }

      const list = data
        .map(
          (p, i) =>
            `${i + 1}. "${p.title}" (/blog/${p.slug}) — ${p.published ? "Published" : "Draft"} — ${new Date(p.created_at).toLocaleDateString("de-DE")}`
        )
        .join("\n");

      return {
        content: [{ type: "text", text: `Found ${data.length} blog post(s):\n\n${list}` }],
      };
    }
  );

  // ══════════════════════════════════════════════
  //  TOOL: update_blog_post
  // ══════════════════════════════════════════════
  server.tool(
    "update_blog_post",
    "Update an existing blog post by its slug.",
    {
      slug: z.string().describe("The slug of the post to update"),
      title: z.string().optional().describe("New title"),
      description: z.string().optional().describe("New description"),
      html_content: z
        .string()
        .optional()
        .describe("New HTML content (complete page)"),
      thumbnail_url: z.string().optional().describe("New thumbnail URL"),
      new_slug: z.string().optional().describe("New URL slug"),
    },
    async ({ slug, title, description, html_content, thumbnail_url, new_slug }) => {
      const updates = { updated_at: new Date().toISOString() };
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (html_content !== undefined) updates.html_content = html_content;
      if (thumbnail_url !== undefined) updates.thumbnail_url = thumbnail_url;
      if (new_slug !== undefined) updates.slug = new_slug;

      const { data, error } = await supabase
        .from("blog_posts")
        .update(updates)
        .eq("slug", slug)
        .select()
        .single();

      if (error) {
        return {
          content: [{ type: "text", text: `Error updating post: ${error.message}` }],
        };
      }

      return {
        content: [{ type: "text", text: `Post "${data.title}" updated successfully.` }],
      };
    }
  );

  // ══════════════════════════════════════════════
  //  TOOL: unpublish_blog_post
  // ══════════════════════════════════════════════
  server.tool(
    "unpublish_blog_post",
    "Unpublish a blog post (hides it from the website without deleting).",
    {
      slug: z.string().describe("The slug of the post to unpublish"),
    },
    async ({ slug }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .update({ published: false, updated_at: new Date().toISOString() })
        .eq("slug", slug)
        .select()
        .single();

      if (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }

      return {
        content: [{ type: "text", text: `Post "${data.title}" has been unpublished.` }],
      };
    }
  );

  // ══════════════════════════════════════════════
  //  TOOL: republish_blog_post
  // ══════════════════════════════════════════════
  server.tool(
    "republish_blog_post",
    "Republish a previously unpublished blog post.",
    {
      slug: z.string().describe("The slug of the post to republish"),
    },
    async ({ slug }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .update({ published: true, updated_at: new Date().toISOString() })
        .eq("slug", slug)
        .select()
        .single();

      if (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }

      return {
        content: [{ type: "text", text: `Post "${data.title}" is now live again.` }],
      };
    }
  );

  // ══════════════════════════════════════════════
  //  TOOL: delete_blog_post
  // ══════════════════════════════════════════════
  server.tool(
    "delete_blog_post",
    "Permanently delete a blog post. This cannot be undone.",
    {
      slug: z.string().describe("The slug of the post to delete"),
    },
    async ({ slug }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("slug", slug)
        .select()
        .single();

      if (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }

      return {
        content: [
          { type: "text", text: `Post "${data.title}" has been permanently deleted.` },
        ],
      };
    }
  );

  return server;
}

// ══════════════════════════════════════════════
//  START: Remote (SSE) or Local (stdio)
// ══════════════════════════════════════════════
if (process.env.PORT) {
  // ── Remote mode: Express + SSE ──
  const app = express();
  app.use(express.json());

  const sessions = new Map();

  // Health check for Render
  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  // SSE endpoint — Claude connects here
  app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport("/messages", res);
    sessions.set(transport.sessionId, transport);

    res.on("close", () => {
      sessions.delete(transport.sessionId);
    });

    const server = createBlogServer();
    await server.connect(transport);
  });

  // Message endpoint — Claude sends tool calls here
  app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = sessions.get(sessionId);
    if (transport) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(400).json({ error: "Unknown session" });
    }
  });

  const port = parseInt(process.env.PORT);
  app.listen(port, () => {
    console.log(`ViveCura Blog MCP server running on port ${port} (SSE mode)`);
  });
} else {
  // ── Local mode: stdio for Claude Desktop ──
  const server = createBlogServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
