import { Controller, Get, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('comments-by-user')
  async findCommentsByUserEmail(
    @Query('email') email: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.commentsService.findCommentsByUserEmail(email, {
      page,
      limit,
    });
  }
}
