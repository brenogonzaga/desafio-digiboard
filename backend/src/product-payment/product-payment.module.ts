import { Module } from '@nestjs/common';
import { ProductPaymentService } from './product-payment.service';
import { ProductPaymentController } from './product-payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPayment } from 'src/entitites/product-payment';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/entitites/user.entity';
import { Product } from 'src/entitites/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPayment, User, Product])],
  controllers: [ProductPaymentController],
  providers: [ProductPaymentService, UserService, ProductService],
})
export class ProductPaymentModule {}
