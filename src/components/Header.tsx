
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";

interface HeaderProps {
  userRole: string;
  onLogout: () => void;
}

const Header = ({ userRole, onLogout }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationLinks = [
    { 
      title: "Главная", 
      path: "/", 
      roles: ["manager", "customer"] 
    },
    { 
      title: "Категории", 
      path: "/categories", 
      roles: ["manager", "customer"] 
    },
    { 
      title: "Товары на продаже", 
      path: "/products", 
      roles: ["manager", "customer"] 
    },
    { 
      title: "Управление складом", 
      path: "/warehouse", 
      roles: ["manager"] 
    }
  ];

  // Фильтруем ссылки согласно роли пользователя
  const filteredLinks = navigationLinks.filter(link => 
    link.roles.includes(userRole)
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo-b.svg" 
              alt="Логотип" 
              className="h-8 w-8 bg-white rounded p-1" 
            />
            <span className="text-xl font-semibold">
              {userRole === "manager" ? "Панель менеджера" : "Каталог товаров"}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {filteredLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? "bg-purple-800 text-white"
                    : "text-white hover:bg-purple-600"
                }`}
              >
                {link.title}
              </Link>
            ))}
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-purple-600"
              onClick={onLogout}
            >
              Выход
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X /> : <MenuIcon />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-2">
              {filteredLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? "bg-purple-800 text-white"
                      : "text-white hover:bg-purple-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-purple-600 w-full"
                onClick={onLogout}
              >
                Выход
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
