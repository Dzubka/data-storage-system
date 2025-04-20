
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import CategoriesPage from "@/pages/CategoriesPage";
import ProductsPage from "@/pages/ProductsPage";
import WarehousePage from "@/pages/WarehousePage";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  // Защищенный маршрут для проверки авторизации
  const ProtectedRoute = ({ 
    children, 
    requiredRole 
  }: { 
    children: JSX.Element; 
    requiredRole?: string; 
  }) => {
    if (!userRole) {
      return <Navigate to="/" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {!userRole ? (
          <>
            <Route path="/" element={<IndexPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard userRole={userRole} onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/categories" 
              element={
                <ProtectedRoute>
                  <CategoriesPage userRole={userRole} onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/products" 
              element={
                <ProtectedRoute>
                  <ProductsPage userRole={userRole} onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/warehouse" 
              element={
                <ProtectedRoute requiredRole="manager">
                  <WarehousePage userRole={userRole} onLogout={handleLogout} />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound onLogout={handleLogout} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
