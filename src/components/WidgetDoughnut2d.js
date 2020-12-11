import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


function WidgetDoughnut2d(props) {

    // Create a JSON object to store the chart configurations
const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "250", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        theme: "fusion"                 //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: props.data
    }
  };

    return (
        <div className="content bg-white shadow-sm rounded-top">
        <div className="widgetWrap">
        <div className="widgetTitle p-2 text-center" style={{fontSize:"15px",color:"gray"}}>{props.title}</div>
        <div className="widgetValue">
            <div className="value">{props.value}</div>
            <ReactFC {...chartConfigs} />
            <div className="description">{props.description}</div>
        </div>
        </div>
        </div>
    )
}

export default WidgetDoughnut2d;
