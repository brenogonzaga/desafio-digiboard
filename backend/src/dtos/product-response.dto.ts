import { Product } from '../entitites/product.entity';

export class ProductResponse {
  id: number;
  productCode: string;
  description: string;
  stock: number;
  imageUrl: string;
  expiryDate: Date;
  entryDate: Date;

  public static from(entity: Product): ProductResponse {
    const response = new ProductResponse();
    response.id = entity.id;
    response.productCode = entity.productCode;
    response.description = entity.description;
    response.stock = entity.stock;
    response.imageUrl = entity.imageUrl;
    response.expiryDate = entity.expiryDate;
    response.entryDate = entity.entryDate;
    return response;
  }
}
