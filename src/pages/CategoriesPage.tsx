
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsTable from "@/components/ProductsTable";
import { getCategories } from "@/data/mockData";
import { Category } from "@/types";

interface CategoriesPageProps {
  userRole: string;
  onLogout: () => void;
}

const CategoriesPage = ({ userRole, onLogout }: CategoriesPageProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  
  useEffect(() => {
    const loadedCategories = getCategories();
    setCategories(loadedCategories);
    
    // Устанавливаем первую категорию как активную по умолчанию
    if (loadedCategories.length > 0 && !activeCategory) {
      setActiveCategory(loadedCategories[0].name);
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userRole={userRole} onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Категории товаров</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {categories.map(category => (
            <Card 
              key={category.id} 
              className={`cursor-pointer transition-all ${
                activeCategory === category.name ? "border-purple-500 shadow-md" : ""
              }`}
              onClick={() => handleCategoryChange(category.name)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-purple-600" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mb-8">
          <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
            <TabsList className="w-full overflow-x-auto flex flex-nowrap py-2">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.name}
                  className="flex-shrink-0"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category.id} value={category.name}>
                <Card>
                  <CardHeader>
                    <CardTitle>Товары в категории &quot;{category.name}&quot;</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProductsTable 
                      userRole={userRole} 
                      selectedCategory={category.name}
                      showAll={userRole === "manager"}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
