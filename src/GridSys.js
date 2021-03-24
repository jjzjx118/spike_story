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

	// const ref1 = useRef(null);
	// const ref2 = useRef(null);
	// const [refArray, setRefArray] = useState([ref1, ref2]);

	const regions = [
		[
			{
				widgetId: 'widget-00',
				ref: useRef(null),
				// key: 'widget-00',
				layout: { i: 'long-narrow', x: 0, y: 0, w: 12, h: 2, static: true },
				content: 'long-narrow'
			},
			{
				widgetId: 'widget-01',
				ref: useRef(null),
				// key: 'widget-01',
				layout: { i: 'small-widget', x: 0, y: 2, w: 4, h: 8 },
				content: 'chart'

			},
			{
				widgetId: 'widget-02',
				ref: useRef(null),
				// key: 'widget-02',
				layout: { i: 'middle-widget', x: 4, y: 2, w: 8, h: 8 },
				content: 'chart'


			},
			{
				widgetId: 'widget-03',
				ref: useRef(null),
				// key: 'widget-04',
				layout: { i: 'large-widget', x: 0, y: 10, w: 12, h: 4 },
				content: 'chart'

			},
		],
		[
			{
				widgetId: 'widget-10',
				ref: useRef(null),
				// key: 'widget-00',
				layout: { i: 'long-narrow2', x: 0, y: 0, w: 12, h: 2, static: true },
				content: 'long-narrow'
			},
			{
				widgetId: 'widget-11',
				ref: useRef(null),
				// key: 'widget-01',
				layout: { i: 'small-widget2', x: 0, y: 2, w: 4, h: 8 },
				content: 'chart'

			},
			{
				widgetId: 'widget-12',
				// key: 'widget-02',
				ref: useRef(null),
				layout: { i: 'middle-widget2', x: 4, y: 2, w: 8, h: 8 },
				content: 'chart'

			},
			{
				widgetId: 'widget-13',
				ref: useRef(null),
				// key: 'widget-04',
				layout: { i: 'large-widget2', x: 0, y: 10, w: 12, h: 4 },
				content: 'chart'
			},
		]

	]

	const [gridWidth, setGridWidth] = useState(0);
	const [width, height] = useWindowSize();

	useEffect(() => {
		console.log('gridWidth', gridWidth);
	}, [gridWidth]);

	function useWindowSize() {
		// debugger;
		const [size, setSize] = useState([0, 0]);
		useLayoutEffect(() => {
			function updateSize() {
				console.log('updateSize')
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

		updateAllWidget()
	});

	// useLayoutEffect(() => {
	// 	updateAllWidget()
	// }, [])


	const onLayoutChange = (layout) => {
		// console.log('params', layout);
		// setLayout(layout)
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

		let resizedItemObj;

		regions.map((region) => {
			let hit = region.find((e) => {
				return e.widgetId === resizedItem.i
			})
			if (hit) {
				resizedItemObj = hit
				// break;
			}
		})

		console.log('resizedItemObj', resizedItemObj)

		// const resizedItemObj = widgetInfos.find((e) => {
		// 	return e.widgetId === resizedItem.i
		// })

		if (resizedItemObj) {
			resizedItemObj?.ref?.current && resizedItemObj?.ref?.current.toggle(param);

		}
	}


	const updateAllWidget = () => {

		regions.map((region) => {
			region.map((e) => {
				const widgetDOM = document.getElementById(e.widgetId);
				// console.log('widgetDOM', widgetDOM, 'chartId - ', resizedItem.i)
				if (!widgetDOM) { return }

				const param = {
					height: widgetDOM.clientHeight,
					width: widgetDOM.clientWidth
				}
				e?.ref?.current && e?.ref?.current.toggle(param);
			})
		})


	}

	const onResizeStop = (...params) => {
		const resizedItem = params[2];
		updateChartSize(resizedItem)
	}


	const generateWidget = (widgets) => {
		console.log('widgets', widgets)

		return (
			widgets.map((widget) => {

				switch (widget.content) {
					case 'long-narrow':
						return (
							<div data-grid={widget.layout} className='widget-long-narrow' key={widget.widgetId}>
								Long Narrow
							</div>
							// <></>
						)
					case 'chart':

						return (
							<div data-grid={widget.layout} className='widget' key={widget.widgetId}>
								<BasicPanel id={widget.widgetId}>
									<PieChart widgetId={widget.widgetId} ref={widget.ref} className='basic-chart' />
								</BasicPanel>
							</div>)

					default:
						return (<></>)
				}
			}
			)
		)
	}

	const generateRegion = () => {
		return (
			regions.map((e, i) =>
				<div
					key={i}
					className='region'
			
				>
					{/* {ShowWindowDimensions()} */}
					<GridLayout
						style={{ backgroundColor: i === 0 ? 'lightpink' : 'lightskyblue' }}
						className='react-grid-layout-contianer'
						// layout={layout}
						cols={12}
						rowHeight={50}
						// width={gridWidth}
						width={1405}

						isBounded={true}
						autoSize={true}
						onLayoutChange={(layout) => onLayoutChange(layout)}
						margin={[10, 10]}
						containerPadding={[0, 0]}
						onResizeStop={onResizeStop}
					>
						{generateWidget(e)}
						{/* {generateWidget(region2)} */}

					</GridLayout>


				</div>
			)
		)
	}

	return (
		<div className='region-container'>
			{regions && generateRegion()}
		</div>
	);
}


// const widgetInfos = [
// 	{
// 		widgetId: 'widget-00',
// 		ref: useRef(null),
// 		key: 'widget-00',
// 		layout: { i: 'long-narrow', x: 0, y: 0, w: 12, h: 2, static: true },
// 		content: 'long-narrow'
// 	},
// 	{
// 		widgetId: 'widget-01',
// 		ref: useRef(null),
// 		key: 'widget-01',
// 		layout: { i: 'small-widget', x: 0, y: 2, w: 4, h: 8 },
// 		content: 'chart'

// 	},
// 	{
// 		widgetId: 'widget-02',
// 		ref: useRef(null),
// 		key: 'widget-02',
// 		layout: { i: 'middle-widget', x: 4, y: 2, w: 8, h: 8 },
// 		content: 'chart'


// 	},
// 	{
// 		widgetId: 'widget-04',
// 		ref: useRef(null),
// 		key: 'widget-04',
// 		layout: { i: 'large-widget', x: 0, y: 10, w: 12, h: 4 },
// 		content: 'chart'

// 	},
// ]

// const region2 = [
// 	{
// 		widgetId: 'widget-00',
// 		ref: useRef(null),
// 		key: 'widget-00',
// 		layout: { i: 'long-narrow', x: 0, y: 0, w: 12, h: 2, static: true },
// 		content: 'long-narrow'
// 	},
// 	{
// 		widgetId: 'widget-01',
// 		ref: useRef(null),
// 		key: 'widget-01',
// 		layout: { i: 'small-widget', x: 0, y: 2, w: 4, h: 8 },
// 		content: 'chart'

// 	},
// 	{
// 		widgetId: 'widget-02',
// 		ref: useRef(null),
// 		key: 'widget-02',
// 		layout: { i: 'middle-widget', x: 4, y: 2, w: 8, h: 8 },
// 		content: 'chart'


// 	},
// 	{
// 		widgetId: 'widget-04',
// 		ref: useRef(null),
// 		key: 'widget-04',
// 		layout: { i: 'large-widget', x: 0, y: 10, w: 12, h: 4 },
// 		content: 'chart'

// 	},
// ]
