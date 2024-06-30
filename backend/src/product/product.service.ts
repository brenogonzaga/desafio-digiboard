import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Product } from '../entitites/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductResponse } from '../dtos/product-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create({
    productCode,
    description,
    expiryDate,
    stock,
  }: CreateProductDto): Promise<ProductResponse> {
    const findProduct = await this.productRepository.findOne({
      where: { productCode },
    });
    if (findProduct) {
      throw new BadRequestException(
        `Product with this product code ${productCode} already exists`,
      );
    }
    return this.productRepository.save({
      productCode,
      description,
      expiryDate,
      stock,
    });
  }

  async findAll(skip: number, take: number): Promise<ProductResponse[]> {
    return await this.productRepository
      .find({ skip, take })
      .then((products) => products.map(ProductResponse.from));
  }

  async findAllActive(skip: number, take: number): Promise<ProductResponse[]> {
    return await this.productRepository
      .find({
        where: { stock: Not(0) },
        skip,
        take,
      })
      .then((products) => products.map(ProductResponse.from));
  }

  async findOneById(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({ where: { id } }).catch(() => {
      throw new NotFoundException(`Product with ID ${id} not found`);
    });
  }

  async findOneByIdActive(id: number): Promise<ProductResponse> {
    return await this.productRepository
      .findOne({ where: { id, stock: Not(0) } })
      .then(ProductResponse.from)
      .catch(() => {
        throw new NotFoundException(`Product with ID ${id} not found`);
      });
  }

  async findOneByProductCodeActive(
    productCode: string,
  ): Promise<ProductResponse> {
    return await this.productRepository
      .findOne({ where: { productCode, stock: Not(0) } })
      .then(ProductResponse.from)
      .catch(() => {
        throw new NotFoundException(
          `Product with this product code ${productCode} not found`,
        );
      });
  }

  async updateActive(
    id: number,
    { productCode, description, expiryDate, stock, imageUrl }: UpdateProductDto,
  ) {
    const findProduct = await this.findOneByIdActive(id);

    if (!findProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (productCode) {
      if (findProduct && findProduct.productCode !== productCode) {
        throw new BadRequestException(
          `Product with this product code ${productCode} already exists`,
        );
      }
    }
    await this.productRepository.update(id, {
      productCode,
      description,
      imageUrl,
      expiryDate,
      stock,
    });
  }

  async removeActive(id: number) {
    const findProduct = await this.findOneByIdActive(id);

    if (!findProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.update(id, { stock: 0 });
  }

  async updateStock(id: number, remove: number) {
    const findProduct = await this.productRepository.findOne({ where: { id } });

    if (!findProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (findProduct.stock - remove < 0) {
      throw new BadRequestException('Stock is not enough');
    }

    const newStock = findProduct.stock - remove;

    return await this.productRepository.update(id, { stock: newStock });
  }
}
