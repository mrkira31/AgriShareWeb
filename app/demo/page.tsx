import { SectionPage, pages } from "@/components/section-page";

export const metadata = { title: pages["demo"][0] };
export default function Page() {
  return <SectionPage section="demo"/>;
}
