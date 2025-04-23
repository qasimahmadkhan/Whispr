import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly configService: ConfigService
  ) {}

  @Get()
  getHello(): string {
    const appName = this.configService.get<string>('APP_NAME');
    return `Welcome to ${appName}!`;
  }
  @Get('check-db')
  checkDb(): Promise<string> {
    return this.appService.checkConnection();
  }

}
