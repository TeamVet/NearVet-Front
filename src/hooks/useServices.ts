import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import {
  productsService,
  serviceServices,
} from "@/lib/Services/appointService";

export const useServices = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchingCategory = async () => {
    const responseCategory = await fetch(
      "https://nearvet-latest.onrender.com/category-services"
    );
    const categoryJson = await responseCategory.json();
    console.log(categoryJson);
    categoryJson.map((item: any) => {
      if (item.categoryService === "Veterinaria") {
        setCategory(item.id);
        console.log(item.id);
      }
    });
  };
  const fetching = async () => {
    console.log(category);
    const returnServices = await serviceServices(category as string);
    const returnProducts = await productsService();
    console.log(returnServices, returnProducts);
    setServices(returnServices);
    setProducts(returnProducts);
  };
  useEffect(() => {
    fetchingCategory();
  }, []);
  useEffect(() => {
    if (category === null) return;
    try {
      setLoading(true);
      fetching();
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, [category]);

  return { services, loading, products, error };
};
