import { YFunction } from '../../types/function.enum';
import { AbstractYFunction } from './abstract.function';
import { YUnit } from './units/units';

export class BrigthnessFunction extends AbstractYFunction<YFunction.Brightness> {
  instance: YFunction.Brightness;
  unit: YUnit.Percent;
}
