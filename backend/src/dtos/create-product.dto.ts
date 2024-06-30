import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  productCode: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsOptional()
  imageUrl?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  expiryDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  entryDate?: Date;
}
