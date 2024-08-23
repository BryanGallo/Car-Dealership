import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCarDto {
  @IsUUID()
  @IsString()
  @IsOptional()
  readonly id?: string;

  @IsString({ message: 'The brand most be a cool string' })
  readonly brand?: string;
  
  @IsString()
  readonly model?: string;
}
