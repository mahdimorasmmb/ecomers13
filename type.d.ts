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
  reviews: Array<Review>;
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
  _id: string;
}

interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  phoneNo: string;
  zipCode: string;
  country: string;
  createdAt: string;
}

interface Review {
  _id: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
}

interface OrderItem {
  image: string;
  name: string;
  price: string;
  product: string;
  quantity: string;
  _id: string;
}

interface PaymentInfo {
  amountPaid: number;
  id: string;
  status: string;
  taxPaid: number;
}

interface Order {
  _id:str
  createAt: string;
  orderItems: Array<OrderItem>;
  orderStatus: string;
  paymentInfo: PaymentInfo;
  shippingInfo: Address;
  user: User;
}
