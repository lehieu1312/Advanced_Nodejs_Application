import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostService } from './post.service';

@Injectable()
export class TasksService {
  constructor(private readonly postService: PostService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    this.postService.cronDelete();
  }
}
