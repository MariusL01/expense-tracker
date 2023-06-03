import React from "react";

import classes from "./ExpenseFilter.module.css";

const ExpensesFilter = (props) => {
  const dropDownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className={classes["expenses-filter"]}>
      <div className={classes["expenses-filter__control"]}>
        <label>Filter by year</label>
        <select onChange={dropDownChangeHandler} value={props.select}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
