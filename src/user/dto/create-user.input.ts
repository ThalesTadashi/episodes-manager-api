import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
    @IsString()
    @IsNotEmpty({ message: 'O Nome é obrigatório' })
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'O Perfil é obrigatório!' })
    profile: string;

    @Field()
    @IsString()
    @IsNotEmpty({ message: 'O telefone é obrigatório!' })
    phone: string;

    @Field()
    @IsEmail()
    @IsNotEmpty({ message: 'O email é obrigatório!' })
    email: string;
}