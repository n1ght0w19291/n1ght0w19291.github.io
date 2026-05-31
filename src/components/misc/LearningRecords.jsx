import { GitHubContributionCard } from "./GitHubContributionCard.jsx";
import { LeetCodeStatus } from "./LeetcodeStatus.jsx";

const learningLinks = [
	{
		name: "picoCTF",
		url: "https://play.picoctf.org/users/n1ght0w1",
		color: "#ff5722",
	},
	{
		name: "TryHackMe",
		url: "https://tryhackme.com/p/n1ght0w19291",
		color: "#4caf50",
	},
	{
		name: "LeetCode",
		url: "https://leetcode.com/u/n1ght0w1/",
		color: "#f79f1f",
		extraComponent: () => <LeetCodeStatus username="n1ght0w1" />,
	},
	{
		name: "WakaTime",
		url: "https://wakatime.com/@n1ght0w1?rank=me&page=1&country_code=TW",
		color: "#1e88e5",
	},
	{
		name: "Github Profile",
		url: "https://github.com/n1ght0w19291",
		color: "#b2b2b2",
		extraComponent: () => <GitHubContributionCard username="n1ght0w19291" />,
	},
];

export const LearningRecords = () => {
	return (
		<div style={{ maxWidth: 500, margin: "40px auto", textAlign: "center" }}>
			<h3 style={{ marginBottom: 16, color: "var(--btn-content)" }}>學習與挑戰紀錄</h3>
			<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				{learningLinks.map((item) => (
					<div
						key={item.name}
						style={{ display: "flex", flexDirection: "column", gap: 4 }}
					>
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "10px 16px",
								borderRadius: 8,
								border: "2px solid transparent",
								backgroundColor: `${item.color}20`,
								color: item.color,
								fontWeight: "500",
								textDecoration: "none",
								transition: "background-color 0.2s",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = `${item.color}40`;
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = `${item.color}20`;
							}}
						>
							<span>{item.name}</span>
							<span style={{ fontSize: 14 }}>↗</span>
						</a>

						{item.extraComponent && (
							<div style={{ marginTop: 8 }}>{item.extraComponent()}</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};
