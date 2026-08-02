import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "public");
const overrideRoot = path.join(projectRoot, "content-overrides");

const preferredOrder = [
  "docs/quickstart.md",
  "docs/faq.md",
  "docs/tokenflux/create-apikey.md",
  "docs/tokenflux/endpoints.md",
  "docs/tokenflux/composite-key.md",
  "docs/tokenflux/fast-mode.md",
  "docs/tokenflux/error-codes.md",
  "docs/tokenflux/billing.md",
  "docs/tokenflux/invoice.md",
  "docs/tokenflux/team.md",
  "docs/tokenflux/referral.md",
  "docs/tokenflux/campus-ambassador.md",
  "docs/agents/cc-switch.md",
  "docs/agents/claude-code.md",
  "docs/agents/codex.md",
  "docs/agents/opencode.md",
  "docs/chatbot/built-in-chat.md",
  "docs/tos/service-terms.md",
  "docs/tos/usage-policy.md",
  "docs/tos/transmission.md",
  "docs/tos/review-notification.md",
  "docs/tos/supported-countries.md",
];

const relativePaths = [
  "index.md",
  ...preferredOrder,
  "en.md",
  ...preferredOrder.map((item) => `en/${item}`),
];

function sectionFor(relativePath, lang) {
  const bare = lang === "en" ? relativePath.replace(/^en\//, "") : relativePath;
  if (bare === "docs/quickstart.md" || bare === "docs/faq.md") return "docs";
  if (/^docs\/tokenflux\/(create-apikey|endpoints|composite-key|fast-mode|error-codes)\.md$/.test(bare)) return "apiKey";
  if (bare.startsWith("docs/tokenflux/")) return "tokenflux";
  if (bare.startsWith("docs/agents/")) return "agents";
  if (bare.startsWith("docs/chatbot/")) return "chatbot";
  if (bare.startsWith("docs/tos/")) return "terms";
  return "home";
}

function routeFor(relativePath) {
  if (relativePath === "index.md") return "/";
  if (relativePath === "en.md") return "/en/";
  return `/${relativePath.replace(/\.md$/, ".html")}`;
}

function plainText(markdown) {
  return markdown
    .replace(/^\uFEFF/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[`*_>|~:-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function orderFor(relativePath, lang) {
  const bare = lang === "en" ? relativePath.replace(/^en\//, "") : relativePath;
  const index = preferredOrder.indexOf(bare);
  return index === -1 ? 999 : index;
}

async function readCanonical(relativePath) {
  try {
    return await readFile(path.join(overrideRoot, relativePath), "utf8");
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    return readFile(path.join(publicRoot, relativePath), "utf8");
  }
}

await mkdir(publicRoot, { recursive: true });

const pages = [];
for (const relativePath of relativePaths) {
  const markdown = await readCanonical(relativePath);
  const destination = path.join(publicRoot, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, markdown);

  const normalized = markdown.replace(/^\uFEFF/, "");
  const title = normalized.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? relativePath;
  const lang = relativePath === "en.md" || relativePath.startsWith("en/") ? "en" : "zh";
  const searchable = plainText(normalized);
  pages.push({
    title,
    lang,
    section: sectionFor(relativePath, lang),
    route: routeFor(relativePath),
    source: `/${relativePath}`,
    order: orderFor(relativePath, lang),
    excerpt: searchable.slice(0, 180),
    searchText: searchable,
  });
}

pages.sort((a, b) => a.lang.localeCompare(b.lang) || a.order - b.order || a.title.localeCompare(b.title));
await writeFile(path.join(publicRoot, "site-index.json"), `${JSON.stringify({ pages }, null, 2)}\n`);

const sitemap = [
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
  "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
  ...relativePaths.map((relativePath) => `  <url><loc>http://localhost:3000/${relativePath}</loc></url>`),
  "</urlset>",
  "",
].join("\n");
await writeFile(path.join(publicRoot, "markdown-sitemap.xml"), sitemap);

console.log(`Indexed ${pages.length} local Oproxy Markdown pages.`);
