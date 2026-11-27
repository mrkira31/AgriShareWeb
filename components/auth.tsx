"use client";

import { ArrowRight, Tractor, Warehouse } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDemo, type Role } from "./demo-state";
import { Button } from "./ui/button";

export function Auth({ register, next, initialRole }: { register: boolean; next: string; initialRole: Role }) {
  const { signIn, remembered } = useDemo();
  const router = useRouter();
  const [role, setRole] = useState<Role>(initialRole);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  return <div className="wrap auth-layout">
    <div className="auth-visual"><div><span className="hero-kicker">THE SICILIAN FARMING MARKETPLACE</span><h1>Grow with your local farming community.</h1><p>Find equipment and storage nearby, or put your spare capacity to work.</p></div></div>
    <section className="auth-form">
      <span className="eyebrow"><span/> DEMO ACCESS</span><h2>{register ? "Create your demo profile" : "Welcome back"}</h2><p>{register ? "Choose a role to get started." : "Choose a role to continue into the demo."} Your profile stays in this browser.</p>
      <form onSubmit={e => {
        e.preventDefault();
        if (register && !name.trim()) { setError("Enter a display name."); return; }
        signIn({ name: register ? name.trim() : remembered?.[role]?.name || (role === "Farmer" ? "Lucia Romano" : "Salvatore Greco"), role });
        router.push(role === "Farmer" ? next : "/dashboard/owner");
      }}>
        <fieldset><legend>Choose your role</legend><div className="role-grid">
          {([{ label: "Farmer", icon: Tractor, desc: "Rent equipment or storage" }, { label: "Owner", icon: Warehouse, desc: "Review booking requests" }] as const).map(({ label, icon: Icon, desc }) => <label className="role-option" key={label}><input type="radio" name="role" value={label} checked={role === label} onChange={() => setRole(label)}/><Icon size={23}/><span><b>{label}</b><small>{desc}</small></span></label>)}
        </div></fieldset>
        {register && <label className="field">Display name<input required maxLength={60} autoComplete="nickname" value={name} onChange={e => { setName(e.target.value); setError(""); }} placeholder="e.g. Lucia Romano"/></label>}
        {error && <p role="alert" className="notice error">{error}</p>}
        <Button className="full" type="submit">{register ? "Create demo profile" : "Continue as " + role}<ArrowRight size={17}/></Button>
      </form>
      <p>{register ? "Already exploring?" : "New to AgriShare?"} <Link className="text-link" href={(register ? "/login" : "/register") + "?" + new URLSearchParams({ role, next })}>{register ? "Log in to the demo" : "Create a demo profile"}</Link></p>
    </section>
  </div>;
}
