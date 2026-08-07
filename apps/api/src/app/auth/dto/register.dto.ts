import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'John Doe' })
  name!: string;

  @ApiProperty({ example: 'secret123' })
  password!: string;

  @ApiProperty({ example: '555-0001', required: false })
  phone?: string;
}
