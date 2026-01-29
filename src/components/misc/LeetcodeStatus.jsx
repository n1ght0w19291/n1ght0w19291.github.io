import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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

	const cacheKey = `leetcode-${username}-${selectedYear}`;

	// 取得活躍年份
	useEffect(() => {
		const fetchYears = async () => {
			try {
				const res = await fetch(
					`https://alfa-leetcode-api.onrender.com/${username}/calendar?year=${new Date().getFullYear()}`,
				);
				if (!res.ok) throw new Error(`API error: ${res.status}`);
				const data = await res.json();
				setActiveYears(data.activeYears || []);
			} catch (err) {
				console.error(err);
				setError("無法取得 LeetCode 資料");
			}
		};
		fetchYears();
	}, [username]);

	// 取得年度統計
	useEffect(() => {
		if (!selectedYear) return;

		const cached = localStorage.getItem(cacheKey);
		if (cached) {
			setDaysStats(JSON.parse(cached));
			setLoading(false);
			return;
		}

		const fetchYearData = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(
					`https://alfa-leetcode-api.onrender.com/${username}/calendar?year=${selectedYear}`,
				);
				if (!res.ok) throw new Error(`API error: ${res.status}`);
				const data = await res.json();
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

				let unsolvedPast = 0;
				let futureDays = 0;
				const totalDays = selectedYear % 4 === 0 ? 366 : 365;
				if (isCurrentYear) {
					const startOfYear = new Date(selectedYear, 0, 1);
					const daysUpToToday =
						Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
					unsolvedPast = daysUpToToday - solved;
					futureDays = totalDays - daysUpToToday;
				} else {
					unsolvedPast = totalDays - solved;
				}

				const stats = { solved, unsolvedPast, futureDays };
				setDaysStats(stats);
				localStorage.setItem(cacheKey, JSON.stringify(stats));
				setLoading(false);
			} catch (err) {
				console.error(err);
				setError("無法取得 LeetCode 統計");
				setDaysStats({ solved: 0, unsolvedPast: 0, futureDays: 0 });
				setLoading(false);
			}
		};

		fetchYearData();
	}, [username, selectedYear, cacheKey]);

	if (loading) return <p>Loading...</p>;

	if (error)
		return (
			<div
				style={{
					textAlign: "center",
					padding: 20,
					border: "1px solid #ccc",
					borderRadius: 8,
					backgroundColor: "var(--card-bg, #fff)",
					color: "#d32f2f",
				}}
			>
				<h4>Public LeetCode API 發生錯誤</h4>
				<p>{error}</p>
			</div>
		);

	const data = {
		labels: ["Completed Days", "Missed Days", "Future Days"],
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
				display: "flex",
				justifyContent: "start",
				alignItems: "center",
				maxWidth: 600,
				margin: "40px auto",
				gap: 20,
			}}
		>
			<div
				style={{
					flex: "0 0 250px",
					padding: 10,
					borderRadius: 8,
				}}
			>
				<Pie
					data={data}
					options={{
						responsive: true,
						plugins: { legend: { position: "bottom" } },
					}}
				/>
			</div>
			<div style={{ flex: 1 }}>
				<h3>LeetCode {selectedYear} 解題概況</h3>

				{activeYears.length > 0 && (
					<div style={{ position: "relative", marginBottom: 12 }}>
						<button
							type="button"
							onClick={() => setDropdownOpen(!dropdownOpen)}
							style={{
								padding: "8px 16px",
								borderRadius: 8,
								border: "1px solid #ccc",
								backgroundColor: "var(--card-bg, #fff)",
								cursor: "pointer",
								width: 120,
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
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
									margin: 0,
									padding: "4px 0",
									listStyle: "none",
									width: "100%",
									border: "1px solid #ccc",
									borderRadius: 8,
									backgroundColor: "var(--card-bg, #fff)",
									boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
									zIndex: 10,
								}}
							>
								{activeYears.map((y) => (
									<li
										key={y}
										style={{
											padding: 0,
											margin: 0,
											border: "none",
											background: "none",
										}}
									>
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
												backgroundColor: "transparent",
												border: "none",
												textAlign: "left",
												font: "inherit",
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													setSelectedYear(y);
													setDropdownOpen(false);
												}
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
						fontSize: 14,
						lineHeight: 1.6,
						display: "flex",
						flexDirection: "column",
						gap: 4,
					}}
				>
					<div>已解題：{daysStats.solved} 天 </div>
					<div>未解題：{daysStats.unsolvedPast} 天 </div>
					{daysStats.futureDays ? (
						<div>未來：{daysStats.futureDays} 天</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

LeetCodeStatus.propTypes = {
	username: PropTypes.string,
};
