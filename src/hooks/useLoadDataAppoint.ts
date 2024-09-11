import { useEffect, useState } from "react";
import { Mascota } from "@/types/interfaces";
import {
  categoryServices,
  horariosService,
  serviceServices,
} from "@/lib/authService";
import { fetchPetsController } from "@/lib/authController";
import { ErrorNotify } from "@/lib/toastyfy";

export const useAppointmentData = (userId: string, token: string) => {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [categories, setCategories] = useState<
    { id: string; categoryService: string; description: string }[]
  >([]);
  const [services, setServices] = useState<any[]>([]);
  const [horarios, setHorarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [categorySelect, setCategorySelect] = useState("");
  const [mascotaSelect, setMascotaSelect] = useState<Mascota | null>(null);
  const [daySelect, setDaySelect] = useState<Date | null>(null);
  const [serviceSelect, setServiceSelect] = useState<{
    id: string;
    service: string;
    description?: string;
    price?: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [responseMascotas, responseCategory] = await Promise.all([
          fetchPetsController(userId, token),
          categoryServices(),
        ]);
        if (responseMascotas.length === 0)
          throw new Error("No tienes una mascota, primero deberías crearla");
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

  useEffect(() => {
    if (!daySelect) return;
    fetchHorarios(serviceSelect?.id as string);
  }, [daySelect]);

  const fetchServices = async (categoryId: string) => {
    if (!categoryId) return;
    const returnServices = await serviceServices(categoryId);
    setServices(returnServices);
  };

  const fetchHorarios = async (serviceId: string) => {
    if (!serviceId) return;

    const returnHorarios = await horariosService(serviceId);
    console.log(returnHorarios); //!! ARREGLAR CON BACKEND
    const nuevoshorarios = returnHorarios.map(
      (horario: { id: string; startHour1: string }) => {
        return {
          id: horario.startHour1,
          hour: horario.startHour1,
        };
      }
    );
    setHorarios(nuevoshorarios);
  };

  const handleOnChange = (value: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex para el formato de fecha "aaaa-mm-dd"
    categories.map((category) => {
      if (category.id === value) {
        setCategorySelect(value);
        fetchServices(category.id);
      }
    });
    mascotas.map((mascota) => {
      if (mascota.id === value) {
        setMascotaSelect(mascota);
      }
    });
    services.map((service) => {
      if (service.id === value) {
        setServiceSelect({
          id: service.id,
          service: service.serviceName,
          description: service.description,
          price: service.price,
        });
      }
    });
    if (dateRegex.test(value)) {
      setDaySelect(new Date(value));
    }
  };

  return {
    mascotas,
    categories,
    services,
    horarios,
    loading,
    categorySelect,
    mascotaSelect,
    daySelect,
    serviceSelect,
    setCategorySelect,
    setDaySelect,
    handleOnChange,
    fetchServices,
    fetchHorarios,
  };
};
