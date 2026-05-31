import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

/**
 * Generates an OG image for a tag page.
 * @param {string} tagName - The display name of the tag (e.g. "javascript")
 */
export default async tagName => {
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
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          color: "white",
          position: "relative",
        },
        children: [
          // Top-right decorative glow (accent blue)
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-120px",
                right: "-80px",
                width: "550px",
                height: "550px",
                background: "linear-gradient(140deg, #008fec, #6366f1)",
                filter: "blur(110px)",
                opacity: 0.35,
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
                background: "linear-gradient(140deg, #3b82f6, #0ea5e9)",
                filter: "blur(110px)",
                opacity: 0.25,
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
                // "# tag" hero label
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "baseline",
                      gap: "4px",
                    },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: 80,
                            fontWeight: 900,
                            color: "#008fec",
                            opacity: 0.7,
                            lineHeight: 1,
                            marginRight: "4px",
                          },
                          children: "#",
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: 96,
                            fontWeight: 900,
                            letterSpacing: "-2px",
                            color: "white",
                            lineHeight: 1,
                            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                            fontFamily: "Wotfard, GenSenRounded2TW-R",
                          },
                          children: tagName,
                        },
                      },
                    ],
                  },
                },

                // Separator
                {
                  type: "div",
                  props: {
                    style: {
                      width: "80px",
                      height: "5px",
                      backgroundColor: "#008fec",
                      borderRadius: "4px",
                      margin: "28px 0",
                      opacity: 0.7,
                    },
                  },
                },

                // Subtitle
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 32,
                      color: "#94a3b8",
                      margin: 0,
                      lineHeight: 1.4,
                      fontWeight: 400,
                    },
                    children: `All articles tagged on ${SITE.title}`,
                  },
                },
              ],
            },
          },

          // Footer pill: site hostname
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
                    fontSize: 22,
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
