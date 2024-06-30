import { Test, TestingModule } from '@nestjs/testing';
import { ProductPaymentController } from './product-payment.controller';
import { ProductPaymentService } from './product-payment.service';

describe('ProductPaymentController', () => {
  let controller: ProductPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPaymentController],
      providers: [ProductPaymentService],
    }).compile();

    controller = module.get<ProductPaymentController>(ProductPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
