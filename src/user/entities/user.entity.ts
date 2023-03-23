import {  Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 200, nullable: true })
  name?: string;

  @Field()
  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  profile?: string

  @Field()
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Field()
  @Column()
  email?: string;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Field()
  @DeleteDateColumn({nullable: true })
  deletedAt?: Date;

  @Field()
  @CreateDateColumn()
  updatedAt?: Date;
}