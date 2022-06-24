import { IsEnum } from 'class-validator';
import { Capability } from '../types/capability.enum';
import { AbstractCapabilityState } from './on-off/on-off.state';

export abstract class AbstractCapability {
  @IsEnum(Capability)
  abstract type: Capability;

  retrievable = true;

  reportable = false;

  parameters: object;

  state: AbstractCapabilityState;
}
