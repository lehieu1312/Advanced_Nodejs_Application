import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Pagination } from './pagination';

@EntityRepository()
export class CommonRepository<Model> extends Repository<Model> {
  async parsePaginate(
    queryBuilder: SelectQueryBuilder<Model>,
    { limit, page }: { limit?: number; page?: number },
  ): Promise<Pagination<Model>> {
    page = page || 1;
    limit = limit || 15;
    const skip = limit * (page - 1);
    const [items, total] = await queryBuilder
      .take(limit)
      .skip(skip)
      .getManyAndCount();
    return createPaginationObject(items, total, page, limit);
  }
}

export function createPaginationObject<T>(
  items: T[],
  totalItems: number,
  currentPage: number,
  limit: number,
) {
  const totalPages = Math.ceil(totalItems / limit);
  return new Pagination(items, {
    totalItems: totalItems,
    itemCount: items.length,
    itemsPerPage: limit,
    totalPages: totalPages,
    currentPage: currentPage,
  });
}
