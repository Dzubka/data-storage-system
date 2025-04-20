
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/data/mockData";

interface CategoryFilterProps {
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ onSelectCategory }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Получаем уникальные категории из товаров
    const uniqueCategories = Array.from(
      new Set(mockProducts.map(product => product.category))
    );
    setCategories(uniqueCategories);
  }, []);

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      // Если текущая категория уже выбрана - сбрасываем фильтр
      setActiveCategory(null);
      onSelectCategory(null);
    } else {
      setActiveCategory(category);
      onSelectCategory(category);
    }
  };

  const handleResetFilter = () => {
    setActiveCategory(null);
    onSelectCategory(null);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium text-gray-700">Фильтр по категории:</span>
      
      {categories.map(category => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Button>
      ))}
      
      {activeCategory && (
        <Button variant="ghost" size="sm" onClick={handleResetFilter}>
          Сбросить
        </Button>
      )}
    </div>
  );
};

export default CategoryFilter;
