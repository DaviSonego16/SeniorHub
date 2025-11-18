import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserAnimeDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  animeId: string;
}
