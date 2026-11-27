import { SectionPage, pages } from "@/components/section-page";

export const metadata = { title: pages["dashboard"][0] };
export default function Page() {
  return <SectionPage section="dashboard"/>;
}
