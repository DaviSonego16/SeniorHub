import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { KitsuAnimeResponse } from '../interfaces/kitsu-anime-response.interface';

@Injectable()
export class KitsuApiService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('KITSU_URL') ?? '';
  }

  async getAnimes(limit: number, offset: number): Promise<KitsuAnimeResponse> {
    const { data } = await firstValueFrom(
      this.http.get<KitsuAnimeResponse>(`${this.baseUrl}/anime`, {
        params: { 'page[limit]': limit, 'page[offset]': offset },
      }),
    );
    return data;
  }
}
