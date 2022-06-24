import { Equals, IsBoolean } from 'class-validator';

export abstract class AbstractCapabilityState {
  abstract instance: unknown;
  abstract value: unknown;
}

export class OnOffCapabilityState extends AbstractCapabilityState {
  @Equals('on')
  instance: 'on';

  @IsBoolean()
  value: boolean;
}
