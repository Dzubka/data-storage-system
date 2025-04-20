
import { Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center text-xl font-bold mb-4">
              <Package className="mr-2" />
              ДомТовары
            </Link>
            <p className="text-gray-300 text-sm">
              Компания по продаже товаров для дома. Широкий ассортимент качественных товаров для комфортной жизни.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white">
                  Категории товаров
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white">
                  Все товары
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-300">+7 (123) 456-78-90</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-300">info@domtovary.ru</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-300">г. Москва, ул. Примерная, 123</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          © {currentYear} ДомТовары. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
