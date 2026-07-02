import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  detectDeviceTier,
  getFeatureGates,
  isFeatureEnabled,
  getParticleCount,
  getPixelRatio,
  getTargetFPS,
  shouldReduceQuality,
} from "./feature-gating";

function mockWebGL(opts: {
  supported?: boolean;
  renderer?: string;
  maxTextureSize?: number;
} = {}) {
  const {
    supported = true,
    renderer = "NVIDIA GeForce GTX 1080",
    maxTextureSize = 16384,
  } = opts;

  const UNMASKED_RENDERER = 0x9246;
  const UNMASKED_VENDOR = 0x9245;

  if (!supported) {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    return;
  }

  const mockGl = {
    getExtension: vi.fn().mockReturnValue({
      UNMASKED_RENDERER_WEBGL: UNMASKED_RENDERER,
      UNMASKED_VENDOR_WEBGL: UNMASKED_VENDOR,
    }),
    getParameter: vi.fn().mockImplementation((param: number) => {
      if (param === UNMASKED_RENDERER) return renderer;
      if (param === UNMASKED_VENDOR) return "Test Vendor";
      return maxTextureSize;
    }),
    MAX_TEXTURE_SIZE: 0x0d33,
    MAX_VERTEX_UNIFORM_VECTORS: 0x8dfb,
    MAX_FRAGMENT_UNIFORM_VECTORS: 0x8dfd,
    MAX_VARYING_VECTORS: 0x8dfc,
    MAX_VERTEX_ATTRIBS: 0x8869,
    MAX_TEXTURE_IMAGE_UNITS: 0x8872,
  };

  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    (contextId: string) => {
      if (contextId === "webgl2") return mockGl as unknown as RenderingContext;
      return null;
    }
  );
}

function setNavigatorProps(props: {
  userAgent?: string;
  deviceMemory?: number | undefined;
  hardwareConcurrency?: number;
  connection?: { effectiveType?: string; saveData?: boolean } | undefined;
}) {
  if (props.userAgent !== undefined) {
    Object.defineProperty(navigator, "userAgent", {
      value: props.userAgent,
      configurable: true,
    });
  }
  Object.defineProperty(navigator, "deviceMemory", {
    value: props.deviceMemory,
    configurable: true,
  });
  Object.defineProperty(navigator, "hardwareConcurrency", {
    value: props.hardwareConcurrency ?? 8,
    configurable: true,
  });
  Object.defineProperty(navigator, "connection", {
    value: props.connection,
    configurable: true,
  });
}

// Top-level reset ensures no navigator property leaks between describe blocks
beforeEach(() => {
  vi.restoreAllMocks();
  setNavigatorProps({
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    deviceMemory: undefined,
    hardwareConcurrency: 8,
    connection: undefined,
  });
});

describe("detectDeviceTier", () => {

  it("returns 'low' for mobile user agents", () => {
    setNavigatorProps({
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
      deviceMemory: 8,
      hardwareConcurrency: 8,
    });
    mockWebGL({ renderer: "Apple GPU", maxTextureSize: 16384 });
    expect(detectDeviceTier()).toBe("low");
  });

  it("returns 'low' when WebGL is not supported", () => {
    mockWebGL({ supported: false });
    expect(detectDeviceTier()).toBe("low");
  });

  it("returns 'low' for low memory devices", () => {
    setNavigatorProps({ deviceMemory: 2, hardwareConcurrency: 8 });
    mockWebGL();
    expect(detectDeviceTier()).toBe("low");
  });

  it("returns 'low' for low CPU core count", () => {
    setNavigatorProps({ deviceMemory: undefined, hardwareConcurrency: 2 });
    mockWebGL();
    expect(detectDeviceTier()).toBe("low");
  });

  it("returns 'low' for slow connections", () => {
    setNavigatorProps({
      deviceMemory: 8,
      hardwareConcurrency: 8,
      connection: { effectiveType: "2g" },
    });
    mockWebGL();
    expect(detectDeviceTier()).toBe("low");
  });

  it("returns 'low' for save-data connections", () => {
    setNavigatorProps({
      deviceMemory: 8,
      hardwareConcurrency: 8,
      connection: { saveData: true },
    });
    mockWebGL();
    expect(detectDeviceTier()).toBe("low");
  });

  it("returns 'low' for Intel HD Graphics", () => {
    setNavigatorProps({ deviceMemory: 8, hardwareConcurrency: 8 });
    mockWebGL({ renderer: "Intel HD Graphics 530" });
    expect(detectDeviceTier()).toBe("low");
  });

  it("returns 'low' for small texture size", () => {
    setNavigatorProps({ deviceMemory: 8, hardwareConcurrency: 8 });
    mockWebGL({ renderer: "Some GPU", maxTextureSize: 2048 });
    expect(detectDeviceTier()).toBe("low");
  });

  it("returns 'high' for high-end desktop with NVIDIA GPU", () => {
    setNavigatorProps({ deviceMemory: 16, hardwareConcurrency: 16 });
    mockWebGL({ renderer: "NVIDIA GeForce RTX 3080", maxTextureSize: 16384 });
    expect(detectDeviceTier()).toBe("high");
  });

  it("returns 'high' for Apple GPU with high specs", () => {
    setNavigatorProps({ deviceMemory: undefined, hardwareConcurrency: 10 });
    mockWebGL({ renderer: "Apple GPU", maxTextureSize: 16384 });
    expect(detectDeviceTier()).toBe("high");
  });

  it("returns 'mid' for mid-range devices", () => {
    setNavigatorProps({ deviceMemory: 8, hardwareConcurrency: 4 });
    mockWebGL({ renderer: "Some Mid-range GPU", maxTextureSize: 8192 });
    expect(detectDeviceTier()).toBe("mid");
  });
});

