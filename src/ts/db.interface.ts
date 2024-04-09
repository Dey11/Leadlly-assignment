export interface User {
  email: string;
  password: string;
  name: string;
  phoneNumber?: number;
  description?: string;
}

export interface Product {
  name: string;
  description: string;
  image?: string;
  category?: "category1" | "category2";
}
