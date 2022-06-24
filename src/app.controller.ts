import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  devices(@Req() req: Request) {
    console.log(req.header('X-Request-Id'));
    return {
      request_id: req.header('X-Request-Id'),
      payload: {
        user_id: 'google-oauth2|111849282591110689266',
        devices: [
          {
            id: 'abc-123',
            name: 'лампa',
            description: 'цветная лампа',
            room: 'спальня',
            type: 'devices.types.light',
            capabilities: [
              {
                type: 'devices.capabilities.range',
                retrievable: true,
                parameters: {
                  instance: 'brightness',
                  unit: 'unit.percent',
                  range: {
                    min: 0,
                    max: 100,
                    precision: 10,
                  },
                },
              },
              {
                type: 'devices.capabilities.on_off',
              },
              {
                type: 'devices.capabilities.color_setting',
                parameters: {
                  color_model: 'hsv',
                  temperature_k: {
                    min: 2700,
                    max: 9000,
                    precision: 1,
                  },
                },
              },
            ],
            device_info: {
              manufacturer: 'Provider2',
              model: 'hue g11',
              hw_version: '1.2',
              sw_version: '5.4',
            },
          },
        ],
      },
    };
  }
}
