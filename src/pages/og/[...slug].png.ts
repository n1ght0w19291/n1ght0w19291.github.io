import { getSortedPosts } from "@utils/content-utils";
import { generateOGImage } from "@utils/og-image";
import type { APIRoute } from "astro";
import { siteConfig } from "@/config";

export async function getStaticPaths() {
	const posts = await getSortedPosts();
	const postPaths = posts.map((entry) => ({
		params: { slug: entry.id },
		props: { title: entry.data.title },
	}));
	return [
		...postPaths,
		{
			params: { slug: "default" },
			props: { title: `${siteConfig.title} - ${siteConfig.subtitle}` },
		},
	];
}

export const GET: APIRoute<{ title: string }> = async ({ props }) => {
	const png = await generateOGImage(props.title);
	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
	});
};
