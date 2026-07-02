import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import RouteCorridor from "./RouteCorridor";

describe("RouteCorridor compact mode", () => {
  it("renders a short homepage route planner instead of five full-height route panels", () => {
    const html = renderToStaticMarkup(<RouteCorridor variant="compact" />);

    expect(html).toContain("data-route-corridor-variant=\"compact\"");
    expect(html).toContain("airportlive-route-ludhiana-delhi");
    expect(html).toContain("Most-booked airport routes");
    expect(html).toContain("See all routes");
    expect(html).not.toContain("md:h-[80svh]");
  });
});

describe("RouteCorridor route title readability", () => {
  it("gives immersive route titles readable labels with spaces around the connector", () => {
    const html = renderToStaticMarkup(<RouteCorridor hideHeader />);

    expect(html).toContain("my-2 block px-4");
  });
});
