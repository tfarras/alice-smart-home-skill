import { Capability } from '../types/capability.enum';

export abstract class AbstractCapability {
  abstract type: Capability;

  retrievable = true;

  reportable = false;

  parameters: object;

  state: Record<string, unknown>;
}
