
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Package } from "lucide-react";

interface IndexPageProps {
  onLogin: (role: string) => void;
}

const IndexPage = ({ onLogin }: IndexPageProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <img 
            src="/logo-b.svg" 
            alt="Логотип" 
            className="mx-auto h-16 w-16 bg-purple-600 rounded-full p-3"
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Система управления товарами
          </h1>
          <p className="mt-2 text-gray-600">
            Выберите роль для продолжения
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className={`cursor-pointer transition-all ${
              selectedRole === "manager" 
                ? "border-purple-500 shadow-md" 
                : "hover:shadow-md"
            }`}
            onClick={() => handleRoleSelect("manager")}
          >
            <CardContent className="p-6 text-center">
              <Package 
                className="mx-auto h-12 w-12 text-purple-600 mb-4" 
              />
              <h2 className="text-lg font-medium text-gray-900">
                Менеджер
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Управление товарами и складом
              </p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all ${
              selectedRole === "customer" 
                ? "border-purple-500 shadow-md" 
                : "hover:shadow-md"
            }`}
            onClick={() => handleRoleSelect("customer")}
          >
            <CardContent className="p-6 text-center">
              <ShoppingBag 
                className="mx-auto h-12 w-12 text-purple-600 mb-4" 
              />
              <h2 className="text-lg font-medium text-gray-900">
                Покупатель
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Просмотр доступных товаров
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <Button
            className="w-full"
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
