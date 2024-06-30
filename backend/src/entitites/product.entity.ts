import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productCode: string;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  entryDate: Date;

  @Column()
  expiryDate: Date;
}
