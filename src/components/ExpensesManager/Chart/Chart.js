import React from "react";

import ChartBar from "./ChartBar";
import classes from "./Chart.module.css";

const Chart = (props) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className={classes.chart}>
      {totalMaximum !== 0 && (
        <div className={classes["chart-values"]}>
          <span>{Math.round(totalMaximum)}</span>
          <span>{Math.round(totalMaximum / 2)}</span>
          <span>0</span>
        </div>
      )}
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
