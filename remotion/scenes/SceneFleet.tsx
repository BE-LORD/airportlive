// Scene 4 — fleet showcase. Real fleet photography presented on 3D-tilted glass
// cards that stagger in, one hero vehicle at a time. Uses CSS 3D transforms
// (perspective + rotateY) rather than Three so the real .webp images stay crisp.

import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, easeOut, phase, fadeOut, inOut } from "../theme";
import type { LayoutInfo } from "../layout";

type Vehicle = {
  name: string;
  tagline: string;
  seats: string;
  image: string;
};

// Pulled from src/lib/constants.ts (FLEET).
const FLEET: Vehicle[] = [
  {
    name: "Innova Crysta",
    tagline: "The Corporate Standard",
    seats: "6+1 · 4 Bags",
    image: "media/fleet/airportlive-innova-crysta-exterior.webp",
  },
  {
    name: "Premium Sedan",
    tagline: "Executive Comfort",
    seats: "4+1 · 2 Bags",
    image: "media/fleet/airportlive-premium-sedan-exterior.webp",
  },
  {
    name: "Tempo Traveller",
    tagline: "Group Travel Redefined",
    seats: "12–16 · 10+ Bags",
    image: "media/fleet/airportlive-tempo-traveller-exterior.webp",
  },
];

const PER_CARD = 34; // frames each vehicle owns the screen

function FleetCard({
  vehicle,
  layout,
  localFrame,
}: {
  vehicle: Vehicle;
  layout: LayoutInfo;
  localFrame: number;
}) {
  const { width } = useVideoConfig();
  const enter = phase(localFrame, 0, 16, easeOut);
  const exit = fadeOut(localFrame, PER_CARD - 8, PER_CARD, easeOut);
  const vis = Math.min(enter, exit);

  // 3D swing-in: card rotates from an angled pose to flat-ish.
  const rotateY = interpolate(enter, [0, 1], [layout.vertical ? 26 : 34, 6]);
  const rotateX = interpolate(enter, [0, 1], [10, 3]);
  const ty = interpolate(enter, [0, 1], [60, 0]);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);
  // slow parallax on the photo inside the frame
  const imgShift = interpolate(localFrame, [0, PER_CARD], [-4, 4]);

  const cardW = layout.vertical ? width * 0.82 : width * 0.5;
  const cardH = cardW * (layout.vertical ? 0.72 : 0.6);
  const nameSize = width * (layout.vertical ? 0.05 : 0.032) * layout.fontScale;
  const tagSize = width * (layout.vertical ? 0.02 : 0.014) * layout.fontScale;

  return (
    <div
      style={{
        perspective: "1600px",
        opacity: vis,
      }}
    >
      <div
        style={{
          width: cardW,
          height: cardH,
          transform: `translateY(${ty}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
          border: `1px solid ${COLORS.line}`,
          boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)`,
          background: COLORS.charcoal,
        }}
      >
        <Img
          src={staticFile(vehicle.image)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            translate: `${imgShift}px 0px`,
            scale: 1.08,
            filter: "contrast(1.05) saturate(1.02)",
          }}
        />
        {/* readability gradient */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(5,6,7,0.05) 30%, rgba(5,6,7,0.85) 100%)",
          }}
        />
        {/* glass caption strip */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: layout.vertical ? "34px 40px" : "40px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: tagSize,
              letterSpacing: tagSize * 0.3,
              textTransform: "uppercase",
              color: COLORS.signal,
            }}
          >
            {vehicle.seats}
          </div>
          <div
            style={{
              fontFamily: FONTS.serif,
              fontSize: nameSize,
              fontWeight: 600,
              color: COLORS.mist,
              lineHeight: 1,
            }}
          >
            {vehicle.name}
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: tagSize * 1.15,
              color: COLORS.muted,
              fontStyle: "italic",
            }}
          >
            {vehicle.tagline}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SceneFleet({ layout }: { layout: LayoutInfo }) {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  const labelIn = inOut(frame, 4, 18, PER_CARD * FLEET.length - 12, PER_CARD * FLEET.length);
  const label = width * (layout.vertical ? 0.022 : 0.015) * layout.fontScale;

  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      {/* section kicker */}
      <div
        style={{
          position: "absolute",
          top: layout.vertical ? 150 : 96,
          fontFamily: FONTS.mono,
          fontSize: label,
          letterSpacing: label * 0.4,
          textTransform: "uppercase",
          color: COLORS.goldSoft,
          opacity: labelIn,
        }}
      >
        The Fleet · 100+ Vehicles
      </div>

      {FLEET.map((vehicle, i) => (
        <Sequence
          key={vehicle.name}
          from={i * PER_CARD}
          durationInFrames={PER_CARD}
          layout="none"
          name={vehicle.name}
        >
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
            <InnerCard vehicle={vehicle} layout={layout} />
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

function InnerCard({ vehicle, layout }: { vehicle: Vehicle; layout: LayoutInfo }) {
  const localFrame = useCurrentFrame();
  return <FleetCard vehicle={vehicle} layout={layout} localFrame={localFrame} />;
}
