import { FieldDescriptor } from "./forms";

export type Money = number;
export type Minutes = number;

export type AddOn = { name: string; price: Money; duration?: Minutes };
export type LevelPrice = { level: string; price: Money };

export type ServiceCore = {
  service: string;
  duration: Minutes;
  priceFrom?: Money;
  priceTo?: Money;
  description?: string;
  requiresConsult?: boolean;
  addOns?: AddOn[];
  levelPricing?: LevelPrice[];
  active: boolean;
};

export type ServiceRow = ServiceCore & {
  id: string;
  staffIds: string[] | null;
};

export type Service = ServiceCore;

export type CategorySection = {
  id: string;
  serviceCatagory: string;
  services: ServiceRow[];
};

export const DEFAULT_SERVICE_FORM_DATA: ServiceCore = {
  service: "",
  duration: 0,
  priceFrom: 0,
  priceTo: 0,
  description: "",
  requiresConsult: false,
  addOns: [],
  levelPricing: [],
  active: false,
};

export const SERVICE_FORM_FIELDS: FieldDescriptor<ServiceCore>[] = [
  { key: "service", label: "Service" },
  { key: "duration", label: "Duration (min)" },
  {
    key: "priceFrom",
    label: "Price From",
    render: (v) => (v === "" ? "—" : `$${(Number(v) / 100).toFixed(2)}`),
  },
  {
    key: "priceTo",
    label: "Price To",
    render: (v) => (v === "" ? "—" : `$${(Number(v) / 100).toFixed(2)}`),
  },
  { key: "requiresConsult", label: "Consult Required" },
  { key: "description", label: "Description" },
];

export type ServiceStatus = "active" | "inactive";

type ServiceListing = { serviceCatagory: string; serviceList: Service[] };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Source list (your customer-view structure), reused here.
 * You can import this from wherever you keep it.
 */
