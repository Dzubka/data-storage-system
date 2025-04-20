
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BoxIcon, 
  PackageOpen, 
  ShoppingCart, 
  ListFilter, 
  AlertTriangle, 
  LayoutGrid 
} from "lucide-react";
import { getProducts, getCategories } from "@/data/mockData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsTable from "@/components/ProductsTable";
import CategoryFilter from "@/components/CategoryFilter";

interface DashboardProps {
  userRole: string;
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [productsUpdated, setProductsUpdated] = useState(0);

  // Получаем данные для дашборда
  const allProducts = getProducts();
  const productsForSale = getProducts({ onlyForSale: true });
  const lowStockProducts = getProducts({ lowStock: true });
  const categories = getCategories();
  
  // Данные для графика по категориям
  const chartData = categories.map(category => {
    const count = allProducts.filter(p => p.category === category.name).length;
    return { 
      name: category.name, 
      count 
    };
  });

  // Обработчик изменения товаров
  const handleProductChange = () => {
    setProductsUpdated(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole={userRole} onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          {userRole === "manager" ? "Панель управления" : "Каталог товаров"}
        </h1>
        
        {userRole === "manager" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Всего товаров
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BoxIcon className="h-8 w-8 text-purple-600 mr-3" />
                  <span className="text-3xl font-bold">{allProducts.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  На продаже
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ShoppingCart className="h-8 w-8 text-green-600 mr-3" />
                  <span className="text-3xl font-bold">{productsForSale.length}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Мало на складе
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-orange-500 mr-3" />
                  <span className="text-3xl font-bold">{lowStockProducts.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {userRole === "manager" && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Распределение товаров по категориям</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 40,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70} 
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 className="text-xl font-semibold">
              {userRole === "manager" 
                ? "Все товары" 
                : "Доступные товары"}
            </h2>
            
            <div className="flex gap-2">
              {userRole === "manager" && (
                <Button asChild>
                  <Link to="/warehouse">
                    <PackageOpen className="mr-2 h-4 w-4" />
                    Управление складом
                  </Link>
                </Button>
              )}
              
              <Button asChild variant="outline">
                <Link to="/categories">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Категории
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/products">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Товары на продаже
                </Link>
              </Button>
            </div>
          </div>
          
          <CategoryFilter onSelectCategory={setSelectedCategory} />
          
          <ProductsTable 
            userRole={userRole} 
            selectedCategory={selectedCategory} 
            showAll={userRole === "manager"}
            onProductChange={handleProductChange}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
