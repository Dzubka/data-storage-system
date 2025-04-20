
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PackageOpen, 
  AlertTriangle,
  PlusCircle,
  Archive
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsTable from "@/components/ProductsTable";
import CategoryFilter from "@/components/CategoryFilter";
import AddProductForm from "@/components/AddProductForm";

interface WarehousePageProps {
  userRole: string;
  onLogout: () => void;
}

const WarehousePage = ({ userRole, onLogout }: WarehousePageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all-products");
  const [productsUpdated, setProductsUpdated] = useState(0);

  // Убедимся, что страница доступна только для менеджеров
  if (userRole !== "manager") {
    return null;
  }

  const handleAddProduct = () => {
    setShowAddForm(true);
  };

  const handleFormComplete = () => {
    setShowAddForm(false);
    setProductsUpdated(prev => prev + 1);
  };

  const handleProductChange = () => {
    setProductsUpdated(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole={userRole} onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <PackageOpen className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold">Управление складом</h1>
          </div>
          
          <Button onClick={handleAddProduct}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Добавить товар
          </Button>
        </div>
        
        {showAddForm && (
          <div className="mb-8">
            <AddProductForm onComplete={handleFormComplete} />
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="all-products">Все товары</TabsTrigger>
            <TabsTrigger value="low-stock">Мало на складе</TabsTrigger>
            <TabsTrigger value="deleted">Удаленные товары</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-products">
            <Card>
              <CardHeader>
                <CardTitle>Управление товарами</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <CategoryFilter onSelectCategory={setSelectedCategory} />
                  
                  <ProductsTable 
                    userRole={userRole} 
                    selectedCategory={selectedCategory}
                    showAll={true}
                    onProductChange={handleProductChange}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="low-stock">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <CardTitle>Товары с низким запасом</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Товары, которых осталось меньше 5 штук на складе.
                </p>
                
                <ProductsTable 
                  userRole={userRole} 
                  selectedCategory={null}
                  showAll={true}
                  lowStockOnly={true}
                  onProductChange={handleProductChange}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deleted">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Archive className="h-5 w-5 text-gray-500" />
                <CardTitle>Удаленные товары</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Здесь отображаются удаленные товары, которые можно восстановить.
                </p>
                
                <ProductsTable 
                  userRole={userRole} 
                  selectedCategory={null}
                  showDeleted={true}
                  onProductChange={handleProductChange}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default WarehousePage;
