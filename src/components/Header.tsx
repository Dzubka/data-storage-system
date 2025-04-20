
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Layers, LogOut } from "lucide-react";

interface HeaderProps {
  userRole: string | null;
}

const Header = ({ userRole }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className="text-2xl font-bold text-purple-700 flex items-center"
            >
              <Package className="mr-2" />
              ДомТовары
            </Link>
            
            {userRole && (
              <nav className="hidden md:flex space-x-4 ml-8">
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 text-gray-700 hover:text-purple-700 rounded-md hover:bg-gray-100"
                >
                  Главная
                </Link>
                <Link 
                  to="/categories" 
                  className="px-3 py-2 text-gray-700 hover:text-purple-700 rounded-md hover:bg-gray-100"
                >
                  Категории
                </Link>
                <Link 
                  to="/products" 
                  className="px-3 py-2 text-gray-700 hover:text-purple-700 rounded-md hover:bg-gray-100"
                >
                  {userRole === "manager" 
                    ? "Все товары на складе" 
                    : "Доступные товары"
                  }
                </Link>
                {userRole === "manager" && (
                  <Link 
                    to="/warehouse" 
                    className="px-3 py-2 text-gray-700 hover:text-purple-700 rounded-md hover:bg-gray-100 flex items-center"
                  >
                    <Layers className="w-4 h-4 mr-1" />
                    Управление складом
                  </Link>
                )}
              </nav>
            )}
          </div>
          
          {userRole && (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline-block text-gray-600">
                {userRole === "manager" ? "Вы вошли как: Менеджер" : "Вы вошли как: Покупатель"}
              </span>
              {userRole === "customer" && (
                <Button 
                  variant="outline" 
                  className="flex items-center text-purple-600 border-purple-600"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Корзина</span>
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Выйти</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
