import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
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

  @Field(() => Int)
  @Column({ name: 'sellerId' })
  sellerId: number;

  @ManyToOne(() => User, { eager: true })
  @Field(() => User)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @Field()
  @Column({ length: 255 })
  locality: string;

  @Field(() => Int)
  @Column()
  floorInApartment: number;

  @Field(() => Int)
  @Column()
  numberOfRooms: number;

  @Field(() => Int)
  @Column()
  square: number;

  @Field()
  @Column({ length: 255 })
  wallMaterial: string;

  @Field()
  @Column({ length: 255 })
  heating: string;

  @Field()
  @CreateDateColumn()
  date: Date; // Додане поле для дати створення
}