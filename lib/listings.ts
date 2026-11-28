export const categories = ["Tractors", "Harvesting", "Cold Storage", "Attachments", "Earthmoving"] as const;
export type Category = typeof categories[number];

export type Listing = {
  id: string; name: string; category: Category; place: string; province: string;
  rate: number; rating: string; reviews: number; image: string; owner: string; specs: string[]; description: string;
};
export const listings: Listing[] = [
  { id: "john-deere-5075e", name: "John Deere 5075E", category: "Tractors", place: "Ragusa", province: "Ragusa", rate: 120, rating: "4.9", reviews: 18, image: "tractor", owner: "Salvatore • Azienda Verde", specs: ["75 hp diesel", "4-wheel drive", "Front loader"], description: "A versatile workhorse for the fields and olive groves around Ragusa. Well suited to tillage, carrying bins and preparing ground before planting. Pickup and a short handover are included." },
  { id: "etna-cold-room", name: "Etna Cold Room", category: "Cold Storage", place: "Acireale", province: "Catania", rate: 85, rating: "4.8", reviews: 12, image: "cold", owner: "Maria • Cooperativa Etna", specs: ["12 pallet positions", "0–4 °C", "Loading dock"], description: "Temperature-controlled space for freshly picked produce, with easy access from the A18. The daily rate covers a reserved bay of up to 12 pallets." },
  { id: "case-ih-axial-flow", name: "Case IH Axial-Flow 6140", category: "Harvesting", place: "Caltagirone", province: "Catania", rate: 340, rating: "5.0", reviews: 9, image: "combine", owner: "Francesco • Terre Calatine", specs: ["6.1 m header", "Grain and pulses", "Operator available"], description: "A rotary combine set up for the durum wheat and pulse harvest in the Calatino. Ask the owner about operator availability and access to your fields." },
  { id: "new-holland-t4", name: "New Holland T4.80V", category: "Tractors", place: "Marsala", province: "Trapani", rate: 105, rating: "4.9", reviews: 16, image: "vineyard", owner: "Giulia • Vigne del Sale", specs: ["80 hp diesel", "Narrow vineyard chassis", "Rear PTO"], description: "A narrow vineyard tractor for working between tight rows on the western coast. Ideal for mowing, cultivation and canopy work." },
  { id: "kubota-kx057", name: "Kubota KX057-4", category: "Earthmoving", place: "Noto", province: "Siracusa", rate: 165, rating: "4.7", reviews: 7, image: "excavator", owner: "Antonio • Azienda Iblea", specs: ["5.5 tonne class", "Rubber tracks", "Two buckets"], description: "Compact excavator for farm drainage, irrigation trenches and light grading. The owner can coordinate delivery separately." },
  { id: "piana-citrus-storage", name: "Piana Citrus Storage", category: "Cold Storage", place: "Lentini", province: "Siracusa", rate: 70, rating: "4.8", reviews: 11, image: "citrus", owner: "Elena • Agrumi della Piana", specs: ["8 pallet positions", "4–8 °C", "Pallet jack"], description: "A refrigerated bay near the Piana di Catania for blood oranges and other citrus. One booking reserves the whole bay." },
  { id: "maschio-flail-mower", name: "Maschio Flail Mower", category: "Attachments", place: "Vittoria", province: "Ragusa", rate: 55, rating: "4.8", reviews: 6, image: "attachment", owner: "Salvatore • Azienda Verde", specs: ["1.8 m working width", "540 rpm PTO", "Category II hitch"], description: "A tractor-mounted mower for orchard grass and light prunings. Confirm hitch and power requirements with the owner before pickup." },
  {
    id: "belice-olive-harvester", name: "Belice Olive Harvester", category: "Harvesting",
    place: "Castelvetrano", province: "Trapani", rate: 410, rating: "4.9", reviews: 8,
    image: "olive-harvester", owner: "Pietro • Oliveti del Belice",
    specs: ["Over-the-row harvester", "High-density olive rows", "Operator available"],
    description: "A self-propelled harvester for high-density olive groves in the Belice Valley. Share your row spacing and headland access with the owner before requesting a date. Operator availability is confirmed separately.",
  },
  {
    id: "alcamo-vineyard-sprayer", name: "Alcamo Vineyard Sprayer", category: "Attachments",
    place: "Alcamo", province: "Trapani", rate: 65, rating: "4.8", reviews: 10,
    image: "vineyard-sprayer", owner: "Chiara • Tenuta Alcamo",
    specs: ["600 L tank", "540 rpm PTO", "Trailed airblast sprayer"],
    description: "A compact airblast sprayer for narrow vineyard rows near Alcamo. The daily rental covers the attachment. Confirm coupling and PTO compatibility with the owner, and return the tank clean and empty.",
  },
  {
    id: "canicatti-produce-bay", name: "Canicattì Produce Bay", category: "Cold Storage",
    place: "Canicattì", province: "Agrigento", rate: 95, rating: "4.9", reviews: 7,
    image: "produce-bay", owner: "Lucia • Cooperativa dei Vigneti",
    specs: ["10 pallet positions", "2–5 °C", "Ground-level loading"],
    description: "A reserved chilled bay for table grapes and other compatible produce near Canicattì. The daily rate covers up to 10 pallet positions. Confirm temperature requirements and an arrival window with the cooperative.",
  },
];
export const provinces = [...new Set(listings.map(item => item.province))].sort();
export const euro = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
export function pricing(rate: number, days: number) {
  const subtotal = rate * 100 * days;
  const service = Math.round(subtotal * 0.03);
  const commission = Math.round(subtotal * 0.08);
  return { subtotal: subtotal / 100, service: service / 100, commission: commission / 100, total: (subtotal + service) / 100, payout: (subtotal - commission) / 100 };
}
