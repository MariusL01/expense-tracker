import React, { useContext, useState } from "react";

import classes from "./ExpenseForm.module.css";
import AuthContext from "../../../store/auth-context";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnterdTitle] = useState("");
  const [enteredAmount, setEnterdAmount] = useState("");
  const [enteredDate, setEnterdDate] = useState("");
  const [error, setError] = useState(false);

  const authCtx = useContext(AuthContext);
  const userId = authCtx.localId;

  const titleChangeHandler = (event) => {
    setEnterdTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnterdAmount(event.target.value);
  };

  const dataChangeHandler = (event) => {
    setEnterdDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      enteredTitle.trim() === "" ||
      enteredAmount.trim() === "" ||
      enteredDate === ""
    ) {
      setError(true);
      return;
    }
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    const addExpense = async () => {
      const response = await fetch(
        `https://react-app-1ae9a-default-rtdb.firebaseio.com/expenses/${userId}.json`,
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      props.onRefetch();

      // const data = await response.json();
    };
    addExpense();
    setEnterdTitle("");
    setEnterdAmount("");
    setEnterdDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes["new-expense__controls"]}>
        <div className={classes["new-expense__control"]}>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={classes["new-expense__control"]}>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className={classes["new-expense__control"]}>
          <label>Date</label>
          <input
            type="date"
            min="2020-01-01"
            max="2024-01-01"
            value={enteredDate}
            onChange={dataChangeHandler}
          />
        </div>
      </div>
      {error && <p className={classes.invalid}>Fields should not be empty!</p>}
      <div className={classes["new-expense__actions"]}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
