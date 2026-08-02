import { DocsApp } from "../components/DocsApp";

function resolveSource(slug: string[]) {
  const route = `/${slug.join("/")}`;
  if (route === "/en" || route === "/en/") return { sourcePath: "/en.md", currentRoute: "/en/" };
  if (route.endsWith(".html")) return { sourcePath: route.replace(/\.html$/, ".md"), currentRoute: route };
  return { sourcePath: `${route}.md`, currentRoute: route };
}

export default async function DocumentationPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const resolved = resolveSource(slug);
  return <DocsApp {...resolved} />;
}
