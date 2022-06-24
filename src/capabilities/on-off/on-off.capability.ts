import { Capability } from '../../types/capability.enum';
import { AbstractCapability } from '../abstract.capability';
import { OnOffParameters } from './on-off.parameters';

export class OnOffCapability extends AbstractCapability {
  type = Capability.OnOff as const;

  parameters: OnOffParameters;

  state: {
    instance: 'on';
    value: boolean;
  };
}
