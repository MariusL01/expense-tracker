import React, { useCallback, useContext, useEffect, useState } from "react";

import NewExpense from "../components/ExpensesManager/NewExpense/NewExpense";
import Expenses from "../components/ExpensesManager/Expenses/Expenses";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AuthContext from "../store/auth-context";

const MyExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const userId = authCtx.localId;

  const fetchExpenses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://react-app-1ae9a-default-rtdb.firebaseio.com/expenses/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const responseData = await response.json();

      let loadedExpenses = [];

      for (const key in responseData) {
        loadedExpenses.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount,
          date: new Date(responseData[key].date),
        });
      }

      setExpenses(loadedExpenses);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const refetchHandler = () => {
    fetchExpenses();
  };

  let content = <Expenses items={expenses} />;

  if (isLoading) {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <NewExpense onRefetch={refetchHandler} />
      {!error && content}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default MyExpenses;
