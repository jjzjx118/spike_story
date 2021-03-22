import React from "react";
import GridLayout from "react-grid-layout";
import "./GridSys.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import BasicChartA from "./Charts/BasicChartA";
import Highcharts from "highcharts";

export default function GridSys() {
  const onLayoutChange = () => {
    for (let i = 0; i < Highcharts.charts.length; i += 1) {
      if (Highcharts.charts[i] !== undefined) {
        Highcharts.charts[i].reflow(); // here is the magic to update charts' looking
      }
    }
  };

  const layout = [
    { i: "a", x: 0, y: 0, w: 3, h: 3 },
    { i: "b", x: 1, y: 3, w: 3, h: 3 },
    { i: "c", x: 4, y: 0, w: 3, h: 3 }
  ];

  return (
    <div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        onLayoutChange={() => onLayoutChange()}
      >
        <div className="chirdren" key="a">
          <BasicChartA className="basic-chart" />
        </div>

        <div className="chirdren" key="a">
          <BasicChartA className="basic-chart" />
        </div>
      </GridLayout>
    </div>
  );
}
