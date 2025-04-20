
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddProductForm from "@/components/AddProductForm";
import ProductsTable from "@/components/ProductsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";

const WarehousePage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/");
      return;
    }
    
    if (role !== "manager") {
      navigate("/dashboard");
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
          <h1 className="text-2xl font-bold text-purple-700 mb-6">Управление складом</h1>
          
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="inventory">Инвентаризация</TabsTrigger>
              <TabsTrigger value="add">Добавление товаров</TabsTrigger>
              <TabsTrigger value="low">Заканчивающиеся товары</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inventory" className="space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ProductsTable 
                  userRole={userRole} 
                  selectedCategory={null}
                  showAll={true}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="add">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-medium mb-4">Добавление нового товара</h2>
                <AddProductForm onComplete={() => setShowAddForm(false)} />
              </div>
            </TabsContent>
            
            <TabsContent value="low">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="text-amber-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Внимание</h3>
                  <p className="text-amber-700">
                    Здесь отображаются товары, количество которых меньше 5 штук. Рекомендуется пополнить запасы.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ProductsTable 
                  userRole={userRole} 
                  selectedCategory={null}
                  showAll={true}
                  lowStockOnly={true}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WarehousePage;
