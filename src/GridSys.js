import React, { useEffect, useState, useLayoutEffect } from 'react';
import GridLayout from 'react-grid-layout';
import './GridSys.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import BasicChartA from './Charts/BasicChartA';
import Highcharts from 'highcharts';

export default function GridSys() {
	const [gridWidth, setGridWidth] = useState(0);
	const [width, height] = useWindowSize();

	useEffect(() => {
		console.log('gridWidth', gridWidth);
	}, [gridWidth]);

	function useWindowSize() {
		const [size, setSize] = useState([0, 0]);
		useLayoutEffect(() => {
			function updateSize() {
				// console.log('updateSize')
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

	const onLayoutChange = () => {
		console.log('onLayoutChange', Highcharts.charts);
		for (let i = 0; i < Highcharts.charts.length; i += 1) {
			if (Highcharts.charts[i] !== undefined) {
				Highcharts.charts[i].reflow(); // here is the magic to update charts' looking
			}
		}
	};

	const layout = [
		{ i: 'a', x: 0, y: 0, w: 10, h: 10 },
		{ i: 'b', x: 3, y: 3, w: 3, h: 3, minW: 4, maxW: 4 },
		{ i: 'c', x: 4, y: 0, w: 3, h: 3 },
	];

	return (
		<div
			id='container'
			style={{
				backgroundColor: 'yellow',
        width: '100%',
        height:'100%'
			}}
		>
			{ShowWindowDimensions()}

			<GridLayout
				style={{ backgroundColor: 'green' }}
				className='layout'
				layout={layout}
				cols={12}
				rowHeight={50}
				width={gridWidth}
				height={300}
				isBounded={true}
				autoSize={true}
				onLayoutChange={() => onLayoutChange()}
			>
				<div className='chirdren' key='a'>
					<BasicChartA className='basic-chart' />
				</div>
				<div className="chirdren" key="b">
          {/* <BasicChartA className="basic-chart" /> */}
        </div>

				{/* <div className="chirdren" key="b">
          <BasicChartA className="basic-chart" />
        </div> */}
			</GridLayout>
		</div>
	);
}
