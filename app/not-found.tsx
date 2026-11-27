import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <div className="wrap page-section"><div className="empty"><h1>Page not found</h1><p>Try the marketplace to find an available listing.</p><Button asChild><Link href="/explore">Explore marketplace</Link></Button></div></div>;
}
