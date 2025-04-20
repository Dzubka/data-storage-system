
import { Product } from "@/types";

// Список товаров
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Кухонный стол",
    category: "Мебель",
    price: 12500,
    quantity: 8,
    forSale: true,
  },
  {
    id: 2,
    name: "Стул обеденный",
    category: "Мебель",
    price: 3200,
    quantity: 24,
    forSale: true,
  },
  {
    id: 3,
    name: "Кресло мягкое",
    category: "Мебель",
    price: 15800,
    quantity: 6,
    forSale: true,
  },
  {
    id: 4,
    name: "Набор посуды (12 предметов)",
    category: "Посуда",
    price: 5600,
    quantity: 12,
    forSale: true,
  },
  {
    id: 5,
    name: "Сковорода антипригарная",
    category: "Посуда",
    price: 2300,
    quantity: 15,
    forSale: true,
  },
  {
    id: 6,
    name: "Чайник электрический",
    category: "Бытовая техника",
    price: 3400,
    quantity: 10,
    forSale: true,
  },
  {
    id: 7,
    name: "Микроволновая печь",
    category: "Бытовая техника",
    price: 8900,
    quantity: 4,
    forSale: true,
  },
  {
    id: 8,
    name: "Пылесос беспроводной",
    category: "Бытовая техника",
    price: 12800,
    quantity: 3,
    forSale: false,
  },
  {
    id: 9,
    name: "Комплект постельного белья",
    category: "Текстиль",
    price: 2600,
    quantity: 18,
    forSale: true,
  },
  {
    id: 10,
    name: "Полотенца банные (3 шт)",
    category: "Текстиль",
    price: 1400,
    quantity: 20,
    forSale: true,
  },
  {
    id: 11,
    name: "Шторы затемняющие",
    category: "Текстиль",
    price: 3900,
    quantity: 7,
    forSale: false,
  },
  {
    id: 12,
    name: "Напольная лампа",
    category: "Освещение",
    price: 4500,
    quantity: 6,
    forSale: true,
  },
  {
    id: 13,
    name: "Люстра хрустальная",
    category: "Освещение",
    price: 18700,
    quantity: 2,
    forSale: true,
  },
  {
    id: 14,
    name: "Настольная лампа светодиодная",
    category: "Освещение",
    price: 2100,
    quantity: 9,
    forSale: true,
  },
  {
    id: 15,
    name: "Набор инструментов",
    category: "Инструменты",
    price: 6800,
    quantity: 5,
    forSale: true,
  }
];

// Получить все товары
export const getMockProducts = (): Product[] => {
  // В реальном приложении здесь был бы API-запрос
  return [...mockProducts];
};

// Получить все категории
export const getMockCategories = (): string[] => {
  const categories = new Set(mockProducts.map(product => product.category));
  return Array.from(categories);
};

// Добавить товар
export const addMockProduct = (product: Omit<Product, "id">): Product => {
  const newId = Math.max(...mockProducts.map(p => p.id)) + 1;
  const newProduct = { id: newId, ...product };
  mockProducts.push(newProduct);
  return newProduct;
};

// Удалить товар
export const deleteMockProduct = (id: number): boolean => {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    mockProducts.splice(index, 1);
    return true;
  }
  return false;
};

// Обновить товар
export const updateMockProduct = (id: number, updates: Partial<Product>): Product | null => {
  const index = mockProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    const updatedProduct = { ...mockProducts[index], ...updates };
    mockProducts[index] = updatedProduct;
    return updatedProduct;
  }
  return null;
};
