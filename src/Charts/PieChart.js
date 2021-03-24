
import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from "highcharts/highcharts-more";
import './Chart.css'

HC_more(Highcharts);

const PanleHeight = 21;
const PieChart = forwardRef((props, ref) => {

let pieChartConfig = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Other',
            y: 7.05
        }]
    }]
}

    const [option, setOption] = useState(pieChartConfig);

    useImperativeHandle(ref, () => ({
        toggle(updatedSize) {
            //   console.log('update chart on ',props.widgetId,'newSize',updatedSize);
            //   console.log('newSize: ',updatedSize);

            updateSize(updatedSize)
        }
    }));

    const updateSize = (updatedSize) => {

        // console.log('updatedSize',updatedSize)

        // let newOption = option;

        // const newSizeObj = JSON.parse(localStorage.getItem(`${props.widgetId}`))

        console.log('updatedSize', updatedSize)
        if (updatedSize) {
            option.chart.width = updatedSize.width;
            option.chart.height = updatedSize.height - PanleHeight;
            const newOption = Object.assign({}, option)
            console.log('newOption.chart ' + props.widgetId, newOption.chart)

            setOption(newOption)
        }


        // console.log('newSiz ' + props.widgetId, updatedSize)

    }

    useEffect(() => {
        console.log('update chart config on' + props.widgetId, option.chart)
    }, [option])

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <HighchartsReact
                allowChartUpdate={true} 
                updateArgs={[true, true, true]}
                highcharts={Highcharts}
                options={option} />
        </div>
    );
});



export default PieChart;