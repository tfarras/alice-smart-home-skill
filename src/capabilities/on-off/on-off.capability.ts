import { Type } from 'class-transformer';
import { Equals, IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { Capability } from '../../types/capability.enum';
import { AbstractCapability } from '../abstract.capability';
import { OnOffParameters } from './on-off.parameters';
import { OnOffCapabilityState } from './on-off.state';

export class OnOffCapability extends AbstractCapability {
  @Equals(Capability.OnOff)
  type = Capability.OnOff as const;

  @ValidateNested()
  @IsOptional()
  @Type(() => OnOffParameters)
  parameters: OnOffParameters = new OnOffParameters();

  @ValidateNested()
  @IsDefined()
  @Type(() => OnOffCapabilityState)
  state: OnOffCapabilityState;
}
