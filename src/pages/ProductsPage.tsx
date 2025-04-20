
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsTable from "@/components/ProductsTable";
import CategoryFilter from "@/components/CategoryFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductsPageProps {
  userRole: string;
  onLogout: () => void;
}

const ProductsPage = ({ userRole, onLogout }: ProductsPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole={userRole} onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <ShoppingCart className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold">Товары на продаже</h1>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Доступные товары</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-600">
                Здесь представлены все товары, доступные для покупки. 
                Вы можете отфильтровать их по категории для удобного просмотра.
              </p>
              
              <CategoryFilter onSelectCategory={setSelectedCategory} />
              
              <ProductsTable 
                userRole={userRole} 
                selectedCategory={selectedCategory} 
                showAll={false} // Только товары на продаже
              />
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
