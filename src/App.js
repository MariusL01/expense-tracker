import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AuthContext from "./store/auth-context";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import MyExpenses from "./pages/MyExpenses";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={!authCtx.isLoggedIn ? <HomePage /> : <MyExpenses />}
        />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        <Route
          path="/profile"
          element={
            authCtx.isLoggedIn ? <UserProfile /> : <Navigate to="/auth" />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
