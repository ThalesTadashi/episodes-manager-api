import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";


@InputType()
export class CreateMovieInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O Título é obrigatório!' })
  title: string;

  @IsNumber()
  @Field()
  releaseYear: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O campo diretor é obrigatório!' })
  director: string;

  @IsNumber()
  @Field({ nullable: true })
  rating?: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória!' })
  description: string;
}