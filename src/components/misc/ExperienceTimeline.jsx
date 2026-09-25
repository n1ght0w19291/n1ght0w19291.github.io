import { useState } from "react";
import EventCard from "./EventCard.jsx";
import "./ExperienceTimeline.css";

const timelineData = [
  {
    date: "2026.09",
    events: [
      {
        title: "2026 神盾盃資安競賽 初賽",
        period: {
          ranges: [
            {
              start: "2026-09-17",
              end: "2026-09-19",
            },
          ],
        },
        result: "9 / 56",
        note: "團體賽 - 隊伍名稱：好想進決賽喔\n進入決賽",
      },
    ],
  },
  {
    date: "2026.05",
    events: [
      {
        title: "Pre-exam 2026",
        period: {
          ranges: [
            {
              start: "2026-05-16",
              end: "2026-05-18",
            },
          ],
        },
        result: "124 / 392",
        note: "個人賽 - 帳號名稱：n1ght0w1",
      },
      {
        title: "CYBERSEC 2026 臺灣資安大會",
        period: {
          ranges: [
            {
              start: "2026-05-05",
            },
          ],
        },
        note: "會眾",
      },
    ],
  },
  {
    date: "2026.02",
    events: [
      {
        title: "TSCCTF 2026",
        result: "50 / 115",
        note: "個人賽 - 帳號名稱：n1ght0w1",
      },
      {
        title: "THJCC 2026",
        period: {
          ranges: [
            {
              start: "2026-02-21",
              end: "2026-02-22",
            },
          ],
        },
        result: "66 / 314",
        note: "個人賽 - 帳號名稱：n1ght0w1",
      },
    ],
  },
  {
    date: "2026.01",
    events: [
      {
        title: "Scarlet CTF 2026",
        result: "52 / 762",
        note: "團體賽 - 隊伍名稱：$heb@n9",
      },
    ],
  },
  {
    date: "2025.12",
    events: [
      {
        title: "ASIS CTF Finals 2025",
        result: "194 / 476",
        note: "個人參賽 - 隊伍名稱：NotFound",
      },
      {
        title: "AIS3 EOF 2026 初賽",
        period: {
          ranges: [
            {
              start: "2025-12-20",
              end: "2025-12-22",
            },
          ],
        },
        result: "31",
        note: "團體賽 - 隊伍名稱：還沒想好但先報名",
      },
    ],
  },
  {
    date: "2025.11",
    events: [
      {
        title: "2025 臺北秋季程式設計節 城市通微服務大黑客松",
        result: "初賽",
        note: "團體賽 - 隊伍名稱：還真是高高在上阿",
      },
    ],
  },
  {
    date: "2025.10",
    events: [
      {
        title: "114年度資安技能金盾獎",
        period: {
          ranges: [
            {
              start: "2025-10-18",
            },
          ],
        },
        result: "初賽",
        note: "團體賽",
      },
    ],
  },
  {
    date: "2025.09",
    events: [
      {
        title: "AI CUP 2025 玉山人工智慧公開挑戰賽 初賽",
        period: {
          ranges: [
            {
              start: "2025-09-24",
              end: "2025-11-12",
            },
          ],
        },
        result: "102 / 790",
        note: "個人參賽",
      },
      {
        title: "2025 AEGIS 神盾盃 初賽",
        result: "15 / 40",
        note: "團體賽 - 隊伍名稱：TURKEY YAKI",
      },
    ],
  },
  {
    date: "2025.08",
    events: [
      {
        title: "TFC CTF 2025",
        result: "359 / 1791",
        note: "團體賽 - 隊伍名稱：$heb@n9",
      },
      {
        title: "HITCON CTF 2025",
        result: "67 / 1289",
        note: "團體賽 - 隊伍名稱：Shebang",
      },
      {
        title: "SekaiCTF 2025",
        result: "441 / 1060",
        note: "個人參賽 - 隊伍名稱：NotFound",
      },
      {
        title: "HITCON 2025",
        period: {
          ranges: [
            {
              start: "2025-08-15",
              end: "2025-08-16",
            },
          ],
        },
        note: "會眾",
      },
      {
        title: "WHY2025 CTF",
        result: "102 / 1806",
        note: "團體賽 - 隊伍名稱：$heb@n9",
      },
      { title: "COSCUP x RubyConf TW 2025", note: "會眾" },
    ],
  },
  {
    date: "2025.07",
    events: [
      {
        title: "AIS3 2025",
        period: {
          ranges: [
            {
              start: "2025-07-28",
              end: "2025-08-03",
            },
          ],
        },
        result: "軟體、網頁及 IoT 安全組 結業",
      },
      {
        title: "No Hack No CTF 2025",
        period: {
          ranges: [
            {
              start: "2025-07-05",
              end: "2025-07-07",
            },
          ],
        },
        result: "28 / 473",
        note: "個人參賽 - 隊伍名稱：NotFound",
      },
    ],
  },
  {
    date: "2025.05",
    events: [
      {
        title: "Pre-exam 2025",
        period: {
          ranges: [
            {
              start: "2025-05-24",
              end: "2025-05-26",
            },
          ],
        },
        result: "186 / 389",
        note: "個人賽 - 帳號名稱：pinzhen0910",
      },
      {
        title: "MyFirstCTF 2025",
        period: {
          ranges: [
            {
              start: "2025-05-24",
            },
          ],
        },
        note: "個人賽 - 帳號名稱：pinzhen0910",
        result: "11 / 83 | 潛力獎",
      },
    ],
  },
  {
    date: "2025.03",
    events: [
      {
        title: "picoCTF 2025",
        period: {
          ranges: [
            {
              start: "2025-03-07",
              end: "2025-03-17",
            },
          ],
        },
        result: "231 / 10460",
        note: "團體賽 - 隊伍名稱：I L0V3 0TT3R5",
      },
      {
        title: "PearlCTF 2025",
        result: "44 / 1024",
        note: "團體賽 - 隊伍名稱：I L0V3 0TT3R5",
      },
    ],
  },
  {
    date: "2025.01",
    events: [
      {
        title: "TSCCTF2025",
        result: "85 / 509",
        note: "個人賽 - 帳號名稱：pinzhen0910",
      },
      {
        title: "IrisCTF2025",
        result: "242 / 1064",
        note: "團體賽 - 隊伍名稱：I L0V3 0TT3R5",
      },
    ],
  },
  {
    date: "2024.12",
    events: [
      {
        title: "0xL4ugh CTF",
        result: "104 / 308",
        note: "團體賽 - 隊伍名稱：I L0V3 0TT3R5",
      },
    ],
  },
  {
    date: "2024.11",
    events: [
      {
        title: "INTIGRITI 1337UP LIVE 2024",
        result: "66 / 1061",
        note: "團體賽 - 隊伍名稱：I L0V3 0TT3R5",
      },
      {
        title: "臺北市立大學 113.1 全校程式設計實作競賽",
        period: {
          ranges: [
            {
              start: "2024-11-12",
            },
          ],
        },
        result: "佳作",
        note: "校內個人賽",
      },
      {
        title: "2024 Haunted Brewery (Hackers N' Hops)",
        result: "40 / 340",
        note: "團體賽 - 隊伍名稱：I L0V3 0TT3R5",
      },
    ],
  },
  {
    date: "2024.10",
    events: [
      {
        title: "IRON CTF 2024",
        result: "29 / 1033",
        note: "團體賽 - 隊伍名稱：I love otters",
      },
    ],
  },
  {
    date: "2024.09",
    events: [
      {
        title: "PatriotCTF",
        period: {
          ranges: [
            {
              start: "2024-09-20",
              end: "2024-09-22",
            },
          ],
        },
        result: "162 / 1360",
        note: "團體賽 - 隊伍名稱：I love seaotter",
      },
      {
        title: "2024 臺北秋季程式設計節 城市通微服務大黑客松",
        period: {
          ranges: [
            {
              start: "2024-09-07",
              end: "2024-09-08",
            },
          ],
        },
        result: "初賽",
        note: '團體賽 - 隊伍名稱：<script>alert("水獭")</script>',
      },
    ],
  },
  {
    date: "2024.05",
    events: [
      {
        title: "2024 臺北春季程式設計節 城市儀表板大黑客松",
        period: {
          ranges: [
            {
              start: "2024-05-11",
              end: "2024-05-12",
            },
          ],
        },
        result: "進入決選",
        note: "團體賽 - 隊伍名稱：水獭說的都",
      },
    ],
  },
  {
    date: "2022",
    events: [
      {
        title: "GICS 資安女婕思 資安闖天關 高中職組",
        result: "初賽",
        note: "團體賽",
      },
    ],
  },
];

