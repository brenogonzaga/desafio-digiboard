import { ProductPayment } from 'src/entitites/product-payment';

export class ProductPaymentResponse {
  id: number;

  productName: string;

  user: string;

  quantityPaid: number;

  deliveryDate: Date;

  public static from(product: ProductPayment) {
    const productPaymentResponse = new ProductPaymentResponse();
    productPaymentResponse.id = product.id;
    productPaymentResponse.productName = product.product.description;
    productPaymentResponse.user = product.user.name;
    productPaymentResponse.quantityPaid = product.quantityPaid;
    productPaymentResponse.deliveryDate = product.deliveryDate;
    return productPaymentResponse;
  }
}
