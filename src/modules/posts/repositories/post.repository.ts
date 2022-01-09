import { EntityRepository } from 'typeorm';
import { CommonRepository } from 'src/modules/common/common.repository';
import { PostEntity } from '../entities/post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends CommonRepository<PostEntity> {}
