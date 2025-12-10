// components/ServicesList.tsx
import React from "react";

type Money = number; // cents
type Minutes = number;

type ServiceItem = {
  name: string;
  priceFrom?: Money; // use either exact or range
  priceTo?: Money;
  duration: Minutes; // base duration
  description?: string;
  addOns?: { name: string; price: Money; duration?: Minutes }[];
  requiresConsult?: boolean;
  levelPricing?: { level: string; price: Money }[]; // optional tiering
};

type ServiceGroup = {
  title: string;
  items: ServiceItem[];
};

const fmtPrice = (cents?: Money) =>
  typeof cents === "number"
    ? `$${(cents / 100).toFixed(cents % 100 ? 2 : 0)}`
    : "";

const fmtPriceRange = (from?: Money, to?: Money) => {
  if (from && to && to > from) return `${fmtPrice(from)}–${fmtPrice(to)}`;
  if (from) return `From ${fmtPrice(from)}`;
  if (to) return `Up to ${fmtPrice(to)}`;
  return "Consultation";
};

const fmtDuration = (mins: Minutes) => {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
};

const SERVICES: ServiceGroup[] = [
  {
    title: "Cutting & Styling",
    items: [
      {
        name: "Women’s Haircut",
        priceFrom: 6500,
        priceTo: 9500,
        duration: 60,
        description: "Wash, cut, blow-dry and style.",
        levelPricing: [
          { level: "Junior", price: 6500 },
          { level: "Senior", price: 8000 },
          { level: "Master", price: 9500 },
        ],
      },
      {
        name: "Men’s Haircut",
        priceFrom: 4000,
        priceTo: 6500,
        duration: 45,
        description: "Cut, wash, style. Neck cleanup included.",
      },
      {
        name: "Children’s Haircut",
        priceFrom: 3500,
        duration: 30,
        description: "Ages 10 and under.",
      },
      {
        name: "Bang/Fringe Trim",
        priceFrom: 1500,
        duration: 15,
      },
      {
        name: "Blowout",
        priceFrom: 4000,
        duration: 45,
        description: "Shampoo + round-brush finish.",
        addOns: [
          { name: "Hot Tool Finish", price: 1000, duration: 10 },
          { name: "Scalp Massage", price: 1000, duration: 10 },
        ],
      },
      {
        name: "Event Updo",
        priceFrom: 8500,
        priceTo: 14000,
        duration: 75,
        description: "Pinned/upstyled; day-of only.",
        requiresConsult: true,
      },
    ],
  },
  {
    title: "Color Services",
    items: [
      {
        name: 'Root Retouch (up to 1" regrowth)',
        priceFrom: 8000,
        priceTo: 11000,
        duration: 90,
        description: "Single-process coverage; blow-dry included.",
      },
      {
        name: "Full Color",
        priceFrom: 10000,
        priceTo: 15000,
        duration: 120,
        description: "Scalp-to-ends refresh or tone shift.",
      },
      {
        name: "Partial Highlights",
        priceFrom: 12000,
        priceTo: 18000,
        duration: 150,
        description: "Face frame + crown foils.",
      },
      {
        name: "Full Highlights",
        priceFrom: 16000,
        priceTo: 24000,
        duration: 180,
        description: "Foils throughout; toner included.",
      },
      {
        name: "Balayage / Ombré",
        priceFrom: 18000,
        priceTo: 28000,
        duration: 195,
        description: "Hand-painted dimension; toner + blowout.",
      },
      {
        name: "Toner / Gloss",
        priceFrom: 4500,
        duration: 45,
        description: "Shine, tone correction, and pH seal.",
      },
      {
        name: "Color Correction",
        duration: 240,
        description: "Multi-step corrective work.",
        requiresConsult: true,
      },
    ],
  },
  {
    title: "Chemical Treatments",
    items: [
      {
        name: "Keratin Smoothing",
        priceFrom: 22000,
        priceTo: 32000,
        duration: 180,
        description: "Frizz reduction up to 12 weeks.",
      },
      {
        name: "Relaxer / Straightening",
        priceFrom: 14000,
        priceTo: 22000,
        duration: 150,
      },
      {
        name: "Perm (Permanent Wave)",
        priceFrom: 13000,
        priceTo: 19000,
        duration: 150,
        description: "Classic or body wave.",
      },
    ],
  },
  {
    title: "Extensions",
    items: [
      {
        name: "Extension Consultation",
        duration: 20,
        description: "Color match, method, maintenance plan.",
        requiresConsult: true,
      },
      {
        name: "Tape-In Install",
        priceFrom: 25000,
        duration: 120,
        description: "Hair cost separate; includes blending cut.",
      },
      {
        name: "Sew-In / Weft Install",
        priceFrom: 30000,
        duration: 150,
        description: "Hand-tied or machine wefts.",
      },
      {
        name: "Maintenance / Move-Up",
        priceFrom: 12000,
        duration: 90,
      },
      {
        name: "Removal",
        priceFrom: 6000,
        duration: 45,
      },
    ],
  },
  {
    title: "Hair & Scalp Care",
    items: [
      {
        name: "Deep Conditioning",
        priceFrom: 3000,
        duration: 25,
        description: "Moisture mask + hot towel.",
      },
      {
        name: "Protein/Bond Repair (Olaplex/K18)",
        priceFrom: 4000,
        duration: 20,
      },
      {
        name: "Scalp Detox / Exfoliation",
        priceFrom: 3500,
        duration: 30,
      },
    ],
  },
  {
    title: "Additional / Add-Ons",
    items: [
      { name: "Beard Trim / Line-Up", priceFrom: 2000, duration: 15 },
      {
        name: "Edge Cleanup (neck/around ears)",
        priceFrom: 1500,
        duration: 15,
      },
      { name: "Braiding (simple)", priceFrom: 4000, duration: 45 },
      { name: "Loc Maintenance / Retwist", priceFrom: 8000, duration: 120 },
      {
        name: "Bridal Trial",
        priceFrom: 9000,
        duration: 90,
        description: "Preview styling; bring inspiration.",
      },
      {
        name: "Wedding Day Styling",
        priceFrom: 12000,
        duration: 90,
        requiresConsult: true,
      },
    ],
  },
];

