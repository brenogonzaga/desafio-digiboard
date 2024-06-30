export interface ProductsPayment {
  id: number;
  productName: string;
  user: string;
  quantityPaid: number;
  deliveryDate: Date;
}

export interface CreateProductPayment {
  productId: number;
  userId: number;
  quantityPaid: number;
  deliveryDate: Date;
}
