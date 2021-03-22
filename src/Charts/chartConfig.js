export const option2 = {
    chart: {
      type: "bar"
    },
  
    legend: {
      align: "right",
      layout: "vertical",
      verticalAlign: "middle",
      borderColor: "red",
      borderWidth: 1,
      height: "100%",
      itemWidth: 40
    },
    series: [
      {
        data: [Math.random() * 3, Math.random() * 3, Math.random() * 3]
      },
      {
        data: [Math.random() * 3, Math.random() * 3, Math.random() * 3]
      }
    ]
  };
  
  export const riskBusinessUnitOption_packedBubble = {
    chart: {
      type: "packedbubble",
      height: "100%"
    },
    title: {
      text: "Carbon emissions around the world (2014)"
    },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}m CO<sub>2</sub>"
    },
    plotOptions: {
      packedbubble: {
        minSize: "30%",
        maxSize: "120%",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          filter: {
            property: "y",
            operator: ">",
            value: 250
          },
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal"
          }
        }
      }
    },
    series: [
      {
        name: "Europe",
        data: [
          {
            name: "Germany",
            value: 767.1
          },
          {
            name: "Croatia",
            value: 20.7
          }
        ]
      },
      {
        name: "Africa",
        data: [
          {
            name: "Egypt",
            value: 225.1
          },
          {
            name: "Algeria",
            value: 141.5
          }
        ]
      }
    ]
  };
  
  export const option_bubble = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zoomType: "xy",
      events: {
        click: function(e) {
          // console.log(e);
          // console.log(this);
        }
      }
    },
  
    legend: {
      enabled: false
    },
  
    title: {
      text: "Sugar and fat intake per country"
    },
  
    subtitle: {
      text:
        'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>'
    },
  
    xAxis: {
      gridLineWidth: 1,
      title: {
        text: "Daily fat intake"
      },
      labels: {
        format: "{value} gr"
      },
      plotLines: [
        {
          color: "black",
          dashStyle: "dot",
          width: 2,
          value: 65,
          label: {
            rotation: 0,
            y: 15,
            style: {
              fontStyle: "italic"
            },
            text: "Safe fat intake 65g/day"
          },
          zIndex: 10
        }
      ],
      accessibility: {
        rangeDescription: "Range: 60 to 100 grams."
      }
    },
  
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: "Daily sugar intake"
      },
      labels: {
        format: "{value} gr"
      },
      maxPadding: 0.2
    },
  
    tooltip: {
      hideDelay: 100,
  
      useHTML: false,
      enabled: true,
      headerFormat: "<table>",
      pointFormat:
        '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
        "<tr><th>Fat intake:</th><td>{point.x}g</td></tr>" +
        "<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>" +
        "<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>",
      footerFormat: "</table>",
      followPointer: true
    },
  
    plotOptions: {
      series: {
        point: {
          events: {
            click: null
          }
        },
        dataLabels: {
          useHTML: true,
          enabled: true,
          format: `<p style=
          color:red;
          width:10px;
          text-overflow:ellipsis>
          {point.name}</p>`
        }
      }
    },
  
    series: [
      {
        data: [
          { x: 35, y: 35, z: 50.8, name: "A" },
          { x: 25, y: 75, z: 50.8, name: "B" },
          { x: 45, y: 55, z: 50.8, name: "C" }
        ],
        visible: false
      },
      {
        data: [
          { x: 21, y: 45, z: 30.8, name: "A" },
          { x: 15, y: 25, z: 21.8, name: "B" },
          { x: 25, y: 35, z: 40.8, name: "C" }
        ]
      }
    ]
  };
  