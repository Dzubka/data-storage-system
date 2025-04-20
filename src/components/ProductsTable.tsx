
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
import { Pencil, Trash2, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Product } from "@/types";
import { getProducts, updateProduct, deleteProduct, restoreProduct } from "@/data/mockData";

interface ProductsTableProps {
  userRole: string;
  selectedCategory: string | null;
  showAll?: boolean;
  lowStockOnly?: boolean;
  showDeleted?: boolean;
  onProductChange?: () => void;
}

const ProductsTable = ({ 
  userRole, 
  selectedCategory,
  showAll = false,
  lowStockOnly = false,
  showDeleted = false,
  onProductChange
}: ProductsTableProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<Product>>({});

  useEffect(() => {
    loadProducts();
  }, [userRole, selectedCategory, showAll, lowStockOnly, showDeleted]);

  const loadProducts = () => {
    // Загружаем товары с учетом фильтров
    if (!showDeleted) {
      const params: {
        onlyForSale?: boolean;
        category?: string;
        lowStock?: boolean;
      } = {};
      
      if (userRole === "customer" && !showAll) {
        params.onlyForSale = true;
      }
      
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      
      if (lowStockOnly) {
        params.lowStock = true;
      }
      
      setProducts(getProducts(params));
    } else {
      // Загружаем удаленные товары из отдельной "таблицы"
      import("@/data/mockData").then(module => {
        setProducts(module.getDeletedProducts());
      });
    }
  };

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

    updateProduct(editingProduct.id, editedValues);
    loadProducts();
    setEditingProduct(null);
    setEditedValues({});
    
    if (onProductChange) {
      onProductChange();
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setEditedValues({});
  };

  const handleDelete = (productId: number) => {
    deleteProduct(productId);
    loadProducts();
    
    if (onProductChange) {
      onProductChange();
    }
  };

  const handleRestore = (productId: number) => {
    restoreProduct(productId);
    loadProducts();
    
    if (onProductChange) {
      onProductChange();
    }
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
                {showDeleted
                  ? "Нет удаленных товаров"
                  : selectedCategory 
                    ? `Нет товаров в категории "${selectedCategory}"` 
                    : "Нет доступных товаров"
                }
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} className={product.isDeleted ? "bg-gray-100" : ""}>
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
                      {product.isDeleted ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRestore(product.id)}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Восстановить
                        </Button>
                      ) : editingProduct?.id === product.id ? (
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
