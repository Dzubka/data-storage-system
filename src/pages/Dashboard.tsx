
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductsTable from "@/components/ProductsTable";
import AddProductForm from "@/components/AddProductForm";
import CategoryFilter from "@/components/CategoryFilter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/");
      return;
    }
    setUserRole(role);
  }, [navigate]);

  if (!userRole) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userRole={userRole} />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-purple-700 mb-4">
              {userRole === "manager" ? "Панель управления" : "Каталог товаров"}
            </h1>
            <p className="text-gray-600">
              {userRole === "manager" 
                ? "Здесь вы можете управлять товарами, добавлять новые позиции и следить за складскими запасами." 
                : "Добро пожаловать в каталог товаров для дома. Здесь представлены все товары, доступные для покупки."
              }
            </p>
          </div>

          {userRole === "manager" && (
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <Button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {showAddForm ? "Отменить" : "Добавить товар"}
                </Button>
              </div>
              <CategoryFilter onSelectCategory={setSelectedCategory} />
            </div>
          )}

          {showAddForm && userRole === "manager" && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4">Новый товар</h2>
              <AddProductForm onComplete={() => setShowAddForm(false)} />
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ProductsTable 
              userRole={userRole} 
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