const INITIAL_VISIBLE_GROUPS = 3;
const totalEvents = timelineData.reduce(
  (total, period) => total + period.events.length,
  0
);

const getDateTime = date =>
  date.includes(".") ? date.replace(".", "-") : date;

export const ExperienceTimeline = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleData = showAll
    ? timelineData
    : timelineData.slice(0, INITIAL_VISIBLE_GROUPS);
  const visibleEvents = visibleData.reduce(
    (total, period) => total + period.events.length,
    0
  );

  return (
    <section className="experience-timeline" aria-labelledby="experience-title">
      <header className="experience-timeline__header">
        <div className="experience-timeline__eyebrow">
          <span aria-hidden="true" />
          ACTIVITY LOG
        </div>

        <div className="experience-timeline__heading">
          <div>
            <h2 id="experience-title">其他經歷</h2>
            <p>把每一次參賽、學習與交流，整理成持續前進的軌跡。</p>
          </div>
          <span className="experience-timeline__range">2022 — 2026</span>
        </div>
      </header>

      <ol className="experience-timeline__list">
        {visibleData.map((period, index) => (
          <li
            className={`experience-timeline__entry${index === 0 ? " is-latest" : ""}`}
            key={period.date}
          >
            <div className="experience-timeline__date">
              <time dateTime={getDateTime(period.date)}>{period.date}</time>
              <span>
                {index === 0 ? "最近更新" : `${period.events.length} 項紀錄`}
              </span>
            </div>

            <div className="experience-timeline__marker" aria-hidden="true">
              <span />
            </div>

            <div className="experience-timeline__content">
              <div className="experience-timeline__mobile-date">
                <time dateTime={getDateTime(period.date)}>{period.date}</time>
                <span>
                  {index === 0 ? "最近更新" : `${period.events.length} 項紀錄`}
                </span>
              </div>
              <div className="experience-timeline__events">
                {period.events.map((event, eventIndex) => (
                  <EventCard
                    key={`${period.date}-${eventIndex}`}
                    event={event}
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {timelineData.length > INITIAL_VISIBLE_GROUPS && (
        <div className="experience-timeline__footer">
          <button
            type="button"
            className="experience-timeline__toggle"
            aria-expanded={showAll}
            onClick={() => setShowAll(current => !current)}
          >
            <span>
              {showAll
                ? "收起較早經歷"
                : `查看全部經歷（還有 ${timelineData.length - INITIAL_VISIBLE_GROUPS} 個時間點）`}
            </span>
            <span
              className="experience-timeline__toggle-icon"
              aria-hidden="true"
            >
              {showAll ? "↑" : "↓"}
            </span>
          </button>
        </div>
      )}
    </section>
  );
};
