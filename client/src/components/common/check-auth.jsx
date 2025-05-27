import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log("CheckAuth:", { pathname: location.pathname, isAuthenticated, user });

  // Handle root path ("/")
  if (location.pathname === "/") {
    if (!isAuthenticated && location.pathname !== "/auth/login") {
      return <Navigate to="/auth/login" replace />;
    } else if (isAuthenticated) {
      if (user?.role === "admin" && location.pathname !== "/admin/dashboard") {
        return <Navigate to="/admin/dashboard" replace />;
      } else if (user?.role !== "admin" && location.pathname !== "/shop/home") {
        return <Navigate to="/shop/home" replace />;
      }
    }
  }

  // Redirect unauthenticated users from protected routes
  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect authenticated users from login/register
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin" && location.pathname !== "/admin/dashboard") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role !== "admin" && location.pathname !== "/shop/home") {
      return <Navigate to="/shop/home" replace />;
    }
  }

  // Restrict non-admin users from admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Restrict admin users from shop routes
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;