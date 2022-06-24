import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CapabilityType } from '../capabilities';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { DeviceActionService } from './device-action.service';
import { DeviceService } from './device.service';
import { AddCapabilityDto } from './dto/capability.dto';
import { DeviceActionDto } from './dto/device-action';

@Controller('user/devices')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly deviceActionService: DeviceActionService,
  ) {}

  @Post('action')
  @HttpCode(200)
  @UseInterceptors(TransformInterceptor)
  async action(@Body() body: DeviceActionDto) {
    const devices = await this.deviceActionService.processAction(
      body.payload.devices,
    );

    return {
      devices,
    };
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async getList() {
    const devices = await this.deviceService.findAll({});
    return {
      devices,
    };
  }

  @Post('query')
  @HttpCode(200)
  @UseInterceptors(TransformInterceptor)
  async query() {
    const devices = await this.deviceService.findAll({});

    return {
      devices,
    };
  }

  @Post()
  createDevice(@Body() device) {
    return this.deviceService.create(device);
  }

  @Post(':deviceId/capability')
  addCapability(
    @Param('deviceId') deviceId: string,
    @Body() capability: AddCapabilityDto,
  ) {
    return this.deviceService.addCapability(deviceId, capability);
  }
}
