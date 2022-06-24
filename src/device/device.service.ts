import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from '../schema/device.shema';
import { AddCapabilityDto } from './dto/capability.dto';

@Injectable({})
export class DeviceService {
  constructor(
    @InjectModel(Device.name)
    private readonly deviceModel: Model<DeviceDocument>,
  ) {}

  get model() {
    return this.deviceModel;
  }

  findAll(
    filter: Parameters<Model<DeviceDocument>['find']>[0] = {},
  ): Promise<DeviceDocument[]> {
    return this.deviceModel.find(filter).exec();
  }

  create(device) {
    return this.deviceModel.create(device);
  }

  addCapability(deviceId: string, addCapability: AddCapabilityDto) {
    const { config, capability } = addCapability;

    return this.deviceModel.findByIdAndUpdate(deviceId, {
      $push: {
        config,
        capabilities: capability,
      },
    });
  }
}
