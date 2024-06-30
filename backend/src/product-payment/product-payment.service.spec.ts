import { Test, TestingModule } from '@nestjs/testing';
import { ProductPaymentService } from './product-payment.service';

describe('ProductPaymentService', () => {
  let service: ProductPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPaymentService],
    }).compile();

    service = module.get<ProductPaymentService>(ProductPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
