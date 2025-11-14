import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anime } from './entities/anime.schema';
import { KitsuAnimeItem } from 'src/external/interfaces/kitsu-anime-response.interface';

@Injectable()
export class AnimeService {
  constructor(
    @InjectModel(Anime.name)
    private readonly animeModel: Model<Anime>,
  ) {}

  async upsertAnime(kitsuAnime: KitsuAnimeItem): Promise<void> {
    await this.animeModel.updateOne(
      { kitsuId: kitsuAnime.id },
      {
        $set: {
          kitsuId: kitsuAnime.id,
          attributes: kitsuAnime.attributes,
        },
      },
      { upsert: true },
    );
  }

  async findAll(): Promise<Anime[]> {
    return this.animeModel.find().exec();
  }

  async findById(kitsuId: string): Promise<Anime | null> {
    return this.animeModel.findOne({ kitsuId }).exec();
  }

  async findWithFilter(filter: {
    title?: string;
    subtype?: string;
    status?: string;
  }): Promise<Anime[]> {
    const query: Record<string, unknown> = {};

    if (filter.title) {
      query['attributes.canonicalTitle'] = {
        $regex: filter.title,
        $options: 'i',
      };
    }

    if (filter.subtype) {
      query['attributes.subtype'] = filter.subtype;
    }

    if (filter.status) {
      query['attributes.status'] = filter.status;
    }

    return this.animeModel.find(query).exec();
  }
}