describe("getFeatureGates", () => {
  it("returns full features for high tier", () => {
    const gates = getFeatureGates("high");
    expect(gates.enableParticles).toBe(true);
    expect(gates.particleCount).toBe(1000);
    expect(gates.enable3DCardTilt).toBe(true);
    expect(gates.enableShadows).toBe(true);
    expect(gates.targetFPS).toBe(60);
  });

  it("returns reduced features for mid tier", () => {
    const gates = getFeatureGates("mid");
    expect(gates.enableParticles).toBe(true);
    expect(gates.particleCount).toBe(500);
    expect(gates.enableShadows).toBe(false);
    expect(gates.targetFPS).toBe(60);
  });

  it("disables most features for low tier", () => {
    const gates = getFeatureGates("low");
    expect(gates.enableParticles).toBe(false);
    expect(gates.particleCount).toBe(0);
    expect(gates.enable3DCardTilt).toBe(false);
    expect(gates.enable3DRouteVisualization).toBe(false);
    expect(gates.enableAntialiasing).toBe(false);
    expect(gates.enableShadows).toBe(false);
    expect(gates.pixelRatio).toBe(1);
    expect(gates.enableComplexAnimations).toBe(false);
    expect(gates.targetFPS).toBe(30);
  });
});

describe("isFeatureEnabled", () => {
  it("checks feature against a given tier", () => {
    expect(isFeatureEnabled("enableParticles", "high")).toBe(true);
    expect(isFeatureEnabled("enableParticles", "low")).toBe(false);
    expect(isFeatureEnabled("enableShadows", "mid")).toBe(false);
    expect(isFeatureEnabled("enableShadows", "high")).toBe(true);
  });
});

describe("getParticleCount", () => {
  it("returns correct particle count per tier", () => {
    expect(getParticleCount("high")).toBe(1000);
    expect(getParticleCount("mid")).toBe(500);
    expect(getParticleCount("low")).toBe(0);
  });
});

describe("getPixelRatio", () => {
  it("returns 1 for low tier", () => {
    expect(getPixelRatio("low")).toBe(1);
  });

  it("returns bounded pixel ratio for high tier", () => {
    const ratio = getPixelRatio("high");
    expect(ratio).toBeLessThanOrEqual(2);
    expect(ratio).toBeGreaterThan(0);
  });
});

describe("getTargetFPS", () => {
  it("returns 60 for high tier", () => {
    expect(getTargetFPS("high")).toBe(60);
  });

  it("returns 30 for low tier", () => {
    expect(getTargetFPS("low")).toBe(30);
  });
});

describe("shouldReduceQuality", () => {

  it("returns true when WebGL is unsupported", () => {
    mockWebGL({ supported: false });
    expect(shouldReduceQuality()).toBe(true);
  });

  it("returns true for low-tier devices", () => {
    setNavigatorProps({ deviceMemory: 2, hardwareConcurrency: 2 });
    mockWebGL({ renderer: "Intel HD Graphics 400", maxTextureSize: 2048 });
    expect(shouldReduceQuality()).toBe(true);
  });
});
