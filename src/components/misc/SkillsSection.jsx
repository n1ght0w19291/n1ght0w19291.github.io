const skills = [
	{
		title: "語言與框架",
		items: [
			"C",
			"C++",
			"Java",
			"Python",
			"JavaScript",
			"TypeScript",
			"React",
			"Next.js",
			"Vue.js",
			"Astro",
			"PHP",
		],
	},
	{
		title: "DevOps",
		items: ["Docker", "Git", "GitHub"],
	},
	{
		title: "資料庫",
		items: ["MySQL"],
	},
];

export const SkillsSection = () => {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
			<h2>Skills</h2>

			<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
				{skills.map((group) => (
					<div
						key={group.title}
						style={{
							display: "grid",
							gridTemplateColumns: "120px 1fr",
							gap: 20,
							alignItems: "start",
						}}
					>
						<div
							style={{
								fontWeight: 600,
								paddingTop: 6,
								borderLeft: "3px solid var(--primary)",
								paddingLeft: 12,
							}}
						>
							{group.title}
						</div>

						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: 10,
							}}
						>
							{group.items.map((skill) => (
								<span
									key={skill}
									style={{
										padding: "6px 12px",
										borderRadius: "0.5rem",
										backgroundColor: "var(--btn-regular-bg)",
										color: "var(--btn-content)",
										fontSize: 13,
										fontWeight: 600,
									}}
								>
									{skill}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
