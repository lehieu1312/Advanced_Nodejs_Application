import { Injectable, Module, Query } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { PostEntity } from '../entities/post.entity';
import { DeepPartial } from 'typeorm';
import { msg } from 'src/helpers/message';
import { PostArgs } from './../dto/post.args';
import { PostInput } from '../dto/post.input';
import { Cron } from '@nestjs/schedule';
const message = msg.common;

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  pagination = async (args: PostArgs) => {
    const { pageIndex = 1, pageSize = 1, query } = args;
    const search = query?.trim().toLowerCase() ?? '';
    const qr = this.postRepository
      .createQueryBuilder('posts')
      .where(
        `("posts"."title" ILIKE :search OR "posts"."content" ILIKE :search) `,
        { search: `%${search}%` },
      );
    return this.postRepository.parsePaginate(qr, {
      limit: pageSize,
      page: pageIndex,
    });
  };

  add = async (input: DeepPartial<PostEntity>) => {
    try {
      const post = this.postRepository.create(input);
      const data = await this.postRepository.save(post);
      return {
        data,
        status: 1,
        message: message.create_success,
      };
    } catch (error) {
      return {
        data: null,
        status: 0,
        message: error.message,
      };
    }
  };

  update = async (id: string, input: PostInput) => {
    try {
      const { username, title, content } = input;
      await this.postRepository.update(id, { username, title, content });
      const data = await this.postRepository.findOneOrFail(id);
      return {
        data,
        status: 1,
        message: message.update_success,
      };
    } catch (error) {
      return {
        data: null,
        status: 0,
        message: message.update_success,
      };
    }
  };

  remove = async (id: string) => {
    try {
      await this.postRepository.delete(id);
      return {
        status: 1,
        message: message.delete_success,
      };
    } catch (error) {
      return {
        status: 0,
        message: error.message,
      };
    }
  };

  cronDelete = async () => {
    await this.postRepository
      .createQueryBuilder('posts')
      .delete()
      .where(`"posts"."created_at"::DATE < ${`now() - interval '7 days'`}`)
      .execute();
    return true;
  };
}
