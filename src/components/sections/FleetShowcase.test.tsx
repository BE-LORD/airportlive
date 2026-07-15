import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import FleetShowcase from "./FleetShowcase";

describe("FleetShowcase mobile visual balance", () => {
  it("centers the fleet intro copy on mobile while keeping desktop alignment available", () => {
    const html = renderToStaticMarkup(<FleetShowcase />);

    expect(html).toContain('data-fleet-intro="true"');
    expect(html).toContain("text-center md:text-left");
    expect(html).toContain("mx-auto md:mx-0");
    expect(html).toContain("Choose Your");
    expect(html).toContain("Ride");
  });
});
