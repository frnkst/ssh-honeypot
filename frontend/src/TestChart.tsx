import React, {useEffect} from "react";

import { Line } from "react-chartjs-2";
import { Chart, registerables} from 'chart.js';


Chart.register(...registerables);

const data = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	datasets: [
		{
			label: "First dataset",
			data: [33, 53, 85, 41, 44, 65],
			fill: true,
			backgroundColor: "rgba(75,192,192,0.2)",
			borderColor: "rgba(75,192,192,1)"
		},
		{
			label: "Second dataset",
			data: [33, 25, 35, 51, 54, 76],
			fill: false,
			borderColor: "#742774"
		}
	]
};

export function TestChart() {

	useEffect(() => {
		const getDatas = async () => {
			// const response = await fetch("http://172.105.78.155:40002/");
			// const data = await response.json();
			//const rawData = dummyData
			console.log("frank:" , data);
		}
		getDatas()
	});

	return (
			<div className="App">
				<Line data={data} />
			</div>
	);
}
