import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  @IsNumber()
  quantityPaid: number;
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  deliveryDate: Date;
}
