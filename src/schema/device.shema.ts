import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, instanceToPlain } from 'class-transformer';
import { Document } from 'mongoose';
import { CapabilityType } from '../capabilities';
import { DeviceInfo } from '../dto/device-info.dto';
import { Capability } from '../types/capability.enum';
import { DeviceType } from '../types/device-type.enum';

export type DeviceDocument = Device & Document;

type Config = {
  [key in CapabilityType['type']]: key extends Capability.OnOff
    ? Record<`${CapabilityType['state']['value']}`, string>
    : string;
};

@Schema({
  id: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class Device {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: DeviceType;

  @Prop({ required: true })
  capabilities: CapabilityType[];

  @Prop({
    required: true,
    type: Object,
  })
  @Exclude()
  config: Config;

  @Prop({ required: true, type: DeviceInfo, default: new DeviceInfo() })
  device_info: DeviceInfo = new DeviceInfo();

  toJSON() {
    return instanceToPlain(this);
  }
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
