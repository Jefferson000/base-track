import { useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import { AlertProvider } from "./global/AlertContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import { useDispatch } from "react-redux";
import { getStoredUser } from "./utils/storage";
import { loginSuccess } from "./features/authSlice";
import LoadingSpinner from "./components/LoadingSpinner";
import Reset from "./pages/reset";
import Recovery from "./pages/recovery";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, [dispatch]);

  const [theme, colorMode] = useMode();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/recovery" || location.pathname.startsWith("/reset-password/");
  const isNotFoundPage = ["/not-found"].includes(location.pathname);
  const shouldShowSidebar = !(isAuthPage || isNotFoundPage);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AlertProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LoadingSpinner />
          <div className="app">
            {shouldShowSidebar && <Sidebar />}
            <main className="content">
              {shouldShowSidebar && <Topbar />}
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/reset-password/:token" element={<Reset />} />
                <Route path="/recovery" element={<Recovery />} />
                <Route path="/not-found" element={<NotFound />} />

                {/* Main Routes */}
                <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
                {/* <Route path="/" element={<PrivateRoute element={<Dashboard />} allowedTypes={[1]}/>} /> */}

                {/* Catch-all Route */}
                <Route path="*" element={<Navigate to="/not-found" replace />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </AlertProvider>
    </ColorModeContext.Provider>
  );
}

export default App;