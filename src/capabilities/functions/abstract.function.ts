import { YFunctionRange } from '../../types/function-range.interface';
import { YFunction } from '../../types/function.enum';
import { DetectChannel } from './units/units';

export abstract class AbstractYFunction<Type extends YFunction> {
  abstract instance: Type;

  abstract unit: DetectChannel<Type>;

  random_access = true;

  range: YFunctionRange;
}
