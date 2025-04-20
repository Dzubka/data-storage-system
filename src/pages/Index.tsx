
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const handleRoleSelect = (role: string) => {
    localStorage.setItem("userRole", role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-purple-700">Система управления товарами</h1>
        <p className="text-xl text-gray-600 mb-8">Выберите вашу роль для входа в систему</p>
        
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 p-6 text-lg"
            onClick={() => handleRoleSelect("manager")}
          >
            Менеджер по продажам
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 p-6 text-lg"
            onClick={() => handleRoleSelect("customer")}
          >
            Покупатель
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
