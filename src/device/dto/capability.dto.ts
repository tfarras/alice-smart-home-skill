import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { CapabilityType } from '../../capabilities';
import { AbstractCapability } from '../../capabilities/abstract.capability';
import { OnOffCapability } from '../../capabilities/on-off/on-off.capability';
import { RangeCapability } from '../../capabilities/range/range.capability';
import { Capability } from '../../types/capability.enum';
import { CommonConfigDto } from './common-config.dto';
import { OnOffCapabilityConfigDto } from './on-off-capability-config.dto';

export class AddCapabilityDto {
  @ValidateNested()
  @IsDefined()
  @Type(() => AbstractCapability, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        {
          value: OnOffCapability,
          name: Capability.OnOff,
        },
        {
          value: RangeCapability,
          name: Capability.Range,
        },
      ],
    },
  })
  capability: CapabilityType;

  @ValidateNested()
  @IsDefined()
  @Type(() => CommonConfigDto, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: '__type',
      subTypes: [
        {
          value: OnOffCapabilityConfigDto,
          name: Capability.OnOff,
        },
      ],
    },
  })
  config: OnOffCapabilityConfigDto;
}
