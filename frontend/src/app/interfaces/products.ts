export interface Product {
  id: number;
  productCode: string;
  description: string;
  stock: number;
  imageUrl: string;
  entryDate: Date;
  expiryDate: Date;
}

export interface UpdateProduct {
  productCode?: string;
  description?: string;
  stock?: number;
  imageUrl?: string;
  expiryDate?: Date;
  entryDate?: Date;
}

export interface CreateProduct {
  productCode: string;
  description: string;
  stock: number;
  imageUrl: string;
  entryDate: Date;
  expiryDate: Date;
}
