import { IsEnum, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Capability } from '../../types/capability.enum';

export abstract class CommonConfigDto {
  @IsEnum(Capability)
  abstract __type: Capability;

  @IsUrl()
  @IsNotEmpty()
  update: string;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  read?: string;
}