export const STATIC_SERVICE_LISTING: ServiceListing[] = [
  {
    serviceCatagory: "Cutting & Styling",
    serviceList: [
      {
        service: "Women’s Haircut",
        priceFrom: 6500,
        priceTo: 9500,
        duration: 60,
        description: "Wash, cut, blow-dry and style.",
        levelPricing: [
          { level: "Junior", price: 6500 },
          { level: "Senior", price: 8000 },
          { level: "Master", price: 9500 },
        ],
        active: true,
      },
      {
        service: "Men’s Haircut",
        priceFrom: 4000,
        priceTo: 6500,
        duration: 45,
        description: "Cut, wash, style. Neck cleanup included.",
        active: true,
      },
      {
        service: "Children’s Haircut",
        priceFrom: 3500,
        duration: 30,
        description: "Ages 10 and under.",
        active: true,
      },
      {
        service: "Bang/Fringe Trim",
        priceFrom: 1500,
        duration: 15,
        active: true,
      },
      {
        service: "Blowout",
        priceFrom: 4000,
        duration: 45,
        description: "Shampoo + round-brush finish.",
        addOns: [
          { name: "Hot Tool Finish", price: 1000, duration: 10 },
          { name: "Scalp Massage", price: 1000, duration: 10 },
        ],
        active: true,
      },
      {
        service: "Event Updo",
        priceFrom: 8500,
        priceTo: 14000,
        duration: 75,
        description: "Pinned/upstyled; day-of only.",
        requiresConsult: true,
        active: true,
      },
    ],
  },
  {
    serviceCatagory: "Color Services",
    serviceList: [
      {
        service: 'Root Retouch (up to 1" regrowth)',
        priceFrom: 8000,
        priceTo: 11000,
        duration: 90,
        description: "Single-process coverage; blow-dry included.",
        active: true,
      },
      {
        service: "Full Color",
        priceFrom: 10000,
        priceTo: 15000,
        duration: 120,
        description: "Scalp-to-ends refresh or tone shift.",
        active: true,
      },
      {
        service: "Partial Highlights",
        priceFrom: 12000,
        priceTo: 18000,
        duration: 150,
        description: "Face frame + crown foils.",
        active: true,
      },
      {
        service: "Full Highlights",
        priceFrom: 16000,
        priceTo: 24000,
        duration: 180,
        description: "Foils throughout; toner included.",
        active: true,
      },
      {
        service: "Balayage / Ombré",
        priceFrom: 18000,
        priceTo: 28000,
        duration: 195,
        description: "Hand-painted dimension; toner + blowout.",
        active: true,
      },
      {
        service: "Toner / Gloss",
        priceFrom: 4500,
        duration: 45,
        description: "Shine, tone correction, and pH seal.",
        active: true,
      },
      {
        service: "Color Correction",
        duration: 240,
        description: "Multi-step corrective work.",
        requiresConsult: true,
        active: true,
      },
    ],
  },
  {
    serviceCatagory: "Chemical Treatments",
    serviceList: [
      {
        service: "Keratin Smoothing",
        priceFrom: 22000,
        priceTo: 32000,
        duration: 180,
        description: "Frizz reduction up to 12 weeks.",
        active: true,
      },
      {
        service: "Relaxer / Straightening",
        priceFrom: 14000,
        priceTo: 22000,
        duration: 150,
        active: true,
      },
      {
        service: "Perm (Permanent Wave)",
        priceFrom: 13000,
        priceTo: 19000,
        duration: 150,
        description: "Classic or body wave.",
        active: true,
      },
    ],
  },
  {
    serviceCatagory: "Extensions",
    serviceList: [
      {
        service: "Extension Consultation",
        duration: 20,
        description: "Color match, method, maintenance plan.",
        requiresConsult: true,
        active: true,
      },
      {
        service: "Tape-In Install",
        priceFrom: 25000,
        duration: 120,
        description: "Hair cost separate; includes blending cut.",
        active: true,
      },
      {
        service: "Sew-In / Weft Install",
        priceFrom: 30000,
        duration: 150,
        description: "Hand-tied or machine wefts.",
        active: true,
      },
      {
        service: "Maintenance / Move-Up",
        priceFrom: 12000,
        duration: 90,
        active: true,
      },
      {
        service: "Removal",
        priceFrom: 6000,
        duration: 45,
        active: true,
      },
    ],
  },
  {
    serviceCatagory: "Hair & Scalp Care",
    serviceList: [
      {
        service: "Deep Conditioning",
        priceFrom: 3000,
        duration: 25,
        description: "Moisture mask + hot towel.",
        active: true,
      },
      {
        service: "Protein/Bond Repair (Olaplex/K18)",
        priceFrom: 4000,
        duration: 20,
        active: true,
      },
      {
        service: "Scalp Detox / Exfoliation",
        priceFrom: 3500,
        duration: 30,
        active: true,
      },
    ],
  },
  {
    serviceCatagory: "Additional / Add-Ons",
    serviceList: [
      {
        service: "Beard Trim / Line-Up",
        priceFrom: 2000,
        duration: 15,
        active: true,
      },
      {
        service: "Edge Cleanup (neck/around ears)",
        priceFrom: 1500,
        duration: 15,
        active: true,
      },
      {
        service: "Braiding (simple)",
        priceFrom: 4000,
        duration: 45,
        active: true,
      },
      {
        service: "Loc Maintenance / Retwist",
        priceFrom: 8000,
        duration: 120,
        active: true,
      },
      {
        service: "Bridal Trial",
        priceFrom: 9000,
        duration: 90,
        description: "Preview styling; bring inspiration.",
        active: true,
      },
      {
        service: "Wedding Day Styling",
        priceFrom: 12000,
        duration: 90,
        requiresConsult: true,
        active: true,
      },
    ],
  },
];

export const buildSections = (groups: ServiceListing[]): CategorySection[] =>
  groups.map((g) => ({
    id: `cat_${slug(g.serviceCatagory)}`,
    serviceCatagory: g.serviceCatagory,
    services: g.serviceList.map((it) => ({
      id: `svc_${slug(g.serviceCatagory)}_${slug(it.service)}`,
      service: it.service,
      duration: it.duration,
      priceFrom: it.priceFrom,
      priceTo: it.priceTo,
      requiresConsult: it.requiresConsult,
      description: it.description,
      addOns: it.addOns,
      levelPricing: it.levelPricing,
      staffIds: null,
      active: it.active,
    })),
  }));

export const SECTIONS: CategorySection[] = buildSections(
  STATIC_SERVICE_LISTING
);

export function findServiceByIds(catagoryid: string, serviceid: string) {
  const cat = SECTIONS.find((c) => c.id === catagoryid);
  const svc = cat?.services.find((s) => s.id === serviceid);
  return { cat, svc };
}

export function formatMoney(cents: Money): string {
  return `$${(cents / 100).toFixed(2)}`;
}
