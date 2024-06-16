// apartment.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql'; // додані декоратори

import { User } from '../../user/entities/user.entity';

@ObjectType() // декоратор для визначення типу GraphQL
@Entity()
export class Apartment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  title: string;

  @Field()
  @Column({ type: 'text' }) // assuming HTML content will be stored as plain text
  description: string;

  @Field(() => User)
  @ManyToOne(() => User, { eager: true }) // eager loading to fetch seller data automatically
  seller: User;

  @Field(() => Int)
  @Column()
  price: number;
}
