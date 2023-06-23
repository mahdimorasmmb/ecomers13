interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category:
    | "Electronics"
    | "Cameras"
    | "Laptops"
    | "Accessories"
    | "Headphones"
    | "Sports";
  seller: string;
  stock: number;
  ratings: number;
  images: [
    {
      public_id: string;
      url: string;
    }
  ];
  reviews: [
    {
      rating: number;
      comment: string;
      createdAt: string;
    }
  ];
  createdAt: string;
  __v: number;
}

interface User {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  createdAt: string;
  _id:string
}


interface Address {
  _id:string
  street: string;
  city: string;
  state: string;
  phoneNo: string;
  zipCode: string;
  country: string;
  createdAt: string;
}
