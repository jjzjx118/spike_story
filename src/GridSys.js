import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import GridLayout from 'react-grid-layout';
import './GridSys.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import BasicChartA from './Charts/BasicChartA';
import PieChart from './Charts/PieChart';

import Highcharts from 'highcharts';
import BasicPanel from './Charts/BasicPanel'
export default function GridSys() {


	const ref1 = useRef();
	const ref2 = useRef();

	const widgetInfos = [
		{
			widgetId: 'widget-01',
			ref:useRef(),
			key: 'widget-01',
			layout: { i: 'small-chart', x: 0, y: 0, w: 3, h: 5 }
		},
		{
			widgetId: 'widget-02',
			ref: useRef(),
			key: 'widget-02',
			layout: { i: 'small-chart2', x: 5, y: 0, w: 3, h: 5 }

		}
	]


	let initial_layout = [
		{ i: 'long-narrow', x: 0, y: 0, w: 12, h: 0.5 },
		{ i: 'small-chart', x: 0, y: 0, w: 3, h: 5 },
		{ i: 'small-chart2', x: 4, y: 0, w: 3, h: 12 },
	];

	const [gridWidth, setGridWidth] = useState(0);
	const [layout, setLayout] = useState(initial_layout);
	const [width, height] = useWindowSize();



	useEffect(() => {
		console.log('gridWidth', gridWidth);
	}, [gridWidth]);

	function useWindowSize() {
		const [size, setSize] = useState([0, 0]);
		useLayoutEffect(() => {
			function updateSize() {
				setSize([window.innerWidth, window.innerHeight]);
				setGridWidth(window.innerWidth);
			}
			window.addEventListener('resize', updateSize);
			updateSize();
			return () => window.removeEventListener('resize', updateSize);
		}, []);
		return size;
	}

	function ShowWindowDimensions(props) {
		const [width, height] = useWindowSize();
		return (
			<span>
				Window size: {width} x {height}
			</span>
		);
	}

	useEffect(() => {
		if (document.getElementById('container')) {
			const containerWidth = document.getElementById('container').clientWidth;
			console.log('containerWidth', containerWidth);
		}

		updateChartSize()


	});


	useEffect(() => {
		console.log('layout', layout)
	}, [layout])

	const onLayoutChange = (layout) => {
		console.log('params', layout);
		setLayout(layout)
		console.log('onLayoutChange', Highcharts.charts);
		for (let i = 0; i < Highcharts.charts.length; i += 1) {
			if (Highcharts.charts[i] !== undefined) {
				Highcharts.charts[i].reflow(); 
			}
		}

		updateChartSize()

	};

	const updateChartSize = () => {

		console.log('updateChartSize')

		widgetInfos.map((chartInfo) => {
			const pie_chart_info = document.getElementById(chartInfo.widgetId);
			console.log('pie_chart_info', chartInfo)


			if (!pie_chart_info) { return }
			const param = {
				height: pie_chart_info.clientHeight,
				width: pie_chart_info.clientWidth
			}

			console.log('pie_chart_info', pie_chart_info.clientWidth)
			console.log('pie_chart_info', pie_chart_info.clientHeight)

			// const findRef = 

			chartInfo?.ref?.current && chartInfo.ref.current.toggle(param);
		})


		// ref.current && ref.current.toggle(param);
	}


	const generateWidget = (widgets) => {
		console.log('widgets', widgets)
		return (
			widgets.map((widget) =>
				<div data-grid={widget.layout} className='widget' key={widget.key}>
					<BasicPanel id={widget.widgetId}>
						<PieChart ref={widget.ref} className='basic-chart' />
					</BasicPanel>
				</div>
			)
		)
	}

	const generateRegion = () => {
		return (
			[1].map((e, i) =>
				<div
					key={i}
					className='region'
					style={{
						backgroundColor: 'yellow',
						width: '100%',
					}}
				>
					<div className='widget-long-narrow' key='long-narrow'>
						Long Narrow
					</div>

					<GridLayout
						style={{ backgroundColor: 'gray' }}
						className='layout'
						layout={layout}
						cols={12}
						rowHeight={50}
						width={gridWidth}
						height={300}
						isBounded={true}
						autoSize={true}
						onLayoutChange={(layout) => onLayoutChange(layout)}
						margin={[0, 0]}
					>
						{generateWidget(widgetInfos)}


						{/* <div className='widget' key='small-chart'>
							<BasicPanel >
								<PieChart ref={ref} id='chart-01' className='basic-chart' />
							</BasicPanel>
						</div>

						<div className='widget' key='small-chart2'>
							<BasicPanel >
								<PieChart ref={ref} id='chart-02' className='basic-chart' />
							</BasicPanel>
						</div> */}





						{/* <div className='chirdren' key='c'>
							<BasicChartA className='basic-chart' />
						</div> */}
					</GridLayout>


				</div>
			)
		)
	}

	return (
		<>
			{widgetInfos && generateRegion()}
		</>
	);
}




{/* <div

className='region'
style={{
	backgroundColor: 'yellow',
	width: '100%',
	height: '500px'
}}
>
<div className='widget-long-narrow' key='long-narrow'>
	Long Narrow
</div>

<GridLayout
	style={{ backgroundColor: 'gray' }}
	className='layout'
	layout={layout}
	cols={12}
	rowHeight={50}
	width={gridWidth}
	height={300}
	isBounded={true}
	autoSize={true}
	onLayoutChange={(layout) => onLayoutChange(layout)}
	margin={[10, 0]}
>

	<div className='chirdren' key='b'>
		<BasicChartA className='basic-chart' />
	</div>
	<div className='chirdren' key='c'>
		<BasicChartA className='basic-chart' />
	</div>
</GridLayout>



<GridLayout
	style={{ backgroundColor: 'cyan' }}
	className='layout'
	layout={layout}
	cols={12}
	rowHeight={50}
	width={gridWidth}
	height={300}
	isBounded={true}
	autoSize={true}
	onLayoutChange={(layout) => onLayoutChange(layout)}
>
	<div className='chirdren' key='a'>
		<BasicChartA className='basic-chart' />
	</div>
	<div className='chirdren' key='b'>
		<BasicChartA className='basic-chart' />
	</div>
	<div className='chirdren' key='c'>
		<BasicChartA className='basic-chart' />
	</div>
</GridLayout>
</div> */}