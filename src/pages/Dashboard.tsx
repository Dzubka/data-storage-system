
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductsTable from "@/components/ProductsTable";
import AddProductForm from "@/components/AddProductForm";
import CategoryFilter from "@/components/CategoryFilter";

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

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  if (!userRole) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">
            {userRole === "manager" ? "Панель менеджера" : "Каталог товаров"}
          </h1>
          <Button variant="outline" onClick={handleLogout}>Выйти</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div className="mb-8">
            <AddProductForm onComplete={() => setShowAddForm(false)} />
          </div>
        )}

        <ProductsTable 
          userRole={userRole} 
          selectedCategory={selectedCategory}
        />
      </main>
    </div>
  );
};

export default Dashboard;
