import {
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { PostEntity } from '../entities/post.entity';

export class PostInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  content: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  username: string;
}

export class PostData {
  data: PostEntity;

  @IsNumber()
  status: number;

  @IsString()
  message: string;
}
export class PostDataRemove {
  @IsNumber()
  status: number;

  @IsString()
  message: string;
}
