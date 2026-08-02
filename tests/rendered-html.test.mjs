import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const publicRoot = new URL("../public/", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Oproxy Docs shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Oproxy Docs/);
  assert.match(html, /Oproxy Docs · 本地文档/);
  assert.match(html, /搜索文档/);
  assert.match(html, /docs\/quickstart\.html/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("contains the complete bilingual Oproxy Markdown collection", async () => {
  const index = JSON.parse(await readFile(new URL("site-index.json", publicRoot), "utf8"));
  assert.equal(index.pages.length, 46);
  assert.equal(index.pages.filter((page) => page.lang === "zh").length, 23);
  assert.equal(index.pages.filter((page) => page.lang === "en").length, 23);

  for (const page of index.pages) {
    await access(new URL(page.source.slice(1), publicRoot));
    assert.ok(page.title.length > 0);
    assert.ok(page.searchText.length > 0);
    assert.doesNotMatch(page.searchText, /TokenFlux/i);
  }

  const [zhAgents, enAgents, zhChatbot, enChatbot, images, operationImages] = await Promise.all([
    readdir(new URL("docs/agents/", publicRoot)),
    readdir(new URL("en/docs/agents/", publicRoot)),
    readdir(new URL("docs/chatbot/", publicRoot)),
    readdir(new URL("en/docs/chatbot/", publicRoot)),
    readdir(new URL("images/", publicRoot)),
    readdir(new URL("images/oproxy-steps/", publicRoot)),
  ]);
  assert.equal(zhAgents.filter((name) => name.endsWith(".md")).length, 4);
  assert.equal(enAgents.filter((name) => name.endsWith(".md")).length, 4);
  assert.deepEqual(zhChatbot.filter((name) => name.endsWith(".md")), ["built-in-chat.md"]);
  assert.deepEqual(enChatbot.filter((name) => name.endsWith(".md")), ["built-in-chat.md"]);
  assert.ok(images.length >= 8);
  assert.equal(operationImages.filter((name) => name.endsWith(".png")).length, 13);

  const visualGuides = [
    "docs/quickstart.md",
    "docs/tokenflux/create-apikey.md",
    "docs/tokenflux/endpoints.md",
    "docs/tokenflux/composite-key.md",
    "docs/tokenflux/fast-mode.md",
    "docs/tokenflux/error-codes.md",
    "docs/tokenflux/billing.md",
    "docs/tokenflux/invoice.md",
    "docs/tokenflux/team.md",
    "docs/tokenflux/referral.md",
    "docs/agents/cc-switch.md",
    "docs/agents/claude-code.md",
    "docs/agents/codex.md",
    "docs/agents/opencode.md",
    "docs/chatbot/built-in-chat.md",
  ];
  for (const guide of visualGuides) {
    for (const localizedGuide of [guide, `en/${guide}`]) {
      const guideText = await readFile(new URL(localizedGuide, publicRoot), "utf8");
      assert.match(guideText, /\/images\/oproxy-steps\/[a-z-]+\.png/);
    }
  }

  for (const page of index.pages.filter((item) => !item.source.includes("/tos/"))) {
    assert.doesNotMatch(
      page.searchText,
      /已验证|实测|本次检查|检查所用账号|during this review|reviewed scope|reviewed account|observed minimum/i,
      `${page.source} should read like a help page, not a review report`,
    );
  }

  for (const legalPage of [
    "docs/tos/service-terms.md",
    "docs/tos/usage-policy.md",
    "docs/tos/transmission.md",
    "docs/tos/review-notification.md",
  ]) {
    const legalText = await readFile(new URL(legalPage, publicRoot), "utf8");
    assert.ok(legalText.length > 8_000, `${legalPage} should contain the full official text`);
  }

  const campusTerms = await readFile(new URL("docs/tokenflux/campus-ambassador.md", publicRoot), "utf8");
  assert.match(campusTerms, /更新日期：2026-07-30/);
  assert.match(campusTerms, /校园大使计划不包含多级返现/);
  assert.doesNotMatch(campusTerms, /^# 邀请返利/m);

  const [errorGuide, ccSwitchGuide, billingGuide] = await Promise.all([
    readFile(new URL("docs/tokenflux/error-codes.md", publicRoot), "utf8"),
    readFile(new URL("docs/agents/cc-switch.md", publicRoot), "utf8"),
    readFile(new URL("docs/tokenflux/billing.md", publicRoot), "utf8"),
  ]);
  assert.match(errorGuide, /429[\s\S]*RPM/);
  assert.match(errorGuide, /503[\s\S]*模型监控/);
  assert.match(errorGuide, /审核或封禁/);
  assert.match(ccSwitchGuide, /CC Switch[\s\S]*导入到 CCS/);
  assert.match(ccSwitchGuide, /ccswitch:\/\//);
  assert.match(billingGuide, /标准费用[\s\S]*实际费用/);
  assert.match(billingGuide, /1,000,000/);
  assert.match(billingGuide, /\/images\/oproxy-steps\/subscription-plans\.png/);
  assert.doesNotMatch(billingGuide, /\/images\/oproxy-steps\/model-pricing\.png/);
});

test("keeps the mirror reproducible and removes starter artifacts", async () => {
  const [packageJson, page, layout, syncScript] = await Promise.all([
    readFile(new URL("package.json", projectRoot), "utf8"),
    readFile(new URL("app/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
    readFile(new URL("scripts/sync-tokenflux.mjs", projectRoot), "utf8"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"marked"/);
  assert.match(page, /DocsApp/);
  assert.match(layout, /logo\.svg/);
  assert.match(syncScript, /markdown-sitemap\.xml/);
  await assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", projectRoot)));
});
