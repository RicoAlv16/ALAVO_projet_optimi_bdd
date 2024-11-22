import { Controller, Get, Query } from '@nestjs/common';
import { PartiesService } from './parties.service';

@Controller('soirees')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Get()
  async findFiltered(
    @Query('city') city?: string,
    @Query('type') type?: string,
    @Query('total_places') total_places?: number,
    @Query('for_pay') for_pay?: boolean,
    @Query('party_date_hour') party_date_hour?: string,
    @Query('code_postal') code_postal?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.partiesService.findPartiesFiltered(
      {
        city,
        type,
        total_places,
        for_pay,
        party_date_hour: party_date_hour
          ? new Date(party_date_hour)
          : undefined,
        code_postal,
      },
      { page, limit },
    );
  }

  @Get('user-participations')
  async findUserParticipations(
    @Query('firstname') firstname: string,
    @Query('lastname') lastname: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: string,
    @Query('ville') ville?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.partiesService.findUserParticipations(
      {
        firstname,
        lastname,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        type,
        ville,
      },
      { page, limit },
    );
  }

  @Get('parties-by-game')
  async findSoireesByGame(
    @Query('gameName') gameName: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.partiesService.findPartiesByGameName(gameName, { page, limit });
  }
}
