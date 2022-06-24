import { YFunction } from '../../../types/function.enum';

export enum YUnit {
  Percent = 'unit.percent',
  TemperatureCelcius = 'unit.temperature.celcius',
  TemperatureKelvin = 'unit.temperature.kelvin',
}

export type DetectTemperature<T extends YFunction> =
  T extends YFunction.Temperature
    ? YUnit.TemperatureCelcius | YUnit.TemperatureKelvin
    : YUnit.Percent;

export type DetectChannel<T extends YFunction> = T extends YFunction.Channel
  ? undefined
  : DetectTemperature<T>;

export type YFunctionUnit = {
  [key in YFunction]: DetectChannel<key>;
};
