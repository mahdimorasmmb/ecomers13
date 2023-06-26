import ListProducts from "@/components/products/ListProducts";
import api from "@/tools/api";
import getQueryStrings from "@/tools/getQueryStrings";

export interface ProductDataResponse {
  products: [Product];
  filteredProductsCount: number;
  resPerPage: number;
  productCount: number;
}

export const baseUrl = process.env.NODE_ENV === 'development' ? process.env.API_URL : ''

const getProducts = async (searchParams?: {
  [key: string]: string | string[] | undefined;
}) => {
  
    const url = {
      ["category"]: searchParams && searchParams["category"],
      ["page"]: searchParams && searchParams["page"],
      ["ratings[gte]"]: searchParams && searchParams["ratings"],
      ["price[gte]"]: searchParams && searchParams["min"],
      ["price[lte]"]: searchParams && searchParams["max"],
      ["name"]: searchParams && searchParams["name"],
    };
    const queryString = searchParams && getQueryStrings(url);
    const response = await fetch(
      `${baseUrl}/api/products?${queryString}`
    );
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message);
    }
    return data as Promise<ProductDataResponse>;
  
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const productsData = await getProducts(searchParams);

  return (
    <main>
      <ListProducts data={productsData} />
    </main>
  );
}
