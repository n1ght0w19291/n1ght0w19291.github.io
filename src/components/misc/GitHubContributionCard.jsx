import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const levels = [
  { label: "None", className: "is-empty" },
  { label: "Quiet", className: "is-quiet" },
  { label: "Steady", className: "is-steady" },
  { label: "Active", className: "is-active" },
  { label: "Peak", className: "is-peak" },
];

export const GitHubContributionCard = ({ username = "n1ght0w19291" }) => {
  const [theme, setTheme] = useState("light");
  const [chartStatus, setChartStatus] = useState({
    url: null,
    state: "loading",
  });
  const chartTheme = theme === "dark" ? "dark:8acfc0" : "light:4f9186";
  const chartUrl = `https://ghchart.xqsit94.in/${chartTheme}/${username}`;
  const chartReady =
    chartStatus.url === chartUrl && chartStatus.state === "ready";
  const chartFailed =
    chartStatus.url === chartUrl && chartStatus.state === "error";

  useEffect(() => {
    let cancelled = false;
    const preload = new Image();
    const timeoutId = window.setTimeout(() => {
      if (!cancelled) {
        setChartStatus({ url: chartUrl, state: "error" });
      }
    }, 15000);

    const markReady = () => {
      if (!cancelled) {
        window.clearTimeout(timeoutId);
        setChartStatus({ url: chartUrl, state: "ready" });
      }
    };

    const markFailed = () => {
      if (!cancelled) {
        window.clearTimeout(timeoutId);
        setChartStatus({ url: chartUrl, state: "error" });
      }
    };

    setChartStatus({ url: chartUrl, state: "loading" });
    preload.onload = markReady;
    preload.onerror = markFailed;
    preload.src = chartUrl;

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [chartUrl]);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="learning-widget learning-widget--github">
      <div
        className="github-contribution__chart-panel"
        aria-busy={!chartReady && !chartFailed}
      >
        {chartReady && (
          <div className="github-contribution__chart-heading">
            <span>Last 12 months</span>
            <span>Daily contributions</span>
          </div>
        )}

        <div
          className="github-contribution__chart-frame"
          style={{
            position: "relative",
            minHeight: chartReady ? undefined : "8rem",
          }}
        >
          {!chartReady && (
            <div
              className="learning-widget__loading"
              role={chartFailed ? "alert" : "status"}
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                color: "var(--btn-content)",
              }}
            >
              {chartFailed
                ? "Unable to load GitHub contributions."
                : "Loading..."}
            </div>
          )}
          <img
            className="github-contribution__image"
            src={chartUrl}
            alt={`${username} 的 GitHub 過去 12 個月貢獻紀錄`}
            decoding="async"
            style={{
              opacity: chartReady ? 1 : 0,
              position: chartReady ? "relative" : "absolute",
              inset: chartReady ? undefined : 0,
            }}
          />
        </div>

        {chartReady && (
          <>
            <div
              className="github-contribution__legend"
              aria-label="Contribution levels"
            >
              <span>Less</span>
              <div className="github-contribution__levels">
                {levels.map(level => (
                  <span
                    className={`github-contribution__level ${level.className}`}
                    key={level.label}
                    title={level.label}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

GitHubContributionCard.propTypes = {
  username: PropTypes.string,
};
