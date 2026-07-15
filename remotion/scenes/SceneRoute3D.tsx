// Scene 3 — the centerpiece. A 3D route arc sweeping from Punjab cities to the
// Delhi airport, rendered with @remotion/three. Every animation is driven by
// useCurrentFrame() (never useFrame) so headless rendering stays deterministic.

import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import * as THREE from "three";
import { COLORS, FONTS, easeInOut, phase, fadeOut } from "../theme";
import type { LayoutInfo } from "../layout";

// City pins laid out along the arc. x runs left→right, the last node is the
// airport (Delhi). Positions are in world units on the 3D plane.
const NODES = [
  { label: "AMRITSAR", x: -5.6, z: 1.1 },
  { label: "JALANDHAR", x: -3.6, z: -0.4 },
  { label: "LUDHIANA", x: -1.6, z: 0.6 },
  { label: "CHANDIGARH", x: 0.6, z: -0.8 },
  { label: "PATIALA", x: 2.4, z: 0.4 },
  { label: "DELHI ✈", x: 5.4, z: -0.2, airport: true },
];

// A smooth curve through the nodes that the "flight" travels along.
function useRouteCurve() {
  return new THREE.CatmullRomCurve3(
    NODES.map((n) => new THREE.Vector3(n.x, 0.02, n.z)),
    false,
    "catmullrom",
    0.5
  );
}

function Grid({ frame }: { frame: number }) {
  // A subtle animated ground grid gives the arc a sense of place and depth.
  const drift = (frame * 0.01) % 1;
  return (
    <group position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[40, 40, COLORS.signalDeep, "#0a2a2e"]}
        position={[0, drift, 0]}
      />
      <mesh>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          color={COLORS.ink}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}

function RouteLine({ frame }: { frame: number }) {
  const curve = useRouteCurve();
  // The arc "draws itself" from Punjab toward Delhi between frames 10–70.
  const progress = phase(frame, 10, 70, easeInOut);
  const points = curve.getPoints(200);
  const shown = Math.max(2, Math.floor(points.length * progress));
  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.slice(0, shown)
  );

  return (
    <group>
      {/* glow underlay */}
      <primitive
        object={
          new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
              color: COLORS.signal,
              transparent: true,
              opacity: 0.9,
            })
          )
        }
      />
    </group>
  );
}

function Plane({ frame }: { frame: number }) {
  const curve = useRouteCurve();
  const progress = phase(frame, 12, 74, easeInOut);
  const t = Math.min(0.999, progress);
  const pos = curve.getPointAt(t);
  const tangent = curve.getTangentAt(t);
  const heading = Math.atan2(tangent.x, tangent.z);
  // gentle bob so the marker feels airborne
  const lift = 0.35 + Math.sin(frame * 0.12) * 0.05;

  return (
    <group position={[pos.x, lift, pos.z]} rotation={[0, heading, 0]}>
      <mesh>
        <coneGeometry args={[0.16, 0.5, 4]} />
        <meshStandardMaterial
          color={COLORS.goldSoft}
          emissive={COLORS.gold}
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
      {/* light halo */}
      <pointLight color={COLORS.signal} intensity={2} distance={3} />
    </group>
  );
}

