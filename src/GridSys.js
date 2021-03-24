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


	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const [refArray, setRefArray] = useState([ref1, ref2]);


	const widgetInfos = [
		{
			widgetId: 'widget-01',
			ref: refArray[0],
			key: 'widget-01',
			layout: { i: 'small-chart', x: 0, y: 0, w: 3, h: 5 }
		},
		{
			widgetId: 'widget-02',
			ref: refArray[1],
			key: 'widget-02',
			layout: { i: 'small-chart2', x: 5, y: 0, w: 3, h: 5 }

		},
		// {
		// 	widgetId: 'widget-03',
		// 	ref: useRef(null),
		// 	key: 'widget-03',
		// 	layout: { i: 'small-chart3', x: 0, y: 5, w: 3, h: 5 }

		// },
	]


	let initial_layout = [
		{ i: 'long-narrow', x: 0, y: 0, w: 12, h: 0.5 },
		{ i: 'small-chart', x: 0, y: 0, w: 3, h: 5 },
		{ i: 'small-chart2', x: 4, y: 0, w: 5, h: 12 },
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




	});



	const onLayoutChange = (layout) => {
		// console.log('params', layout);
		setLayout(layout)
		console.log('onLayoutChange', Highcharts.charts);
		for (let i = 0; i < Highcharts.charts.length; i += 1) {
			if (Highcharts.charts[i] !== undefined) {
				Highcharts.charts[i].reflow();
			}
		}

	};

	const updateChartSize = (resizedItem) => {

		console.log('onResizeStop', resizedItem)
		const widgetDOM = document.getElementById(resizedItem.i);
		console.log('widgetDOM', widgetDOM, 'chartId - ', resizedItem.i)

		if (!widgetDOM) { return }

		const param = {
			height: widgetDOM.clientHeight,
			width: widgetDOM.clientWidth
		}

		const resizedItemObj = widgetInfos.find((e) => {
			return e.widgetId === resizedItem.i
		})

		if (resizedItemObj) {
			resizedItemObj?.ref?.current && resizedItemObj?.ref?.current.toggle(param);

		}
	}


	const updateAllWidget = () => {

	}

	const onResizeStop = (...params) => {
		const resizedItem = params[2];
		updateChartSize(resizedItem)
	}



	const generateWidget = (widgets) => {
		console.log('widgets', widgets)
		return (
			widgets.map((widget) =>
				<div data-grid={widget.layout} className='widget' key={widget.key}>
					<BasicPanel id={widget.widgetId}>
						<PieChart widgetId={widget.widgetId} ref={widget.ref} className='basic-chart' />
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
						onResizeStop={onResizeStop}
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