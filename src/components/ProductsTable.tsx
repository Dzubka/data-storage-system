
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Product } from "@/types";
import { getMockProducts } from "@/data/mockData";

interface ProductsTableProps {
  userRole: string;
  selectedCategory: string | null;
  showAll?: boolean;
  lowStockOnly?: boolean;
}

const ProductsTable = ({ 
  userRole, 
  selectedCategory,
  showAll = false,
  lowStockOnly = false
}: ProductsTableProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<Product>>({});

  useEffect(() => {
    let productsData = getMockProducts();
    
    // Filter for customers - show only products for sale
    if (userRole === "customer" && !showAll) {
      productsData = productsData.filter((product) => product.forSale);
    }
    
    // Filter by category if selected
    if (selectedCategory) {
      productsData = productsData.filter(
        (product) => product.category === selectedCategory
      );
    }
    
    // Filter low stock items if needed
    if (lowStockOnly) {
      productsData = productsData.filter((product) => product.quantity < 5);
    }
    
    setProducts(productsData);
  }, [userRole, selectedCategory, showAll, lowStockOnly]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditedValues({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      forSale: product.forSale,
    });
  };

  const handleSave = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? { ...p, ...editedValues } : p
    );

    setProducts(updatedProducts);
    setEditingProduct(null);
    setEditedValues({});
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setEditedValues({});
  };

  const handleDelete = (productId: number) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleChange = (field: keyof Product, value: string | number | boolean) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead className="text-right">Цена</TableHead>
            <TableHead className="text-right">Количество</TableHead>
            {userRole === "manager" && (
              <>
                <TableHead>На продаже</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={userRole === "manager" ? 6 : 4} className="text-center py-8 text-gray-500">
                {selectedCategory 
                  ? `Нет товаров в категории "${selectedCategory}"` 
                  : "Нет доступных товаров"
                }
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      value={editedValues.name as string}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full border rounded p-1"
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="number"
                      value={editedValues.price as number}
                      onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                      className="w-24 border rounded p-1 text-right"
                    />
                  ) : (
                    `${product.price.toLocaleString()} ₽`
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="number"
                      value={editedValues.quantity as number}
                      onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
                      className="w-20 border rounded p-1 text-right"
                    />
                  ) : (
                    product.quantity
                  )}
                </TableCell>
                {userRole === "manager" && (
                  <>
                    <TableCell>
                      {editingProduct?.id === product.id ? (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={editedValues.forSale as boolean}
                            onChange={(e) => handleChange("forSale", e.target.checked)}
                            className="mr-2"
                          />
                          {editedValues.forSale ? "Да" : "Нет"}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {product.forSale ? (
                            <CheckCircle className="text-green-500 w-5 h-5 mr-1" />
                          ) : (
                            <XCircle className="text-red-500 w-5 h-5 mr-1" />
                          )}
                          {product.forSale ? "Да" : "Нет"}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingProduct?.id === product.id ? (
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" onClick={handleSave}>
                            Сохранить
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={handleCancel}
                          >
                            Отмена
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(product)}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Изменить
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Удалить
                          </Button>
                        </div>
                      )}
                    </TableCell>
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
