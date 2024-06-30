import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SingupDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
