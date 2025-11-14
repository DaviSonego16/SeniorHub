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
  private async ensureNotExists(userId: string, animeId: string) {
    const exists = await this.userAnimeRepo.findOne({
      where: {
        user: { id: userId },
        anime: animeId,
      },
    });

    if (exists) {
      throw new ConflictException('Anime já está na lista do usuário.');
    }
  }

  // -------------------------------------------------------------

  /** Adiciona um anime à lista */
  async addAnimeToUser(userId: string, animeId: string) {
    const animeExists = await this.animeModel.findById(animeId);
    if (!animeExists) {
      throw new NotFoundException('Anime não encontrado no MongoDB.');
    }

    await this.ensureNotExists(userId, animeId);

    const userAnime = this.userAnimeRepo.create({
      user: { id: userId },
      anime: animeId,
      currentEpisode: 0,
      isCompleted: false,
      watchLater: false,
    });

    return await this.userAnimeRepo.save(userAnime);
  }

  // -------------------------------------------------------------

  /** Lista todos os animes do usuário com detalhes do MongoDB */
  async listUserAnimes(userId: string) {
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
  async getUserAnimeById(id: string) {
    const userAnime = await this.userAnimeRepo.findOne({ where: { id } });

    if (!userAnime) throw new NotFoundException('Registro não encontrado.');

    const animeDetails = await this.animeModel.findById(userAnime.anime);

    return { ...userAnime, anime: animeDetails };
  }

  // -------------------------------------------------------------

  /** Atualizar episódio atual */
  async updateEpisode(id: string, episode: number) {
    const userAnime = await this.userAnimeRepo.findOne({ where: { id } });

    if (!userAnime) throw new NotFoundException('Registro não encontrado.');

    userAnime.currentEpisode = episode;
    userAnime.updatedAt = new Date();

    await this.userAnimeRepo.save(userAnime);

    return userAnime;
  }

  // -------------------------------------------------------------

  /** Marcar como concluído */
  async markAsCompleted(id: string) {
    const userAnime = await this.userAnimeRepo.findOne({ where: { id } });

    if (!userAnime) throw new NotFoundException('Registro não encontrado.');

    userAnime.isCompleted = true;
    userAnime.updatedAt = new Date();

    return await this.userAnimeRepo.save(userAnime);
  }

  // -------------------------------------------------------------

  /** Marcar para assistir mais tarde */
  async toggleWatchLater(id: string) {
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
