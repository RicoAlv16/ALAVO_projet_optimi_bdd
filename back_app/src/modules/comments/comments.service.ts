import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'nestjs-redis';
import { Comments } from 'src/shared/entities/comments.entity';
import { User } from 'src/shared/entities/user.entity';
import { PaginationOptions } from 'src/shared/interfaces/pagination.interface';

@Injectable()
export class CommentsService {
  private readonly cacheKey = 'comments_by_user_cache';

  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
    @InjectRepository(User)
    private readonly utilisateurRepository: Repository<User>,
    private readonly redisService: RedisService,
  ) {}

  async findCommentsByUserEmail(
    email: string,
    options: PaginationOptions,
  ): Promise<{ data: Comments[]; total: number }> {
    const redisClient = this.redisService.getClient();
    const cacheKey = `${this.cacheKey}_${email}_${options.page}_${options.limit}`;

    // Vérifie si les données sont en cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Construire la requête
    const query = this.commentsRepository
      .createQueryBuilder('comments')
      .innerJoinAndSelect('comments.author', 'user') // Joindre avec Utilisateur
      .where('user.email = :email', { email }) // Filtrer par email
      .orderBy('comments.date_creation', 'DESC') // Trier par date de création
      .skip(offset)
      .take(limit);

    // Exécuter la requête
    const [data, total] = await query.getManyAndCount();

    // Stocker les résultats en cache
    const result = { data, total };
    await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600); // Cache pour 1 heure

    return result;
  }
}
