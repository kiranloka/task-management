import { Routes, Route, Navigate } from "react-router-dom";
import <Login></Login>
import Register from "./pages/Register";
import Tasks from "./pages/Task";
import { isAuthenticated } from "./auth";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/tasks"
        element={isAuthenticated() ? <Tasks /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}
