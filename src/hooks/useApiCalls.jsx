import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "../services/apiClient";

export const useCategory = () => {
  return useQuery({
    queryKey: ["category"], // La clave de la query es 'categories'
    queryFn: () => get("/category/category"), // Función que realiza la llamada a la API
    staleTime: 1000 * 60 * 5, // Define que los datos son "frescos" por 5 minutos
    refetchOnMount: false, // No vuelve a obtener los datos al montar el componente
    refetchOnWindowFocus: false, // No vuelve a obtener los datos cuando el usuario vuelve a enfocar la ventana
  });
};

export const useProduct = () => {
    return useQuery({
      queryKey: ["product"], // La clave de la query es 'categories'
      queryFn: () => get("/products/products"), // Función que realiza la llamada a la API
      staleTime: 1000 * 60 * 5, // Define que los datos son "frescos" por 5 minutos
      refetchOnMount: false, // No vuelve a obtener los datos al montar el componente
      refetchOnWindowFocus: false, // No vuelve a obtener los datos cuando el usuario vuelve a enfocar la ventana
    });
  };

  export const useProductDetail = (id) => {
    return useQuery({
      queryKey: ["productDetail, id"], // La clave de la query es 'categories'
      queryFn: () => get(`/products/product_detail/${id}`), // Función que realiza la llamada a la API
      staleTime: 1000 * 60 * 5, // Define que los datos son "frescos" por 5 minutos
      refetchOnMount: false, // No vuelve a obtener los datos al montar el componente
      refetchOnWindowFocus: false, // No vuelve a obtener los datos cuando el usuario vuelve a enfocar la ventana
    });
  };
