import {
  IsInt,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateUserAnimeDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  animeId: string;

  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsInt()
  currentEpisode?: number;

  @IsOptional()
  @IsBoolean()
  watchLater?: boolean;
}
