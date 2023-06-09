import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import classes from "./NewExpense.module.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const refetchHandler = () => {
    setIsEditing(false);
    props.onRefetch();
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className={classes["new-expense"]}>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm onRefetch={refetchHandler} onCancel={stopEditingHandler} />
      )}
    </div>
  );
};

export default NewExpense;
