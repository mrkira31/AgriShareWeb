"use client";

import { PageHero } from "./page-hero";
import { ArrowRight, CalendarDays, Inbox, LogOut, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { euro, listings, pricing } from "@/lib/listings";
import { bookingConflict, useDemo, type Role } from "./demo-state";
import { Button } from "./ui/button";
import { ListingCard } from "./market";

export function Dashboard({ requested }: { requested?: Role }) {
  const { profile, bookings, saved, remembered, signIn, decide } = useDemo();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const role = requested || profile?.role || "Farmer";
  const owner = role === "Owner";
  const rows = owner ? bookings : bookings.filter(item => item.farmer === profile?.name);
  const switchRole = () => {
    const next = owner ? "Farmer" : "Owner";
    signIn(remembered?.[next] || { role: next, name: next === "Owner" ? "Salvatore Greco" : "Lucia Romano" });
    setMessage("");
    router.push("/dashboard/" + next.toLowerCase());
  };
  return <>
    <PageHero image={owner ? "owner" : "farmer"} label="DEMO WORKSPACE" title={role + " dashboard"}
      description={owner ? "Review rental requests across the demo listings." : "Track your booking requests and saved listings."}/>
    <div className="wrap page-section">
    {profile?.role !== role ? <div className="empty"><Inbox size={30}/><h2>Continue as {role === "Owner" ? "an Owner" : "a Farmer"}</h2><p>Open this workspace using the matching demo profile.</p><Button asChild><Link href={"/login?role=" + role + "&next=/dashboard/farmer"}>Open demo access <ArrowRight size={17}/></Link></Button></div> : <>
      <div className="dashboard-tools"><h2>Hello, {profile.name}</h2><div className="actions"><Button variant="outline" onClick={switchRole}><RefreshCw size={16}/> Switch to {owner ? "Farmer" : "Owner"}</Button><Button variant="outline" onClick={() => { signIn(null); router.push("/login"); }}><LogOut size={16}/> Log out</Button></div></div>
      <div className="metrics">{["Pending", "Approved", "Declined"].map(status => <article className="info-card metric" key={status}><span>{status}</span><strong>{rows.filter(item => item.status === status).length}</strong></article>)}</div>
      <h2>{owner ? "Incoming requests" : "My booking requests"}</h2>
      {message && <p role="status" className="notice">{message}</p>}
      {rows.length ? <div className="booking-list">{rows.map(row => {
        const item = listings.find(listing => listing.id === row.listingId);
        if (!item) return null;
        const cost = pricing(item.rate, row.days);
        const unavailable = row.status === "Pending" && bookingConflict(bookings, row.listingId, row.from, row.to);
        return <article className="request-card" key={row.id}><div><span className={"status status-" + row.status.toLowerCase()}>{row.status}</span><h3><Link href={"/equipment/" + item.id}>{item.name}</Link></h3><p><CalendarDays size={16}/> {row.from} to {row.to} · {row.days} {row.days === 1 ? "day" : "days"}</p>{owner && <p>Requested by {row.farmer}</p>}{unavailable && <p>These dates overlap an approved request.</p>}</div>
          <div className="request-actions"><b>{euro.format(owner ? cost.payout : cost.total)}</b><small>{owner ? "Demo payout after 8% commission" : "Demo total including 3% service fee"}</small>{owner && row.status === "Pending" && <div className="actions"><Button disabled={unavailable} onClick={() => setMessage(decide(row.id, "Approved") ? "Request approved." : "This request could not be approved.")}>Approve</Button><Button variant="outline" onClick={() => setMessage(decide(row.id, "Declined") ? "Request declined." : "This request could not be declined.")}>Decline</Button></div>}</div></article>;
      })}</div> : <div className="empty"><Inbox size={28}/><h3>No requests yet</h3><p>{owner ? "Switch to Farmer and send a booking request to see it here." : "Find a listing and request the dates you need."}</p>{!owner && <Button asChild><Link href="/explore">Explore marketplace <ArrowRight size={16}/></Link></Button>}</div>}
      {!owner && saved.length > 0 && <section className="saved-section"><h2>Saved listings</h2><div className="card-grid">{listings.filter(item => saved.includes(item.id)).map(item => <ListingCard key={item.id} item={item}/>)}</div></section>}
    </>}
    </div>
  </>;
}
