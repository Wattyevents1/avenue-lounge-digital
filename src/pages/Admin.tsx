import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, UtensilsCrossed, Calendar, Image, Video, BookOpen, LogOut, Plus, Trash2, Check, X } from "lucide-react";

type Tab = "overview" | "reservations" | "menu" | "events" | "gallery" | "videos";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) return <div className="pt-20 min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!isAdmin) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "reservations", label: "Reservations", icon: BookOpen },
    { key: "menu", label: "Menu", icon: UtensilsCrossed },
    { key: "events", label: "Events", icon: Calendar },
    { key: "gallery", label: "Gallery", icon: Image },
    { key: "videos", label: "Videos", icon: Video },
  ];

  return (
    <div className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && <OverviewTab />}
        {tab === "reservations" && <ReservationsTab />}
        {tab === "menu" && <MenuTab />}
        {tab === "events" && <EventsTab />}
        {tab === "gallery" && <GalleryTab />}
        {tab === "videos" && <VideosTab />}
      </div>
    </div>
  );
};

/* ─── Overview ────────────────────────────────────────── */
const OverviewTab = () => {
  const [stats, setStats] = useState({ reservations: 0, menu: 0, events: 0, videos: 0, gallery: 0 });

  useEffect(() => {
    const load = async () => {
      const [r, m, e, v, g] = await Promise.all([
        supabase.from("reservations").select("id", { count: "exact", head: true }),
        supabase.from("menu_items").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("videos").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        reservations: r.count ?? 0,
        menu: m.count ?? 0,
        events: e.count ?? 0,
        videos: v.count ?? 0,
        gallery: g.count ?? 0,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Reservations", value: stats.reservations, color: "text-primary" },
    { label: "Menu Items", value: stats.menu, color: "text-secondary" },
    { label: "Events", value: stats.events, color: "text-accent" },
    { label: "Videos", value: stats.videos, color: "text-primary" },
    { label: "Gallery Photos", value: stats.gallery, color: "text-secondary" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="glass-card p-6 text-center">
          <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{c.label}</p>
        </div>
      ))}
    </div>
  );
};

/* ─── Reservations ────────────────────────────────────── */
const ReservationsTab = () => {
  const [data, setData] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("reservations").select("*").order("created_at", { ascending: false });
    setData(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    toast.success(`Reservation ${status}`);
    load();
  };

  const deleteRes = async (id: string) => {
    await supabase.from("reservations").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-4">
      {data.length === 0 && <p className="text-muted-foreground">No reservations yet.</p>}
      {data.map((r) => (
        <div key={r.id} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-foreground">{r.name}</p>
            <p className="text-sm text-muted-foreground">{r.phone} · {r.email || "No email"}</p>
            <p className="text-sm text-muted-foreground">{r.date} · {r.guests} guests · {r.type}</p>
            {r.request && <p className="text-sm text-muted-foreground italic mt-1">"{r.request}"</p>}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
              r.status === "approved" ? "bg-green-500/20 text-green-400" :
              r.status === "rejected" ? "bg-destructive/20 text-destructive" :
              "bg-secondary/20 text-secondary"
            }`}>{r.status}</span>
            {r.status === "pending" && (
              <>
                <button onClick={() => updateStatus(r.id, "approved")} className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20"><Check size={16} /></button>
                <button onClick={() => updateStatus(r.id, "rejected")} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><X size={16} /></button>
              </>
            )}
            <button onClick={() => deleteRes(r.id)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ─── Menu ────────────────────────────────────────────── */
const MenuTab = () => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "cocktails", image_url: "" });
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("menu_items").select("*").order("category");
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.name || !form.price || !form.category) { toast.error("Fill required fields"); return; }
    const { error } = await supabase.from("menu_items").insert({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      image_url: form.image_url || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Item added");
    setForm({ name: "", description: "", price: "", category: "cocktails", image_url: "" });
    setShowForm(false);
    load();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("menu_items").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  return (
    <div className="space-y-4">
      <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
        <Plus size={16} /> Add Menu Item
      </button>
      {showForm && (
        <div className="glass-card p-4 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <input className={inputClass} placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={inputClass} placeholder="Price (number) *" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <input className={inputClass} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-3">
            <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {["cocktails","whiskey","vodka","wines","beers","soft_drinks","starters","mains","grills","fast_food","desserts"].map(c => (
                <option key={c} value={c}>{c.replace("_", " ")}</option>
              ))}
            </select>
            <input className={inputClass} placeholder="Image URL (optional)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          </div>
          <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">Save</button>
        </div>
      )}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{item.name} <span className="text-secondary text-sm ml-2">UGX {Number(item.price).toLocaleString()}</span></p>
              <p className="text-sm text-muted-foreground">{item.category} · {item.description}</p>
            </div>
            <button onClick={() => deleteItem(item.id)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Events ──────────────────────────────────────────── */
const EventsTab = () => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", description: "", date: "", event_type: "party", image_url: "" });
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.title || !form.date) { toast.error("Fill required fields"); return; }
    const { error } = await supabase.from("events").insert({
      title: form.title,
      description: form.description,
      date: new Date(form.date).toISOString(),
      event_type: form.event_type,
      image_url: form.image_url || null,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Event added");
    setForm({ title: "", description: "", date: "", event_type: "party", image_url: "" });
    setShowForm(false);
    load();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("events").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  return (
    <div className="space-y-4">
      <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
        <Plus size={16} /> Add Event
      </button>
      {showForm && (
        <div className="glass-card p-4 space-y-3">
          <input className={inputClass} placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className={`${inputClass} min-h-[80px]`} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid sm:grid-cols-3 gap-3">
            <input className={inputClass} type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <select className={inputClass} value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })}>
              {["party","dj_night","live_band","theme_night","ladies_night","corporate"].map(t => (
                <option key={t} value={t}>{t.replace("_", " ")}</option>
              ))}
            </select>
            <input className={inputClass} placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          </div>
          <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">Save</button>
        </div>
      )}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()} · {item.event_type}</p>
            </div>
            <button onClick={() => deleteItem(item.id)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Gallery ─────────────────────────────────────────── */
const GalleryTab = () => {
  const [items, setItems] = useState<any[]>([]);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const load = async () => {
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!url) { toast.error("URL required"); return; }
    await supabase.from("gallery").insert({ image_url: url, caption });
    toast.success("Photo added");
    setUrl(""); setCaption("");
    load();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("gallery").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-3">
        <input className={inputClass} placeholder="Image URL *" value={url} onChange={(e) => setUrl(e.target.value)} />
        <input className={inputClass} placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
        <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap">
          <Plus size={16} className="inline mr-1" /> Add
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((img) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden">
            <img src={img.image_url} alt={img.caption || ""} className="w-full h-40 object-cover" />
            <button onClick={() => deleteItem(img.id)} className="absolute top-2 right-2 p-1.5 rounded-lg bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Videos ──────────────────────────────────────────── */
const VideosTab = () => {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const load = async () => {
    const { data } = await supabase.from("videos").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!title || !url) { toast.error("Fill all fields"); return; }
    await supabase.from("videos").insert({ title, url, video_type: "youtube" });
    toast.success("Video added");
    setTitle(""); setUrl("");
    load();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("videos").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 flex flex-col sm:flex-row gap-3">
        <input className={inputClass} placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className={inputClass} placeholder="YouTube URL *" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap">
          <Plus size={16} className="inline mr-1" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((v) => (
          <div key={v.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{v.title}</p>
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">{v.url}</a>
            </div>
            <button onClick={() => deleteItem(v.id)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
