import { SectionPage, pages, type SectionSearch } from "@/components/section-page";

export const metadata = { title: pages["storage"][0] };
export default function Page({ searchParams }: { searchParams: SectionSearch }) {
  return <SectionPage section="storage" searchParams={searchParams}/>;
}
