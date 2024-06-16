import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class Apartment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  title: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field()
  @Column()
  imageUrl: string;

  @Column({ name: 'sellerId' }) // Column for storing sellerId
  sellerId: number;

  @ManyToOne(() => User, { eager: true })
  @Field(() => User)
  @JoinColumn({ name: 'sellerId' }) // JoinColumn with sellerId in User entity
  seller: User;
}