import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber} from 'class-validator';
export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
