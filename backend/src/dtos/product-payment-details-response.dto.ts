import { ProductPayment } from 'src/entitites/product-payment';
import { Product } from '../entitites/product.entity';
import { User } from '../entitites/user.entity';

export class ProductPaymentDetailsResponse {
  id: number;

  product: Product;

  user: User;

  quantityPaid: number;

  deliveryDate: Date;

  public static from(product: ProductPayment) {
    const productPaymentResponse = new ProductPaymentDetailsResponse();
    productPaymentResponse.id = product.id;
    productPaymentResponse.product = product.product;
    productPaymentResponse.user = product.user;
    productPaymentResponse.quantityPaid = product.quantityPaid;
    productPaymentResponse.deliveryDate = product.deliveryDate;
    return productPaymentResponse;
  }
}