export default function ServicesList() {
  return (
    <ul className=" max-w-[600px] flex flex-col justify-center m-auto">
      {SERVICES.map((group) => (
        <li key={group.title}>
          <h1 className="mt-9 text-xl font-bold border-b">{group.title}</h1>
          <ul className="m-0 px-5 pb-5 pt-3 space-y-4">
            {group.items.map((svc) => (
              <li
                key={svc.name}
                className="p-4 hover:bg-gray-200 cursor-default"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900">{svc.name}</p>
                    {svc.description ? (
                      <p className="text-sm text-slate-600 mt-1">
                        {svc.description}
                      </p>
                    ) : null}
                    {svc.levelPricing ? (
                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        {svc.levelPricing.map((lp) => (
                          <div key={lp.level} className="flex justify-between">
                            <span className="text-slate-600">{lp.level}</span>
                            <span className="font-medium text-slate-900">
                              {fmtPrice(lp.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {svc.addOns?.length ? (
                      <div className="mt-3">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Add-ons
                        </p>
                        <ul className="mt-1 space-y-1">
                          {svc.addOns.map((a) => (
                            <li key={a.name} className="text-sm text-slate-700">
                              <span>{a.name}</span>
                              <span className="mx-2 text-slate-400">•</span>
                              <span>{fmtPrice(a.price)}</span>
                              {a.duration ? (
                                <>
                                  <span className="mx-2 text-slate-400">•</span>
                                  <span>{fmtDuration(a.duration)}</span>
                                </>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-base font-semibold text-slate-900">
                      {svc.requiresConsult
                        ? "Consultation"
                        : fmtPriceRange(svc.priceFrom, svc.priceTo)}
                    </div>
                    <div className="text-sm text-slate-600">
                      {fmtDuration(svc.duration)}
                    </div>
                    {svc.requiresConsult ? (
                      <span className="mt-1 inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                        Required
                      </span>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
