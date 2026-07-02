import { describe, expect, it, vi, beforeEach } from "vitest";

import { SceneManager } from "./SceneManager";

vi.mock("three", () => {
  const Scene = vi.fn(function (this: Record<string, unknown>) {
    this.add = vi.fn();
    this.remove = vi.fn();
    this.traverse = vi.fn();
    this.clear = vi.fn();
  });

  const PerspectiveCamera = vi.fn(function (this: Record<string, unknown>) {
    this.position = { z: 0, set: vi.fn() };
    this.aspect = 1;
    this.updateProjectionMatrix = vi.fn();
  });

  const mockDomElement = document.createElement("canvas");
  const WebGLRenderer = vi.fn(function (this: Record<string, unknown>) {
    this.setSize = vi.fn();
    this.setPixelRatio = vi.fn();
    this.render = vi.fn();
    this.dispose = vi.fn();
    this.forceContextLoss = vi.fn();
    this.domElement = mockDomElement;
  });

  const Mesh = vi.fn();

  return { Scene, PerspectiveCamera, WebGLRenderer, Mesh };
});

function createContainer(): HTMLDivElement {
  const container = document.createElement("div");
  Object.defineProperty(container, "clientWidth", { value: 800 });
  Object.defineProperty(container, "clientHeight", { value: 600 });
  return container;
}

describe("SceneManager", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (contextId: string) => {
        if (contextId === "webgl" || contextId === "experimental-webgl") {
          return {} as RenderingContext;
        }
        return null;
      }
    );
  });

  it("initializes scene, camera, and renderer", () => {
    const manager = new SceneManager();
    const container = createContainer();

    const result = manager.initialize(container);
    expect(result).toBe(true);
    expect(manager.getScene()).not.toBeNull();
    expect(manager.getCamera()).not.toBeNull();
    expect(manager.getRenderer()).not.toBeNull();
  });

  it("returns false when WebGL is not supported", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const manager = new SceneManager();
    const container = createContainer();

    const result = manager.initialize(container);
    expect(result).toBe(false);
  });

  it("returns false when already disposed", () => {
    const manager = new SceneManager();
    manager.dispose();

    const container = createContainer();
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = manager.initialize(container);
    expect(result).toBe(false);
    expect(warnSpy).toHaveBeenCalledWith(
      "SceneManager: Cannot initialize after disposal"
    );
  });

  it("appends canvas to container when no canvas option provided", () => {
    const manager = new SceneManager();
    const container = createContainer();
    const appendSpy = vi.spyOn(container, "appendChild");

    manager.initialize(container);
    expect(appendSpy).toHaveBeenCalled();
  });

  it("does not append canvas when canvas option is provided", () => {
    const canvas = document.createElement("canvas");
    const manager = new SceneManager({ canvas });
    const container = createContainer();
    const appendSpy = vi.spyOn(container, "appendChild");

    manager.initialize(container);
    expect(appendSpy).not.toHaveBeenCalled();
  });

  it("handles resize correctly", () => {
    const manager = new SceneManager();
    const container = createContainer();
    manager.initialize(container);

    manager.handleResize(1024, 768);
    const camera = manager.getCamera()!;
    expect(camera.aspect).toBe(1024 / 768);
    expect(camera.updateProjectionMatrix).toHaveBeenCalled();
  });

  it("handleResize is no-op before initialization", () => {
    const manager = new SceneManager();
    expect(() => manager.handleResize(800, 600)).not.toThrow();
  });

  it("adds objects to scene", () => {
    const manager = new SceneManager();
    const container = createContainer();
    manager.initialize(container);

    const mockObject = { type: "Mesh" } as any;
    manager.add(mockObject);
    expect(manager.getScene()!.add).toHaveBeenCalledWith(mockObject);
  });

  it("add warns when scene is not initialized", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const manager = new SceneManager();
    manager.add({} as any);
    expect(warnSpy).toHaveBeenCalledWith(
      "SceneManager: Cannot add object - scene not initialized"
    );
  });

  it("removes objects from scene", () => {
    const manager = new SceneManager();
    const container = createContainer();
    manager.initialize(container);

    const mockObject = { type: "Mesh" } as any;
    manager.remove(mockObject);
    expect(manager.getScene()!.remove).toHaveBeenCalledWith(mockObject);
  });

  it("remove is no-op when scene is not initialized", () => {
    const manager = new SceneManager();
    expect(() => manager.remove({} as any)).not.toThrow();
  });

  it("starts and stops animation", () => {
    const manager = new SceneManager();
    const container = createContainer();
    manager.initialize(container);

    const callback = vi.fn();
    manager.startAnimation(callback);
    manager.stopAnimation();
  });

  it("startAnimation warns when not initialized", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const manager = new SceneManager();
    manager.startAnimation(vi.fn());
    expect(warnSpy).toHaveBeenCalledWith(
      "SceneManager: Cannot start animation - not initialized"
    );
  });

  it("disposes all resources", () => {
    const manager = new SceneManager();
    const container = createContainer();
    manager.initialize(container);

    manager.dispose();
    expect(manager.isDestroyed()).toBe(true);
    expect(manager.getScene()).toBeNull();
    expect(manager.getCamera()).toBeNull();
    expect(manager.getRenderer()).toBeNull();
  });

  it("dispose is idempotent", () => {
    const manager = new SceneManager();
    const container = createContainer();
    manager.initialize(container);

    manager.dispose();
    expect(() => manager.dispose()).not.toThrow();
    expect(manager.isDestroyed()).toBe(true);
  });

  it("isDestroyed returns false before disposal", () => {
    const manager = new SceneManager();
    expect(manager.isDestroyed()).toBe(false);
  });

  it("isWebGLSupported delegates to canvas getContext", () => {
    const manager = new SceneManager();
    expect(manager.isWebGLSupported()).toBe(true);
  });

  it("calls onContextLost and onContextRestored callbacks", () => {
    const onContextLost = vi.fn();
    const onContextRestored = vi.fn();
    const manager = new SceneManager({ onContextLost, onContextRestored });
    const container = createContainer();
    manager.initialize(container);

    const canvas = manager.getRenderer()!.domElement;

    const lostEvent = new Event("webglcontextlost");
    canvas.dispatchEvent(lostEvent);
    expect(onContextLost).toHaveBeenCalled();

    const restoredEvent = new Event("webglcontextrestored");
    canvas.dispatchEvent(restoredEvent);
    expect(onContextRestored).toHaveBeenCalled();
  });

  it("applies custom config options", () => {
    const manager = new SceneManager({
      config: { antialias: false, powerPreference: "low-power" },
    });
    const container = createContainer();
    const result = manager.initialize(container);
    expect(result).toBe(true);
  });
});
