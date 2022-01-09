import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostInput, PostData, PostDataRemove } from '../dto/post.input';
import { PostArgs } from '../dto/post.args';
import { Pagination } from 'src/modules/common/pagination';
import { PostEntity } from '../entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() post: PostInput): Promise<PostData> {
    return await this.postService.add(post);
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() post: PostInput,
  ): Promise<PostData> {
    return await this.postService.update(id, post);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PostDataRemove> {
    return await this.postService.remove(id);
  }

  @Get()
  async findAll(@Query() args: PostArgs): Promise<Pagination<PostEntity>> {
    return this.postService.pagination(args);
  }
}
