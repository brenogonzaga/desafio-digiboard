import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entitites/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { Product } from './entitites/product.entity';
import { ProductPaymentModule } from './product-payment/product-payment.module';
import { ProductPayment } from './entitites/product-payment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'db',
        port: configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USERNAME') || 'myuser',
        password: configService.get('DB_PASSWORD') || 'mypass',
        database: configService.get('DB_NAME') || 'mydb',
        entities: [User, Product, ProductPayment],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ProductModule,
    ProductPaymentModule,
  ],
})
export class AppModule {}
