import { Equals, IsEmpty, IsOptional, IsUrl } from 'class-validator';
import { Capability } from '../../types/capability.enum';
import { CommonConfigDto } from './common-config.dto';

export class OnOffCapabilityConfigDto extends CommonConfigDto {
  @Equals(Capability.OnOff)
  __type = Capability.OnOff as const;

  @IsEmpty()
  update: undefined;

  @IsUrl()
  on: string;

  @IsUrl()
  @IsOptional()
  off?: string;
}
