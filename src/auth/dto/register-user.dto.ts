import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { IsSecurePassword } from 'src/utils/validators/IsSecurePassword/IsSecurePassword';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Validate(IsSecurePassword)
  password: string;
}
