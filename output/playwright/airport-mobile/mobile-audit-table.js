async page => {
  const base = "https://airportlive.vercel.app";
  const pages = ["/", "/airport-taxi", "/routes", "/fleet", "/about", "/contact", "/corporate-travel", "/family-tours"];
  const widths = [320, 375, 430];
  const failures = [];
  const bad = [];
  page.on("requestfailed", req => failures.push({ page: page.url(), url: req.url(), type: req.resourceType(), failure: req.failure()?.errorText || "" }));
  page.on("response", res => { if (res.status() >= 400) bad.push({ page: page.url(), url: res.url(), status: res.status() }); });
  const rows = [];
  for (const path of pages) {
    for (const width of widths) {
      const startF = failures.length;
      const startB = bad.length;
      await page.setViewportSize({ width, height: 812 });
      await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForLoadState("networkidle", { timeout: 7000 }).catch(() => {});
      await page.waitForTimeout(300);
      rows.push(await page.evaluate(({ path, width, startF, startB }) => {
        const visible = el => {
          const s = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) !== 0 && r.width > 0 && r.height > 0;
        };
        const r = el => {
          const b = el.getBoundingClientRect();
          return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), right: Math.round(b.right), bottom: Math.round(b.bottom) };
        };
        const t = el => (el.getAttribute("aria-label") || el.textContent || el.getAttribute("placeholder") || "").replace(/\s+/g, " ").trim();
        const interactives = [...document.querySelectorAll("a[href],button,input,select,textarea,[role='button'],[tabindex]:not([tabindex='-1'])")].filter(visible);
        const small = interactives.filter(el => {
          const b = el.getBoundingClientRect();
          return !el.disabled && (b.width < 44 || b.height < 44);
        });
        const inputs = [...document.querySelectorAll("input,textarea,select")].filter(visible);
        const footerBrand = [...document.querySelectorAll("footer h1, footer h2")].filter(visible).map(el => ({ text: t(el), rect: r(el) }));
        return {
          path,
          width,
          title: document.title,
          scrollH: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
          overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth,
          h1: document.querySelectorAll("h1").length,
          smallTapTargets: small.length,
          smallSamples: small.slice(0, 6).map(el => ({ text: t(el).slice(0, 70), tag: el.tagName.toLowerCase(), rect: r(el) })),
          nestedInteractive: [...document.querySelectorAll("button a, a button, button button, a a")].filter(visible).map(el => ({ text: t(el).slice(0, 80), rect: r(el) })).slice(0, 8),
          inputCount: inputs.length,
          inputs: inputs.map(el => ({
            text: t(el),
            autocomplete: el.getAttribute("autocomplete") || "",
            fontSize: parseFloat(getComputedStyle(el).fontSize),
            hasLabel: !!el.closest("label") || !!(el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`))
          })),
          visibleBrokenImages: [...document.images].filter(visible).filter(img => img.complete && img.naturalWidth === 0).map(img => ({ src: img.currentSrc || img.src, alt: img.getAttribute("alt"), rect: r(img) })).slice(0, 5),
          footerBrand
        };
      }, { path, width, startF, startB }));
      rows[rows.length - 1].requestFailures = failures.slice(startF);
      rows[rows.length - 1].badResponses = bad.slice(startB);
    }
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 7000 }).catch(() => {});
  const linkChecks = await page.evaluate(async () => {
    const links = [...new Set([...document.querySelectorAll("a[href]")].map(a => a.getAttribute("href")).filter(h => h && h.startsWith("/")))];
    const result = [];
    for (const href of links) {
      try {
        const res = await fetch(href, { method: "GET" });
        result.push({ href, status: res.status });
      } catch (err) {
        result.push({ href, error: String(err).slice(0, 120) });
      }
    }
    return result;
  });
  return JSON.stringify({ rows, linkChecks });
}
