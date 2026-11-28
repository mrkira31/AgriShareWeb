import { PageHero } from "./page-hero";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Leaf, Search, Users } from "lucide-react";
import { Market } from "@/components/market";
import { Auth } from "@/components/auth";
import { Dashboard } from "@/components/dashboard";
import { GuidedDemo, Impact } from "@/components/story";
import { Button } from "@/components/ui/button";

export const pages = {
  explore: ["Explore the marketplace", "FARM MACHINERY & STORAGE", "Find the right equipment or cold room from local owners across Sicily."],
  storage: ["Cold storage in Sicily", "POST-HARVEST STORAGE", "Reserve refrigerated space near where you grow. Compare capacity, temperatures and daily rates."],
  impact: ["The impact of sharing", "ILLUSTRATIVE ESG ANALYTICS", "Explore sample scenarios for equipment utilization and access to cold storage. All figures are illustrative."],
  about: ["Rooted in Sicily", "ABOUT AGRISHARE", "A university startup prototype for a local agricultural sharing marketplace."],
  "how-it-works": ["How AgriShare works", "FROM SEARCH TO PICKUP", "A simple way for Sicilian farmers and asset owners to arrange a rental."],
  demo: ["Walk through AgriShare", "GUIDED PRESENTATION", "Follow a rental from marketplace search through an owner’s decision."],
  login: ["Log in", "", ""],
  register: ["Create a demo profile", "", ""],
  dashboard: ["Dashboard", "", ""],
} as const;
export type SectionSearch = Promise<Record<string, string | string[] | undefined>>;
export async function SectionPage({ section, searchParams }: { section: keyof typeof pages; searchParams?: SectionSearch }) {
  const search = (await searchParams) ?? {};
  const get = (key: string) => typeof search[key] === "string" ? search[key] : "";
  if (section === "login" || section === "register") {
    const next = get("next");
    const redirect = /^\/(?:equipment\/[a-z0-9-]+|dashboard(?:\/farmer)?)$/.test(next) ? next : "/dashboard/farmer";
    return <Auth key={section + redirect + get("role")} register={section === "register"} next={redirect} initialRole={get("role") === "Owner" ? "Owner" : "Farmer"}/>;
  }
  if (section === "dashboard") return <Dashboard/>;
  const [title, label, description] = pages[section];
  return <><PageHero image={section} label={label} title={title} description={description}/>
    {(section === "explore" || section === "storage") && <Market key={JSON.stringify([section, get("q"), get("province"), get("category")])} storage={section === "storage"} query={get("q")} initialProvince={get("province")} initialCategory={section === "storage" ? "" : get("category")}/>}
    {section === "demo" && <GuidedDemo/>}
    {section === "impact" && <Impact/>}
    {section === "about" && <div className="wrap page-section prose-layout"><div><h2>Why AgriShare?</h2><p>A vineyard tractor in Marsala can sit idle between jobs while a nearby grower needs one for a day. A citrus cooperative near Acireale may have spare refrigerated space just as a neighboring farm brings in its crop. AgriShare brings those needs together.</p><h2>Built for local agriculture</h2><p>The prototype models day rentals for the work that shapes the island’s growing seasons, from durum wheat around Caltagirone to orchard work in the Iblei and citrus near Etna.</p><Button asChild><Link href="/demo">Try the guided demo <ArrowRight size={16}/></Link></Button></div><aside className="info-card"><span className="category-icon"><Leaf/></span><h3>University startup prototype</h3><p>Listing photos are illustrative. Profiles and booking requests live in your browser, and prices are demo examples.</p></aside></div>}
    {section === "how-it-works" && <div className="wrap page-section"><div className="steps-grid">{[{ icon: Search, title: "Find a local listing", text: "Compare machinery and storage by category, province, specs and daily rate." }, { icon: CalendarCheck, title: "Choose dates and request", text: "Continue as Farmer, select an available date range and check the demo total." }, { icon: Users, title: "Review the decision", text: "The Owner accepts or declines in their dashboard. The Farmer sees the updated request." }].map(({ icon: Icon, title, text }) => <article className="info-card" key={title}><span className="category-icon"><Icon/></span><h3>{title}</h3><p>{text}</p></article>)}</div><section className="info-card methodology"><h2>A €100 daily rental example</h2><p>The Farmer’s demo total is €103, including a 3% renter service fee. The Owner’s demo payout is €92 after the 8% commission. No payment is collected.</p><Button asChild><Link href="/demo">Try the guided demo <ArrowRight size={16}/></Link></Button></section></div>}
  </>;
}
