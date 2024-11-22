import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const OrmConfig = async (): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your-username',
  password: 'your-password',
  database: 'your-database',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  cache: {
    type: 'redis',
    options: {
      host: 'localhost',
      port: 6379,
    },
  },
  logging: ['query', 'error', 'warn'], // Pour activer les log des requêtes SQL
});
