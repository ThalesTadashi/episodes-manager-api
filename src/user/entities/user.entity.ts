import {  Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name?: string;

  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  profile?: string

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column()
  email?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn()
  updatedAt?: Date;
}

