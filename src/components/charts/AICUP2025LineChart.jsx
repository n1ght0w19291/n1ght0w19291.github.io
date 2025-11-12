import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
// import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const _data = {
	labels: [
		"2025-10-09 01:37:29",
		"2025-10-09 02:34:17",
		"2025-10-09 02:57:43",
		"2025-10-11 04:33:04",
		"2025-10-11 07:18:44",
		"2025-10-11 07:24:47",
		"2025-10-20 02:16:26",
		"2025-10-20 04:58:43",
		"2025-10-20 05:20:15",
		"2025-10-21 03:12:32",
		"2025-10-22 10:54:46",
		"2025-10-23 12:02:04",
		"2025-10-23 12:48:41",
	],
	datasets: [
		{
			label: "F1-score",
			data: [
				0.1046512, 0.1254355, 0.1616766, 0.1566579, 0.1484537, 0.14, 0.0726873,
				0.1485148, 0.1208384, 0.0884955, 0.0, 0.1604938, 0.1472393,
			],
			borderColor: "rgb(75, 192, 192)",
			backgroundColor: "rgba(75, 192, 192)",
			tension: 0,
		},
	],
};

const _options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: { position: "top" },
		title: {
			display: true,
			text: "AI CUP 2025 初賽 F1-score 變化",
			font: {
				family: "ZenMaruGothic",
				size: 18,
				weight: "700",
			},
		},
		labels: {
			font: {
				family: "ZenMaruGothic",
				size: 13,
				weight: "500",
			},
			style: "margin: 4px 0;",
		},
		tooltip: {
			callbacks: {
				label: (context) => `F1-score: ${context.parsed.y.toFixed(5)}`,
			},
			titleFont: { family: "ZenMaruGothic", size: 13 },
			bodyFont: { family: "ZenMaruGothic", size: 12 },
		},
	},
	scales: {
		x: {
			title: {
				display: true,
				text: "提交時間",
				font: {
					family: "ZenMaruGothic",
					size: 14,
					weight: "bold",
				},
			},
			ticks: {
				autoSkip: true,
				maxRotation: 45,
				minRotation: 20,
			},
			grid: {
				display: true,
				color: "rgba(200, 200, 200, 0.3)",
			},
		},
		y: {
			title: {
				display: true,
				text: "F1-score",
				font: {
					family: "ZenMaruGothic",
					size: 14,
					weight: "bold",
				},
			},
			min: 0,
			max: 0.2,
			ticks: {
				stepSize: 0.02,
			},
			grid: {
				color: "rgba(150, 150, 150, 0.2)",
			},
		},
	},
};

export default function LineChart() {
	return (
		<div
			style={{
				width: "100%",
				height: "300px",
				maxWidth: "600px",
				margin: "2rem auto",
				border: "1px solid #ddd",
				borderRadius: "8px",
			}}
		>
			<Line data={_data} options={_options} />
		</div>
	);
}
