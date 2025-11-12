import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KitsuApiService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('KITSU_URL') ?? '';
  }

  async getAnimes(query: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/anime`, { params: { q: query } }),
    );
    return data;
  }
}
