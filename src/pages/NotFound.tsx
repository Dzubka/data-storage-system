
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NotFoundProps {
  onLogout: () => void;
}

const NotFound = ({ onLogout }: NotFoundProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Страница не найдена</h2>
        <p className="mt-2 text-lg text-gray-600">
          Извините, запрашиваемая страница не существует.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={handleGoBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться назад
          </Button>
          <Button onClick={handleGoHome}>
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
