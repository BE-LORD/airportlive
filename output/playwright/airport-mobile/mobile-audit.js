async page => {
  const base = "https://airportlive.vercel.app";
  const pages = [
    { name: "home", path: "/" },
    { name: "airport-taxi", path: "/airport-taxi" },
    { name: "routes", path: "/routes" },
    { name: "fleet", path: "/fleet" },
    { name: "about", path: "/about" },
    { name: "contact", path: "/contact" },
    { name: "corporate-travel", path: "/corporate-travel" },
    { name: "family-tours", path: "/family-tours" }
  ];
  const widths = [320, 360, 375, 390, 414, 430];
  const height = 812;
  const events = [];
  const reqFailures = [];
  const badResponses = [];

  page.on("console", msg => {
    events.push({
      type: "console",
      level: msg.type(),
      text: msg.text().slice(0, 300),
      url: page.url()
    });
  });
  page.on("pageerror", err => {
    events.push({
      type: "pageerror",
      text: String(err.message || err).slice(0, 300),
      url: page.url()
    });
  });
  page.on("requestfailed", req => {
    reqFailures.push({
      url: req.url(),
      method: req.method(),
      resourceType: req.resourceType(),
      failure: req.failure()?.errorText || "unknown",
      page: page.url()
    });
  });
  page.on("response", res => {
    const status = res.status();
    if (status >= 400) {
      badResponses.push({
        url: res.url(),
        status,
        page: page.url()
      });
    }
  });

  const auditDom = async () => page.evaluate(() => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: window.devicePixelRatio,
      scrollWidth: Math.max(
        document.documentElement.scrollWidth,
        document.body ? document.body.scrollWidth : 0
      ),
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: Math.max(
        document.documentElement.scrollHeight,
        document.body ? document.body.scrollHeight : 0
      )
    };

    const visible = el => {
      const style = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return style.visibility !== "hidden" &&
        style.display !== "none" &&
        Number(style.opacity) !== 0 &&
        r.width > 0 &&
        r.height > 0;
    };

    const labelFor = el => {
      if (el.id) {
        const explicit = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
        if (explicit) return explicit.textContent.trim();
      }
      const implicit = el.closest("label");
      if (implicit) return implicit.textContent.trim();
      return "";
    };

    const nameFor = el =>
      (el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        labelFor(el) ||
        el.textContent ||
        el.getAttribute("placeholder") ||
        "").replace(/\s+/g, " ").trim();

    const selectorFor = el => {
      const bits = [];
      let node = el;
      while (node && node.nodeType === 1 && bits.length < 4) {
        let bit = node.tagName.toLowerCase();
        if (node.id) {
          bit += `#${node.id}`;
          bits.unshift(bit);
          break;
        }
        const cls = [...node.classList].slice(0, 3).join(".");
        if (cls) bit += `.${cls}`;
        const parent = node.parentElement;
        if (parent) {
          const same = [...parent.children].filter(child => child.tagName === node.tagName);
          if (same.length > 1) bit += `:nth-of-type(${same.indexOf(node) + 1})`;
        }
        bits.unshift(bit);
        node = parent;
      }
      return bits.join(" > ");
    };

    const rectOf = el => {
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom)
      };
    };

    const all = [...document.querySelectorAll("body *")];
    const overflowElements = all
      .filter(visible)
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.left < -1 || r.right > window.innerWidth + 1;
      })
      .slice(0, 80)
      .map(el => ({
        selector: selectorFor(el),
        text: nameFor(el).slice(0, 100),
        rect: rectOf(el)
      }));

    const clippedText = all
      .filter(visible)
      .filter(el => {
        const style = getComputedStyle(el);
        const hasText = (el.textContent || "").trim().length > 0;
        return hasText &&
          (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) &&
          ["hidden", "clip"].includes(style.overflowX) ||
          ["hidden", "clip"].includes(style.overflowY);
      })
      .slice(0, 80)
      .map(el => ({
        selector: selectorFor(el),
        text: nameFor(el).slice(0, 100),
        rect: rectOf(el),
        client: { w: el.clientWidth, h: el.clientHeight },
        scroll: { w: el.scrollWidth, h: el.scrollHeight },
        overflow: `${getComputedStyle(el).overflowX}/${getComputedStyle(el).overflowY}`
      }));

    const interactives = [...document.querySelectorAll(
      "a[href],button,input,select,textarea,[role='button'],[tabindex]:not([tabindex='-1'])"
    )].filter(visible).map(el => {
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        role: el.getAttribute("role") || "",
        type: el.getAttribute("type") || "",
        name: nameFor(el).slice(0, 120),
        href: el.getAttribute("href") || "",
        disabled: el.disabled || el.getAttribute("aria-disabled") === "true",
        rect: rectOf(el),
        fontSize: parseFloat(style.fontSize),
        selector: selectorFor(el)
      };
    });

    const smallTapTargets = interactives
      .filter(item => !item.disabled)
      .filter(item => item.rect.w < 44 || item.rect.h < 44)
      .slice(0, 100);

    const tinyText = all
      .filter(visible)
      .map(el => ({
        selector: selectorFor(el),
        text: nameFor(el).slice(0, 80),
        fontSize: parseFloat(getComputedStyle(el).fontSize),
        rect: rectOf(el)
      }))
      .filter(item => item.text && item.fontSize > 0 && item.fontSize < 12)
      .slice(0, 80);

    const inputs = [...document.querySelectorAll("input,select,textarea")]
      .filter(visible)
      .map(el => {
        const style = getComputedStyle(el);
        return {
          tag: el.tagName.toLowerCase(),
          type: el.getAttribute("type") || "",
          name: nameFor(el),
          id: el.id || "",
          placeholder: el.getAttribute("placeholder") || "",
          autocomplete: el.getAttribute("autocomplete") || "",
          hasExplicitLabel: !!(el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)),
          hasImplicitLabel: !!el.closest("label"),
          fontSize: parseFloat(style.fontSize),
          rect: rectOf(el)
        };
      });

    const images = [...document.images].map(img => ({
      src: img.currentSrc || img.src,
      alt: img.getAttribute("alt"),
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      rect: rectOf(img),
      visible: visible(img)
    }));

    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter(visible)
      .map(h => ({
        level: Number(h.tagName.slice(1)),
        text: nameFor(h).slice(0, 140),
        rect: rectOf(h)
      }));

    const nestedInteractive = [...document.querySelectorAll("button a, a button, button button, a a")]
      .filter(visible)
      .map(el => ({
        selector: selectorFor(el),
        text: nameFor(el).slice(0, 120),
        rect: rectOf(el)
      }));

    const emptyNames = interactives
      .filter(item => !item.disabled)
      .filter(item => !item.name)
      .slice(0, 50);

    const fixedOrSticky = all
      .filter(visible)
      .filter(el => ["fixed", "sticky"].includes(getComputedStyle(el).position))
      .slice(0, 50)
      .map(el => ({
        selector: selectorFor(el),
        text: nameFor(el).slice(0, 80),
        position: getComputedStyle(el).position,
        zIndex: getComputedStyle(el).zIndex,
        rect: rectOf(el)
      }));

    const links = [...document.querySelectorAll("a[href]")]
      .filter(visible)
      .map(a => ({
        text: nameFor(a).slice(0, 120),
        href: a.href,
        rect: rectOf(a)
      }));

    return {
      url: location.href,
      title: document.title,
      viewport,
      bodyClass: document.body?.className || "",
      metaViewport: document.querySelector("meta[name='viewport']")?.getAttribute("content") || "",
      horizontalOverflow: viewport.scrollWidth - viewport.clientWidth,
      overflowElements,
      clippedText,
      interactivesCount: interactives.length,
      smallTapTargets,
      tinyText,
      inputs,
      images: {
        count: images.length,
        missingAlt: images.filter(img => img.visible && img.alt === null),
        emptyAltVisible: images.filter(img => img.visible && img.alt === ""),
        brokenVisible: images.filter(img => img.visible && img.complete && img.naturalWidth === 0),
        loadedVisible: images.filter(img => img.visible && img.naturalWidth > 0).length
      },
      headings,
      nestedInteractive,
      emptyNames,
      fixedOrSticky,
      linksSample: links.slice(0, 60)
    };
  });

  const results = [];
  for (const pageInfo of pages) {
    for (const width of widths) {
      const beforeEvents = events.length;
      const beforeReq = reqFailures.length;
      const beforeBad = badResponses.length;
      await page.setViewportSize({ width, height });
      await page.goto(base + pageInfo.path, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(700);
      const audit = await auditDom();
      results.push({
        page: pageInfo.name,
        path: pageInfo.path,
        width,
        audit,
        events: events.slice(beforeEvents),
        requestFailures: reqFailures.slice(beforeReq),
        badResponses: badResponses.slice(beforeBad)
      });
      if (width === 375) {
        await page.screenshot({
          path: `mobile-${pageInfo.name}-${width}-top.png`,
          fullPage: false,
          scale: "css"
        }).catch(() => {});
      }
    }
  }

  await page.setViewportSize({ width: 375, height });
  await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(700);
  await page.screenshot({ path: "mobile-home-375-full.png", fullPage: true, scale: "css" }).catch(() => {});

  const menuBefore = events.length;
  const menuButton = page.getByRole("button", { name: /open menu/i });
  let menuAudit = null;
  if (await menuButton.count()) {
    await menuButton.first().click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "mobile-menu-375.png", fullPage: false, scale: "css" }).catch(() => {});
    menuAudit = await page.evaluate(() => {
      const visible = el => {
        const style = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return style.visibility !== "hidden" &&
          style.display !== "none" &&
          Number(style.opacity) !== 0 &&
          r.width > 0 &&
          r.height > 0;
      };
      const rectOf = el => {
        const r = el.getBoundingClientRect();
        return {
          x: Math.round(r.x),
          y: Math.round(r.y),
          w: Math.round(r.width),
          h: Math.round(r.height),
          right: Math.round(r.right),
          bottom: Math.round(r.bottom)
        };
      };
      const dialog = document.querySelector("[role='dialog'], dialog");
      const close = [...document.querySelectorAll("button")].find(btn => /close menu/i.test(btn.textContent || btn.getAttribute("aria-label") || ""));
      const open = [...document.querySelectorAll("button")].find(btn => /open menu/i.test(btn.textContent || btn.getAttribute("aria-label") || ""));
      const bodyStyle = getComputedStyle(document.body);
      return {
        hasDialog: !!dialog,
        dialogRect: dialog ? rectOf(dialog) : null,
        dialogAriaModal: dialog?.getAttribute("aria-modal") || "",
        closeButtonVisible: close ? visible(close) : false,
        closeButtonRect: close ? rectOf(close) : null,
        openButtonStillVisible: open ? visible(open) : false,
        bodyOverflow: `${bodyStyle.overflowX}/${bodyStyle.overflowY}`,
        activeElement: document.activeElement ? {
          tag: document.activeElement.tagName.toLowerCase(),
          text: (document.activeElement.textContent || document.activeElement.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim()
        } : null,
        links: [...document.querySelectorAll("[role='dialog'] a, dialog a")].map(a => ({
          text: (a.textContent || "").replace(/\s+/g, " ").trim(),
          href: a.href,
          rect: rectOf(a)
        }))
      };
    });
  }

  return JSON.stringify({
    checkedAt: new Date().toISOString(),
    base,
    widths,
    pages: pages.map(p => p.path),
    results,
    menuAudit,
    menuEvents: events.slice(menuBefore),
    totals: {
      consoleEvents: events.length,
      requestFailures: reqFailures.length,
      badResponses: badResponses.length
    }
  }, null, 2);
}
