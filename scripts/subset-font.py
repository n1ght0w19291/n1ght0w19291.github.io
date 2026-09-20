#!/usr/bin/env python3
"""Generate and verify the deployable subset of the site's CJK font.

The source font remains the full GenSen Rounded font. The generated WOFF2 is
used by browsers and the generated TTF is used by Satori for OG images.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src/assets/fonts/gen-sen-rounded-tw.otf"
OUTPUTS = {
    ".woff2": ROOT / "src/assets/fonts/gen-sen-rounded-tw-subset.woff2",
    ".ttf": ROOT / "src/assets/fonts/gen-sen-rounded-tw-subset.ttf",
}
TEXT_SUFFIXES = {
    ".astro",
    ".css",
    ".html",
    ".js",
    ".jsx",
    ".json",
    ".md",
    ".mdx",
    ".svg",
    ".ts",
    ".tsx",
}


def iter_source_files() -> list[Path]:
    return sorted(
        path
        for path in (ROOT / "src").rglob("*")
        if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES
    )


def collect_characters() -> str:
    characters: set[str] = set()
    for path in iter_source_files():
        characters.update(path.read_text(encoding="utf-8").replace("\ufeff", ""))
    return "".join(sorted(characters, key=ord))


def get_cmap(path: Path) -> set[int]:
    with TTFont(str(path), lazy=True) as font:
        cmap = font.getBestCmap() or {}
        return set(cmap)


def is_cjk_character(character: str) -> bool:
    codepoint = ord(character)
    return (
        0x2E80 <= codepoint <= 0x2FFF
        or 0x3000 <= codepoint <= 0x303F
        or 0x3400 <= codepoint <= 0x4DBF
        or 0x4E00 <= codepoint <= 0x9FFF
        or 0xF900 <= codepoint <= 0xFAFF
        or 0xFF00 <= codepoint <= 0xFFEF
        or 0x20000 <= codepoint <= 0x2FA1F
    )


def select_supported_characters(characters: str, source_cmap: set[int]) -> str:
    missing_cjk = sorted(
        character
        for character in characters
        if is_cjk_character(character) and ord(character) not in source_cmap
    )
    if missing_cjk:
        preview = "".join(missing_cjk[:20])
        raise RuntimeError(
            "The source font does not contain CJK characters used by the site: "
            f"{preview}"
        )

    unsupported = sorted(
        character for character in characters if ord(character) not in source_cmap
    )
    if unsupported:
        preview = "".join(unsupported[:20])
        print(
            "[font] Characters outside the source font will use fallback fonts: "
            f"{preview}",
            file=sys.stderr,
        )

    return "".join(character for character in characters if ord(character) in source_cmap)


def build_subset(characters: str, output: Path) -> None:
    options = subset.Options()
    options.flavor = "woff2" if output.suffix == ".woff2" else None
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.name_languages = ["*"]

    font = subset.load_font(str(SOURCE), options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=characters)
    subsetter.subset(font)

    temporary = output.with_suffix(output.suffix + ".tmp")
    try:
        subset.save_font(font, str(temporary), options)
        temporary.replace(output)
    finally:
        if temporary.exists():
            temporary.unlink()


def verify_subset(characters: str, output: Path) -> None:
    if not output.exists():
        raise RuntimeError(f"Generated font is missing: {output}")

    output_cmap = get_cmap(output)
    missing = sorted(
        character for character in characters if ord(character) not in output_cmap
    )
    if missing:
        preview = "".join(missing[:20])
        raise RuntimeError(f"Generated font is missing site characters: {preview}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="Only verify existing generated fonts; do not rewrite them.",
    )
    args = parser.parse_args()

    if not SOURCE.exists():
        raise RuntimeError(f"Source font is missing: {SOURCE}")

    characters = collect_characters()
    source_cmap = get_cmap(SOURCE)
    supported_characters = select_supported_characters(characters, source_cmap)

    if not args.check:
        for output in OUTPUTS.values():
            build_subset(supported_characters, output)

    for output in OUTPUTS.values():
        verify_subset(supported_characters, output)

    print(
        f"[font] Verified {len(supported_characters):,} characters in "
        f"{len(OUTPUTS)} generated fonts."
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as error:
        print(f"[font] ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)
