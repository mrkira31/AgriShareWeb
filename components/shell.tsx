"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Sprout, X } from "lucide-react";
import { useState } from "react";
import { DemoProvider, useDemo } from "./demo-state";
import { Button } from "./ui/button";

const links = [["Explore", "/explore"], ["Cold Storage", "/storage"], ["How It Works", "/how-it-works"], ["Impact", "/impact"]];
export function Brand() {
  return <Link href="/" className="brand" aria-label="AgriShare home"><span className="brand-icon"><Sprout size={21} strokeWidth={1.8}/></span>AgriShare<span className="brand-dot">.</span></Link>;
}
function Header() {
  const { profile } = useDemo();
  const path = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === path;
  return <header className="site-header"><div className="wrap header-inner">
    <Brand/>
    <button className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpenFor(open ? null : path)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    <nav id="site-nav" aria-label="Main navigation" className={open ? "main-nav open" : "main-nav"}>
      {links.map(([label, href]) => <Link onClick={() => setOpenFor(null)} className={path === href ? "active" : ""} aria-current={path === href ? "page" : undefined} key={href} href={href}>{label}</Link>)}
      <div className="header-actions">{profile ? <Button asChild><Link href="/dashboard" onClick={() => setOpenFor(null)}>Dashboard <ArrowUpRight size={15}/></Link></Button> : <><Link href="/login" onClick={() => setOpenFor(null)}>Log in</Link><Button asChild><Link href="/register" onClick={() => setOpenFor(null)}>Get started <ArrowUpRight size={15}/></Link></Button></>}</div>
    </nav>
  </div></header>;
}
function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer-top"><div><Brand/><p>Farm machinery and cold storage, shared across Sicily.</p></div><nav aria-label="Footer"><Link href="/about">About</Link><Link href="/how-it-works">How it works</Link><Link href="/impact">Impact</Link><Link href="/demo">Guided demo <ArrowUpRight size={14}/></Link></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} AgriShare</span><span>University startup prototype · Made for Sicily</span></div></div></footer>;
}
export function AppShell({ children }: { children: React.ReactNode }) {
  return <DemoProvider><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main">{children}</main><Footer/></DemoProvider>;
}
