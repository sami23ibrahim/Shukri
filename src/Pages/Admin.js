import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Check session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch all posts when logged in
  useEffect(() => {
    if (session) fetchPosts();
  }, [session]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, description, thumbnail_url, published, featured_on_home, pinned, language, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Admin] fetchPosts error:", error);
      return;
    }
    if (data) setPosts(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const togglePublish = async (post) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !post.published, updated_at: new Date().toISOString() })
      .eq("id", post.id);

    if (!error) {
      setPosts(posts.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p)));
    }
  };

  const toggleFeatured = async (post) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ featured_on_home: !post.featured_on_home, updated_at: new Date().toISOString() })
      .eq("id", post.id);

    if (!error) {
      setPosts(posts.map((p) => (p.id === post.id ? { ...p, featured_on_home: !p.featured_on_home } : p)));
    }
  };

  const togglePinned = async (post) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ pinned: !post.pinned, updated_at: new Date().toISOString() })
      .eq("id", post.id);

    if (!error) {
      setPosts(posts.map((p) => (p.id === post.id ? { ...p, pinned: !p.pinned } : p)));
    }
  };

  const handleDelete = async (post) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (!error) {
      setPosts(posts.filter((p) => p.id !== post.id));
      setDeleteConfirm(null);
    }
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditDescription(post.description || "");
    setEditThumbnail(post.thumbnail_url || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditThumbnail("");
  };

  const uploadThumbnail = async (file, postId) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${postId}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-thumbnails")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      alert("Upload fehlgeschlagen: " + uploadError.message);
      setUploading(false);
      return null;
    }

    const { data } = supabase.storage.from("blog-thumbnails").getPublicUrl(fileName);
    setUploading(false);
    return data.publicUrl;
  };

  const handleFileChange = async (e, post) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadThumbnail(file, post.id);
    if (url) {
      setEditThumbnail(url);
    } else {
      setUploading(false);
    }
  };

  const removeThumbnail = () => {
    setEditThumbnail("");
  };

  const saveEdit = async (post) => {
    const updates = {
      title: editTitle,
      description: editDescription,
      thumbnail_url: editThumbnail || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("blog_posts").update(updates).eq("id", post.id);

    if (!error) {
      setPosts(
        posts.map((p) =>
          p.id === post.id
            ? { ...p, title: editTitle, description: editDescription, thumbnail_url: editThumbnail || null }
            : p
        )
      );
      cancelEdit();
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center">
        <div className="w-8 h-8 border-2 border-[#43a9ab]/30 border-t-[#43a9ab] rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen
  if (!session) {
    return (
      <div className="min-h-screen pt-24 flex items-start justify-center px-4">
        <div className="w-full max-w-sm mt-20">
          <h1 className="text-2xl font-light text-[#515757] mb-1 text-center">Admin</h1>
          <div className="w-10 h-[2px] bg-[#43a9ab]/40 mx-auto mb-8" />

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-[#515757]/60 mb-1.5 tracking-wider uppercase">
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-[#515757] focus:outline-none focus:border-[#43a9ab] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#515757]/60 mb-1.5 tracking-wider uppercase">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-[#515757] focus:outline-none focus:border-[#43a9ab] transition-colors"
              />
            </div>

            {authError && (
              <p className="text-red-500 text-xs text-center">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#43a9ab] text-white text-sm font-medium rounded-lg hover:bg-[#3a9597] transition-colors duration-300"
            >
              Anmelden
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-light text-[#515757]">Blog verwalten</h1>
            <div className="w-10 h-[2px] bg-[#43a9ab]/40 mt-2" />
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-[#515757]/40 hover:text-[#515757] transition-colors tracking-wider uppercase"
          >
            Abmelden
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-8">
          <div className="bg-[#43a9ab]/5 rounded-xl px-5 py-3">
            <span className="text-2xl font-light text-[#43a9ab]">{posts.length}</span>
            <span className="text-xs text-[#515757]/50 ml-2">Gesamt</span>
          </div>
          <div className="bg-green-50 rounded-xl px-5 py-3">
            <span className="text-2xl font-light text-green-600">
              {posts.filter((p) => p.published).length}
            </span>
            <span className="text-xs text-[#515757]/50 ml-2">Veröffentlicht</span>
          </div>
          <div className="bg-orange-50 rounded-xl px-5 py-3">
            <span className="text-2xl font-light text-orange-500">
              {posts.filter((p) => !p.published).length}
            </span>
            <span className="text-xs text-[#515757]/50 ml-2">Entwurf</span>
          </div>
        </div>

        {/* Posts list */}
        {posts.length === 0 ? (
          <p className="text-center text-[#515757]/40 py-20 text-sm">
            Noch keine Beiträge vorhanden.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-100 rounded-xl p-5 hover:border-[#43a9ab]/20 transition-all duration-300"
              >
                {editingId === post.id ? (
                  /* ── Edit mode ── */
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-[#515757]/50 mb-1">Titel</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#515757] focus:outline-none focus:border-[#43a9ab]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#515757]/50 mb-1">Beschreibung</label>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-[#515757] focus:outline-none focus:border-[#43a9ab] resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#515757]/50 mb-1">Thumbnail</label>
                      {editThumbnail ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={editThumbnail}
                            alt="Vorschau"
                            className="h-20 rounded-lg object-cover"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                          <button
                            type="button"
                            onClick={removeThumbnail}
                            className="text-xs text-red-400 hover:text-red-600 transition-colors"
                          >
                            Entfernen
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center justify-center gap-2 w-full px-3 py-4 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-[#43a9ab]/40 transition-colors">
                          {uploading ? (
                            <div className="w-4 h-4 border-2 border-[#43a9ab]/30 border-t-[#43a9ab] rounded-full animate-spin" />
                          ) : (
                            <>
                              <svg className="w-5 h-5 text-[#515757]/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                              </svg>
                              <span className="text-xs text-[#515757]/40">Bild auswählen</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, post)}
                            disabled={uploading}
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => saveEdit(post)}
                        className="px-4 py-2 bg-[#43a9ab] text-white text-xs font-medium rounded-lg hover:bg-[#3a9597] transition-colors"
                      >
                        Speichern
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 text-[#515757]/50 text-xs hover:text-[#515757] transition-colors"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── View mode ── */
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
                      {post.thumbnail_url ? (
                        <img
                          src={post.thumbnail_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#43a9ab]/5">
                          <span className="text-[#43a9ab]/30 text-lg font-light">
                            {post.title?.[0] || "B"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-[#515757] truncate">
                          {post.title}
                        </h3>
                        <span
                          className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            post.published
                              ? "bg-green-50 text-green-600"
                              : "bg-orange-50 text-orange-500"
                          }`}
                        >
                          {post.published ? "Live" : "Entwurf"}
                        </span>
                      </div>
                      {post.description && (
                        <p className="text-xs text-[#515757]/40 truncate mb-1">
                          {post.description}
                        </p>
                      )}
                      <p className="text-[10px] text-[#515757]/30">
                        /blog/{post.slug} &middot;{" "}
                        {new Date(post.created_at).toLocaleDateString("de-DE", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {/* Featured on home checkbox */}
                      <label
                        className="flex items-center gap-1.5 mr-2 cursor-pointer select-none"
                        title="Auf Startseite im 'Tiefer eintauchen' Bereich anzeigen"
                      >
                        <input
                          type="checkbox"
                          checked={!!post.featured_on_home}
                          onChange={() => toggleFeatured(post)}
                          className="w-3.5 h-3.5 rounded border-gray-300 text-[#43a9ab] focus:ring-[#43a9ab] focus:ring-1 cursor-pointer accent-[#43a9ab]"
                        />
                        <span className="text-[10px] text-[#515757]/50 tracking-wider uppercase">
                          Auf Startseite
                        </span>
                      </label>

                      {/* Pinned checkbox */}
                      <label
                        className="flex items-center gap-1.5 mr-2 cursor-pointer select-none"
                        title="Im Blog nach den 2 neuesten Artikeln oben anpinnen"
                      >
                        <input
                          type="checkbox"
                          checked={!!post.pinned}
                          onChange={() => togglePinned(post)}
                          className="w-3.5 h-3.5 rounded border-gray-300 text-[#43a9ab] focus:ring-[#43a9ab] focus:ring-1 cursor-pointer accent-[#43a9ab]"
                        />
                        <span className="text-[10px] text-[#515757]/50 tracking-wider uppercase">
                          Anpinnen
                        </span>
                      </label>

                      {/* Preview / Edit content */}
                      <Link
                        to={`/admin/edit/${post.id}`}
                        className="p-2 text-[#515757]/30 hover:text-[#43a9ab] transition-colors"
                        title="Vorschau / Inhalt bearbeiten"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </Link>

                      {/* Edit metadata */}
                      <button
                        onClick={() => startEdit(post)}
                        className="p-2 text-[#515757]/30 hover:text-[#43a9ab] transition-colors"
                        title="Metadaten bearbeiten"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                        </svg>
                      </button>

                      {/* Toggle publish */}
                      <button
                        onClick={() => togglePublish(post)}
                        className="relative w-9 h-5 rounded-full transition-colors duration-300 focus:outline-none"
                        style={{ backgroundColor: post.published ? "#43a9ab" : "#d1d5db" }}
                        title={post.published ? "Veröffentlicht — klicken zum Verbergen" : "Entwurf — klicken zum Veröffentlichen"}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                            post.published ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>

                      {/* Delete */}
                      {deleteConfirm === post.id ? (
                        <div className="flex items-center gap-1 ml-1">
                          <button
                            onClick={() => handleDelete(post)}
                            className="px-2 py-1 bg-red-500 text-white text-[10px] rounded font-medium hover:bg-red-600 transition-colors"
                          >
                            Löschen
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 text-[#515757]/40 text-[10px] hover:text-[#515757] transition-colors"
                          >
                            Nein
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
                          className="p-2 text-[#515757]/30 hover:text-red-500 transition-colors"
                          title="Löschen"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
