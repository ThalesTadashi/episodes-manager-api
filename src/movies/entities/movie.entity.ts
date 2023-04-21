import { ObjectType, ID,Field } from "@nestjs/graphql";
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";


@ObjectType()
@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id?: string;

  @Field()
  @Column()
  title?: string;

  @Field()
  @Column()
  releaseYear?: number;

  @Field()
  @Column()
  director?: string;


  @Field()
  @Column({ nullable: true })
  rating?: number;

  @Field()
  @Column({ nullable: true })
  colorPref?: string;

  @Field()
  @Column()
  description?: string;
}