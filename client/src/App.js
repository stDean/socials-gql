import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, RootLayout } from "./pages";
import "./App.css";
import { AuthContext, AuthProvider } from "./context/auth";
import { useContext } from "react";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,

//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },
//       {
//         path: "login",
//         element: <LoginPage />,
//       },
//       {
//         path: "register",
//         element: <RegisterPage />,
//       },
//     ],
//   },
// ]);

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);

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
