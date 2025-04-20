
import { Product, Category, User, Database } from "@/types";

// Имитация базы данных с установленными первичными и внешними ключами
const mockDatabase: Database = {
  // Таблица категорий (Первичный ключ: id)
  categories: [
    { id: 1, name: "Мебель", description: "Предметы мебели для вашего дома" },
    { id: 2, name: "Посуда", description: "Кухонная и столовая посуда" },
    { id: 3, name: "Бытовая техника", description: "Техника для дома и кухни" },
    { id: 4, name: "Текстиль", description: "Домашний текстиль и постельные принадлежности" },
    { id: 5, name: "Освещение", description: "Светильники и осветительные приборы" },
    { id: 6, name: "Инструменты", description: "Инструменты для дома и ремонта" }
  ],

  // Таблица пользователей (Первичный ключ: id)
  users: [
    { id: 1, name: "Александр Менеджеров", role: "manager" },
    { id: 2, name: "Елена Продавцова", role: "manager" },
    { id: 3, name: "Иван Покупателев", role: "customer" },
    { id: 4, name: "Мария Клиентова", role: "customer" },
  ],

  // Таблица товаров (Первичный ключ: id, Внешние ключи: category связан с categories.name)
  products: [
    {
      id: 1,
      name: "Кухонный стол",
      category: "Мебель", // Связь с таблицей категорий
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
  ],
  
  // Таблица удаленных товаров (хранит историю удаленных товаров)
  deletedProducts: []
};

// Функции для работы с "базой данных"

// Получить все категории
export const getCategories = (): Category[] => {
  return [...mockDatabase.categories];
};

// Получить все товары (с опциональной фильтрацией)
export const getProducts = (params?: {
  onlyForSale?: boolean;
  category?: string;
  lowStock?: boolean;
}): Product[] => {
  let result = [...mockDatabase.products];
  
  if (params?.onlyForSale) {
    result = result.filter(product => product.forSale);
  }
  
  if (params?.category) {
    result = result.filter(product => product.category === params.category);
  }
  
  if (params?.lowStock) {
    result = result.filter(product => product.quantity < 5);
  }
  
  return result;
};

// Получить удаленные товары
export const getDeletedProducts = (): Product[] => {
  return [...mockDatabase.deletedProducts];
};

// Добавить новый товар
export const addProduct = (productData: Omit<Product, "id">): Product => {
  const newId = Math.max(...mockDatabase.products.map(p => p.id), 0) + 1;
  const newProduct = { id: newId, ...productData };
  mockDatabase.products.push(newProduct);
  return newProduct;
};

// Обновить товар
export const updateProduct = (id: number, updates: Partial<Product>): Product | null => {
  const index = mockDatabase.products.findIndex(p => p.id === id);
  if (index !== -1) {
    // Если цена пуста, то удаляем товар
    if (updates.price === undefined || updates.price === 0) {
      return deleteProduct(id);
    }
    
    const updatedProduct = { ...mockDatabase.products[index], ...updates };
    mockDatabase.products[index] = updatedProduct;
    return updatedProduct;
  }
  return null;
};

// Удалить товар (перемещает в таблицу удаленных)
export const deleteProduct = (id: number): Product | null => {
  const index = mockDatabase.products.findIndex(p => p.id === id);
  if (index !== -1) {
    const product = { ...mockDatabase.products[index], isDeleted: true };
    mockDatabase.deletedProducts.push(product);
    mockDatabase.products.splice(index, 1);
    return product;
  }
  return null;
};

// Восстановить удаленный товар
export const restoreProduct = (id: number): Product | null => {
  const index = mockDatabase.deletedProducts.findIndex(p => p.id === id);
  if (index !== -1) {
    const product = { ...mockDatabase.deletedProducts[index] };
    delete product.isDeleted;
    mockDatabase.products.push(product);
    mockDatabase.deletedProducts.splice(index, 1);
    return product;
  }
  return null;
};

// Экспортируем базу данных для примера схемы
export const getDatabaseSchema = () => {
  return {
    tables: {
      products: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "name", type: "TEXT", constraints: "NOT NULL" },
          { name: "category", type: "TEXT", constraints: "NOT NULL REFERENCES categories(name)" },
          { name: "price", type: "REAL", constraints: "NOT NULL CHECK(price > 0)" },
          { name: "quantity", type: "INTEGER", constraints: "NOT NULL DEFAULT 0" },
          { name: "forSale", type: "BOOLEAN", constraints: "NOT NULL DEFAULT 0" }
        ]
      },
      categories: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "name", type: "TEXT", constraints: "UNIQUE NOT NULL" },
          { name: "description", type: "TEXT" }
        ]
      },
      deletedProducts: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "name", type: "TEXT", constraints: "NOT NULL" },
          { name: "category", type: "TEXT", constraints: "NOT NULL" },
          { name: "price", type: "REAL", constraints: "NOT NULL" },
          { name: "quantity", type: "INTEGER", constraints: "NOT NULL" },
          { name: "forSale", type: "BOOLEAN", constraints: "NOT NULL" },
          { name: "isDeleted", type: "BOOLEAN", constraints: "NOT NULL DEFAULT 1" },
          { name: "deletedAt", type: "TIMESTAMP", constraints: "DEFAULT CURRENT_TIMESTAMP" }
        ]
      },
      users: {
        columns: [
          { name: "id", type: "INTEGER", constraints: "PRIMARY KEY" },
          { name: "name", type: "TEXT", constraints: "NOT NULL" },
          { name: "role", type: "TEXT", constraints: "NOT NULL CHECK(role IN ('manager', 'customer'))" }
        ]
      }
    }
  };
};
