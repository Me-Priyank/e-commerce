import { API_URL } from "../constants";
import { apiRequest } from "../utils/apiCall";

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  colors: string[];
  sizes?: string[];
  category: string; // Category ID from API
  description: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

let cachedProducts: Product[] | null = null;

async function fetchProducts(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts;
  }

  try {
    const response = await apiRequest(API_URL + "/products");
    console.log({ response });
    // if (!response.ok) throw new Error("Failed to fetch products");

    console.log({ response });
    // Transform API data to match Product interface
    const transformedProducts = response.map((apiProduct: any) => {
      const isSale = apiProduct.price.originalAmount > apiProduct.price.amount;
      const discount = isSale
        ? Math.round(
            ((apiProduct.price.originalAmount - apiProduct.price.amount) /
              apiProduct.price.originalAmount) *
              100
          )
        : undefined;

      return {
        id: apiProduct.id,
        name: apiProduct.name,
        price: apiProduct.price.amount,
        images: apiProduct.images,
        colors: apiProduct.variants.colors.map((c: any) => c.name),
        sizes: apiProduct.variants.sizes?.map((s: any) => s.name),
        category: apiProduct.category,
        description: apiProduct.description,
        isNew: apiProduct.details?.isNewArrival,
        isSale,
        discount,
      };
    });

    cachedProducts = transformedProducts;
    return transformedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Get featured products (newest and sale items)
export const getFeaturedProducts = async () => {
  const products = await fetchProducts();
  return products.filter((product) => product.isNew || product.isSale);
};

// Get all products
export const getAllProducts = async () => {
  return fetchProducts();
};

// Get product by ID
export const getProductById = async (id: string) => {
  const products = await fetchProducts();
  return products.find((product) => product.id === id);
};

// Get related products
export const getRelatedProducts = async (id: string, category: string) => {
  const products = await fetchProducts();
  return products
    .filter((product) => product.id !== id && product.category === category)
    .slice(0, 4);
};

// Get products by category
export const getProductsByCategory = async (category: string) => {
  const products = await fetchProducts();
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};