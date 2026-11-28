import { notFound } from "next/navigation";
import { Equipment } from "@/components/equipment";
import { listings } from "@/lib/listings";

export const dynamicParams = false;
export function generateStaticParams() { return listings.map(({ id }) => ({ id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = listings.find(item => item.id === id);
  return { title: item?.name };
}
export default async function EquipmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = listings.find(item => item.id === id);
  if (!item) notFound();
  return <Equipment key={id} item={item}/>;
}
