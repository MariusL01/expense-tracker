import React from "react";

import classes from "./ChartBar.module.css";

const ChartBar = (props) => {
  let barFillHeigth = "0%";

  if (props.maxValue > 0) {
    barFillHeigth = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <div className={classes["chart-bar"]}>
      <div className={classes["chart-bar__inner"]}>
        <div
          className={classes["chart-bar__fill"]}
          style={{ height: barFillHeigth }}
        ></div>
      </div>
      <div className={classes["char-bar__label"]}>{props.label}</div>
    </div>
  );
};

export default ChartBar;
