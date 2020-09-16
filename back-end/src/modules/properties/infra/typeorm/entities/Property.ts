import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('properties')
class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  area: number;

  @Column()
  price: number;

  @Column()
  address: string;

  @Column()
  address_number: string;

  @Column()
  address_complement: string;

  @Column()
  address_district: string;

  @Column()
  address_zipcode: string;

  @Column()
  address_city: string;

  @Column()
  address_state: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Property;
