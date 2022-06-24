import { CapabilityType } from '../../capabilities';

class DeviceDto {
  id: string;
  capabilities: CapabilityType[];
}

export class DeviceActionDto {
  payload: {
    devices: DeviceDto[];
  };
}
