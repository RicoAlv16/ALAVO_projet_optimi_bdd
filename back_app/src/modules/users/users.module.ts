import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/shared/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisModule.forRoot({
      host: 'localhost', // Adresse du serveur Redis
      port: 6379, // Port Redis par défaut
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
