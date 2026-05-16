import { ArrowRight, Clock, MapPin } from "lucide-react";

import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { routeMedia } from "@/data/airportlive-media";
import { BUSINESS } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/links";
import type { Route } from "@/components/sections/RouteCorridor";

type RouteCardProps = {
  route: Route;
};

export function RouteCard({ route }: RouteCardProps) {
  const media = routeMedia[route.mediaKey];
  const fareMsg = `Hi ${BUSINESS.name}, I need a quote for ${route.from} to ${route.to}.`;

  return (
    <a
      href={getWhatsAppLink(fareMsg)}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-[22px] border border-white/10 bg-[#0A0A0A] transition-colors hover:border-[#E5E4E2]/30"
    >
      <div className="relative h-[150px] overflow-hidden bg-[#111111]">
        <ResponsiveImage
          {...media}
          fill
          className="opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/30 to-transparent" />
      </div>

      <div className="p-5">
        <span className="mb-3 inline-flex rounded-full border border-[#E5E4E2]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#E5E4E2]">
          {route.tag}
        </span>

        <h3 className="font-serif text-2xl leading-tight text-white">
          {route.from} <span className="italic text-[#E5E4E2]">to</span> {route.to}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-white/62">{route.desc}</p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/68">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#E5E4E2]" /> {route.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[#E5E4E2]" /> {route.distance}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#E5E4E2]">
            Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </a>
  );
}
