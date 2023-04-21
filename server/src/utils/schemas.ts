import { Matches, IsDefined, IsEnum } from "class-validator";
import { Expose } from "class-transformer";

export enum Roles { super_admin = 'super_admin', admin = 'admin', user = 'user' };

export class UpdateUserSchema {
  @IsDefined()
  @Expose()
  name: string = '';
    
  @IsDefined()
  @Expose()
  @Matches(RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), {
    message: 'Invalid email, example: user@mind.com'
  })
  email: string = '';

  @IsDefined()
  @Expose()
  @IsEnum(Roles)
  role: Roles = Roles.user  
}

export class CreateUserSchema extends UpdateUserSchema{
  @IsDefined()
  @Expose()
  @Matches(RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/), {
    message: 'password should contain atleast one number and one special character and must be min 8 and max 16 characters'
  })
  password: string = '';
}

export class CreateAccountSchema {
  @IsDefined()
  @Expose()
  name: string = '';

  @IsDefined()
  @Expose()
  client: string = '';

  @IsDefined()
  @Expose()
  responsible: string = '';

  @IsDefined()
  @Expose()
  team: Array<string> = [];
    
}