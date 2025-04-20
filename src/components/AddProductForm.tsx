
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { addProduct, getCategories } from "@/data/mockData";
import { Category } from "@/types";

interface AddProductFormProps {
  onComplete: () => void;
}

const AddProductForm = ({ onComplete }: AddProductFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    quantity: 1,
    forSale: false
  });

  useEffect(() => {
    // Загружаем список категорий
    setCategories(getCategories());
  }, []);

  const handleChange = (field: string, value: string | number | boolean) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Добавляем новый товар через "БД" функцию
    addProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      forSale: product.forSale
    });
    
    // Очищаем форму и вызываем обратный вызов
    setProduct({
      name: "",
      category: "",
      price: 0,
      quantity: 1,
      forSale: false
    });
    
    onComplete();
  };

  const isFormValid = () => {
    return product.name && 
           product.category && 
           product.price > 0 && 
           product.quantity > 0;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-purple-700">Добавление нового товара</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Название товара</Label>
            <Input
              id="name"
              value={product.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Категория</Label>
            <Select 
              value={product.category} 
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Цена (₽)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={product.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Количество</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
              required
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="forSale"
            checked={product.forSale}
            onCheckedChange={(checked) => 
              handleChange("forSale", checked === true)
            }
          />
          <Label htmlFor="forSale">Выставить на продажу</Label>
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="bg-purple-600 hover:bg-purple-700"
            disabled={!isFormValid()}
          >
            Добавить товар
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
