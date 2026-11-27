import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({ image, label, title, description, navigation }: {
  image: string;
  title: string;
  label?: string;
  description?: ReactNode;
  navigation?: ReactNode;
}) {
  return <section className="page-hero">
    <Image className="page-hero-image" src={`/images/${image}.webp`} alt="" fill sizes="100vw" preload/>
    <div className="wrap">
      {navigation}
      {label && <span className="eyebrow"><span/> {label}</span>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  </section>;
}
