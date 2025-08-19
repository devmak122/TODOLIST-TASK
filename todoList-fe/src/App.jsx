import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/Task";
import Header from "./components/Header";
import Tasksnew from "./components/addTasks";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./routes/PrivateRoute";

const WithHeaderLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const NoHeaderLayout = () => <Outlet />;

const DefaultRedirect = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* ------------------------------------------------------ Default redirect for "/" ------------------------------------------- */}
          <Route path="/" element={<DefaultRedirect />} />

          {/* ------------------------------------------------------ Public Routes (No Header) ---------------------------------------------------------------------------------------- */}
          <Route element={<NoHeaderLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ----------------------------------------------------------------- Private Routes (With Header) ------------------------------------------------------------ */}
          <Route element={<WithHeaderLayout />}>
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Task />
                </PrivateRoute>
              }
            />
            <Route
              path="/addTasks/:isEdit?"
              element={
                <PrivateRoute>
                  <Tasksnew />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
