import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
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
      throw new Error(error.message);
    }
  }

  async createUser(createUser: CreateUserDto) {
    const request = this.httpService.requestConfig();
    const createDataForm = {
      records: [
        {
          fields: {
            氏名: createUser.name,
            年齢: createUser.age,
            言語: createUser.language,
            在籍: createUser.belong,
          },
        },
      ],
    };

    try {
      this.validateCreateUser(createUser);
      const response = await request.post('/', createDataForm);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private validateCreateUser(createUser: CreateUserDto) {
    if (createUser.age < 0) {
      throw new Error('年齢が0歳以下は、対応できません');
    }
  }
}
