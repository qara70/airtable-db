import { Injectable } from '@nestjs/common';
import { RequestAirTable } from './lib/airtable/request-config';

@Injectable()
export class AppService {
  private readonly httpService: RequestAirTable;

  constructor() {
    this.httpService = new RequestAirTable();
  }

  async getTableList() {
    const request = this.httpService.requestConfig();

    try {
      const response = await request.get('/');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
}
