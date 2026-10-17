import { notFound } from "next/navigation";
import { DocsLayout } from "@/components/DocsLayout";
import { pages } from "@/lib/catalog";
import { readDoc } from "@/lib/docs";

export const dynamicParams = false;
export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug ? page.slug.split("/") : [] }));
}
type Props = { params: Promise<{ slug?: string[] }> };
export async function generateMetadata({ params }: Props) {
  const doc = readDoc((await params).slug?.join("/") || "");
  return {
    title: `${doc?.title || "Not found"} · Glimpse docs`,
    description: doc?.description,
  };
}
export default async function DocPage({ params }: Props) {
  const doc = readDoc((await params).slug?.join("/") || "");
  if (!doc) notFound();
  return <DocsLayout doc={doc} />;
}
