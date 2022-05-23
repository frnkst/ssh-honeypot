import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {useEffect} from "react";

ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Bar Chart',
		},
	},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: labels.map(() => 500),
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: 'Dataset 2',
			data: labels.map(() => 500),
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};

export function TestChart() {
	useEffect(() => {
		const getDatas = async () => {
			const response = await fetch("http://172.105.78.155:40002/");
			const data = await response.json();
			console.log("frank:" , data);
		}
		getDatas()
	});

	return (<>
		frank test:

		<Bar options={options} data={data} />
		</>);
}
