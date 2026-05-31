import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const GitHubCard = ({ repo }) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!repo || !repo.includes("/")) return;
		fetch(`https://api.github.com/repos/${repo}`, { referrerPolicy: "no-referrer" })
			.then((r) => {
				if (!r.ok) throw new Error("fetch failed");
				return r.json();
			})
			.then((d) => setData(d))
			.catch(() => setError(true));
	}, [repo]);

	const owner = repo?.split("/")[0] ?? "";
	const repoName = repo?.split("/")[1] ?? "";
	const repoUrl = `https://github.com/${repo}`;

	return (
		<a
			href={repoUrl}
			target="_blank"
			rel="noopener noreferrer"
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 10,
				padding: "16px 20px",
				borderRadius: 12,
				border: "1px solid var(--line-color)",
				backgroundColor: "var(--card-bg-light)",
				textDecoration: "none",
				color: "var(--btn-content)",
				transition: "box-shadow 0.2s, transform 0.2s",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
				e.currentTarget.style.transform = "translateY(-2px)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.boxShadow = "none";
				e.currentTarget.style.transform = "translateY(0)";
			}}
		>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
					{data?.owner?.avatar_url && (
						<img
							src={data.owner.avatar_url}
							alt={owner}
							style={{ width: 36, height: 36, borderRadius: "50%" }}
						/>
					)}
					<span style={{ opacity: 0.6, fontSize: 14 }}>{owner}</span>
					<span style={{ opacity: 0.4 }}>/</span>
					<span style={{ fontWeight: 700 }}>{repoName}</span>
				</div>
				<svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" style={{ opacity: 0.6 }}>
					<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
				</svg>
			</div>

			{error ? (
				<p style={{ fontSize: 13, opacity: 0.5 }}>無法載入 repository 資訊</p>
			) : data ? (
				<>
					{data.description && (
						<p style={{ fontSize: 14, opacity: 0.75, margin: 0 }}>
							{data.description.replace(/:[a-zA-Z0-9_]+:/g, "")}
						</p>
					)}
					<div style={{ display: "flex", gap: 16, fontSize: 13, opacity: 0.65 }}>
						{data.language && <span>● {data.language}</span>}
						<span>★ {Intl.NumberFormat("en-us", { notation: "compact", maximumFractionDigits: 1 }).format(data.stargazers_count)}</span>
						<span>⑂ {Intl.NumberFormat("en-us", { notation: "compact", maximumFractionDigits: 1 }).format(data.forks)}</span>
						{data.license && <span>{data.license.spdx_id}</span>}
					</div>
				</>
			) : (
				<p style={{ fontSize: 13, opacity: 0.5 }}>載入中...</p>
			)}
		</a>
	);
};

GitHubCard.propTypes = {
	repo: PropTypes.string.isRequired,
};
