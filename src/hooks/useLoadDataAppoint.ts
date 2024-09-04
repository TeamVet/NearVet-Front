import { useEffect, useState } from "react";
import { Mascota } from "@/types/interfaces";
import { categoryServices, serviceServices } from "@/lib/authService";
import { fetchPetsController } from "@/lib/authController";
import { ErrorNotify } from "@/lib/toastyfy";

export const useAppointmentData = (userId: string, token: string) => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [categories, setCategories] = useState<
    { id: string; categoryService: string; description: string }[]
  >([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [responseMascotas, responseCategory] = await Promise.all([
          fetchPetsController(userId, token),
          categoryServices(),
        ]);
        setMascotas(responseMascotas);
        setCategories(responseCategory);
      } catch (error) {
        ErrorNotify(`Estamos teniendo problemas: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchData();
    }
  }, [userId, token]);

  const fetchServices = async (categoryId: string) => {
    if (!categoryId) return;
    const returnServices = await serviceServices(categoryId);
    setServices(returnServices);
  };

  return {
    mascotas,
    categories,
    services,
    fetchServices,
    loading,
  };
};
