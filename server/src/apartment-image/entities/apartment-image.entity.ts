import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Apartment } from '../../apartments/entities/apartment.entity';

@ObjectType()
@Entity()
export class ApartmentImage {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;

  @Field(() => Int)
  @Column({ name: 'apartmentId' })
  apartmentId: number;

  @ManyToOne(() => Apartment, apartment => apartment.images)
  @Field(() => Apartment)
  apartment: Apartment;
}