import axios from "axios";

export default async function api<T>(url: string, options: RequestInit) {
  const response = await fetch(`${process.env.API_URL}/${url}`, { ...options });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as Promise<T>;
}

export const postData = async (url: string, body: {}) => {
  const response = await fetch(`${process.env.API_URL}/${url}`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

//////////////////////////////////

export const postReviews = (reviewData: {}) => {
  return axios.put(`/api/products/review`, reviewData);
};
