import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductPaymentService } from './product-payment.service';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('product-payment')
@UseGuards(JwtGuard)
@ApiTags('product-payment')
export class ProductPaymentController {
  constructor(private readonly productPaymentService: ProductPaymentService) {}

  @Post()
  createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.productPaymentService.createPayment(createPaymentDto);
  }

  @Get()
  findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.productPaymentService.findAll(skip, take);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productPaymentService.findOne(id);
  }

  @Get('user/:id')
  findAllByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.productPaymentService.findAllByUserId(id, skip, take);
  }
}
