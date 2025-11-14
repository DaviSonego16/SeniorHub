import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import type { KitsuAnimeAttributes } from 'src/external/interfaces/kitsu-anime-response.interface';

@Schema({ timestamps: true })
export class Anime extends Document {
  @Prop({ required: true, unique: true })
  kitsuId: string;

  @Prop({ type: Object })
  attributes: KitsuAnimeAttributes;
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
