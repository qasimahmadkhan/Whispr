import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}
  async checkConnection(): Promise<string> {
    await this.dataSource.query('SELECT 1');
    return '✅ Database Connected Successfully';
  }
}
