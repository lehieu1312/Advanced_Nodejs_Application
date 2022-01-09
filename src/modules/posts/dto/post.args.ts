import { IsNumberString } from 'class-validator';

export class PostArgs {
  query?: string;

  @IsNumberString()
  pageSize?: number;

  @IsNumberString()
  pageIndex?: number;
}
