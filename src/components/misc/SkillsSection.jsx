import { Icon, addCollection } from "@iconify/react/offline";
import simpleIconsData from "@iconify-json/simple-icons/icons.json";
import deviconData from "@iconify-json/devicon/icons.json";

addCollection(simpleIconsData);
addCollection(deviconData);

const ICON_MAP = {
	C: { id: "simple-icons:c", color: "#A8B9CC" },
	"C++": { id: "simple-icons:cplusplus", color: "#00599C" },
	Java: { id: "devicon:java", color: null },
	Python: { id: "simple-icons:python", color: "#3776AB" },
	JavaScript: { id: "simple-icons:javascript", color: "#F7DF1E" },
	TypeScript: { id: "simple-icons:typescript", color: "#3178C6" },
	React: { id: "simple-icons:react", color: "#61DAFB" },
	"Next.js": { id: "simple-icons:nextdotjs", color: "currentColor" },
	"Vue.js": { id: "simple-icons:vuedotjs", color: "#4FC08D" },
	Astro: { id: "simple-icons:astro", color: "currentColor" },
	PHP: { id: "simple-icons:php", color: "#777BB4" },
	Docker: { id: "simple-icons:docker", color: "#2496ED" },
	Git: { id: "simple-icons:git", color: "#F05032" },
	GitHub: { id: "simple-icons:github", color: "currentColor" },
	MySQL: { id: "simple-icons:mysql", color: "#4479A1" },
};

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
			<h2 style={{ color: "var(--btn-content)" }}>Skills</h2>

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
								color: "var(--btn-content)",
							}}
						>
							{group.title}
						</div>

						<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
							{group.items.map((skill) => {
								const icon = ICON_MAP[skill];
								return (
									<span
										key={skill}
										style={{
											display: "inline-flex",
											alignItems: "center",
											gap: 6,
											padding: "6px 12px",
											borderRadius: "0.5rem",
											backgroundColor: "var(--btn-regular-bg)",
											color: "var(--btn-content)",
											fontSize: 13,
											fontWeight: 500,
										}}
									>
										{icon && (
											<Icon
												icon={icon.id}
												width={18}
												height={18}
												style={{ color: icon.color ?? "currentColor" }}
											/>
										)}
										{skill}
									</span>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
