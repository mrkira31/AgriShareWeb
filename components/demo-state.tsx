"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

export type Role = "Farmer" | "Owner";
export type Profile = { name: string; role: Role };
export type Booking = {
  id: string; listingId: string; farmer: string; from: string; to: string; days: number;
  status: "Pending" | "Approved" | "Declined";
};
type State = { profile: Profile | null; bookings: Booking[]; saved: string[]; remembered?: Partial<Record<Role, Profile>> };
const key = "agrishare-demo-v1";
const initial: State = { profile: null, bookings: [], saved: [] };
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cached = initial;
function snapshot() {
  const raw = localStorage.getItem(key);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try { cached = raw ? JSON.parse(raw) : initial; } catch { cached = initial; }
  }
  return cached;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => { listeners.delete(listener); window.removeEventListener("storage", listener); };
}
function update(change: (previous: State) => State) {
  localStorage.setItem(key, JSON.stringify(change(snapshot())));
  listeners.forEach(listener => listener());
}
export function bookingConflict(bookings: Booking[], listingId: string, from: string, to: string) {
  return bookings.some(item => item.listingId === listingId && item.status === "Approved" && item.from <= to && item.to >= from);
}
const actions = {
  signIn: (profile: Profile | null) => update(state => ({
    ...state, profile, remembered: profile ? { ...state.remembered, [profile.role]: profile } : state.remembered,
  })),
  save: (id: string) => update(state => ({ ...state, saved: state.saved.includes(id) ? state.saved.filter(item => item !== id) : [...state.saved, id] })),
  request: (booking: Booking) => {
    const state = snapshot();
    if (state.profile?.role !== "Farmer" || bookingConflict(state.bookings, booking.listingId, booking.from, booking.to)) return false;
    update(state => ({ ...state, bookings: [booking, ...state.bookings] }));
    return true;
  },
  decide: (id: string, status: "Approved" | "Declined") => {
    const state = snapshot();
    const booking = state.bookings.find(item => item.id === id);
    if (state.profile?.role !== "Owner" || !booking || booking.status !== "Pending") return false;
    if (status === "Approved" && bookingConflict(state.bookings, booking.listingId, booking.from, booking.to)) return false;
    update(state => ({ ...state, bookings: state.bookings.map(item => item.id === id ? { ...item, status } : item) }));
    return true;
  },
};
const DemoContext = createContext(initial);
export function DemoProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, snapshot, () => initial);
  return <DemoContext.Provider value={state}>{children}</DemoContext.Provider>;
}
export function useDemo() { return { ...useContext(DemoContext), ...actions }; }
