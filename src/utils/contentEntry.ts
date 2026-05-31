import type { CollectionEntry } from "astro:content";
import { getPath } from "./getPath";

export type ContentEntry =
  | CollectionEntry<"blog">
  | CollectionEntry<"projects">;

export const isProjectEntry = (
  entry: Pick<ContentEntry, "collection">
): entry is CollectionEntry<"projects"> => entry.collection === "projects";

export const getProjectSlug = (id: string) => id.split("/")[0];

export const getEntryPath = (
  entry: Pick<ContentEntry, "collection" | "id" | "filePath">
) => {
  if (isProjectEntry(entry)) return `/projects/${getProjectSlug(entry.id)}`;
  return getPath(entry.id, entry.filePath);
};

export const getEntryPublishedMs = (entry: ContentEntry) => {
  const modDatetime = "modDatetime" in entry.data ? entry.data.modDatetime : null;
  return new Date(modDatetime ?? entry.data.pubDatetime).getTime();
};