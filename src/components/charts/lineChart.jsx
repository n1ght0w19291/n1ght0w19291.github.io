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

export default function LineChart({ data, options }) {
	return <Line data={data} options={options} />;
}
