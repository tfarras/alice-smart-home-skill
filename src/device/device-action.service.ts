import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { DeviceDocument } from '../schema/device.shema';
import { Capability } from '../types/capability.enum';
import { DeviceService } from './device.service';
import { DeviceActionDto } from './dto/device-action';

type Device = FlatArray<DeviceActionDto['payload']['devices'], 1>;

@Injectable()
export class DeviceActionService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly httpService: HttpService,
  ) {}

  async processAction(devices: DeviceActionDto['payload']['devices']) {
    const dictionary = this.convertToDictionary(devices);

    const dbDevices = await this.deviceService.findAll({
      id: {
        $in: Object.keys(dictionary),
      },
    });

    return Promise.all(
      dbDevices.map((device) =>
        this.processDevice(device, dictionary[device._id]),
      ),
    );
  }

  async processDevice(device: DeviceDocument, deviceFromAction: Device) {
    device.capabilities = deviceFromAction.capabilities;

    for (const capability of device.capabilities) {
      if (capability.type === Capability.OnOff) {
        await this.makeGetRequest(
          device.config[capability.type][`${capability.state.value}`],
        );
      }
    }

    await device.save();

    return {
      id: device.id,
      capabilities: device.capabilities.map((capability) => {
        return {
          type: capability.type,
          state: {
            instance: capability.state.instance,
            action_result: {
              status: 'DONE',
            },
          },
        };
      }),
    };
  }

  makeGetRequest(url: string) {
    return lastValueFrom(this.httpService.get(url));
  }

  private convertToDictionary(devices: DeviceActionDto['payload']['devices']) {
    return devices.reduce<Record<Device['id'], Device>>(
      (dictionary, device) => {
        return {
          ...dictionary,
          [device.id]: device,
        };
      },
      {},
    );
  }
}