function Pins({ frame }: { frame: number }) {
  return (
    <group>
      {NODES.map((node, i) => {
        // Pins pop in one after another as the arc reaches them.
        const start = 8 + i * 8;
        const pop = phase(frame, start, start + 12);
        const s = interpolate(pop, [0, 1], [0, 1]);
        const h = node.airport ? 0.9 : 0.55;
        return (
          <group key={node.label} position={[node.x, 0, node.z]} scale={[s, s, s]}>
            <mesh position={[0, h / 2, 0]}>
              <cylinderGeometry args={[0.035, 0.035, h, 12]} />
              <meshStandardMaterial
                color={node.airport ? COLORS.goldSoft : COLORS.mist}
                emissive={node.airport ? COLORS.gold : COLORS.signalDeep}
                emissiveIntensity={0.5}
              />
            </mesh>
            <mesh position={[0, h, 0]}>
              <sphereGeometry args={[node.airport ? 0.16 : 0.1, 24, 24]} />
              <meshStandardMaterial
                color={node.airport ? COLORS.gold : COLORS.signal}
                emissive={node.airport ? COLORS.gold : COLORS.signal}
                emissiveIntensity={1.1}
                metalness={0.4}
                roughness={0.2}
              />
            </mesh>
            {/* ground ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
              <ringGeometry args={[0.12, 0.16, 32]} />
              <meshBasicMaterial
                color={node.airport ? COLORS.gold : COLORS.signal}
                transparent
                opacity={0.6 * pop}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Scene3D({ layout }: { layout: LayoutInfo }) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Slow cinematic camera orbit + descent, driven entirely by frame.
  const orbit = interpolate(frame, [0, 90], [-0.5, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camDist = layout.vertical ? 11 : 9;
  const camHeight = interpolate(frame, [0, 90], [7.5, 4.8], {
    easing: easeInOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camX = Math.sin(orbit) * camDist;
  const camZ = Math.cos(orbit) * camDist;

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ fov: 50, position: [camX, camHeight, camZ] }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true }}
    >
      <Sequence layout="none">
        <color attach="background" args={[COLORS.ink]} />
        <fog attach="fog" args={[COLORS.ink, 10, 22]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 10, 4]} intensity={0.8} />
        <pointLight position={[0, 6, 0]} intensity={0.6} color={COLORS.signal} />
        <group
          // camera always frames the arc centre; we rotate the whole rig via cam pos
          rotation={[0, 0, 0]}
        >
          <Grid frame={frame} />
          <RouteLine frame={frame} />
          <Pins frame={frame} />
          <Plane frame={frame} />
        </group>
        <CameraLookAt />
      </Sequence>
    </ThreeCanvas>
  );
}

// Keeps the camera pointed at the arc centre every frame.
// Reads the camera via useThree (state selector) — never useFrame — so the
// look-at is recomputed deterministically on each Remotion frame render.
function CameraLookAt() {
  const camera = useThree((state) => state.camera);
  camera.lookAt(0, 0.4, 0);
  return null;
}

export function SceneRoute3D({ layout }: { layout: LayoutInfo }) {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();

  // 2D caption layer on top of the 3D canvas.
  const titleIn = phase(frame, 6, 26);
  const titleOut = fadeOut(frame, 78, 92);
  const kickerIn = phase(frame, 14, 32);

  const headline = width * (layout.vertical ? 0.062 : 0.05) * layout.fontScale;
  const kicker = width * (layout.vertical ? 0.02 : 0.014) * layout.fontScale;

  return (
    <AbsoluteFill>
      <Scene3D layout={layout} />

      {/* caption block anchored to the top, clear of the 3D arc */}
      <AbsoluteFill
        style={{
          padding: layout.vertical ? "140px 70px" : "90px 120px",
          alignItems: layout.vertical ? "center" : "flex-start",
          justifyContent: "flex-start",
          opacity: Math.min(titleIn, titleOut),
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: kicker,
            letterSpacing: kicker * 0.35,
            color: COLORS.signal,
            fontWeight: 500,
            opacity: kickerIn,
            translate: `0px ${interpolate(kickerIn, [0, 1], [16, 0])}px`,
            textTransform: "uppercase",
          }}
        >
          One Network · Every Airport
        </div>
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: headline,
            lineHeight: 1.02,
            color: COLORS.mist,
            fontWeight: 600,
            marginTop: headline * 0.18,
            textAlign: layout.vertical ? "center" : "left",
            translate: `0px ${interpolate(titleIn, [0, 1], [28, 0])}px`,
            textShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          Punjab to the Terminal,
          <br />
          <span style={{ fontStyle: "italic", color: COLORS.goldSoft }}>
            on schedule.
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
