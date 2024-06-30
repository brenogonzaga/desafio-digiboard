import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class ProductPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  quantityPaid: number;

  @Column()
  deliveryDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
