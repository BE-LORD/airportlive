import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  detectWebGLSupport,
  isWebGLSupported,
  isWebGL2Supported,
  getRecommendedPowerPreference,
  shouldUseReducedQuality,
  getWebGLErrorMessage,
  createWebGLFallbackElement,
} from "./webgl-support";

describe("detectWebGLSupport", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns unsupported when no WebGL context is available", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const result = detectWebGLSupport();
    expect(result.supported).toBe(false);
    expect(result.version).toBeNull();
    expect(result.renderer).toBe("unknown");
    expect(result.vendor).toBe("unknown");
  });

  it("detects WebGL2 when available", () => {
    const mockGl = {
      getExtension: vi.fn().mockReturnValue(null),
      getParameter: vi.fn().mockReturnValue(4096),
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

    const result = detectWebGLSupport();
    expect(result.supported).toBe(true);
    expect(result.version).toBe(2);
    expect(result.maxTextureSize).toBe(4096);
  });

  it("falls back to WebGL1 when WebGL2 is unavailable", () => {
    const mockGl = {
      getExtension: vi.fn().mockReturnValue(null),
      getParameter: vi.fn().mockReturnValue(2048),
      MAX_TEXTURE_SIZE: 0x0d33,
      MAX_VERTEX_UNIFORM_VECTORS: 0x8dfb,
      MAX_FRAGMENT_UNIFORM_VECTORS: 0x8dfd,
      MAX_VARYING_VECTORS: 0x8dfc,
      MAX_VERTEX_ATTRIBS: 0x8869,
      MAX_TEXTURE_IMAGE_UNITS: 0x8872,
    };

    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (contextId: string) => {
        if (contextId === "webgl") return mockGl as unknown as RenderingContext;
        return null;
      }
    );

    const result = detectWebGLSupport();
    expect(result.supported).toBe(true);
    expect(result.version).toBe(1);
  });

  it("reads debug renderer info when extension is available", () => {
    const UNMASKED_RENDERER = 0x9246;
    const UNMASKED_VENDOR = 0x9245;
    const mockGl = {
      getExtension: vi.fn().mockReturnValue({
        UNMASKED_RENDERER_WEBGL: UNMASKED_RENDERER,
        UNMASKED_VENDOR_WEBGL: UNMASKED_VENDOR,
      }),
      getParameter: vi.fn().mockImplementation((param: number) => {
        if (param === UNMASKED_RENDERER) return "NVIDIA GeForce GTX 1080";
        if (param === UNMASKED_VENDOR) return "NVIDIA Corporation";
        return 8192;
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

    const result = detectWebGLSupport();
    expect(result.renderer).toBe("NVIDIA GeForce GTX 1080");
    expect(result.vendor).toBe("NVIDIA Corporation");
  });
});

describe("isWebGLSupported", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when webgl context is available", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (contextId: string) => {
        if (contextId === "webgl") return {} as RenderingContext;
        return null;
      }
    );
    expect(isWebGLSupported()).toBe(true);
  });

  it("returns false when no webgl context is available", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    expect(isWebGLSupported()).toBe(false);
  });

  it("returns false when getContext throws", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => {
      throw new Error("context error");
    });
    expect(isWebGLSupported()).toBe(false);
  });
});

describe("isWebGL2Supported", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when webgl2 context is available", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (contextId: string) => {
        if (contextId === "webgl2") return {} as RenderingContext;
        return null;
      }
    );
    expect(isWebGL2Supported()).toBe(true);
  });

  it("returns false when webgl2 is unavailable", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    expect(isWebGL2Supported()).toBe(false);
  });

  it("returns false when getContext throws", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => {
      throw new Error("context error");
    });
    expect(isWebGL2Supported()).toBe(false);
  });
});

describe("getRecommendedPowerPreference", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Ensure getBattery is fully removed before each test
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (navigator as any).getBattery;
  });

  it("returns 'default' when Battery API is present", () => {
    Object.defineProperty(navigator, "getBattery", {
      value: vi.fn(),
      configurable: true,
    });
    expect(getRecommendedPowerPreference()).toBe("default");
  });

  it("returns 'low-power' for low memory devices", () => {
    Object.defineProperty(navigator, "deviceMemory", {
      value: 2,
      configurable: true,
    });
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 8,
      configurable: true,
    });
    expect(getRecommendedPowerPreference()).toBe("low-power");
  });

  it("returns 'low-power' for low CPU core count", () => {
    Object.defineProperty(navigator, "deviceMemory", {
      value: undefined,
      configurable: true,
    });
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 2,
      configurable: true,
    });
    expect(getRecommendedPowerPreference()).toBe("low-power");
  });

  it("returns 'high-performance' for capable devices", () => {
    Object.defineProperty(navigator, "deviceMemory", {
      value: 8,
      configurable: true,
    });
    Object.defineProperty(navigator, "hardwareConcurrency", {
      value: 8,
      configurable: true,
    });
    expect(getRecommendedPowerPreference()).toBe("high-performance");
  });
});

describe("shouldUseReducedQuality", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when WebGL is not supported", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    expect(shouldUseReducedQuality()).toBe(true);
  });

  it("returns true for Intel HD Graphics", () => {
    const UNMASKED_RENDERER = 0x9246;
    const UNMASKED_VENDOR = 0x9245;
    const mockGl = {
      getExtension: vi.fn().mockReturnValue({
        UNMASKED_RENDERER_WEBGL: UNMASKED_RENDERER,
        UNMASKED_VENDOR_WEBGL: UNMASKED_VENDOR,
      }),
      getParameter: vi.fn().mockImplementation((param: number) => {
        if (param === UNMASKED_RENDERER) return "Intel HD Graphics 520";
        if (param === UNMASKED_VENDOR) return "Intel Inc.";
        return 8192;
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

    Object.defineProperty(navigator, "deviceMemory", {
      value: 8,
      configurable: true,
    });

    expect(shouldUseReducedQuality()).toBe(true);
  });
});

describe("getWebGLErrorMessage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns unsupported message when WebGL is not available", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const msg = getWebGLErrorMessage();
    expect(msg).toContain("does not support WebGL");
  });

  it("returns generic error message when WebGL is available", () => {
    const mockGl = {
      getExtension: vi.fn().mockReturnValue(null),
      getParameter: vi.fn().mockReturnValue(8192),
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

    const msg = getWebGLErrorMessage();
    expect(msg).toContain("encountered an error");
  });
});

describe("createWebGLFallbackElement", () => {
  it("creates a div with fallback message", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const element = createWebGLFallbackElement();
    expect(element.tagName).toBe("DIV");
    expect(element.className).toBe("webgl-fallback");
    expect(element.innerHTML).toContain("3D Graphics Not Available");
  });
});
