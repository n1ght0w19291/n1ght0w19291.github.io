import { GitHubContributionCard } from "./GitHubContributionCard.jsx";
import { LeetCodeStatus } from "./LeetcodeStatus.jsx";
import "./LearningRecords.css";

const learningLinks = [
  {
    name: "picoCTF",
    shortName: "PC",
    description: "資安題目與實戰練習",
    url: "https://learn.cylabacademy.org/users/n1ght0w1",
    color: "#b87858",
  },
  {
    name: "TryHackMe",
    shortName: "THM",
    description: "網路安全學習路徑",
    url: "https://tryhackme.com/p/n1ght0w19291",
    color: "#4f9186",
  },
  {
    name: "LeetCode",
    shortName: "LC",
    description: "保持解題與演算法訓練",
    panelLabel: "PROBLEM SOLVING",
    panelNote: "用年度解題節奏，觀察自己是否持續保持練習。",
    panelStatus: "SYNCED",
    url: "https://leetcode.com/u/n1ght0w1/",
    color: "#c58a64",
    extraComponent: () => <LeetCodeStatus username="n1ght0w1" />,
    featured: true,
  },
  {
    name: "WakaTime",
    shortName: "WT",
    description: "記錄日常開發時間",
    url: "https://wakatime.com/@n1ght0w1?rank=me&page=1&country_code=TW",
    color: "#6593ad",
  },
  {
    name: "GitHub",
    shortName: "GH",
    description: "開源專案與程式足跡",
    panelLabel: "BUILDING IN PUBLIC",
    panelNote: "用提交紀錄回看寫程式、修正與持續累積的軌跡。",
    panelStatus: "TRACKING",
    url: "https://github.com/n1ght0w19291",
    color: "#8a7a6a",
    extraComponent: () => <GitHubContributionCard username="n1ght0w19291" />,
    featured: true,
  },
];

const featuredRecords = learningLinks.filter(item => item.featured);
const platformRecords = learningLinks.filter(item => !item.featured);

function RecordLink({ item, compact = false }) {
  return (
    <a
      className={"learning-records__link" + (compact ? " is-compact" : "")}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ "--record-accent": item.color }}
    >
      <span className="learning-records__mark" aria-hidden="true">
        {item.shortName}
      </span>
      <span className="learning-records__link-copy">
        <strong>{item.name}</strong>
        <span>{item.description}</span>
      </span>
      <span className="learning-records__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export const LearningRecords = () => {
  return (
    <section
      className="learning-records"
      aria-labelledby="learning-records-title"
    >
      <header className="learning-records__header">
        <div className="learning-records__eyebrow">
          <span aria-hidden="true" />
          LEARNING DASHBOARD
        </div>

        <div className="learning-records__heading">
          <div>
            <h2 id="learning-records-title">學習與挑戰紀錄</h2>
            <p>
              把練習、解題與持續寫程式的痕跡，整理成一個可以回看的進度面板。
            </p>
          </div>
          <span className="learning-records__range">PROGRESS SNAPSHOT</span>
        </div>
      </header>

      <div className="learning-records__featured">
        {featuredRecords.map(item => (
          <article
            className="learning-records__feature"
            key={item.name}
            style={{ "--record-accent": item.color }}
          >
            <div className="learning-records__feature-header">
              <div className="learning-records__feature-meta">
                <span className="learning-records__feature-label">
                  {item.panelLabel}
                </span>
                <span className="learning-records__feature-status">
                  <span className="diffusing-indicator" aria-hidden="true" />
                  {item.panelStatus}
                </span>
              </div>
              <RecordLink item={item} />
              <p className="learning-records__feature-note">{item.panelNote}</p>
            </div>
            <div className="learning-records__insight">
              {item.extraComponent()}
            </div>
          </article>
        ))}
      </div>

      <div className="learning-records__platforms">
        <div className="learning-records__subheading">
          <div>
            <span className="learning-records__sub-eyebrow">MORE SIGNALS</span>
            <h3>其他學習入口</h3>
          </div>
          <span>{platformRecords.length} 個平台</span>
        </div>

        <div className="learning-records__link-grid">
          {platformRecords.map(item => (
            <RecordLink key={item.name} item={item} compact />
          ))}
        </div>
      </div>
    </section>
  );
};
