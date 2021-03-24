
import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_more from "highcharts/highcharts-more";
import './Chart.css'

HC_more(Highcharts);

const PanleHeight = 30;
const PieChart = forwardRef ((props,ref) => {


    const [option, setOption] = useState(pieChartConfig);

    useImperativeHandle(ref, () => ({
        toggle(updatedSize) {
          console.log('PieChart_updatedSize',updatedSize);
          updateSize(updatedSize)
        }
      }));

    const updateSize = (updatedSize) =>{
        let newOption = option;
        if(updatedSize){
            newOption.chart.width = updatedSize.width;
            newOption.chart.height = updatedSize.height - PanleHeight;
            setOption(Object.assign({},newOption))
        }

    }

    useEffect(() => {
    //    console.log('update chart config',option)
    }, [option])

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <HighchartsReact
                // style={{ height: '100%', width: '100%' }} d
                allowChartUpdate={true} updateArgs={[true, true, true]}
                highcharts={Highcharts}
                options={pieChartConfig} />
        </div>
    );
});


let pieChartConfig = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        width:600,
        height:200
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

export default PieChart;