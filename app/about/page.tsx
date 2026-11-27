import { SectionPage, pages } from "@/components/section-page";

export const metadata = { title: pages["about"][0] };
export default function Page() {
  return <SectionPage section="about"/>;
}
