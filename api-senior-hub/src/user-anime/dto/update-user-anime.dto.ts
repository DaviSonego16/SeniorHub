import { IsInt, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserAnimeDto {
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
