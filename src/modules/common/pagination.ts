import { IPaginationMeta } from './interfaces';

export class Pagination<PaginationObject> {
  constructor(
    public readonly items: PaginationObject[],

    public readonly meta: IPaginationMeta,
  ) {}
}
