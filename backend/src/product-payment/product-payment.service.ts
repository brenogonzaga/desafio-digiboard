import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPayment } from '../entitites/product-payment';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UserService } from 'src/user/user.service';
import { ProductPaymentResponse } from 'src/dtos/product-payment-response.dto';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { ProductPaymentDetailsResponse } from 'src/dtos/product-payment-details-response.dto';

@Injectable()
export class ProductPaymentService {
  constructor(
    @InjectRepository(ProductPayment)
    private readonly productPaymentRepository: Repository<ProductPayment>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async createPayment({
    productId,
    userId,
    quantityPaid,
    deliveryDate,
  }: CreatePaymentDto): Promise<ProductPaymentResponse> {
    const findProduct = await this.productService.findOneById(productId);

    if (!findProduct) {
      throw new NotFoundException('Product not found');
    }

    if (findProduct.expiryDate < new Date()) {
      throw new BadRequestException('Product is expired');
    }

    await this.productService.updateStock(productId, quantityPaid);

    const productPayment = new ProductPayment();

    productPayment.product = findProduct;

    const findUser = await this.userService.findOneById(userId);

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    productPayment.user = findUser;
    productPayment.quantityPaid = quantityPaid;
    productPayment.deliveryDate = deliveryDate;

    return this.productPaymentRepository
      .save(productPayment)
      .then((productPayment) => {
        return ProductPaymentResponse.from(productPayment);
      });
  }

  async findAll(skip: number, take: number): Promise<ProductPaymentResponse[]> {
    return await this.productPaymentRepository
      .find({
        relations: ['product', 'user'],
        skip,
        take,
      })
      .then((productPayments) => {
        return productPayments.map((productPayment) =>
          ProductPaymentResponse.from(productPayment),
        );
      });
  }

  async findOne(id: number): Promise<ProductPaymentDetailsResponse> {
    const productPayment = await this.productPaymentRepository
      .findOne({
        where: { id },
        relations: ['product', 'user'],
      })
      .then(ProductPaymentDetailsResponse.from)
      .catch(() => {
        throw new NotFoundException(`Product payment with ID ${id} not found`);
      });

    return productPayment;
  }

  async findAllByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<ProductPaymentDetailsResponse[]> {
    const findUser = await this.userService.findOneById(userId);

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    return await this.productPaymentRepository
      .find({
        where: { user: { id: userId } },
        relations: ['product', 'user'],
        skip,
        take,
      })
      .then((productPayments) => {
        return productPayments.map((productPayment) =>
          ProductPaymentDetailsResponse.from(productPayment),
        );
      });
  }
}
