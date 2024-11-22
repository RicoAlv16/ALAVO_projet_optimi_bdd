import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'nestjs-redis';
import { User } from 'src/shared/entities/user.entity';
import { PaginationOptions } from 'src/shared/interfaces/pagination.interface';

@Injectable()
export class UsersService {
  private readonly cacheKey = 'utilisateurs_cache';

  constructor(
    @InjectRepository(User)
    private readonly utilisateursRepository: Repository<User>,
    private readonly redisService: RedisService, // Pour le cache
  ) {}

  async findAllByEmail(
    email: string,
    options: PaginationOptions,
  ): Promise<{ data: User[]; total: number }> {
    const redisClient = this.redisService.getClient();

    // Vérifie si les données sont déjà en cache
    const cachedData = await redisClient.get(this.cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Pagination
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Requête optimisée avec relations pour éviter le N+1
    const [data, total] = await this.utilisateursRepository.findAndCount({
      where: { email },
      relations: [
        'adresse',
        'receipComments',
        'postComments',
        'organized_parties',
        'sent_messages',
        'receip_messages',
        'participations',
      ],
      take: limit,
      skip: offset,
      cache: true, // TypeORM mettra aussi les résultats en cache
    });
    //Pour éviter le problème de Query N+1, j'utilise les relations dans
    //la méthode findAndCount. Cela garantit que toutes les relations
    //nécessaires sont récupérées en une seule requête SQL.

    // Stocke le résultat en cache Redis
    const result = { data, total };
    await redisClient.set(this.cacheKey, JSON.stringify(result), 'EX', 3600); // Cache pour 1 heure

    return result;
  }
}
