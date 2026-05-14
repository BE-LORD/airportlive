async page => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("https://airportlive.vercel.app/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 7000 }).catch(() => {});
  const positions = [0, 700, 1200, 1800, 2600, 3600, 4600, 6200, 7600, 9000, 11000, 13200, 15000, 16400];
  const result = [];
  for (const y of positions) {
    await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `home-scroll-${String(y).padStart(5, "0")}.png`, fullPage: false, scale: "css" });
    result.push(await page.evaluate(scrollY => ({
      requestedY: scrollY,
      actualY: Math.round(window.scrollY),
      visibleText: document.elementFromPoint(187, 406)?.textContent?.replace(/\s+/g, " ").trim().slice(0, 220) || "",
      bodyTextAroundViewport: [...document.querySelectorAll("h1,h2,h3,p,a,button")].filter(el => {
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < innerHeight;
      }).map(el => el.textContent.replace(/\s+/g, " ").trim()).filter(Boolean).slice(0, 20)
    }), y));
  }
  return JSON.stringify(result, null, 2);
}
