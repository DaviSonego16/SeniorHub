import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserAnime } from './entities/user-anime.entity';
import { Anime } from './../anime/entities/anime.schema';
import { CreateUserAnimeDto } from './dto/create-user-anime.dto';
import { UpdateUserAnimeDto } from './dto/update-user-anime.dto';

@Injectable()
export class UserAnimeService {
  constructor(
    @InjectRepository(UserAnime)
    private readonly userAnimeRepo: Repository<UserAnime>,

    @InjectModel(Anime.name)
    private readonly animeModel: Model<Anime>,
  ) {}

  // -------------------------------------------------------------

  /** Verifica duplicidade para evitar adicionar 2x o mesmo anime */
  private async ensureNotExists(model: CreateUserAnimeDto) {
    const exists = await this.userAnimeRepo.findOne({
      where: {
        user: { id: model.userId },
        anime: model.animeId,
      },
    });

    if (exists) {
      throw new ConflictException('Anime já está na lista do usuário.');
    }
  }

  // -------------------------------------------------------------

  /** Adiciona um anime à lista */
  async addAnimeToUser(model: CreateUserAnimeDto) {
    const animeExists = await this.animeModel.findById(model.animeId);
    if (!animeExists) {
      throw new NotFoundException('Anime não encontrado no MongoDB.');
    }

    await this.ensureNotExists(model);

    const userAnime = this.userAnimeRepo.create({
      user: { id: model.userId },
      anime: model.animeId,
      currentEpisode: 0,
      isCompleted: false,
      watchLater: false,
    });

    return await this.userAnimeRepo.save(userAnime);
  }

  //TODO
  async asyncUpdateAnimeUser(id: string, model: UpdateUserAnimeDto) {
    const userAnime = await this.userAnimeRepo.findOne({ where: { id } });
    if (model.isCompleted) {
      return;
    }

    return userAnime;
  }

  // -------------------------------------------------------------

  /** Lista todos os animes do usuário com detalhes do MongoDB */
  private async listUserAnimes(userId: string) {
    const list = await this.userAnimeRepo.find({
      where: { user: { id: userId } },
      order: { updatedAt: 'DESC' },
    });

    const animes = await Promise.all(
      list.map((ua) => this.animeModel.find({ _id: ua.anime })),
    );

    return list.map((ua, i) => ({
      ...ua,
      anime: animes[i] ?? null,
    }));
  }

  // -------------------------------------------------------------

  /** Retorna um item específico da lista */
  private async getUserAnimeById(id: string) {
    const userAnime = await this.userAnimeRepo.findOne({ where: { id } });

    if (!userAnime) throw new NotFoundException('Registro não encontrado.');

    const animeDetails = await this.animeModel.findById(userAnime.anime);

    return { ...userAnime, anime: animeDetails };
  }

  // -------------------------------------------------------------

  /** Atualizar episódio atual */
  private async updateEpisode(id: string, episode: number) {
    const userAnime = await this.userAnimeRepo.findOne({ where: { id } });

    if (!userAnime) throw new NotFoundException('Registro não encontrado.');

    userAnime.currentEpisode = episode;
    userAnime.updatedAt = new Date();

    await this.userAnimeRepo.save(userAnime);

    return userAnime;
  }

  // -------------------------------------------------------------

  /** Marcar como concluído */
  private async markAsCompleted(id: string) {
    const userAnime = await this.userAnimeRepo.findOne({ where: { id } });

    if (!userAnime) throw new NotFoundException('Registro não encontrado.');

    userAnime.isCompleted = true;
    userAnime.updatedAt = new Date();

    return await this.userAnimeRepo.save(userAnime);
  }

  // -------------------------------------------------------------

  /** Marcar para assistir mais tarde */
  private async toggleWatchLater(id: string) {
    const userAnime = await this.userAnimeRepo.findOne({ where: { id } });

    if (!userAnime) throw new NotFoundException('Registro não encontrado.');

    userAnime.watchLater = !userAnime.watchLater;
    userAnime.updatedAt = new Date();

    return await this.userAnimeRepo.save(userAnime);
  }

  // -------------------------------------------------------------

  /** Remover anime da lista */
  async remove(id: string) {
    const userAnime = await this.userAnimeRepo.findOne({ where: { id } });

    if (!userAnime) throw new NotFoundException('Registro não encontrado.');

    await this.userAnimeRepo.delete(id);

    return { message: 'Removido com sucesso.' };
  }
}
