// AIRPORTLIVE — "Punjab to the Terminal"
// A cinematic ~30s premium advertisement assembled from six scenes.
// Renders identically at 1920x1080 (desktop) and 1080x1920 (vertical / reels).

import { AbsoluteFill, Audio, staticFile } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import "./fonts";
import { COLORS } from "./theme";
import { getLayout, type LayoutName } from "./layout";
import { SceneIgnition } from "./scenes/SceneIgnition";
import { SceneHook } from "./scenes/SceneHook";
import { SceneRoute3D } from "./scenes/SceneRoute3D";
import { SceneFleet } from "./scenes/SceneFleet";
import { SceneTrust } from "./scenes/SceneTrust";
import { SceneCTA } from "./scenes/SceneCTA";

export type AirportLiveAdProps = {
  layout: LayoutName;
};

// Scene durations in frames (at 30fps).
export const SCENES = {
  ignition: 90, // 3.0s
  hook: 150, // 5.0s
  route: 195, // 6.5s
  fleet: 210, // 7.0s
  trust: 135, // 4.5s
  cta: 120, // 4.0s
} as const;

// Cross-fade / transition length between scenes.
const XFADE = 16;

// With TransitionSeries the timeline overlaps each pair by the transition
// duration, so the composition length is (sum of scenes) − (5 transitions).
export const AD_TOTAL_FRAMES =
  SCENES.ignition +
  SCENES.hook +
  SCENES.route +
  SCENES.fleet +
  SCENES.trust +
  SCENES.cta -
  5 * XFADE;

const timing = linearTiming({ durationInFrames: XFADE });

export function AirportLiveAd({ layout }: AirportLiveAdProps) {
  const layoutInfo = getLayout(layout);
  const slideDir = layoutInfo.vertical ? "from-bottom" : "from-right";

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink, overflow: "hidden" }}>
      {/* Ambient light-pass audio bed, kept low so it never distracts. */}
      <Audio
        src={staticFile("media/audio/airportlive-intro-light-pass.wav")}
        volume={0.32}
      />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.ignition}>
          <SceneIgnition layout={layoutInfo} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.hook}>
          <SceneHook layout={layoutInfo} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: slideDir })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.route}>
          <SceneRoute3D layout={layoutInfo} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.fleet}>
          <SceneFleet layout={layoutInfo} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.trust}>
          <SceneTrust layout={layoutInfo} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={timing}
        />

        <TransitionSeries.Sequence durationInFrames={SCENES.cta}>
          <SceneCTA layout={layoutInfo} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
}
