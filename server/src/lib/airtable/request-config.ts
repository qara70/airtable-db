import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RequestAirTable {
  requestConfig() {
    return axios.create({
      baseURL: `${process.env.AIR_TABLE_BASE_URL}/${process.env.AIR_TABLE_BASE_ID}/${process.env.AIR_TABLE_PATH}`,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AIR_TABLE_API_KEY}`,
      },
    });
  }
}
