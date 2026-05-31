import type { ContentEntry } from "./contentEntry";
import { getEntryPublishedMs } from "./contentEntry";
import postFilter, { type PostFilterOptions } from "./postFilter";

const getSortedPosts = (posts: ContentEntry[], options?: PostFilterOptions) =>
  posts
    .filter(post => postFilter(post, options))
    .map(post => ({ post, publishedMs: getEntryPublishedMs(post) }))
    .sort((a, b) => b.publishedMs - a.publishedMs)
    .map(({ post }) => post);

export default getSortedPosts;
