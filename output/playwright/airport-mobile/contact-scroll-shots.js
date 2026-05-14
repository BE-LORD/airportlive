async page => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("https://airportlive.vercel.app/contact", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 7000 }).catch(() => {});
  const positions = [0, 520, 980, 1500, 2200, 3000];
  const result = [];
  for (const y of positions) {
    await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `contact-scroll-${String(y).padStart(5, "0")}.png`, fullPage: false, scale: "css" });
    result.push({ y });
  }
  return JSON.stringify(result);
}
