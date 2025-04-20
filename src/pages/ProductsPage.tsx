
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsTable from "@/components/ProductsTable";
import CategoryFilter from "@/components/CategoryFilter";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/");
      return;
    }
    setUserRole(role);
  }, [navigate]);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category"));
  }, [searchParams]);

  if (!userRole) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userRole={userRole} />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-purple-700 mb-4">
              {userRole === "manager" 
                ? "Все товары на складе" 
                : "Доступные для покупки товары"
              }
            </h1>
            {selectedCategory && (
              <p className="text-gray-600">
                Фильтр: Категория "{selectedCategory}"
              </p>
            )}
          </div>
          
          <div className="mb-6 flex justify-end">
            <CategoryFilter 
              onSelectCategory={setSelectedCategory} 
              initialCategory={selectedCategory} 
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ProductsTable 
              userRole={userRole} 
              selectedCategory={selectedCategory}
              showAll={userRole === "manager"}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
