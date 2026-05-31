import fs from "fs";
import path from "path";

async function loadGoogleFonts(): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const wotfardPath = path.resolve("./src/assets/fonts/wotfard.ttf");
  const gsrPath = path.resolve("./src/assets/fonts/gen-sen-rounded-tw.otf");

  const wotfardData = fs.readFileSync(wotfardPath);
  const gsrData = fs.readFileSync(gsrPath);

  return [
    { name: "Wotfard", data: wotfardData.buffer, weight: 400, style: "normal" },
    { name: "Wotfard", data: wotfardData.buffer, weight: 600, style: "normal" },
    { name: "Wotfard", data: wotfardData.buffer, weight: 700, style: "normal" },
    { name: "Wotfard", data: wotfardData.buffer, weight: 900, style: "normal" },
    // CJK fallback — satori uses this when Wotfard has no glyph for the character
    { name: "GenSenRounded2TW-R", data: gsrData.buffer, weight: 400, style: "normal" },
    { name: "GenSenRounded2TW-R", data: gsrData.buffer, weight: 700, style: "normal" },
    { name: "GenSenRounded2TW-R", data: gsrData.buffer, weight: 900, style: "normal" },
  ];
}

export default loadGoogleFonts;
