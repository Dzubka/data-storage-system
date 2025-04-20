
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/data/mockData";
import { Category } from "@/types";

interface CategoryFilterProps {
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter = ({ onSelectCategory }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Загружаем категории из "БД"
    setCategories(getCategories());
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
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Фильтр по категории:</h3>
      
      <div className="flex flex-wrap gap-2 items-center">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.name ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(category.name)}
            className="capitalize"
          >
            {category.name}
          </Button>
        ))}
        
        {activeCategory && (
          <Button variant="ghost" size="sm" onClick={handleResetFilter}>
            Сбросить
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
