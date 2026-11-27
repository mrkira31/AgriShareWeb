"use client";

import { ArrowLeft, ArrowRight, CalendarCheck, Leaf, Search, Tractor, Warehouse } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export const steps = [
  { name: "Browse the marketplace", text: "Compare local machinery by category, province and rental rate. Start with a tractor in Ragusa or explore cold storage near Etna.", href: "/explore", action: "Explore listings", icon: Search },
  { name: "Send a booking request", text: "Continue as a Farmer, pick your dates and review the 3% renter service fee before submitting.", href: "/login?role=Farmer&next=/equipment/john-deere-5075e", action: "Start Farmer booking", icon: CalendarCheck },
  { name: "Review as an Owner", text: "Open the Owner dashboard to approve or decline the request. The payout example reflects the 8% owner commission.", href: "/login?role=Owner", action: "Open Owner access", icon: Warehouse },
  { name: "Check the Farmer dashboard", text: "Switch back to Farmer to see the decision. Then explore the illustrative impact of sharing farm assets in Sicily.", href: "/login?role=Farmer&next=/dashboard/farmer", action: "Check booking status", icon: Tractor },
  { name: "Explore potential impact", text: "Compare illustrative sharing scenarios and see how equipment and cold-room utilization could change.", href: "/impact", action: "Explore impact", icon: Leaf },
];

export function GuidedDemo() {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const Icon = step.icon;
  return <div className="wrap page-section guide">
    <ol className="guide-nav" aria-label="Presentation steps">{steps.map((item, i) => <li key={item.name}><button aria-current={i === index ? "step" : undefined} onClick={() => setIndex(i)}><span>{i + 1}</span>{item.name}</button></li>)}</ol>
    <section className="info-card guide-step" aria-live="polite"><span className="category-icon"><Icon/></span><h2>{step.name}</h2><p>{step.text}</p><Button asChild><Link href={step.href}>{step.action}<ArrowRight size={17}/></Link></Button><div className="guide-controls"><Button variant="outline" disabled={index === 0} onClick={() => setIndex(index - 1)}><ArrowLeft size={17}/> Back</Button><span>{index + 1} / {steps.length}</span><Button variant="outline" disabled={index === steps.length - 1} onClick={() => setIndex(index + 1)}>Next <ArrowRight size={17}/></Button></div></section>
  </div>;
}

const scenarios = {
  pilot: { name: "Local pilot", values: [120, 36, 14], months: [9, 13, 18, 24, 28, 28] },
  regional: { name: "Regional rollout", values: [480, 144, 56], months: [32, 43, 67, 96, 121, 121] },
};
export function Impact() {
  const [scenario, setScenario] = useState<keyof typeof scenarios>("pilot");
  const data = scenarios[scenario];
  return <div className="wrap page-section">
    <div className="result-line"><p>Illustrative scenario · Six months</p><label className="field scenario">Scenario<select value={scenario} onChange={event => setScenario(event.target.value as keyof typeof scenarios)}>{Object.entries(scenarios).map(([value, item]) => <option key={value} value={value}>{item.name}</option>)}</select></label></div>
    <div className="metrics">{["Machinery rental days", "Cold-room bay-days", "Participating farms"].map((label, index) => <article className="info-card metric" key={label}><span>{label}</span><strong>{data.values[index]}</strong></article>)}</div>
    <section className="info-card chart"><h2>Machinery rental days by month</h2><p>Sample values for a Sicilian growing season.</p><div className="bars" aria-label="Monthly machinery rental days">{data.months.map((value, index) => <div className="bar-group" key={index}><b>{value}</b><div className="bar" style={{ height: (170 * value / Math.max(...data.months)) + "px" }}/><span>{["Apr", "May", "Jun", "Jul", "Aug", "Sep"][index]}</span></div>)}</div></section>
    <section className="info-card methodology"><h2>How to read these figures</h2><p>The sample aggregates assumed bookings, reserved cold-room bay-days and distinct participating farms. The environmental lens is equipment utilization, the social lens is access for local farms, and the governance lens is transparent fees and recorded owner decisions. AgriShare has no measured emissions or waste reduction data in this prototype.</p></section>
  </div>;
}
