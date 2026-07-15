import { Composition } from "remotion";
import { AirportLiveIntro } from "./AirportLiveIntro";
import { AirportLiveAd, AD_TOTAL_FRAMES } from "./AirportLiveAd";

const fps = 30;

export function RemotionRoot() {
  return (
    <>
      {/* Full cinematic advertisement — the main deliverable. */}
      <Composition
        id="AirportLiveAdDesktop"
        component={AirportLiveAd}
        durationInFrames={AD_TOTAL_FRAMES}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ layout: "desktop" as const }}
      />
      <Composition
        id="AirportLiveAdVertical"
        component={AirportLiveAd}
        durationInFrames={AD_TOTAL_FRAMES}
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{ layout: "vertical" as const }}
      />

      {/* Original short intro sting — kept for the site loader. */}
      <Composition
        id="AirportLiveIntroDesktop"
        component={AirportLiveIntro}
        durationInFrames={120}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ layout: "desktop" }}
      />
      <Composition
        id="AirportLiveIntroMobile"
        component={AirportLiveIntro}
        durationInFrames={120}
        fps={fps}
        width={900}
        height={1600}
        defaultProps={{ layout: "mobile" }}
      />
    </>
  );
}
