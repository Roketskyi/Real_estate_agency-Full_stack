import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  login: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  email: string;

  @Column({ default: '0' })
  @Field()
  phone1: string;

  @Column({ default: '0' })
  @Field()
  phone2: string;

  @Column()
  @Field()
  avatar: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  @Field(() => Role)
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;
}