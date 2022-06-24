import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { DeviceActionService } from './device-action.service';
import { DeviceService } from './device.service';
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
}
