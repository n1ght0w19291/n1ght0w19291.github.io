import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getEntryPath } from "@/utils/contentEntry";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export async function GET() {
  if (import.meta.env.PUBLIC_ENABLE_RSS !== "true") {
    return new Response(null, { status: 404 });
  }

  const [blogPosts, projectPosts] = await Promise.all([
    getCollection("blog"),
    SITE.showProjects && SITE.showProjectsInIndex
      ? getCollection("projects")
      : Promise.resolve([]),
  ]);
  const sortedPosts = getSortedPosts([...blogPosts, ...projectPosts]);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(entry => ({
      link: getEntryPath(entry),
      title: entry.data.title,
      description: entry.data.description,
      pubDate: new Date(
        "modDatetime" in entry.data && entry.data.modDatetime
          ? entry.data.modDatetime
          : entry.data.pubDatetime
      ),
    })),
  });
}
