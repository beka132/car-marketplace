import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Reset token from forgot-password response' })
  reset_token!: string;

  @ApiProperty({ example: 'newSecret123' })
  new_password!: string;
}
