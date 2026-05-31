import { useState } from "react";
import EventCard from "./EventCard.jsx";

const timelineData = [
	{
		date: "2026.05",
		events: [
			{ title: "Pre-exam 2026", result: "124 / 392" },
			{ title: "CYBERSEC 2026 臺灣資安大會", result: "會眾" },
		],
	},
	{
		date: "2026.02",
		events: [
			{ title: "TSCCTF 2026", result: "50" },
			{ title: "THJCC 2026", result: "66 / 314" },
		],
	},
	{
		date: "2026.01",
		events: [{ title: "Scarlet CTF 2026", result: "52 / 762" }],
	},
	{
		date: "2025.12",
		events: [
			{ title: "ASIS CTF Finals 2025", result: "194 / 476" },
			{ title: "AIS3 EOF 2026 初賽", result: "31" },
		],
	},
	{
		date: "2025.11",
		events: [
			{ title: "2025 臺北秋季程式設計節 城市通微服務大黑客松", result: "初賽" },
		],
	},
	{
		date: "2025.10",
		events: [{ title: "114年度資安技能金盾獎", result: "初賽" }],
	},
	{
		date: "2025.09",
		events: [
			{ title: "AI CUP 2025 玉山人工智慧公開挑戰賽 初賽", result: "102 / 790" },
			{ title: "2025 AEGIS 神盾盃 初賽", result: "15 / 40" },
		],
	},
	{
		date: "2025.08",
		events: [
			{ title: "TFC CTF 2025", result: "359 / 1791" },
			{ title: "HITCON CTF 2025", result: "67 / 1289" },
			{ title: "SekaiCTF 2025", result: "441 / 1060" },
			{ title: "HITCON 2025", result: "會眾" },
			{ title: "WHY2025 CTF", result: "102 / 1806" },
			{ title: "COSCUP x RubyConf TW 2025", result: "會眾" },
		],
	},
	{
		date: "2025.07",
		events: [
			{ title: "AIS3 2025", result: "軟體、網頁及 IoT 安全組 結業" },
			{ title: "No Hack No CTF 2025", result: "28 / 473" },
		],
	},
	{
		date: "2025.05",
		events: [
			{ title: "Pre-exam 2025", result: "186 / 389" },
			{ title: "MyFirstCTF 2025", result: "11 / 83 ，潛力獎" },
		],
	},
	{
		date: "2025.03",
		events: [
			{ title: "picoCTF 2025", result: "231 / 10460" },
			{ title: "PearlCTF 2025", result: "44 / 1024" },
		],
	},
	{
		date: "2025.01",
		events: [
			{ title: "TSCCTF2025", result: "85 / 509" },
			{ title: "IrisCTF2025", result: "242 / 1064" },
		],
	},
	{
		date: "2024.12",
		events: [{ title: "0xL4ugh CTF", result: "104 / 308" }],
	},
	{
		date: "2024.11",
		events: [
			{ title: "INTIGRITI 1337UP LIVE 2024", result: "66 / 1061" },
			{ title: "臺北市立大學 113.1 全校程式設計實作競賽", result: "佳作" },
			{ title: "2024 Haunted Brewery", result: "40 / 340" },
		],
	},
	{
		date: "2024.10",
		events: [{ title: "IRON CTF 2024", result: "29 / 1033" }],
	},
	{
		date: "2024.09",
		events: [
			{ title: "PatriotCTF", result: "162 / 1360" },
			{ title: "2024 臺北秋季程式設計節 城市通微服務大黑客松", result: "初賽" },
		],
	},
	{
		date: "2024.05",
		events: [
			{
				title: "2024 臺北春季程式設計節 城市儀表板大黑客松",
				result: "進入決選",
			},
		],
	},
	{
		date: "2022",
		events: [{ title: "GICS 資安女婕思", result: "資安闖天關 高中職組 初賽" }],
	},
];

export const ExperienceTimeline = () => {
	const [expanded, setExpanded] = useState({});
	const [showAll, setShowAll] = useState(false);

	const visibleData = showAll ? timelineData : timelineData.slice(0, 3);

	return (
		<div
			style={{
				maxWidth: 900,
				margin: "40px auto",
				padding: "0 20px",
				overflowX: "hidden",
			}}
		>
			<h2 style={{ marginBottom: 56, color: "var(--btn-content)" }}>其他經歷</h2>

			<div style={{ position: "relative" }}>
				<div
					style={{
						position: "absolute",
						left: "50%",
						transform: "translateX(-50%)",
						width: 4,
						height: "100%",
						backgroundColor: "var(--line-color)",
						opacity: 0.4,
					}}
				/>

				{visibleData.map((item, idx) => {
					const isLeft = idx % 2 === 0;

					return (
						<div
							key={item.date}
							style={{
								display: "flex",
								justifyContent: isLeft ? "flex-start" : "flex-end",
								marginBottom: 48,
								position: "relative",
							}}
						>
							<div
								style={{ width: "45%", textAlign: isLeft ? "right" : "left" }}
							>
								<div
									style={{
										fontWeight: 700,
										fontSize: "1.1rem",
										marginBottom: 14,
										color: "var(--btn-content)",
									}}
								>
									{item.date}
								</div>
								<div
									style={{ display: "flex", flexDirection: "column", gap: 14 }}
								>
									{item.events.map((event, i) => (
										<EventCard
											key={`${item.date}-${i}`}
											event={event}
											expanded={expanded}
											setExpanded={setExpanded}
										/>
									))}
								</div>
							</div>

							<div
								style={{
									position: "absolute",
									left: "50%",
									top: 10,
									transform: "translateX(-50%)",
									width: 16,
									height: 16,
									borderRadius: "50%",
									backgroundColor: "var(--primary)",
									border: "4px solid var(--color-background, #fff)",
									boxShadow: "0 0 0 2px var(--line-color)",
									zIndex: 2,
								}}
							/>
						</div>
					);
				})}
			</div>

			{timelineData.length > 3 && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: 16,
						marginBottom: 40,
					}}
				>
					<button
						type="button"
						onClick={() => setShowAll(!showAll)}
						style={{
							padding: "8px 16px",
							borderRadius: 8,
							color: "var(--btn-content)",
							cursor: "pointer",
							fontWeight: 600,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 16,
							backgroundColor: "var(--btn-regular-bg)",
							backdropFilter: "blur(8px)",
							WebkitBackdropFilter: "blur(8px)",
							border: "1px solid var(--line-color)",
							boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
							transition: "all 0.2s ease",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = "translateY(-2px)";
							e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = "translateY(0)";
							e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
						}}
					>
						<div>
							{showAll
								? "收起"
								: `顯示更多 (還有 ${timelineData.length - 3} 個月的經歷)`}
						</div>
						<div>{showAll ? "▲" : "▼"}</div>
					</button>
				</div>
			)}
		</div>
	);
};
