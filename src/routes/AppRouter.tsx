import type { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatRoom from "../chat-room/ChatRoom";
import Login from "../auth/Login";
import Register from "../auth/Register";

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("chat-token");
};

// Route yêu cầu đăng nhập
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/auth/login" replace />;
};

// Route của trang auth (login/register)
// Nếu đã login -> chuyển sang /chat
const AuthRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? <Navigate to="/chat" replace /> : children;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/auth/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />

        {/* REGISTER */}
        <Route
          path="/auth/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />

        {/* CHAT */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
