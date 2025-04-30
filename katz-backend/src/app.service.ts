import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {
  constructor(private configService: ConfigService){}

  getApiUrl(){
    const apiBase = this.configService.get<string>('API_BASE_URL');
    console.log('API Base:', apiBase);
    return {baseUrl: apiBase};
  }
  getHello(): string {
    return 'Hello World!';
  }
}
