import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ValidateIf, Matches, IsNotEmpty } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ValidateIf((o) => o.password !== undefined)
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password?: string;

  @ValidateIf((o) => o.password !== undefined)
  @IsNotEmpty({ message: 'Confirm password is required when updating password.' })
  @Match('password', { message: 'Confirm password must match password.' })
  confirmPassword?: string;
}
