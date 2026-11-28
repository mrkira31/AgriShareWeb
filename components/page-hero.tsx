import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({ image, label, title, description }: {
  image: string;
  title: string;
  label?: string;
  description?: ReactNode;
}) {
  return <section className="page-hero" data-banner={image}>
    <Image className="page-hero-image" src={`/images/banners/${image}.webp`} alt="" fill sizes="100vw" quality={90} preload/>
    <div className="wrap">
      {label && <span className="eyebrow"><span/> {label}</span>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  </section>;
}
