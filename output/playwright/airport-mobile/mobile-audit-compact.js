async page => {
  const base = "https://airportlive.vercel.app";
  const pages = ["/", "/airport-taxi", "/routes", "/fleet", "/about", "/contact", "/corporate-travel", "/family-tours"];
  const widths = [320, 360, 375, 390, 414, 430];
  const height = 812;
  const failures = [];
  const badResponses = [];
  const consoleItems = [];

  page.on("requestfailed", req => failures.push({
    page: page.url(),
    url: req.url(),
    type: req.resourceType(),
    failure: req.failure()?.errorText || "unknown"
  }));
  page.on("response", res => {
    if (res.status() >= 400) badResponses.push({ page: page.url(), url: res.url(), status: res.status() });
  });
  page.on("console", msg => {
    if (["error", "warning"].includes(msg.type())) {
      consoleItems.push({ page: page.url(), level: msg.type(), text: msg.text().slice(0, 240) });
    }
  });

  const unique = (items, keyFn) => {
    const seen = new Set();
    return items.filter(item => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const domAudit = () => page.evaluate(() => {
    const visible = el => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) !== 0 && r.width > 0 && r.height > 0;
    };
    const rect = el => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(r.right), bottom: Math.round(r.bottom) };
    };
    const text = el => (el.getAttribute("aria-label") || el.textContent || el.getAttribute("placeholder") || "").replace(/\s+/g, " ").trim();
    const basicSelector = el => {
      let out = el.tagName.toLowerCase();
      if (el.id) out += `#${el.id}`;
      const classes = [...el.classList].slice(0, 4).join(".");
      if (classes) out += `.${classes}`;
      return out;
    };
    const all = [...document.querySelectorAll("body *")];
    const viewport = {
      w: innerWidth,
      h: innerHeight,
      scrollW: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      clientW: document.documentElement.clientWidth,
      scrollH: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
    };
    const interactives = [...document.querySelectorAll("a[href],button,input,select,textarea,[role='button'],[tabindex]:not([tabindex='-1'])")]
      .filter(visible)
      .map(el => ({
        tag: el.tagName.toLowerCase(),
        name: text(el).slice(0, 90),
        href: el.getAttribute("href") || "",
        disabled: !!el.disabled || el.getAttribute("aria-disabled") === "true",
        r: rect(el),
        selector: basicSelector(el),
        fontSize: parseFloat(getComputedStyle(el).fontSize)
      }));
    const smallTapTargets = interactives
      .filter(i => !i.disabled && (i.r.w < 44 || i.r.h < 44))
      .filter(i => i.r.y > -10 && i.r.y < viewport.scrollH + 10)
      .slice(0, 35);
    const nestedInteractive = [...document.querySelectorAll("button a, a button, button button, a a")]
      .filter(visible)
      .slice(0, 20)
      .map(el => ({ selector: basicSelector(el), name: text(el).slice(0, 100), r: rect(el) }));
    const inputs = [...document.querySelectorAll("input,textarea,select")]
      .filter(visible)
      .map(el => ({
        tag: el.tagName.toLowerCase(),
        type: el.getAttribute("type") || "",
        name: text(el),
        placeholder: el.getAttribute("placeholder") || "",
        autocomplete: el.getAttribute("autocomplete") || "",
        id: el.id || "",
        hasExplicitLabel: !!(el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)),
        hasImplicitLabel: !!el.closest("label"),
        fontSize: parseFloat(getComputedStyle(el).fontSize),
        r: rect(el)
      }));
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter(visible)
      .map(el => ({ level: Number(el.tagName.slice(1)), text: text(el).slice(0, 100), r: rect(el) }));
    const images = [...document.images].filter(visible).map(img => ({
      src: img.currentSrc || img.src,
      alt: img.getAttribute("alt"),
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      r: rect(img)
    }));
    const overflowCandidates = all
      .filter(visible)
      .filter(el => {
        const r = el.getBoundingClientRect();
        return (r.left < -1 || r.right > innerWidth + 1) &&
          !["fixed"].includes(getComputedStyle(el).position);
      })
      .slice(0, 20)
      .map(el => ({ selector: basicSelector(el), name: text(el).slice(0, 90), r: rect(el) }));
    const footerBrand = [...document.querySelectorAll("footer h1,footer h2,footer [class*='text-[18vw]']")]
      .filter(visible)
      .map(el => ({ text: text(el), r: rect(el) }));
    const hero = document.querySelector("h1");
    const header = document.querySelector("header");
    return {
      title: document.title,
      viewport,
      horizontalOverflow: viewport.scrollW - viewport.clientW,
      h1Count: headings.filter(h => h.level === 1).length,
      headings: headings.slice(0, 18),
      smallTapTargets,
      nestedInteractive,
      inputs,
      brokenImages: images.filter(img => img.complete && img.naturalWidth === 0).slice(0, 10),
      missingAltVisible: images.filter(img => img.alt === null).slice(0, 10),
      imagesTotalVisible: images.length,
      overflowCandidates,
      footerBrand,
      heroRect: hero ? rect(hero) : null,
      headerRect: header ? rect(header) : null
    };
  });

  const audits = [];
  for (const path of pages) {
    for (const width of widths) {
      const startF = failures.length;
      const startB = badResponses.length;
      const startC = consoleItems.length;
      await page.setViewportSize({ width, height });
      await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForLoadState("networkidle", { timeout: 7000 }).catch(() => {});
      await page.waitForTimeout(400);
      const dom = await domAudit();
      audits.push({
        path,
        width,
        title: dom.title,
        scrollHeight: dom.viewport.scrollH,
        horizontalOverflow: dom.horizontalOverflow,
        h1Count: dom.h1Count,
        smallTapTargetCount: dom.smallTapTargets.length,
        smallTapTargets: dom.smallTapTargets.slice(0, 8),
        nestedInteractiveCount: dom.nestedInteractive.length,
        nestedInteractive: dom.nestedInteractive,
        inputIssues: dom.inputs.filter(i => !i.hasExplicitLabel || !i.autocomplete || i.fontSize < 16),
        brokenImages: dom.brokenImages,
        missingAltVisible: dom.missingAltVisible,
        imagesTotalVisible: dom.imagesTotalVisible,
        overflowCandidates: dom.overflowCandidates.slice(0, 8),
        footerBrand: dom.footerBrand,
        heroRect: dom.heroRect,
        headerRect: dom.headerRect,
        requestFailures: failures.slice(startF),
        badResponses: badResponses.slice(startB),
        consoleItems: consoleItems.slice(startC)
      });
    }
  }

  await page.setViewportSize({ width: 375, height });
  await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 7000 }).catch(() => {});
  await page.waitForTimeout(500);
  const formAudit = await page.evaluate(() => {
    const visible = el => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0;
    };
    const rect = el => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom) };
    };
    return [...document.querySelectorAll("input,button")].filter(visible).map(el => ({
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || el.getAttribute("aria-label") || el.getAttribute("placeholder") || "").replace(/\s+/g, " ").trim(),
      disabled: !!el.disabled,
      type: el.getAttribute("type") || "",
      autocomplete: el.getAttribute("autocomplete") || "",
      r: rect(el)
    })).slice(0, 30);
  });
  const pickup = page.getByPlaceholder(/city or airport/i).first();
  const drop = page.getByPlaceholder(/city or airport/i).nth(1);
  let formFlow = [];
  if (await pickup.count()) {
    await pickup.fill("Ludhiana");
    await drop.fill("Delhi Airport");
    await page.waitForTimeout(200);
    formFlow.push(await page.evaluate(() => [...document.querySelectorAll("button")].map(b => ({
      text: (b.textContent || b.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim(),
      disabled: !!b.disabled
    })).filter(b => /next|back|send|step|quote|whatsapp/i.test(b.text)).slice(0, 20)));
    const next = page.getByRole("button", { name: /next step/i }).first();
    if (await next.count()) {
      await next.click();
      await page.waitForTimeout(250);
      formFlow.push(await page.evaluate(() => ({
        stepText: document.body.textContent.match(/\b[1-4]\/4\b/)?.[0] || "",
        visibleInputs: [...document.querySelectorAll("input,select,textarea")].filter(el => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0;
        }).map(el => ({
          placeholder: el.getAttribute("placeholder") || "",
          type: el.getAttribute("type") || "",
          value: el.value || "",
          autocomplete: el.getAttribute("autocomplete") || "",
          fontSize: parseFloat(getComputedStyle(el).fontSize)
        }))
      })));
    }
  }

  await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 7000 }).catch(() => {});
  await page.setViewportSize({ width: 375, height });
  await page.waitForTimeout(500);
  const menuButton = page.getByRole("button", { name: /open menu/i }).first();
  let menuAudit = {};
  if (await menuButton.count()) {
    await menuButton.click();
    await page.waitForTimeout(350);
    menuAudit = await page.evaluate(() => {
      const visible = el => {
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) !== 0 && r.width > 0 && r.height > 0;
      };
      const rect = el => {
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(r.right), bottom: Math.round(r.bottom) };
      };
      const dialog = document.querySelector("[role='dialog'], dialog");
      const close = [...document.querySelectorAll("button")].find(btn => /close menu/i.test(btn.textContent || btn.getAttribute("aria-label") || ""));
      return {
        dialogExists: !!dialog,
        dialogRect: dialog ? rect(dialog) : null,
        ariaModal: dialog?.getAttribute("aria-modal") || "",
        closeExists: !!close,
        closeVisible: close ? visible(close) : false,
        closeRect: close ? rect(close) : null,
        bodyOverflow: getComputedStyle(document.body).overflow,
        activeElementText: (document.activeElement?.textContent || document.activeElement?.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim(),
        firstVisibleY: [...document.querySelectorAll("[role='dialog'] *")].filter(visible).map(el => rect(el).y).sort((a, b) => a - b)[0],
        navLinks: [...document.querySelectorAll("[role='dialog'] a")].map(a => ({
          text: (a.textContent || "").replace(/\s+/g, " ").trim(),
          href: a.href,
          r: rect(a)
        }))
      };
    });
  }

  return JSON.stringify({
    checkedAt: new Date().toISOString(),
    pages,
    widths,
    audits,
    formAudit,
    formFlow,
    menuAudit,
    uniqueFailures: unique(failures, f => `${f.failure}|${f.url}`).slice(0, 30),
    uniqueBadResponses: unique(badResponses, r => `${r.status}|${r.url}`).slice(0, 30),
    uniqueConsole: unique(consoleItems, c => `${c.level}|${c.text}`).slice(0, 30)
  });
}
