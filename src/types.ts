
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  forSale: boolean;
  isDeleted?: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  role: "manager" | "customer";
  name: string;
}

// Определение базы данных - структура отражает схему БД
export interface Database {
  products: Product[];
  categories: Category[];
  users: User[];
  deletedProducts: Product[]; // Для хранения удаленных товаров
}
