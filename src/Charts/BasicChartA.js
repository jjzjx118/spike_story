import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
import drilldown from 'highcharts/modules/drilldown';
import * as options from './chartConfig';

HC_more(Highcharts);
drilldown(Highcharts);
(function(H) {
	H.wrap(H.Point.prototype, 'destroy', function(proceed) {
		if (this.legendItem) {
			// pies have legend items
			this.series.chart.legend.destroyItem(this);
		}
		proceed.apply(this, Array.prototype.slice.call(arguments, 1));
	});
})(Highcharts);

const BasicChartA = forwardRef((props, ref) => {
	const [data, setData] = useState([
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
	]);

	const [option, setOption] = useState(chartOption);
	const [shouldUpdata, setShouldUpdata] = useState(true);
	useImperativeHandle(ref, parametersFromTigger => ({
		customMethod(parametersFromTigger) {
			console.log('customMethod', parametersFromTigger);
			enableUpdata();
		},
	}));

	const custom_drilldown = e => {
		console.log('custom_drilldown', e);
		setShouldUpdata(false);
		// props.refresh();
	};

	const enableUpdata = () => {
		console.log('enableUpdata');
		setShouldUpdata(true);
	};

	chartOption.chart.events.drilldown = custom_drilldown;

	useEffect(() => {
		// console.log("donut useEffect,props:", props.charData);
		// if (props.charData.length > 0) {
		//   let newOption = Object.assign({}, chartOption);
		//   newOption.series[0].data = props.charData;
		//   setOption(newOption);
		// }
		// return () => {};
	}, [props]);

	useEffect(() => {
		console.log('setShouldUpdata useEffect:');
		// setShouldUpdata(true);
	}, [shouldUpdata]);

	return (
		<div>
			<HighchartsReact allowChartUpdate={true} updateArgs={[true, true, true]} highcharts={Highcharts} options={option} />
		</div>
	);
});

export default BasicChartA;

let chartOption = {
	chart: {
		type: 'pie',
		events: {
			drilldown: null,
		},
	},
	legend: {
		enabled: false,
		align: 'right',
		layout: 'vertical',
		verticalAlign: 'middle',
		itemMarginTop: 5,
		itemMarginBottom: 10,
		// itemWidth: 120,
		width: '30%',
		// maxHeight: 135,
	},
	title: {
		text: 'DMH Spike Story - GridSys + Chart',
	},
	subtitle: {
		text: '',
	},
	plotOptions: {
		series: {
			dataLabels: {
				enabled: true,
				format: '{point.name}: {point.y:.1f}%',
			},
			events: {
			},
		},
		pie: {
			point: {
				events: {
					legendItemClick: function(e) {
						console.log('123');
						//  if (e.target.drilldown != undefined) {
						//    e.target.hcEvents.click[0]();
						//  } else {
						//    return false;
						//  }
					},
				},
			},
			allowPointSelect: false,
			cursor: 'pointer',
			innerSize: '60%',
			dataLabels: {
				enabled: false,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
			},
			showInLegend: true,
		},
	},

	tooltip: {
		headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
	},

	series: [
		{
			name: 'Browsers',
			colorByPoint: true,
			data: [
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
			],
		},
	],
	drilldown: {
		series: [
			{
				name: 'Chrome',
				id: 'Chrome',
				data: [['v65.0', 100]],
			},
			{
				name: 'Firefox',
				id: 'Firefox',
				data: [['v58.0', 100]],
			},
		],
	},
};
