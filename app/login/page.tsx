import { SectionPage, pages, type SectionSearch } from "@/components/section-page";

export const metadata = { title: pages["login"][0] };
export default function Page({ searchParams }: { searchParams: SectionSearch }) {
  return <SectionPage section="login" searchParams={searchParams}/>;
}
