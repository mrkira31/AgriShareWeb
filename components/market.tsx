"use client";

import { ArrowDownUp, ArrowRight, ChevronDown, Heart, MapPin, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories, listings, provinces, type Listing } from "@/lib/listings";
import { useDemo } from "./demo-state";
import { Button } from "./ui/button";

export function ListingCard({ item }: { item: Listing }) {
  const { saved, save } = useDemo();
  const selected = saved.includes(item.id);
  return <article className="listing-card">
    <div className="listing-media">
      <Link href={"/equipment/" + item.id} aria-label={item.name}><Image src={"/images/" + item.image + ".webp"} alt={item.name + " in Sicily"} fill sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 370px"/></Link>
      <span className="media-tag">{item.category}</span>
      <button type="button" className="heart" aria-label={(selected ? "Remove saved " : "Save ") + item.name} aria-pressed={selected} onClick={() => save(item.id)}><Heart size={18} fill={selected ? "currentColor" : "none"}/></button>
    </div>
    <div className="listing-content">
      <div className="listing-name"><Link href={"/equipment/" + item.id}>{item.name}</Link><span className="rating"><Star size={14} fill="currentColor"/><b>{item.rating}</b><span>({item.reviews})</span></span></div>
      <p className="place"><MapPin size={15}/>{item.place}, Sicily</p>
      <div className="listing-price"><span><strong>€{item.rate}</strong> / day</span><Link href={"/equipment/" + item.id} aria-label={"View " + item.name} className="listing-arrow"><ArrowRight size={17}/></Link></div>
    </div>
  </article>;
}
export function HomeSearch() {
  const router = useRouter();
  return <form className="hero-search" action="/explore" onSubmit={event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of data) if (typeof value === "string" && value.trim()) params.set(key, value.trim());
    router.push("/explore?" + params.toString());
  }}>
    <label className="hero-input"><Search size={19}/><span><b>What do you need?</b><input name="q" placeholder="Tractor, harvester, cold room…"/></span></label>
    <label className="hero-input hero-location"><MapPin size={19}/><span><b>Where?</b><select name="province" defaultValue=""><option value="">All of Sicily</option>{provinces.map(province => <option key={province}>{province}</option>)}</select></span><ChevronDown size={14}/></label>
    <Button className="search-submit"><Search size={17}/> Search</Button>
  </form>;
}
function normalizeSearch(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

export function Market({ storage, query, initialProvince, initialCategory }: { storage: boolean; query: string; initialProvince: string; initialCategory: string }) {
  const [q, setQ] = useState(query);
  const [province, setProvince] = useState(initialProvince);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("featured");
  const [onlySaved, setOnlySaved] = useState(false);
  const { saved } = useDemo();
  const words = normalizeSearch(q.trim()).split(/\s+/);
  const results = listings.filter(item =>
    (!storage || item.category === "Cold Storage") && (!category || item.category === category) &&
    (!province || item.province === province) && (!onlySaved || saved.includes(item.id)) &&
    words.every(word => normalizeSearch([item.name, item.place, item.province, item.category, item.description, ...item.specs].join(" ")).includes(word))
  );
  if (sort === "low") results.sort((a, b) => a.rate - b.rate);
  if (sort === "high") results.sort((a, b) => b.rate - a.rate);
  if (sort === "rating") results.sort((a, b) => Number(b.rating) - Number(a.rating));
  return <div className="wrap page-section">
    <div className="filter-panel">
      <label>Search<input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={storage ? "Cold room, oranges…" : "Name, category or town"}/></label>
      {!storage && <label>Category<select value={category} onChange={e => setCategory(e.target.value)}><option value="">All categories</option>{categories.map(item => <option key={item}>{item}</option>)}</select></label>}
      <label>Province<select value={province} onChange={e => setProvince(e.target.value)}><option value="">All of Sicily</option>{provinces.map(item => <option key={item}>{item}</option>)}</select></label>
      <label>Sort by<select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Lowest price</option><option value="high">Highest price</option><option value="rating">Top rated</option></select></label>
    </div>
    <div className="result-line"><p aria-live="polite"><ArrowDownUp size={16}/> {results.length} {results.length === 1 ? "listing" : "listings"}</p><Button type="button" variant="outline" aria-pressed={onlySaved} onClick={() => setOnlySaved(!onlySaved)}><Heart size={16} fill={onlySaved ? "currentColor" : "none"}/> Saved only</Button></div>
    {results.length ? <div className="card-grid">{results.map(item => <ListingCard key={item.id} item={item}/>)}</div> : <div className="empty"><Search size={30}/><h2>No matching listings</h2><p>Try a different search or clear your filters.</p><Button type="button" onClick={() => { setQ(""); setCategory(""); setProvince(""); setSort("featured"); setOnlySaved(false); }}>Clear filters</Button></div>}
  </div>;
}
