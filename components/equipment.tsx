"use client";

import { PageHero } from "./page-hero";
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, MapPin, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore, useState } from "react";
import { euro, pricing, type Listing } from "@/lib/listings";
import { bookingConflict, useDemo } from "./demo-state";
import { Button } from "./ui/button";

const isoDate = (date: Date) => [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
const subscribeDate = () => () => {};
const getToday = () => isoDate(new Date());
const getServerDate = () => "";
export function Equipment({ item }: { item: Listing }) {
  const { profile, bookings, request } = useDemo();
  const [photo, setPhoto] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [range, setRange] = useState({ from: "", to: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const today = useSyncExternalStore(subscribeDate, getToday, getServerDate);
  const base = today ? new Date(today + "T12:00:00") : null;
  const month = base ? new Date(base.getFullYear(), base.getMonth() + monthOffset, 1) : null;
  const daysInMonth = month ? new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() : 0;
  const offset = month ? (month.getDay() + 6) % 7 : 0;
  const from = range.from || today;
  const to = range.to || range.from || today;
  const days = from && to ? Math.round((Date.parse(to) - Date.parse(from)) / 86400000) + 1 : 1;
  const cost = pricing(item.rate, days > 0 ? days : 1);
  const blocked = !!from && !!to && bookingConflict(bookings, item.id, from, to);
  const farmer = profile?.role === "Farmer";
  const storage = item.category === "Cold Storage";
  return <>
    <PageHero image={item.id} label={item.category.toUpperCase()} title={item.name}
      navigation={<Link className="text-link back-link" href={storage ? "/storage" : "/explore"}><ArrowLeft size={16}/> Back to {storage ? "cold storage" : "marketplace"}</Link>}
      description={<span className="listing-meta"><MapPin size={17}/>{item.place}, Sicily <Star size={17} className="gold"/> {item.rating} ({item.reviews} demo reviews)</span>}/>
    <div className="wrap detail-page detail-grid">
      <div>
        <div className="gallery">
          <Image src={"/images/" + item.image + (photo ? "-detail" : "") + ".webp"} alt={item.name + (photo ? " detail view" : " overview")} fill priority sizes="(max-width: 850px) 100vw, 700px"/>
          <button type="button" className="gallery-prev" aria-label="Previous photo" onClick={() => setPhoto(1 - photo)}><ChevronLeft size={20}/></button>
          <button type="button" className="gallery-next" aria-label="Next photo" onClick={() => setPhoto(1 - photo)}><ChevronRight size={20}/></button>
          <span className="gallery-counter" aria-live="polite">{photo + 1} / 2</span>
        </div>
        <div className="detail-copy"><h2>About this listing</h2><p>{item.description}</p><div className="specs">{item.specs.map(spec => <span key={spec}><Check size={17}/>{spec}</span>)}</div><div className="host"><span className="category-icon"><ShieldCheck/></span><div><b>{item.owner}</b><small>Demo listing owner</small></div></div></div>
      </div>
      <aside className="booking-panel">
        <div className="booking-title"><strong>€{item.rate}</strong> / day</div>
        <h2><CalendarDays size={20}/> Booking dates</h2>
        {month && <div className="calendar">
          <div className="calendar-header"><button type="button" className="icon-button" aria-label="Previous month" disabled={!monthOffset} onClick={() => setMonthOffset(monthOffset - 1)}><ChevronLeft size={18}/></button><b>{month.toLocaleDateString("en", { month: "long", year: "numeric" })}</b><button type="button" className="icon-button" aria-label="Next month" onClick={() => setMonthOffset(monthOffset + 1)}><ChevronRight size={18}/></button></div>
          <div className="calendar-grid">{["M", "Tu", "W", "Th", "F", "Sa", "Su"].map(day => <span key={day}>{day}</span>)}{Array.from({ length: offset }, (_, index) => <span aria-hidden key={"blank" + index}/>)}{Array.from({ length: daysInMonth }, (_, index) => {
            const date = isoDate(new Date(month.getFullYear(), month.getMonth(), index + 1));
            const disabled = date < today || bookingConflict(bookings, item.id, date, date);
            const selected = date >= from && date <= to;
            return <button type="button" key={date} aria-label={date} aria-pressed={selected} disabled={disabled} onClick={() => {
              setSent(false); setError("");
              setRange(!range.from || range.to || date < range.from ? { from: date, to: "" } : { from: range.from, to: date });
            }}>{index + 1}</button>;
          })}</div>
        </div>}
        <form onSubmit={event => {
          event.preventDefault();
          if (!today || !from || !to || from < today || days < 1 || blocked) { setError("Choose an available date range starting today or later."); return; }
          if (request({ id: Array.from(crypto.getRandomValues(new Uint32Array(4)), value => value.toString(16).padStart(8, "0")).join(""), listingId: item.id, farmer: profile?.name || "", from, to, days, status: "Pending" })) { setSent(true); setError(""); }
          else setError("The request could not be sent. Check availability and try again.");
        }}>
          <div className="date-fields"><label className="field">Start date<input type="date" required min={today || undefined} value={from} onChange={event => { setRange({ from: event.target.value, to: range.to >= event.target.value ? range.to : "" }); setSent(false); setError(""); }}/></label><label className="field">End date<input type="date" required min={from || undefined} value={to} onChange={event => { setRange({ from, to: event.target.value }); setSent(false); setError(""); }}/></label></div>
          <dl className="price-breakdown"><div><dt>€{item.rate} × {Math.max(days, 1)} {days === 1 ? "day" : "days"}</dt><dd>{euro.format(cost.subtotal)}</dd></div><div><dt>Renter service fee (3%)</dt><dd>{euro.format(cost.service)}</dd></div><div className="total"><dt>Demo total</dt><dd>{euro.format(cost.total)}</dd></div></dl>
          {blocked && <p className="notice error" role="status">These dates overlap an approved booking.</p>}
          {error && <p className="notice error" role="alert">{error}</p>}
          {sent ? <div className="notice" role="status"><b>Request sent for owner approval.</b><Link className="text-link" href="/dashboard/farmer">View my requests <ArrowRight size={16}/></Link></div> : farmer ? <Button type="submit" className="full" disabled={blocked || !today}>Request booking <ArrowRight size={17}/></Button> : <Button asChild className="full"><Link href={"/login?role=Farmer&next=" + encodeURIComponent("/equipment/" + item.id)}>Continue as Farmer to book <ArrowRight size={17}/></Link></Button>}
          <p className="booking-note">Demo pricing only. The 8% owner commission is deducted from the owner’s payout. No payment is collected.</p>
        </form>
      </aside>
    </div>
  </>;
}
