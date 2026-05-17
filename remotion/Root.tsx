import { Composition } from "remotion";
import { AirportLiveIntro } from "./AirportLiveIntro";

const fps = 30;
const durationInFrames = 120;

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="AirportLiveIntroDesktop"
        component={AirportLiveIntro}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ layout: "desktop" }}
      />
      <Composition
        id="AirportLiveIntroMobile"
        component={AirportLiveIntro}
        durationInFrames={durationInFrames}
        fps={fps}
        width={900}
        height={1600}
        defaultProps={{ layout: "mobile" }}
      />
    </>
  );
}
