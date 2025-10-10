import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AccountPage from "./Pages/AccountPage";
import LoginPage from "./Pages/LoginPage";
import { useAuth } from "./auth";
import { theme } from "./theme";

export default function App() {
  const { isAuthed } = useAuth();

  return (
    <MantineProvider theme={theme}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px",
          position: "fixed",
          inset: 0,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthed ? <Navigate to="/account" replace /> : <LoginPage />
              }
            />
            <Route
              path="/account"
              element={
                isAuthed ? <AccountPage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="*"
              element={
                <Navigate to={isAuthed ? "/account" : "/login"} replace />
              }
            />
          </Routes>
        </BrowserRouter>
        <Notifications position="bottom-right" />
      </div>
    </MantineProvider>
  );
}
