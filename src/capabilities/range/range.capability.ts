import { Capability } from '../../types/capability.enum';
import { AbstractCapability } from '../abstract.capability';
import { BrigthnessFunction } from '../functions/brightness.function';

export class RangeCapability extends AbstractCapability {
  type = Capability.Range as const;

  parameters: BrigthnessFunction;

  state: {
    instance: BrigthnessFunction['instance'];
    value: number;
  };

  constructor() {
    super();

    const fn = new BrigthnessFunction();

    fn.range.min = 0;
    fn.range.max = 100;
    fn.range.precision = 10;

    this.parameters = fn;
  }
}
