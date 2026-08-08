import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

/**
 * Generic OG image for static pages (About, Tags, Archives, Search, ...).
 * Renders the given title/subtitle instead of a fixed image, so every page
 * gets its own social-preview card.
 * @param {{ title: string, subtitle?: string }} params
 */
export default async ({ title, subtitle }) => {
  const hostname = new URL(SITE.website).hostname;

  return satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a", // Dark background (Slate 900)
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          color: "white",
          position: "relative",
        },
        children: [
          // Top-right decorative glow
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-120px",
                right: "-80px",
                width: "550px",
                height: "550px",
                background: "linear-gradient(140deg, #6366f1, #a855f7)",
                filter: "blur(110px)",
                opacity: 0.3,
                borderRadius: "100%",
              },
            },
          },
          // Bottom-left decorative glow
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "-120px",
                left: "-80px",
                width: "450px",
                height: "450px",
                background: "linear-gradient(140deg, #3b82f6, #6366f1)",
                filter: "blur(110px)",
                opacity: 0.3,
                borderRadius: "100%",
              },
            },
          },

          // Central content
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "40px",
                width: "90%",
              },
              children: [
                // Page title (HERO)
                {
                  type: "h1",
                  props: {
                    style: {
                      fontSize: 88,
                      fontWeight: 900,
                      letterSpacing: "-2px",
                      color: "white",
                      margin: 0,
                      lineHeight: 1.1,
                      textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                      fontFamily: "Wotfard, GenSenRounded2TW-R",
                    },
                    children: title,
                  },
                },

                // Small separator line
                {
                  type: "div",
                  props: {
                    style: {
                      width: "80px",
                      height: "6px",
                      backgroundColor: "#818cf8",
                      borderRadius: "4px",
                      margin: "30px 0",
                    },
                  },
                },

                // Optional subtitle
                subtitle && {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 32,
                      color: "#cbd5e1",
                      maxWidth: "80%",
                      margin: 0,
                      lineHeight: 1.4,
                      fontWeight: 400,
                    },
                    children: subtitle,
                  },
                },
              ].filter(Boolean),
            },
          },

          // Footer: hostname pill
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "12px 30px",
                borderRadius: "100px",
              },
              children: {
                type: "span",
                props: {
                  style: {
                    fontSize: 24,
                    color: "#94a3b8",
                    fontWeight: 600,
                    letterSpacing: "1px",
                  },
                  children: hostname,
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(),
    }
  );
};
