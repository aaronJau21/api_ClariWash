export interface GlobalRepository<T, D> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(data: D): Promise<T>;
  update(id: string, data: D): Promise<T>;
  delete(id: string): Promise<void>;
}
