import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, RootLayout, SinglePostPage } from "./pages";
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
          <Route path="posts/:id" element={<SinglePostPage />} />
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
