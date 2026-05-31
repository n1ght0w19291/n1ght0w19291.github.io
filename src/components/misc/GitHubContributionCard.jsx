export const GitHubContributionCard = () => {
	return (
		<div
			style={{
				maxWidth: 800,
				margin: "auto",
				textAlign: "center",
				width: "100%",
				border: "1px solid var(--line-color)",
				borderRadius: 6,
				backgroundColor: "var(--card-bg-light)",
			}}
		>
			<img
				src="https://ghchart.rshah.org/n1ght0w19291"
				alt="GitHub Contributions"
				style={{
					width: "100%",
					padding: "0px 10px",
				}}
			/>

			<div
				style={{
					margin: "10px 0px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 6,
					fontSize: 14,
					width: "100%",
					color: "var(--btn-content)",
					opacity: 0.6,
				}}
			>
				<span>Less</span>
				<div style={{ width: 14, height: 14, backgroundColor: "#ebedf0", border: "1px solid #ccc" }} />
				<div style={{ width: 14, height: 14, backgroundColor: "#c6e48b" }} />
				<div style={{ width: 14, height: 14, backgroundColor: "#7bc96f" }} />
				<div style={{ width: 14, height: 14, backgroundColor: "#239a3b" }} />
				<div style={{ width: 14, height: 14, backgroundColor: "#196127" }} />
				<span>More</span>
			</div>
		</div>
	);
};
