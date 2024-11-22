import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from 'nestjs-redis';
import { Parties } from 'src/shared/entities/parties.entity';
import { PaginationOptions } from 'src/shared/interfaces/pagination.interface';
import { Participation } from 'src/shared/entities/participation.entity';
import { Partygames } from 'src/shared/entities/party-games.entity';

@Injectable()
export class PartiesService {
  private readonly cacheKey = 'soirees_cache';

  constructor(
    @InjectRepository(Parties)
    private readonly partiesRepository: Repository<Parties>,
    private readonly participationRepository: Repository<Participation>,
    private readonly partyGameRepository: Repository<Partygames>,
    private readonly redisService: RedisService,
  ) {}

  async findPartiesFiltered(
    filters: {
      city?: string;
      type?: string;
      total_places?: number;
      for_pay?: boolean;
      party_date_hour?: Date;
      code_postal?: string;
    },
    options: PaginationOptions,
  ): Promise<{ data: Parties[]; total: number }> {
    const redisClient = this.redisService.getClient();
    const cacheKey = `${this.cacheKey}_${JSON.stringify(filters)}_${options.page}_${options.limit}`;

    // Vérifie si les données sont déjà en cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    // Pagination
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Construire la requête
    const query = this.partiesRepository.createQueryBuilder('parties');

    // Ajouter les filtres
    // Sachant que la table parties est partitionnée dans la bdd selon le code postale
    if (filters.city) {
      query.andWhere('parties.city = :city', { city: filters.city });
    }
    if (filters.type) {
      query.andWhere('parties.type = :type', { type: filters.type });
    }
    if (filters.total_places) {
      query.andWhere('parties.total_places >= :total_places', {
        total_places: filters.total_places,
      });
    }
    if (filters.for_pay !== undefined) {
      query.andWhere('parties.for_pay = :for_pay', {
        for_pay: filters.for_pay,
      });
    }
    if (filters.party_date_hour) {
      query.andWhere('parties.party_date_hour >= :party_date_hour', {
        party_date_hour: filters.party_date_hour,
      });
    }
    if (filters.code_postal) {
      query.andWhere('parties.code_postal = :code_postal', {
        code_postal: filters.code_postal,
      });
    }

    // Ajout de la pagination
    query.skip(offset).take(limit);

    // Exécute la requête
    const [data, total] = await query.getManyAndCount();

    // Stocke le résultat en cache Redis
    const result = { data, total };
    await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600); // Cache pour 1 heure

    return result;
  }

  async findUserParticipations(
    filters: {
      firstname: string;
      lastname: string;
      startDate?: Date;
      endDate?: Date;
      type?: string;
      ville?: string;
    },
    options: PaginationOptions,
  ): Promise<{ data: Participation[]; total: number }> {
    const redisClient = this.redisService.getClient();
    const cacheKey = `${this.cacheKey}_${JSON.stringify(filters)}_${options.page}_${options.limit}`;

    // Vérifie si les données sont en cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Construire la requête
    const query = this.participationRepository
      .createQueryBuilder('participation')
      .innerJoinAndSelect('participation.user', 'user') // Joindre avec User
      .innerJoinAndSelect('participation.parties', 'parties') // Joindre avec parties
      .where('user.firstname = :firstname', { firstname: filters.firstname })
      .andWhere('user.lastname = :lastname', { lastname: filters.lastname });

    // Ajouter les filtres de dates
    if (filters.startDate) {
      query.andWhere('parties.party_date_heure >= :startDate', {
        startDate: filters.startDate,
      });
    }
    if (filters.endDate) {
      query.andWhere('parties.party_date_heure <= :endDate', {
        endDate: filters.endDate,
      });
    }

    // Ajouter les filtres sur le type et la ville
    if (filters.type) {
      query.andWhere('parties.type = :type', { type: filters.type });
    }
    if (filters.ville) {
      query.andWhere('parties.city = :ville', { city: filters.ville });
    }

    // Ajouter le tri
    query.orderBy('parties.type', 'ASC').addOrderBy('parties.city', 'ASC');

    // Ajouter la pagination
    query.skip(offset).take(limit);

    // Exécuter la requête
    const [data, total] = await query.getManyAndCount();

    // Stocker les résultats en cache
    const result = { data, total };
    await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 3600); // Cache pour 1 heure

    return result;
  }

  async findPartiesByGameName(
    gameName: string,
    options: PaginationOptions,
  ): Promise<{ data: Partygames[]; total: number }> {
    const redisClient = this.redisService.getClient();
    const cacheKey = `${this.cacheKey}_${gameName}_${options.page}_${options.limit}`;

    // Vérifie si les données sont en cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const { page, limit } = options;
    const offset = (page - 1) * limit;

    // Construire la requête
    const query = this.partyGameRepository
      .createQueryBuilder('party_game')
      .innerJoinAndSelect('party_game.party', 'party') // Joindre avec Soiree
      .innerJoinAndSelect('party_game.associated_game', 'associated_game') // Joindre avec Jeu
      .where('associated_game.nom = :gameName', { gameName }) // Filtrer par nom de jeu
      .orderBy('party.type', 'ASC') // Tri par type
      .addOrderBy('party.ville', 'ASC') // Tri par ville
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
