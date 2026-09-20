import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const levels = [
  { label: "Quiet", className: "is-quiet" },
  { label: "Steady", className: "is-steady" },
  { label: "Active", className: "is-active" },
  { label: "Peak", className: "is-peak" },
];

export const GitHubContributionCard = ({ username = "n1ght0w19291" }) => {
  const [theme, setTheme] = useState("light");
  const chartTheme = theme === "dark" ? "dark:8acfc0" : "light:4f9186";
  const chartUrl = `https://ghchart.xqsit94.in/${chartTheme}/${username}`;

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
      <div className="github-contribution__chart-panel">
        <div className="github-contribution__chart-heading">
          <span>Last 12 months</span>
          <span>Daily contributions</span>
        </div>
        <div className="github-contribution__chart-frame">
          <img
            className="github-contribution__image"
            src={chartUrl}
            alt={`${username} 的 GitHub 過去 12 個月貢獻紀錄`}
            loading="lazy"
            decoding="async"
          />
        </div>
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
      </div>
    </div>
  );
};

GitHubContributionCard.propTypes = {
  username: PropTypes.string,
};
