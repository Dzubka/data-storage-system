
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMockCategories } from "@/data/mockData";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const categories = getMockCategories();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/");
      return;
    }
    setUserRole(role);
  }, [navigate]);

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category}`);
  };

  if (!userRole) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userRole={userRole} />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-purple-700 mb-6">Категории товаров</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card 
                key={category}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Просмотреть все товары из категории "{category}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
