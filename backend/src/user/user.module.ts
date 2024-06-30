import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entitites/user.entity';
import { ProductPaymentService } from '../product-payment/product-payment.service';
import { ProductPayment } from '../entitites/product-payment';
import { ProductService } from '../product/product.service';
import { Product } from 'src/entitites/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ProductPayment, Product])],
  controllers: [UserController],
  providers: [UserService, ProductPaymentService, ProductService],
})
export class UserModule {}
