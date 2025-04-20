
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">О компании</h3>
            <p className="text-sm text-gray-400">
              Наша компания предлагает широкий ассортимент товаров для дома 
              высокого качества по доступным ценам.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Контакты</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Адрес: г. Москва, ул. Примерная, д. 123</p>
              <p>Телефон: +7 (123) 456-78-90</p>
              <p>Email: info@homegoods.example</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Полезные ссылки</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Категории товаров
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Товары в продаже
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {year} Товары для дома. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
