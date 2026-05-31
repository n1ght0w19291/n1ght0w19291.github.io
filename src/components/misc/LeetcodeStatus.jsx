import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const LeetCodeStatus = ({ username = "n1ght0w1" }) => {
	const [activeYears, setActiveYears] = useState([]);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [daysStats, setDaysStats] = useState({
		solved: 0,
		unsolvedPast: 0,
		futureDays: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const yearKey = `lc-years-${username}`;
	const statsKey = `lc-stats-${username}-${selectedYear}`;
	const failKey = `lc-fail-${username}-${selectedYear}`;

	const yearsLock = useRef(false);
	const statsLock = useRef(false);

	useEffect(() => {
		const cached = localStorage.getItem(yearKey);
		if (cached) {
			const parsed = JSON.parse(cached);
			if (Date.now() - parsed.ts < 7 * 24 * 60 * 60 * 1000) {
				setActiveYears(parsed.data);
				return;
			}
		}
		if (yearsLock.current) return;
		yearsLock.current = true;
		fetch(
			`https://alfa-leetcode-api.onrender.com/${username}/calendar?year=${new Date().getFullYear()}`,
		)
			.then((r) => {
				if (!r.ok) throw new Error("Failed to fetch active years");
				return r.json();
			})
			.then((d) => {
				const arr = d.activeYears || [];
				setActiveYears(arr);
				localStorage.setItem(
					yearKey,
					JSON.stringify({ ts: Date.now(), data: arr }),
				);
			})
			.catch(() => {
				if (cached) {
					const parsed = JSON.parse(cached);
					setActiveYears(parsed.data || []);
				}
			})
			.finally(() => {
				yearsLock.current = false;
			});
	}, [username, yearKey]);

	useEffect(() => {
		if (!selectedYear) return;

		const cached = localStorage.getItem(statsKey);
		if (cached) {
			const parsed = JSON.parse(cached);
			const isCurrentYear = selectedYear === new Date().getFullYear();
			const ttl = isCurrentYear
				? 12 * 60 * 60 * 1000
				: Number.POSITIVE_INFINITY;
			if (Date.now() - parsed.ts < ttl) {
				setDaysStats(parsed.stats);
				setLoading(false);
				return;
			}
		}

		const failTs = localStorage.getItem(failKey);
		if (failTs && Date.now() - Number(failTs) < 5 * 60 * 1000) {
			if (cached) {
				const parsed = JSON.parse(cached);
				setDaysStats(parsed.stats);
				setLoading(false);
			} else {
				setError("API 暫時不可用");
				setLoading(false);
			}
			return;
		}

		if (statsLock.current) return;
		statsLock.current = true;
		setLoading(true);
		setError(null);

		fetch(
			`https://alfa-leetcode-api.onrender.com/${username}/calendar?year=${selectedYear}`,
		)
			.then((r) => {
				if (!r.ok) throw new Error("Failed to fetch calendar stats");
				return r.json();
			})
			.then((data) => {
				const calendar = JSON.parse(data.submissionCalendar || "{}");
				const today = new Date();
				const isCurrentYear = selectedYear === today.getFullYear();
				let solved = 0;
				for (const tsStr in calendar) {
					const ts = Number.parseInt(tsStr);
					const day = new Date(ts * 1000);
					if (day.getFullYear() !== selectedYear) continue;
					if (calendar[tsStr] > 0) solved += 1;
				}
				const totalDays = selectedYear % 4 === 0 ? 366 : 365;
				let unsolvedPast = 0;
				let futureDays = 0;
				if (isCurrentYear) {
					const start = new Date(selectedYear, 0, 1);
					const daysNow = Math.floor((today - start) / 86400000) + 1;
					unsolvedPast = daysNow - solved;
					futureDays = totalDays - daysNow;
				} else {
					unsolvedPast = totalDays - solved;
				}
				const stats = { solved, unsolvedPast, futureDays };
				setDaysStats(stats);
				localStorage.setItem(
					statsKey,
					JSON.stringify({ ts: Date.now(), stats }),
				);
			})
			.catch(() => {
				localStorage.setItem(failKey, Date.now().toString());
				if (cached) {
					const parsed = JSON.parse(cached);
					setDaysStats(parsed.stats);
				} else {
					setError("API 暫時不可用");
				}
			})
			.finally(() => {
				setLoading(false);
				statsLock.current = false;
			});
	}, [username, selectedYear, statsKey, failKey]);

	if (loading) return <p style={{ textAlign: "center", color: "var(--btn-content)" }}>Loading...</p>;

	if (error)
		return (
			<div
				style={{
					textAlign: "center",
					padding: 20,
					border: "1px solid var(--line-color)",
					borderRadius: 8,
					color: "var(--btn-content)",
				}}
			>
				<h4>LeetCode API 錯誤</h4>
				<p>{error}</p>
			</div>
		);

	const data = {
		labels: ["Active Days", "Missed Days", "Future Days"],
		datasets: [
			{
				data: [daysStats.solved, daysStats.unsolvedPast, daysStats.futureDays],
				backgroundColor: ["#4caf50", "#ff9800", "#b2b2b2"],
				borderColor: ["#388e3c", "#f57c00", "#8a8a8a"],
				borderWidth: 1,
			},
		],
	};

	return (
		<div
			style={{
				maxWidth: 700,
				margin: "40px auto",
				display: "flex",
				flexDirection: "column",
				gap: 16,
			}}
		>
			<h3 style={{ textAlign: "center", color: "var(--btn-content)" }}>
				LeetCode {selectedYear} 解題概況
			</h3>

			{activeYears.length > 0 && (
				<div style={{ position: "relative", alignSelf: "center" }}>
					<button
						type="button"
						onClick={() => setDropdownOpen(!dropdownOpen)}
						style={{
							padding: "8px 16px",
							borderRadius: 8,
							border: "1px solid var(--line-color)",
							cursor: "pointer",
							width: 140,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							backgroundColor: "var(--btn-regular-bg)",
							color: "var(--btn-content)",
						}}
					>
						<span>{selectedYear}</span>
						<span>▼</span>
					</button>

					{dropdownOpen && (
						<ul
							style={{
								position: "absolute",
								top: "100%",
								left: 0,
								width: "100%",
								margin: 0,
								padding: "4px 0",
								listStyle: "none",
								border: "1px solid var(--line-color)",
								borderRadius: 8,
								backgroundColor: "var(--btn-regular-bg)",
								boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
								zIndex: 10,
							}}
						>
							{activeYears.map((y) => (
								<li key={y}>
									<button
										type="button"
										onClick={() => {
											setSelectedYear(y);
											setDropdownOpen(false);
										}}
										style={{
											width: "100%",
											padding: "6px 12px",
											cursor: "pointer",
											background: "transparent",
											border: "none",
											textAlign: "left",
											color: "var(--btn-content)",
										}}
									>
										{y}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			)}

			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					alignItems: "center",
					gap: 24,
				}}
			>
				<div style={{ width: 240, height: 240 }}>
					<Pie
						data={data}
						options={{
							responsive: true,
							maintainAspectRatio: false,
							plugins: { legend: { position: "bottom" } },
						}}
					/>
				</div>

				<div
					style={{
						minWidth: 220,
						display: "flex",
						flexDirection: "column",
						gap: 6,
						fontSize: 14,
						color: "var(--btn-content)",
					}}
				>
					<div>已解題：{daysStats.solved} 天</div>
					<div>未解題：{daysStats.unsolvedPast} 天</div>
					{daysStats.futureDays ? (
						<div>未來：{daysStats.futureDays} 天</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

LeetCodeStatus.propTypes = { username: PropTypes.string };
