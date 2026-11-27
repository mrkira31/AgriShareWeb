import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarCheck, Combine, Leaf, MapPin, ShieldCheck, Snowflake, Sprout, Tractor, Users, Wrench, Shovel, Search } from "lucide-react";
import { HomeSearch, ListingCard } from "@/components/market";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { listings } from "@/lib/listings";

const collections = [
  { name: "Tractors", sub: "For every kind of field", icon: Tractor },
  { name: "Harvesting", sub: "Ready for the season", icon: Combine },
  { name: "Cold Storage", sub: "Keep your harvest fresh", icon: Snowflake },
  { name: "Attachments", sub: "Make more of your machine", icon: Wrench },
  { name: "Earthmoving", sub: "Prepare your land", icon: Shovel },
];
export const dynamic = "force-static";
export default function Home() {
  return <>
    <section className="hero">
      <Image src="/images/hero.webp" alt="" fill priority sizes="100vw" className="hero-image"/>
      <div className="wrap hero-inner">
        <div className="hero-kicker"><MapPin size={14}/> BUILT FOR SICILIAN FARMERS</div>
        <h1>Better farming,<br/> <em>shared.</em></h1>
        <p>Rent farm machinery and cold storage from local owners. Work smarter, spend less, and grow together across Sicily.</p>
        <HomeSearch/>
      </div>
    </section>
    <div className="trust-strip"><div className="wrap trust-inner"><span><ShieldCheck/> Local owners</span><span><CalendarCheck/> Flexible daily rentals</span><span><Leaf/> Better use of resources</span></div></div>
    <section className="wrap home-section categories-section"><Reveal>
      <div className="section-heading"><div><span className="eyebrow"><span/> THE MARKETPLACE</span><h2>Explore by category</h2><p>Find the right resource for your next job.</p></div><Link href="/explore" className="text-link">View all categories <ArrowRight size={17}/></Link></div>
      <div className="categories">{collections.map(({ name, sub, icon: Icon }) => <Link key={name} className="category" href={name === "Cold Storage" ? "/storage" : "/explore?category=" + encodeURIComponent(name)}><span className="category-icon"><Icon size={25} strokeWidth={1.65}/></span><b>{name}</b><small>{sub}</small></Link>)}</div>
    </Reveal></section>
    <section className="featured"><div className="wrap home-section"><Reveal>
      <div className="section-heading"><div><span className="eyebrow"><span/> LOCAL FAVORITES</span><h2>Featured listings</h2><p>Explore machinery and storage from across the island.</p></div><Link href="/explore" className="text-link">Explore marketplace <ArrowRight size={17}/></Link></div>
      <div className="card-grid">{listings.slice(0, 3).map(item => <ListingCard key={item.id} item={item}/>)}</div>
    </Reveal></div></section>
    <section className="wrap home-section"><Reveal>
      <div className="section-heading"><div><span className="eyebrow"><span/> FROM SEARCH TO PICKUP</span><h2>How AgriShare works</h2></div><Link href="/how-it-works" className="text-link">See how it works <ArrowRight size={17}/></Link></div>
      <div className="steps-grid">{[{icon: Search, title:"Find what you need", text:"Search by type or province and compare daily rates."}, {icon: CalendarCheck, title:"Request your dates", text:"Choose dates and review your total before sending a request."}, {icon: Users, title:"Get owner approval", text:"Check your dashboard for a decision and plan your pickup."}].map(({icon: Icon,title,text}) => <article className="info-card" key={title}><span className="category-icon"><Icon/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </Reveal></section>
    <section className="wrap lower-section"><div className="impact-banner"><span className="category-icon"><Sprout/></span><div><h2>Make more of what Sicily already has.</h2><p>Sharing idle machines and spare cold-room capacity can help farms make better use of local resources.</p></div><Button asChild variant="white"><Link href="/impact">Explore impact <ArrowUpRight size={16}/></Link></Button></div></section>
    <section className="wrap home-section final-cta"><h2>Ready for your next season?</h2><p>Try the booking journey or explore AgriShare as an owner.</p><div className="actions"><Button asChild><Link href="/explore">Find equipment <ArrowRight size={17}/></Link></Button><Button asChild variant="outline"><Link href="/demo">Take the guided demo</Link></Button></div></section>
  </>;
}
