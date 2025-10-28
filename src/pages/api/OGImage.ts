import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { createElement } from "react";
import satori, { type FontWeight } from "satori";

export async function generateOGImage(title: string) {
	const lexend = fs.readFileSync(
		path.resolve("./public/fonts/Lexend-Regular.ttf"),
	);
	const zenMaru = fs.readFileSync(
		path.resolve("./public/fonts/ZenMaruGothic-Regular.ttf"),
	);
	const notoSansTC = fs.readFileSync(
		path.resolve("./public/fonts/NotoSansTC-Regular.ttf"),
	);

	const svg = await satori(
		createElement(
			"div",
			{
				style: {
					width: "1200px",
					height: "630px",
					backgroundColor: "#F7FFF7",
					color: "#53a3f2",
					fontFamily: "Lexend, ZenMaruGothic, Noto Sans TC, sans-serif",
					fontSize: "60px",
					fontWeight: "bold",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "20px",
					padding: "80px 140px",
					boxSizing: "border-box",
				},
			},
			createElement("span", null, title),
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Lexend",
					data: lexend,
					weight: 400 as FontWeight,
					style: "normal",
				},
				{
					name: "ZenMaruGothic",
					data: zenMaru,
					weight: 400 as FontWeight,
					style: "normal",
				},
				{
					name: "Noto Sans TC",
					data: notoSansTC,
					weight: 400 as FontWeight,
					style: "normal",
				},
			],
		},
	);

	const resvg = new Resvg(svg, { font: { loadSystemFonts: true } });
	const pngImage = resvg.render();

	return pngImage.asPng();
}
