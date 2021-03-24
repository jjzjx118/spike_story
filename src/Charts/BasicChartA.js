import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from "highcharts/highcharts-more";
import './Chart.css'

HC_more(Highcharts);
export default function hc_bar() {

	// const [option, setOption] = useState(chartOption);


	const refreshSize = () => {
		for (let i = 0; i < Highcharts.charts.length; i += 1) {
			if (Highcharts.charts[i] !== undefined) {
				Highcharts.charts[i].reflow(); // here is the magic to update charts' looking
			}
		}
	}

	const chartData = [
		{
			name: 'Chrome',
			y: Math.random(100) * 100,
			drilldown: 'Chrome',
		},
		{
			name: 'Firefox',
			y: Math.random(100) * 100,
			drilldown: 'Firefox',
		},
		{
			name: 'Chrome',
			y: Math.random(100) * 100,
			drilldown: 'Chrome',
		},
		{
			name: 'Firefox',
			y: Math.random(100) * 100,
			drilldown: 'Firefox',
		},
		{
			name: 'Chrome',
			y: Math.random(100) * 100,
			drilldown: 'Chrome',
		},
		{
			name: 'Firefox',
			y: Math.random(100) * 100,
			drilldown: 'Firefox',
		},
	];

	const chartOption = {
		chart: {

			type: 'bar',
		},
		scrollbar: {
			enabled: true,
		},
		xAxis: {
			scrollbar: {
				enabled: true,
			},
			min: 0,
			max: 4,
		},
		tooltip: {
			useHTML: true,
			pointFormat: '<br>Entitiy Name: {point.name}<br>Risk score: {point.entityRiskScore}<br>Primary Amount: ${point.entityRiskScore}',
		},
		series: [
			{
				name: null,
				colorByPoint: true,
				data: chartData,
			},
		],
	};



	return (
		<div style={{ height: '100%', width: '100%' }}>
			<HighchartsReact
				style={{ height: '100%', width: '100%' }}
				allowChartUpdate={true} updateArgs={[true, true, true]} highcharts={Highcharts} options={chartOption} />
		</div>
	);
};

