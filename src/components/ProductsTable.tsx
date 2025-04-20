
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/types";

interface ProductsTableProps {
  userRole: string;
  selectedCategory: string | null;
}

const ProductsTable = ({ userRole, selectedCategory }: ProductsTableProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);

  useEffect(() => {
    // В реальном приложении здесь будет API запрос
    let filteredProducts = [...mockProducts];
    
    // Для покупателя показываем только доступные товары
    if (userRole === "customer") {
      filteredProducts = filteredProducts.filter(p => p.forSale);
    }
    
    // Фильтрация по категории, если она выбрана
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
    }
    
    setProducts(filteredProducts);
  }, [userRole, selectedCategory]);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({...product});
  };

  const handleUpdate = () => {
    if (!editForm) return;

    // В реальном приложении здесь будет API запрос
    if (editForm.quantity === 0) {
      // Удаляем товар, если количество 0
      setProducts(products.filter(p => p.id !== editForm.id));
    } else {
      // Обновляем товар
      setProducts(products.map(p => p.id === editForm.id ? editForm : p));
    }
    
    setEditingId(null);
    setEditForm(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    if (!editForm) return;
    setEditForm({...editForm, [field]: value});
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Количество</TableHead>
            {userRole === "manager" && (
              <>
                <TableHead>На продажу</TableHead>
                <TableHead>Действия</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={userRole === "manager" ? 6 : 4} className="text-center py-8">
                Товары не найдены
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                {editingId === product.id ? (
                  // Режим редактирования
                  <>
                    <TableCell>
                      <Input 
                        value={editForm?.name || ''} 
                        onChange={(e) => handleInputChange('name', e.target.value)} 
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={editForm?.category || ''} 
                        onChange={(e) => handleInputChange('category', e.target.value)} 
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        value={editForm?.price || 0} 
                        onChange={(e) => handleInputChange('price', Number(e.target.value))} 
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        value={editForm?.quantity || 0} 
                        onChange={(e) => handleInputChange('quantity', Number(e.target.value))} 
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="checkbox" 
                        checked={editForm?.forSale || false} 
                        onChange={(e) => handleInputChange('forSale', e.target.checked)} 
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleUpdate}>Сохранить</Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>Отмена</Button>
                      </div>
                    </TableCell>
                  </>
                ) : (
                  // Режим просмотра
                  <>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price.toLocaleString()} ₽</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    {userRole === "manager" && (
                      <>
                        <TableCell>{product.forSale ? "Да" : "Нет"}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                            Изменить
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
