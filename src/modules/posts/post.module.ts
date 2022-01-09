import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './controllers/post.controller';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './services/post.service';
import { TasksService } from './services/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  controllers: [PostController],
  providers: [PostService, TasksService],
})
export class PostModule {}
