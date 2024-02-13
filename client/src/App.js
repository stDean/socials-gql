import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, RootLayout } from "./pages";
import "./App.css";
import { AuthContext } from "./context/auth";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={user ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
